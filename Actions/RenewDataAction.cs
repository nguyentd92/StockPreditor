using System;
using System.Collections.Generic;
using StockPredictor.Library;
using StockPredictor.Models;

namespace StockPredictor.Actions
{
    public class RenewDataAction : IRenewDataAction
    {
        public void UpdateData(List<Stock> data)
        {
            const string Path = "/Users/nguyendanh/Projects/StockData";

            List<string> urlFiles = FileReader.GetFilesList(Path);

            List<string> arrayData = null;

            foreach (string url in urlFiles)
            {
                arrayData.Add(FileReader.ReadTxtFile(url));
            }
        }
    }
}