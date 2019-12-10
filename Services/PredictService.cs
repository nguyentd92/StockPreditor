using System.Collections.Generic;
using System.Linq;
using StockPredictor.Library;

namespace StockPredictor.Services
{
    public class PredictService : IPredictService
    {
        private const string PATH = @"D:/Stock Price Prediction/SP.py";

        public void PredictAllExist()
        {
            List<string> idStocks = new List<string>();

            // Get List Model
            idStocks.Select(e => {
                PredictStockById(e);
                return e;
            });
        }

        public void PredictStockById(string id)
        {
            // Make proper path for executing command
            string cmd = $"python \"{PATH}\" {id}";

            cmd.Bash();
        }
    }
}