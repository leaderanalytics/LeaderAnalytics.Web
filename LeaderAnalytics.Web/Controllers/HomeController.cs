using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace LeaderAnalytics.Web.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
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

        [HttpPost]
        public bool HandleContactRequest([FromBody] ContactRequest contactRequest)
        {
            // [FromBody]string name, [FromBody]string phone, [FromBody]string email, [FromBody]string requirement, [FromBody]string comment
            // string name, string phone, string email, string requirement, string comments
            string x = "";
            return true;
        }
        
    }

    public class ContactRequest
    {
        public string name { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public string requirement { get; set; }
        public string comment { get; set; }
    }
}
