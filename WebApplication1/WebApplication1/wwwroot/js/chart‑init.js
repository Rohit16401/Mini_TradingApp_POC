function initChart(canvasId, bars, { support, resistance, profile }) {
    console.log("bars :- ", bars[0].Time);
    console.log("support :- ", support);
    console.log("resistance :- ", resistance);
    console.log("profile :- ", profile);

    const ctx = document.getElementById(canvasId).getContext("2d");

    new Chart(ctx, {
        type: "candlestick",
        data: {
            datasets: [
                {
                    label: "Price",
                    data: bars.map(b => ({
                        x: new Date(b.Time),
                        o: b.Open, h: b.High, l: b.Low, c: b.Close
                    })),
                    barThickness: 4  // Adjust for visibility
                },
                {
                    label: "Support",
                    type: "line",
                    data: bars.map(b => ({ x: new Date(b.Time), y: support })),
                    borderColor: "green", borderWidth: 2, fill: false
                },
                {
                    label: "Resistance",
                    type: "line",
                    data: bars.map(b => ({ x: new Date(b.Time), y: resistance })),
                    borderColor: "red", borderWidth: 2, fill: false
                },
                {
                    label: "High",
                    type: "line",
                    data: bars.map(b => ({ x: new Date(b.Time), y: profile.HighPrice })),
                    borderColor: "pink", fill: false
                },
                {
                    label: "Low",
                    type: "line",
                    data: bars.map(b => ({ x: new Date(b.Time), y: profile.LowPrice })),
                    borderColor: "grey", fill: false
                },
                {
                    label: "POC",
                    type: "line",
                    data: bars.map(b => ({ x: new Date(b.Time), y: profile.PointOfControl })),
                    borderColor: "purple", fill: false
                },
                {
                    label: "VAH",
                    type: "line",
                    data: bars.map(b => ({ x: new Date(b.Time), y: profile.ValueAreaHigh })),
                    borderColor: "orange", fill: false
                },
                {
                    label: "VAL",
                    type: "line",
                    data: bars.map(b => ({ x: new Date(b.Time), y: profile.ValueAreaLow })),
                    borderColor: "orange", fill: false
                }
            ]
        },
        options: {
            plugins: {
                tooltip: {
                    mode: 'nearest',
                    intersect: false,
                    position: 'nearest',
                    callbacks: {
                        label: function (context) {
                            const data = context.raw;
                            const datasetLabel = context.dataset.label;

                            if (data && data.o !== undefined) {
                                return [
                                    `Time: ${new Date(data.x).toLocaleString()}`,
                                    `Open: ${data.o}`,
                                    `High: ${data.h}`,
                                    `Low: ${data.l}`,
                                    `Close: ${data.c}`
                                ];
                            }

                            if (context.parsed && context.parsed.y !== undefined) {
                                return `${datasetLabel}: ${context.parsed.y}`;
                            }

                            return datasetLabel;
                        }
                    }
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        boxWidth: 12,
                        usePointStyle: true
                    }
                },
                zoom: {
                    pan: {
                        enabled: true, // Keep panning enabled
                        mode: 'x',     // Only allow panning on the X-axis
                    },
                    zoom: {
                        wheel: { enabled: false },  // Disable zooming with mouse wheel
                        pinch: { enabled: false },  // Disable pinch zooming
                        drag: {
                            enabled: false,  // Disable drag zooming
                        },
                        mode: 'x'  // Restrict zooming to the X-axis (but we are disabling zoom here)
                    },
                    limits: {
                        x: { minRange: 1 },  // Prevent zooming in too far on X-axis
                    },
                    onZoomComplete({ chart }) {
                        const minTime = chart.scales.x.min;  // Get the min value of X-axis after zoom
                        const maxTime = chart.scales.x.max;  // Get the max value of X-axis after zoom

                        // Filter the bars (candles) within the visible range
                        const visibleBars = chart.data.datasets[0].data.filter(bar =>
                            new Date(bar.x) >= minTime && new Date(bar.x) <= maxTime
                        );

                        // Get the high and low values from the visible bars
                        const highs = visibleBars.map(b => b.h);
                        const lows = visibleBars.map(b => b.l);

                        // Find the highest and lowest points in the selected range
                        const highInRange = Math.max(...highs);
                        const lowInRange = Math.min(...lows);

                        // Log information for debugging
                        console.log("Selected range High:", highInRange);
                        console.log("Selected range Low:", lowInRange);

                        // Adding the background color to the selected range
                        chart.options.plugins.annotation.annotations.push({
                            type: 'box',  // Annotation type 'box' for the background color
                            xMin: minTime,  // Minimum X value for the selected range
                            xMax: maxTime,  // Maximum X value for the selected range
                            yMin: lowInRange,  // Minimum Y value (Low)
                            yMax: highInRange,  // Maximum Y value (High)
                            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Background color (adjust as needed)
                            borderColor: 'rgba(0, 0, 0, 0.5)',  // Optional border color
                            borderWidth: 1,  // Border width for the selection box
                        });

                        // Update the chart to reflect the changes
                        chart.update();
                    }
                }

            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour',
                        displayFormats: {
                            hour: 'HH:mm',
                            day: 'MMM dd'
                        }
                    },
                    ticks: {
                        autoSkip: true,
                        maxRotation: 0,
                        minRotation: 0,
                        color: '#555',
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(200, 200, 200, 0.2)',
                        drawTicks: true
                    },
                    title: {
                        display: true,
                        text: 'Time',
                        color: '#333',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: value => value.toFixed(2),
                        stepSize: 1,
                        color: '#555',
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(200, 200, 200, 0.2)',
                        borderColor: '#ccc',
                        drawTicks: true
                    },
                    title: {
                        display: true,
                        text: 'Price',
                        color: '#333',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            },
            onClick: (evt, elements, chart) => {
                if (elements.length && elements[0].datasetIndex > 0) {
                    openIndicatorSettings(chart.data.datasets[elements[0].datasetIndex].label);
                }
            }
        }
    });


}

function openIndicatorSettings(indicatorName) {
    const pane = document.getElementById("settingsPane");
    if (!pane) return;
    pane.style.display = "block";
    pane.querySelector(".title").innerText = indicatorName + " Settings";
}





