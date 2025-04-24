using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class VolumeProfileService : IVolumeProfileService
    {
        public VolumeProfileResult Calculate(IEnumerable<Bar> bars, int buckets = 100)
        {
            var allBars = bars.ToList();
            var min = allBars.Min(b => b.Low);
            var max = allBars.Max(b => b.High);
            var bucketSize = (max - min) / buckets;

            // aggregate volume per bucket
            var volumes = new long[buckets];
            foreach (var bar in allBars)
            {
                // split bar’s volume across buckets proportionally (approximate by close price)
                var idx = Math.Clamp((int)((bar.Close - min) / bucketSize), 0, buckets - 1);
                volumes[idx] += (long)bar.Volume;
            }

            var totalVol = volumes.Sum();
            var pocIndex = Array.IndexOf(volumes, volumes.Max());
            var pocPrice = min + pocIndex * bucketSize + bucketSize / 2;

            // find 68% VA around POC
            long cum = volumes[pocIndex];
            int lowIdx = pocIndex, hiIdx = pocIndex;
            while (cum < 0.68 * totalVol)
            {
                // expand toward higher side if volume there > lower
                var nextHi = hiIdx + 1 < buckets ? volumes[hiIdx + 1] : -1;
                var nextLo = lowIdx - 1 >= 0 ? volumes[lowIdx - 1] : -1;
                if (nextHi > nextLo) hiIdx++;
                else lowIdx--;
                cum += Math.Max(nextHi, nextLo);
            }

            return new VolumeProfileResult
            {
                HighPrice = max,
                LowPrice = min,
                PointOfControl = pocPrice,
                ValueAreaHigh = min + hiIdx * bucketSize,
                ValueAreaLow = min + lowIdx * bucketSize
            };
        }
    }
}
