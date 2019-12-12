using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using StockPredictor.Actions;
using StockPredictor.Library;
using StockPredictor.Models;
using StockPredictor.Services;

namespace StockPredictor.Controllers
{
}
[ApiController]
[Route("api/[action]")]
public class TestController : Controller
{

    private IConfiguration _configuration;

    private IPredictService _predictService;
    public TestController(IConfiguration configuration, IPredictService predictService)
    {
        _configuration = configuration;
        _predictService = predictService;
    }
    // On dev
    // private const string Path = "/Users/nguyendanh/Projects/StockData";
    // private const string Path = @"C:\StockData";
    private const string Path = @"D:/AI Data/Stock Price Prediction";

    public IActionResult GetAllStocks(string keyword = "")
    {
        // List<string> files = FileReader.GetFilesList(Path + "/Data/");
        List<string> files = Directory.GetDirectories(Path + "/Models/").ToList();

        List<string> stockIdList = files.Select(e => FileHandler.GetFileName(e)).ToList();

        if (!String.IsNullOrEmpty(keyword))
        {
            stockIdList = stockIdList.Where(n => n.ToLower().Contains(keyword.ToLower())).ToList();
        }
        return Json(stockIdList);
    }

    public IActionResult ReadTxtFile()
    {
        return Json(FileReader.ReadTxtFile(Path));
    }

    [HttpGet("{id}")]
    public IActionResult GetStockById(string id)
    {
        try
        {
            var response = new
            {
                history = GetStockHistory(id),
                // monthPrediction = JObject.Parse(GetStockMonthPrediction(id)),
                // seqPrediction = JObject.Parse(GetStockSequencePrediction(id))
                monthPrediction = GetStockMonthPrediction(id),
                seqPrediction = GetStockSequencePrediction(id)
            };

            return Json(response);

        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return NotFound();
        }
    }

    public IActionResult GetFiles()
    {
        return Json(FileReader.GetFilesList(Path));
    }

    public IActionResult TestTerminal()
    {
        IPredictAction predictAction = new PredictAction();

        return Json("Done");
    }

    public IActionResult TestDirectory()
    {
        List<string> result = _predictService.PredictAllExist();

        return Json(null);
    }

    private List<Stock> GetStockHistory(string id)
    {
        string result = FileReader.ReadTxtFileByFileName(id, Path + "/Data/");

        string[] separator = { "\r\n" };

        string[] lines = result.Split(separator, StringSplitOptions.RemoveEmptyEntries);

        List<string> top100Lines = lines.ToList().Skip(Math.Max(0, lines.Count() - 100)).ToList();

        List<Stock> res = top100Lines.Select(e => StockTransformer.Convert(e)).ToList();
        // Convert data to Stock Entities
        return res;
    }

    private List<string> GetStockMonthPrediction(string id)
    {
        id = id + "_m";
        
          string result = FileReader.ReadTxtFileByFileName(id, Path +"/Predictions/");
        
        return ConvertInputToList(result);
    }

    private List<string> GetStockSequencePrediction(string id)
    {        
        string result = FileReader.ReadTxtFileByFileName(id, Path +"/Predictions/");
        
        return ConvertInputToList(result);
    }

    private List<string> ConvertInputToList(string input)
    {
        input = input.Replace("[", "");
        input = input.Replace("]", "");
        input = input.Replace(" ", "");

        string[] lines = input.Split(",", StringSplitOptions.RemoveEmptyEntries);

        return lines.ToList();
    }
}
