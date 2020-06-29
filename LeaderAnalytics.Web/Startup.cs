using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using LeaderAnalytics.Core.Azure;

namespace LeaderAnalytics.Web
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IWebHostEnvironment env)
        {
            Log.Information("Start constructing Startup class.");
            string devFilePath = string.Empty;

            if (env.EnvironmentName == "Development")
                devFilePath = AppConfig.ConfigFilePath;

            string configFilePath = Path.Combine(devFilePath, $"appsettings.{env.EnvironmentName}.json");

            if (File.Exists(configFilePath))
                Log.Information("Configuration file {f} exists.", configFilePath);
            else
                Log.Error("Configuration file {f} was not found.", configFilePath);

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile(configFilePath, optional: false)
                .AddEnvironmentVariables();
            Configuration = builder.Build();

            Log.Information("Constructing Startup class completed.");
        }

        

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            Log.Information("ConfigureServices started.");

            services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddCors();

            // App Config
            AppConfig config = new AppConfig(AzureADConfig.ReadFromConfig(Configuration));
            services.AddSingleton<AppConfig>(config);
            
            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();

            Log.Information("ConfigureServices completed.");
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            Log.Information("Configure Started.");
            Log.Information("Configuration[\"ASPNETCORE_ENVIRONMENT\"] is {env}", Configuration["ASPNETCORE_ENVIRONMENT"]);
            Log.Information("WebHostEnvironment.EnvironmentName is {env}", env.EnvironmentName);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();
            app.UseEndpoints(endpoints => endpoints.MapControllers());

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    //spa.UseAngularCliServer(npmScript: "start");
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });

            app.UseCors(policy =>
            {
                policy.WithOrigins(new string[] 
                {
                    "http://www.leaderanalytics.com",
                    "https://www.leaderanalytics.com",
                    "http://leaderanalytics.com",
                    "https://leaderanalytics.com",
                    "http://localhost",
                    "http://localhost:80",
                    "http://localhost:63284",
                    "http://dev.leaderanalytics.com",
                    "http://leaderanalyticsweb.azurewebsites.net",
                    "https://leaderanalyticsweb.azurewebsites.net",
                    "https://localhost:5031",
                    "https://localhost:44381",
                    "https://leaderanalyticstweb-staging.azurewebsites.net"
                });
                policy.AllowAnyMethod();
                policy.AllowCredentials();
                policy.AllowAnyHeader();
            });

            app.UseAuthentication();
            Log.Information("Configure Completed.");

        }
    }
}
