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

            // Transform string to datetime type dd/MM/yyyy

            Stock stock = new Stock();
            stock.Id = values[6];
            stock.Date = values[0];
            stock.Open = float.Parse(values[1]);
            stock.High = float.Parse(values[2]);
            stock.Low = float.Parse(values[3]);
            stock.Close = float.Parse(values[4]);
            stock.Value = float.Parse(values[5]);

            return stock;
        }
    }
}