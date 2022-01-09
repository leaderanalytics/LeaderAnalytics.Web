namespace LeaderAnalytics.Web;

public class AppConfig
{
    
    public readonly AzureADConfig AzureADConfig;

    public AppConfig(AzureADConfig azureConfig)
    {
        AzureADConfig = azureConfig;
    }
}
