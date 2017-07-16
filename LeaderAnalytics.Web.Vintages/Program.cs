using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.ApplicationInsights;

namespace LeaderAnalytics.Web.Vintages
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var telemetry = new TelemetryClient();

            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .UseApplicationInsights()
                .Build();

            try
            {
                host.Run();
            }
            catch (Exception ex)
            {
                telemetry.TrackException(ex);
            }
        }
    }
}
