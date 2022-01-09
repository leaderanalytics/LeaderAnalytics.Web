namespace LeaderAnalytics.Web
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class WebAPIController : ControllerBase
    {
        private static HttpClient apiClient;
        private IActionContextAccessor accessor;
        private AppConfig config;

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

        [HttpGet]
        public ActionResult<string> Identity()
        {
            return "Leader Analytics Web";
        }


        [HttpPost]
        public async Task<IActionResult> SendContactRequest(ContactRequest msg)
        {
            IActionResult result = null;
            msg.IP_Address = accessor.ActionContext.HttpContext.Connection.RemoteIpAddress.ToString();        
            
            try
            {
                var apiResult = await apiClient.PostAsync("api/Message/SendContactRequest", new StringContent(JsonSerializer.Serialize(msg), Encoding.UTF8, "application/json"));
                string errorMsg = await apiResult.Content.ReadAsStringAsync();
                if (apiResult.StatusCode == System.Net.HttpStatusCode.Created)
                    result = CreatedAtAction("SendContactRequest", "email") as IActionResult;
                else
                {
                    result = BadRequest(errorMsg ?? "Failed to send contact email.");
                    Log.Error("Failed to send contact email.  The response from the API server is: {@e}", apiResult);
                }
            }
            catch (Exception ex)
            {
                result = BadRequest("Failed to send contact email.");
                Log.Error("An exception occurred when trying to send contact email.  The error is: {e}", ex.ToString());
            }
            
            return result;
        }

        [HttpGet]
        public async Task<IActionResult> CaptchaImage()
        {
            string ipaddress = accessor.ActionContext.HttpContext.Connection.RemoteIpAddress.ToString();
            try
            {

                var apiResult = await apiClient.GetStreamAsync(QueryHelpers.AddQueryString("api/Captcha/CaptchaImage", "ipaddress", ipaddress));
                return new FileStreamResult(apiResult, "image/jpeg");
            }
            catch (Exception ex)
            {
                Log.Error("CaptchaImage: {e}", ex.ToString());
                return BadRequest("Failed to generate Captcha Image.");
            }
        }
    }
}
