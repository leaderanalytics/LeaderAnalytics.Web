using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LeaderAnalytics.Core.Azure;

namespace LeaderAnalytics.Web
{
    public class AppConfig
    {
        public const string ConfigFilePath = "C:\\Users\\sam\\OneDrive\\LeaderAnalytics\\Config\\Web";
        public readonly AzureADConfig AzureADConfig;        

        public AppConfig(AzureADConfig azureConfig)
        {
            AzureADConfig = azureConfig;
        }
    }
}
