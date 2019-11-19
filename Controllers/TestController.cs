using Microsoft.AspNetCore.Mvc;
using StockPredictor.Actions;
using StockPredictor.Library;

namespace StockPredictor.Controllers
{
    [ApiController]
    [Route("api/test/[action]")]
    public class TestController : Controller
    {
        public IActionResult ReadTxtFile() {
            return Json(FileReader.ReadTxtFile("https://www.w3.org/TR/PNG/iso_8859-1.txt"));
        }

        public IActionResult GetFiles() {
            return Json(FileReader.GetFilesList("/Users/nguyendanh/Projects/StockData"));
        }

        public IActionResult GetData() {
            return Json(null);
            // return Json(RenewDataAction.ReadNewData());
        }

        public IActionResult TestConvert()
        {
            return Json(StockTransformer.Convert("PLC,20070119,7.58,7.58,7.21,7.22,490"));
        }
    }
}