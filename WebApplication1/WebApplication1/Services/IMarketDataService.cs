using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IMarketDataService
    {
        Task<IReadOnlyList<Bar>> GetLastNBarsAsync(string symbol, int count);
    }
}
