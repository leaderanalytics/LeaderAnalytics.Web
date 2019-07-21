using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Globalization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration.AzureKeyVault;
using Serilog;
using System.IO;


using Microsoft.Azure.KeyVault;
using Microsoft.Azure.KeyVault.Models;
using Microsoft.Azure.Services.AppAuthentication;


namespace LeaderAnalytics.Web
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; }

        public Startup(IHostingEnvironment env)
        {

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            builder.AddUserSecrets<Startup>();  // always add user secrets because ClientSecret is necessary to to get to KeyValut
            
            Configuration = builder.Build();
            CreateLogger(env.WebRootPath);
            Log.Logger.Information("logger created");


            // 2018-12-22 https://docs.microsoft.com/en-us/azure/key-vault/tutorial-net-create-vault-azure-web-app
            AzureServiceTokenProvider azureServiceTokenProvider = new AzureServiceTokenProvider();
            KeyVaultClient keyVaultClient = new KeyVaultClient(new KeyVaultClient.AuthenticationCallback(azureServiceTokenProvider.KeyVaultTokenCallback));
            SecretBundle emailAccount = null;
            SecretBundle emailPassword = null;
            int retries = 0;

            while (retries++ < 3)
            {
                try
                {
                    emailAccount = keyVaultClient.GetSecretAsync("https://leaderanalyticsvault.vault.azure.net/secrets/EmailAccount").Result;
                    emailPassword = keyVaultClient.GetSecretAsync("https://leaderanalyticsvault.vault.azure.net/secrets/EmailPassword").Result;
                    Log.Logger.Information("Email credentials were set successfully");
                    break;
                }
                catch (Exception ex)
                {
                    Log.Logger.Error(ex.ToString(), "Email credentials");
                }

            }

            if (emailAccount == null || emailPassword == null)
            {
                //Log.Logger.Error("Unable to get Email credentials");
            }
            Configuration["EmailAccount"] = emailAccount.Value;
            Configuration["EmailPassword"] = emailPassword.Value;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IConfiguration>(Configuration);
            // Add framework services.
            services.AddMvc();
            services.AddRouting();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseDeveloperExceptionPage();
                
                //app.UseExceptionHandler("/Home/Error");
            }

            app.UseDefaultFiles(); // must be before UseStaticFiles
            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();
        }


        private void CreateLogger(string webroot)
        {

            //
            //
            // Note:  dont use string interpolation when logging. Example:
            //
            // string userName = "sam";
            // Log.Information($"My name is {userName}");              // WRONG:  serilog cannot generate a variable for username
            // Log.Information("My name is {userName}", userName);     // Correct: userName:"sam" can optionally be generated in the log file as a searchable variable
            //
            //
            // https://stackoverflow.com/questions/46629489/serilog-with-api-app-in-azure
            //string logDir = Path.Combine(Directory.GetParent(webroot).Parent.ToString(), "\\LogFiles\\__log-{Date}.txt");
            string logDir = @"D:\home\LogFiles\http\RawLogs\__log.txt";
            var outputTemplate = "[{Timestamp:HH:mm:ss}] [{Level:u3}] [{Caller}]{NewLine}{Exception}{Message}{NewLine}";
            Serilog.Formatting.Display.MessageTemplateTextFormatter tf = new Serilog.Formatting.Display.MessageTemplateTextFormatter(outputTemplate, CultureInfo.InvariantCulture);
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(Configuration)
                .Enrich.FromLogContext()
                .Enrich.WithCaller()
                .WriteTo.RollingFile(tf, logDir)
                .CreateLogger();
        }
    }
}
