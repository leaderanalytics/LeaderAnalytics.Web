using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.ApplicationInsights;

namespace LeaderAnalytics.Web.Vintages
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var telemetry = new TelemetryClient();

            try
            {
                BuildWebHost(args).Run();
            }
            catch (Exception ex)
            {
                telemetry.TrackException(ex);
            }
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();

    }
}
