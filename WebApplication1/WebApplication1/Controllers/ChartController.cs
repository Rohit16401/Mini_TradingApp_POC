using ChartJs.Blazor.Charts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Newtonsoft.Json;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
  
    public class ChartController : Controller
    {
        private readonly IMarketDataService _md;
        //private IAlpaVantageService _alpaVantageService;
        private readonly ISupportResistanceService _sr;
        private readonly IVolumeProfileService _vp;
        public ChartController(IMarketDataService md, ISupportResistanceService sr, IVolumeProfileService vp)
        {
            _md = md; 
            _sr = sr; 
            _vp = vp;
        }
        public async Task<IActionResult> Index(string symbol = "AAPL")
        {
            var bars = await _md.GetLastNBarsAsync(symbol, 200);
            var support = _sr.ComputeSupport(bars);
            var resistance = _sr.ComputeResistance(bars);
            var profile = _vp.Calculate(bars);
            ViewBag.Symbol  = symbol ;
            ViewBag.BarsJson = JsonConvert.SerializeObject(bars);
            ViewBag.Support = support;
            ViewBag.Resistance = resistance;
            ViewBag.Profile = JsonConvert.SerializeObject(profile);
            return View();
        }
    }
}
