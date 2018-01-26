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

            if (! env.IsDevelopment())
            {
                var builtConfig = builder.Build();

                //https://docs.microsoft.com/en-us/aspnet/core/security/key-vault-configuration?tabs=aspnetcore2x
                builder.AddAzureKeyVault(
                  $"https://{builtConfig["Vault"]}.vault.azure.net",
                  builtConfig["ClientID"],
                  builtConfig["ClientSecret"]);
            }
            Configuration = builder.Build();
            CreateLogger();
            Log.Debug("Vault {vault}", Configuration["Vault"]);
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
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseDefaultFiles(); // must be before UseStaticFiles
            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();
        }


        private void CreateLogger()
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

            var outputTemplate = "[{Timestamp:HH:mm:ss}] [{Level:u3}] [{Caller}]{NewLine}{Exception}{Message}{NewLine}";
            Serilog.Formatting.Display.MessageTemplateTextFormatter tf = new Serilog.Formatting.Display.MessageTemplateTextFormatter(outputTemplate, CultureInfo.InvariantCulture);
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(Configuration)
                .Enrich.FromLogContext()
                .Enrich.WithCaller()
                .WriteTo.RollingFile(tf, "../../LogFiles/__log-{Date}.txt")
                .CreateLogger();
        }
    }
}
