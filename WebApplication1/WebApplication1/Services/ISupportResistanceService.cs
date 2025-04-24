using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface ISupportResistanceService
    {
        decimal ComputeResistance(IEnumerable<Bar> bars);
        decimal ComputeSupport(IEnumerable<Bar> bars);
    }
}
