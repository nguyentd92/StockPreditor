using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using StockPredictor.Library;
using StockPredictor.Models;

namespace StockPredictor.Controllers
{
    [ApiController]
    [Route("api/[action]")]
    public class TestController : Controller
    {
        private const string Path = "/Users/nguyendanh/Projects/StockData";
        public IActionResult GetAllStocks()
        {
            List<string> files = FileReader.GetFilesList(Path);

            List<string> stockIdList = files.Select(e => FileHandler.GetFileName(e)).ToList();

            return Json(stockIdList);
        }

        public IActionResult ReadTxtFile() {
            return Json(FileReader.ReadTxtFile("/Users/nguyendanh/Projects/StockData/RAT.txt"));
        }

        [HttpGet("{id}")]
        public IActionResult GetStockById(string id) {
            string result = FileReader.ReadTxtFileByFileName(id, Path);

            string[] separator = { "\r\n" };

            string[] lines = result.Split(separator, StringSplitOptions.RemoveEmptyEntries);

            List<string> top100Lines = lines.ToList().Skip(Math.Max(0, lines.Count() - 100)).ToList();

            List<Stock> stocks = top100Lines.Select(e => StockTransformer.Convert(e)).ToList();
            
            return Json(stocks);
        }

        public IActionResult GetFiles() {
            return Json(FileReader.GetFilesList(Path));
        }
    }
}