using System;
using StockPredictor.Models;

namespace StockPredictor.Library
{
    public static class StockTransformer
    {
        public static Stock Convert(string dataStr)
        {
            //!! Data input type: <Id:string>,<Date:ddMMyyyy>,<Open:float>,<High:float>,<Low:float>,<Close:float>

            string[] values = dataStr.Split(",", StringSplitOptions.RemoveEmptyEntries);

            Stock stock = new Stock();
            stock.Id = values[0];
            stock.Date = values[1];
            stock.Open = float.Parse(values[2]);
            stock.High = float.Parse(values[3]);
            stock.Low = float.Parse(values[4]);
            stock.Close = float.Parse(values[5]);
            stock.Value = float.Parse(values[6]);

            return stock;
        }
    }
}