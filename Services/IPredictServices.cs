using System.Collections.Generic;

namespace StockPredictor.Services
{
    public interface IPredictService
    {
        List<string> PredictAllExist();
        void PredictStockById(string id);
    }
}