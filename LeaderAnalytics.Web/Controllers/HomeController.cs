using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Mail;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace LeaderAnalytics.Web.Controllers
{
    public class HomeController : Controller
    {
        private IConfiguration AppSettings;

        public HomeController(IConfiguration appSettings)
        {
            AppSettings = appSettings;
        }

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
            string subject = "Contact Request from LeaderAnalytics.com";
            string msgBody =
                "Name: " + contactRequest.name + Environment.NewLine +
                "Phone: " + contactRequest.phone + Environment.NewLine +
                "Email: " + contactRequest.email + Environment.NewLine +
                "Requirement: " + contactRequest.requirement + Environment.NewLine +
                "Comment: " + contactRequest.comment + Environment.NewLine;
            SendEmailNotice(AppSettings["EmailAccount"], AppSettings["EmailPassword"], new string[] { "sam.wheat@outlook.com" }, subject, msgBody);
            return true;
        }

        private void SendEmailNotice(string emailAccount, string emailPassword, string[] to, string subject, string msgBody)
        {
            MailMessage msg = new MailMessage
            {
                From = new MailAddress("sam.wheat@outlook.com"),
                Subject = subject,
                Body = msgBody
            };

            for (int i = 0; i < to.Length; i++)
                msg.To.Add(to[i]);

            try
            {
                SmtpClient Client;
                Client = new SmtpClient("smtp-mail.outlook.com");
                Client.Port = 587;  
                Client.EnableSsl = true;
                Client.Credentials = new System.Net.NetworkCredential(emailAccount, emailPassword);
                Client.Send(msg);
            }
            catch (Exception ex)
            {
                // not fatal
                // log it
            }
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
