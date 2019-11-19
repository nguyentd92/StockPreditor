using System.Collections.Generic;
using StockPredictor.Models;

namespace StockPredictor.Actions
{
    public interface IRenewDataAction
    {
        public void UpdateData(List<Stock> data)
        {

        }
    }
}