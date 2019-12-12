using Hangfire.Dashboard;

namespace StockPredictor.Hangfire
{
    public class MyAuthorizationFilter : IDashboardAuthorizationFilter
    {
        public bool Authorize(DashboardContext ctx)
        {
            return true;
        }
    }
}