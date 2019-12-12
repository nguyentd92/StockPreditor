using System.Collections.Generic;
using System.IO;
using System.Linq;
using StockPredictor.Library;

namespace StockPredictor.Services
{
    public class PredictService : IPredictService
    {
        private const string PATH = @"D:/AI Data/Stock Price Prediction/SP.py";

        public List<string> PredictAllExist()
        {
            string dir = PATH.Substring(0, PATH.LastIndexOf("/"));

            // Get All Directories in Folder
            List<string> dirs = Directory.GetDirectories(dir + "/Models").ToList();

            // Exist Stocks In
            List<string> stocks = dirs.Select(p => {
                string path = p.Replace("\\", "/");

                int startIndex = path.LastIndexOf("/") + 1;

                return path.Substring(startIndex, path.Length -startIndex);
            }).ToList();

            // Get List Model
            foreach (string id in stocks)
            {
                PredictStockById(id);
            }

            return stocks;
        }

        public void PredictStockById(string id)
        {
            // Make proper path for executing command
            string cmd = $"python \"{PATH}\" {id}";

        
            cmd.Bash();
        }
    }
}