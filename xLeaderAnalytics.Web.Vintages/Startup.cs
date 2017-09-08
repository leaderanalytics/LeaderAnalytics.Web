using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Owin.Security.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using LeaderAnalytics.Web.Vintages.Models;
using LeaderAnalytics.Web.Vintages.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using System.IO;


namespace LeaderAnalytics.Web.Vintages
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            // For more details on using the user secret store see https://go.microsoft.com/fwlink/?LinkID=532709
            builder.AddUserSecrets<Startup>();
            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            //services.AddDbContext<ApplicationDbContext>(options =>
            //    options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            //services.AddIdentity<ApplicationUser, IdentityRole>()
            //    .AddEntityFrameworkStores<ApplicationDbContext>()
            //    .AddDefaultTokenProviders();


            services.AddAuthentication(options => {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationType;
                options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
            })
            .AddCookie()
            .AddOpenIdConnect(options => {
                options.Authority = Configuration["auth:oidc:authority"];
                options.ClientId = Configuration["auth:oidc:clientid"];
            });


            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => {
                    options.Audience = "http://localhost:5001/";
                    options.Authority = "http://localhost:5000/";
                });

            services.AddAuthentication()
                .AddFacebook(options => {
                    options.AppId = Configuration["auth:facebook:appid"];
                    options.AppSecret = Configuration["auth:facebook:appsecret"];
                });

            services.AddAuthentication()
                .AddGoogle(options => {
                    options.ClientId = Configuration["auth:google:clientid"];
                    options.ClientSecret = Configuration["auth:google:clientsecret"];
                });

            services.AddAuthentication()
                .AddMicrosoftAccount(options => {
                    options.ClientId = Configuration["auth:microsoft:clientid"];
                    options.ClientSecret = Configuration["auth:microsoft:clientsecret"];
                });

            services.AddAuthentication()
                .AddTwitter(options => {
                    options.ConsumerKey = Configuration["auth:twitter:consumerkey"];
                    options.ConsumerSecret = Configuration["auth:twitter:consumersecret"];
                });



            services.AddMvc(options => {
                options.SslPort = 44359;
                options.Filters.Add(new RequireHttpsAttribute());
            });

            // Add application services.
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();

            services.AddApplicationInsightsTelemetry(Configuration);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            app.UseAuthentication();
            app.UseDeveloperExceptionPage();
            app.UseDatabaseErrorPage();
            app.UseBrowserLink();

            if (env.EnvironmentName == "Development")
            {
                DefaultFilesOptions options = new DefaultFilesOptions();
                options.DefaultFileNames.Clear();
                options.DefaultFileNames.Add("index-dev.html");
                app.UseDefaultFiles(options); // must be before UseStaticFiles
            }
            else
                app.UseDefaultFiles(); // must be before UseStaticFiles

            
            app.UseStaticFiles();


            // -------------------  Authentication -------------------------------
            //app.UseIdentity();

            // Add external authentication middleware below. To configure them please see https://go.microsoft.com/fwlink/?LinkID=532715
            //app.UseMicrosoftAccountAuthentication(new MicrosoftAccountOptions()
            //{
            //    ClientId = Configuration["Authentication:Microsoft:ClientId"],
            //    ClientSecret = Configuration["Authentication:Microsoft:ClientSecret"]
            //});
            // -------------------  Authentication -------------------------------


            ServeFromDirectory(app, env, "node_modules");

            //app.UseMvc(routes =>
            //{
            //    routes.MapRoute(
            //        name: "default",
            //        template: "{controller=Home}/{action=Index}/{id?}");
            //});
        }

        public void ServeFromDirectory(IApplicationBuilder app, IHostingEnvironment env, string path)
        {
            string fullPath = Path.Combine(env.ContentRootPath, path);

            if (Directory.Exists(fullPath))
            {
                app.UseStaticFiles(new StaticFileOptions
                {
                    FileProvider = new PhysicalFileProvider(fullPath),
                    RequestPath = "/" + path
                });
            }
        }
    }
}
