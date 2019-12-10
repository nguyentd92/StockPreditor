using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
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
    private const string Path = @"C:\Users\Hitec-Danh\Desktop\StockData";
    public IActionResult GetAllStocks(string keyword = "")
    {
        List<string> files = FileReader.GetFilesList(Path);

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
            string result = FileReader.ReadTxtFileByFileName(id, Path);

            string[] separator = { "\r\n" };

            string[] lines = result.Split(separator, StringSplitOptions.RemoveEmptyEntries);

            List<string> top100Lines = lines.ToList().Skip(Math.Max(0, lines.Count() - 100)).ToList();


            // Convert data to Stock Entities
            List<Stock> stocks = top100Lines.Select(e => StockTransformer.Convert(e)).ToList();

            return Json(stocks);

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

    public IActionResult TestTerminal() {
        _predictService.PredictStockById("VNINDEX");

        return Json("Done");
    }
}
