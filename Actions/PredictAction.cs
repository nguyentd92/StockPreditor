using System;
using System.Collections.Generic;
using StockPredictor.Library;
using StockPredictor.Services;

namespace StockPredictor.Actions
{
    public class PredictAction : IPredictAction
    {        
        public void run()
        {
            IPredictService service = new PredictService();
            service.PredictAllExist();
        }
    }
}