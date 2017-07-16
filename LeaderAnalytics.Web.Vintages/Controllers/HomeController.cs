using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace LeaderAnalytics.Web.Vintages.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return new PhysicalFileResult("~/index.html", Microsoft.Net.Http.Headers.MediaTypeHeaderValue.Parse("text/html"));
            
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
