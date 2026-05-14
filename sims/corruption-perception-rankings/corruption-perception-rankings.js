// Corruption Perceptions Index Rankings - Horizontal Bar Chart
// CANVAS_HEIGHT: 820
// Source: Transparency International, Corruption Perceptions Index 2025
// https://www.transparency.org/en/cpi/2025

document.addEventListener('DOMContentLoaded', async function () {
    const response = await fetch('data.json');
    const json = await response.json();

    const highlight = json.highlightCountry;
    const labels = json.data.map(d => d.country);
    const scores = json.data.map(d => d.score);

    const HIGHLIGHT_COLOR = '#c0392b';
    const HIGHLIGHT_BORDER = '#7b241c';
    const DEFAULT_COLOR = 'rgba(58, 120, 194, 0.85)';
    const DEFAULT_BORDER = '#1f4e85';

    const backgroundColors = json.data.map(d =>
        d.country === highlight ? HIGHLIGHT_COLOR : DEFAULT_COLOR
    );
    const borderColors = json.data.map(d =>
        d.country === highlight ? HIGHLIGHT_BORDER : DEFAULT_BORDER
    );

    // Plugin: draw the score number at the end of each bar
    const valueLabelsPlugin = {
        id: 'valueLabels',
        afterDatasetsDraw(chart) {
            const { ctx } = chart;
            const meta = chart.getDatasetMeta(0);
            ctx.save();
            ctx.font = 'bold 11px Arial';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'left';
            meta.data.forEach((bar, i) => {
                const score = scores[i];
                const isHighlight = labels[i] === highlight;
                ctx.fillStyle = isHighlight ? HIGHLIGHT_BORDER : '#1f4e85';
                ctx.fillText(' ' + score, bar.x + 2, bar.y);
            });
            ctx.restore();
        }
    };

    const ctx = document.getElementById('cpiChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'CPI Score',
                data: scores,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1.5,
                borderRadius: 3,
                barPercentage: 0.85,
                categoryPercentage: 0.92
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { right: 30 } },
            plugins: {
                title: {
                    display: true,
                    text: `Corruption Perceptions Index ${json.year} — Western Democracies`,
                    font: { size: 15, weight: 'bold' },
                    color: '#1a1a2e',
                    padding: { top: 4, bottom: 12 }
                },
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(20, 40, 80, 0.92)',
                    titleFont: { size: 13, weight: 'bold' },
                    bodyFont: { size: 12 },
                    padding: 10,
                    callbacks: {
                        title: (items) => items[0].label,
                        label: (item) => {
                            const d = json.data[item.dataIndex];
                            return [
                                ` CPI Score: ${d.score} / 100`,
                                ` Global Rank: #${d.globalRank} of 182`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    min: 0,
                    max: 100,
                    title: {
                        display: true,
                        text: 'CPI Score (higher = less corrupt)',
                        font: { size: 12, weight: 'bold' },
                        color: '#444'
                    },
                    ticks: {
                        font: { size: 11 },
                        color: '#555',
                        stepSize: 10
                    },
                    grid: { color: 'rgba(0,0,0,0.07)' }
                },
                y: {
                    ticks: {
                        font: function(ctx) {
                            const lbl = ctx.tick && ctx.tick.label;
                            return {
                                size: 11,
                                weight: lbl === highlight ? 'bold' : 'normal'
                            };
                        },
                        color: function(ctx) {
                            const lbl = ctx.tick && ctx.tick.label;
                            return lbl === highlight ? HIGHLIGHT_BORDER : '#333';
                        }
                    },
                    grid: { display: false }
                }
            }
        },
        plugins: [valueLabelsPlugin]
    });
});
