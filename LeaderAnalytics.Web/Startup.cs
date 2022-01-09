namespace LeaderAnalytics.Web;

public class Startup
{
    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        Log.Information("ConfigureServices started.");


        // This is required to be instantiated before the OpenIdConnectOptions starts getting configured.
        // By default, the claims mapping will map claim names in the old format to accommodate older SAML applications.
        // 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role' instead of 'roles'
        // This flag ensures that the ClaimsIdentity claims collection will be built from the claims in the token
        // JwtSecurityTokenHandler.DefaultMapInboundClaims = false;

        // Adds Microsoft Identity platform (AAD v2.0) support to protect this Api
        //services.AddProtectedWebApi(options =>
        //{
        //    Configuration.Bind("AzureAdB2C", options);

        //    options.TokenValidationParameters.NameClaimType = "name";
        //},
        //    options => { Configuration.Bind("AzureAdB2C", options); });


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

        // With endpoint routing, the CORS middleware must be configured to execute between the calls to UseRouting and UseEndpoints.
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
            }).AllowAnyMethod().AllowAnyHeader();
        });

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
        app.UseAuthentication();
        Log.Information("Configure Completed.");

    }
}
