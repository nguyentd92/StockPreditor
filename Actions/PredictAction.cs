using System;
using System.Collections.Generic;
using StockPredictor.Library;
using StockPredictor.Services;

namespace StockPredictor.Actions
{
    public class PredictAction : IPredictAction
    {
        private IPredictService _predictService;

        public PredictAction(IPredictService predictService)
        {
            _predictService = predictService;
        }
        
        public void run()
        {
            const string PATH = @"D:\Stock Price Prediction\SP.py";
            string DIR = PATH.Substring(0, PATH.LastIndexOf("\\"));

            List<string> urlFiles = FileReader.GetFilesList(DIR);

            List<string> arrayData = null;

            foreach (string url in urlFiles)
            {
                arrayData.Add(FileReader.ReadTxtFile(url));
            }
        }
    }
}