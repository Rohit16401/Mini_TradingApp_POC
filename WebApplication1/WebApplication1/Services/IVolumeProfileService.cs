using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IVolumeProfileService
    {
        VolumeProfileResult Calculate(IEnumerable<Bar> bars, int buckets = 100);
    }
}
