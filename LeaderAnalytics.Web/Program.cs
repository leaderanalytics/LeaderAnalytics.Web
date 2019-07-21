using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;

namespace LeaderAnalytics.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                //.UseApplicationInsights()
                .CaptureStartupErrors(true)                             // Enables error page in Azure
                .UseSetting(WebHostDefaults.DetailedErrorsKey, "true")  // Enables error page in Azure
                .Build();

            host.Run();
        }
    }
}
