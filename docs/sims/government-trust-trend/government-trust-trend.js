// Government Trust Trend - Chart.js Line Chart
// CANVAS_HEIGHT: 560
// Source: Pew Research Center, "Public Trust in Government: 1958–2025"
// https://www.pewresearch.org/politics/2025/12/04/public-trust-in-government-1958-2025/

document.addEventListener('DOMContentLoaded', async function () {
    const response = await fetch('data.json');
    const json = await response.json();

    const years  = json.data.map(d => d.year);
    const trusts = json.data.map(d => d.trust);
    const events = json.events;

    // Build events legend
    const legendEl = document.getElementById('events-legend');
    events.forEach(ev => {
        const item = document.createElement('div');
        item.className = 'event-item';
        item.title = ev.description;
        const dot = document.createElement('div');
        dot.className = 'event-dot';
        dot.style.background = ev.color;
        const label = document.createElement('span');
        label.textContent = `${ev.year}: ${ev.label}`;
        item.appendChild(dot);
        item.appendChild(label);
        legendEl.appendChild(item);
    });

    // Helper: convert "#rrggbb" hex to "rgba(r,g,b,a)" string
    function hexToRgba(hex, alpha) {
        const h = hex.replace('#', '');
        const r = parseInt(h.substring(0, 2), 16);
        const g = parseInt(h.substring(2, 4), 16);
        const b = parseInt(h.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // Plugin: paint colored era backgrounds. Each event's color extends from
    // its year to the next event's year (or to the end of the data).
    // Uses dataset meta positions (always populated by draw time) instead of
    // scale.getPixelForValue, which can be unreliable on category scales.
    const eraBackgroundsPlugin = {
        id: 'eraBackgrounds',
        beforeDatasetsDraw(chart) {
            const { ctx, chartArea } = chart;
            const meta = chart.getDatasetMeta(0);
            if (!meta || !meta.data || meta.data.length === 0) return;
            const lastIdx = meta.data.length - 1;

            ctx.save();
            events.forEach((ev, i) => {
                const startIdx = years.indexOf(ev.year);
                if (startIdx < 0) return;
                const nextEv = events[i + 1];
                const endIdx = nextEv ? years.indexOf(nextEv.year) : lastIdx;
                if (endIdx < 0) return;

                const xStart = meta.data[startIdx].x;
                const xEnd   = meta.data[endIdx].x;
                ctx.fillStyle = hexToRgba(ev.color, 0.22);
                ctx.fillRect(
                    xStart,
                    chartArea.top,
                    xEnd - xStart,
                    chartArea.bottom - chartArea.top
                );
            });
            ctx.restore();
        }
    };

    // Plugin: draws vertical dashed lines marking each era transition
    const eventLinesPlugin = {
        id: 'eventLines',
        afterDatasetsDraw(chart) {
            const { ctx, scales: { x, y } } = chart;
            ctx.save();
            events.forEach(ev => {
                const xPos = x.getPixelForValue(ev.year);
                if (xPos < x.left || xPos > x.right) return;

                // Dashed vertical line
                ctx.beginPath();
                ctx.setLineDash([5, 4]);
                ctx.strokeStyle = ev.color;
                ctx.lineWidth = 1.8;
                ctx.moveTo(xPos, y.top);
                ctx.lineTo(xPos, y.bottom);
                ctx.stroke();
                ctx.setLineDash([]);

                // Small triangle marker at top of line
                ctx.fillStyle = ev.color;
                ctx.beginPath();
                ctx.moveTo(xPos, y.top + 2);
                ctx.lineTo(xPos - 5, y.top + 11);
                ctx.lineTo(xPos + 5, y.top + 11);
                ctx.closePath();
                ctx.fill();
            });
            ctx.restore();
        }
    };

    const ctx = document.getElementById('trustChart').getContext('2d');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: '% Trusting Government',
                data: trusts,
                borderColor: '#1a3a6b',
                backgroundColor: 'rgba(26, 58, 107, 0.06)',
                borderWidth: 2.5,
                fill: true,
                tension: 0.3,
                pointRadius: 3.5,
                pointHoverRadius: 7,
                pointBackgroundColor: '#1a3a6b',
                pointBorderColor: '#fff',
                pointBorderWidth: 1.5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Public Trust in the U.S. Federal Government (1958–2025)',
                    font: { size: 15, weight: 'bold' },
                    color: '#1a1a2e',
                    padding: { top: 6, bottom: 16 }
                },
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(20, 40, 80, 0.92)',
                    titleFont: { size: 13, weight: 'bold' },
                    bodyFont: { size: 12 },
                    padding: 10,
                    callbacks: {
                        title: (items) => `Year: ${items[0].label}`,
                        label: (item) => ` Trust: ${item.parsed.y}%`,
                        afterLabel: (item) => {
                            const year = item.label;
                            const ev = events.find(e => String(e.year) === String(year));
                            return ev ? ` ← ${ev.label}` : '';
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'category',
                    title: {
                        display: true,
                        text: 'Year',
                        font: { size: 12, weight: 'bold' },
                        color: '#444'
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                        font: { size: 10 },
                        color: '#555',
                        // Show roughly every 5 years to avoid crowding
                        callback: function(val, index) {
                            const year = this.getLabelForValue(val);
                            return year % 5 === 0 ? year : '';
                        }
                    },
                    grid: { color: 'rgba(0,0,0,0.06)' }
                },
                y: {
                    min: 0,
                    max: 100,
                    title: {
                        display: true,
                        text: '% Saying "Just About Always" or "Most of the Time"',
                        font: { size: 11 },
                        color: '#444'
                    },
                    ticks: {
                        callback: (v) => v + '%',
                        font: { size: 11 },
                        color: '#555',
                        stepSize: 10
                    },
                    grid: { color: 'rgba(0,0,0,0.07)' }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            }
        },
        plugins: [eraBackgroundsPlugin, eventLinesPlugin]
    });
});
