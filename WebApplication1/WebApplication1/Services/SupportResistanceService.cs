using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class SupportResistanceService : ISupportResistanceService
    {
        public decimal ComputeResistance(IEnumerable<Bar> bars)
        => bars.Max(b => b.High);

        public decimal ComputeSupport(IEnumerable<Bar> bars)
            => bars.Min(b => b.Low);
    }
}
