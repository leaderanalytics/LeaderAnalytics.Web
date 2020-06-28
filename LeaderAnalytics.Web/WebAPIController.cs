using IdentityModel.Client;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Text;
using System.Text.Json;
using LeaderAnalytics.Core.Azure;

namespace LeaderAnalytics.Web
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class WebAPIController : ControllerBase
    {
        private static HttpClient apiClient;
        private static List<ContactHistory> contactHistory;
        private IActionContextAccessor accessor;
        private AppConfig config;

        static WebAPIController()
        { 
            contactHistory = new List<ContactHistory>();
        }

        public WebAPIController(AppConfig config, IActionContextAccessor accessor)
        {
            this.config = config;
            this.accessor = accessor;

            if (apiClient == null)
            {
                ClientCredentialsHelper helper = new ClientCredentialsHelper(config.AzureADConfig);
                apiClient = helper.AuthorizedClient();
            }
        }

        [HttpPost]
        public async Task<IActionResult> SendEMail(EmailMsg msg)
        {
            IActionResult result = null;
            ExpireContactHistory();                                                                             // Remove all address older than 5 minutes.
            string ipaddress = accessor.ActionContext.HttpContext.Connection.RemoteIpAddress.ToString();        // Get IP of current user
            bool cantSend = contactHistory.Any(x => x.IP_Address == ipaddress);                                 // Check if current user IP exists (they have sent less than 5 min ago).

            if (cantSend)
                result = BadRequest("Please wait at least five minutes between requests.");
            else
            {
                var apiResult = await apiClient.PostAsync(config.AzureADConfig.APIBaseAddress + "api/Message/SendEmail", new StringContent(JsonSerializer.Serialize(msg), Encoding.UTF8, "application/json"));
                result = CreatedAtAction("SendEMail", "email") as IActionResult;
                contactHistory.Add(new ContactHistory { IP_Address = ipaddress, SendTime = DateTime.UtcNow });
            }
            return result;
        }

        private void ExpireContactHistory()
        {
            DateTime now = DateTime.UtcNow;
            List<ContactHistory> expired = contactHistory.Where(x => x.SendTime.AddMinutes(5) < now).ToList();

            foreach (ContactHistory c in expired)
                contactHistory.Remove(c);
        }
    }

    public class ContactHistory
    { 
        public string IP_Address { get; set; }
        public DateTime SendTime { get; set; }
    }
}
