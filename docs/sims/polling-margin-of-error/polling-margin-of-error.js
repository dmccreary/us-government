// Polling — Margin of Error MicroSim
// CANVAS_HEIGHT: 470

let containerWidth;
let canvasWidth = 800;
let drawHeight = 380;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let sampleSlider, supportSlider;

function setup() {
    updateCanvasSize();
    const c = createCanvas(containerWidth, containerHeight);
    c.parent(document.querySelector('main'));
    textSize(13);

    sampleSlider = createSlider(100, 5000, 1000, 50);
    sampleSlider.position(200, drawHeight + 12);
    sampleSlider.size(canvasWidth - 240);

    supportSlider = createSlider(40, 60, 52, 1);
    supportSlider.position(200, drawHeight + 50);
    supportSlider.size(canvasWidth - 240);
}

function draw() {
    updateCanvasSize();
    background(248, 249, 250);

    const n = sampleSlider.value();
    const a = supportSlider.value();
    const b = 100 - a;
    // Approximate margin of error: 1/sqrt(n) * 100
    const moe = 100 / Math.sqrt(n);
    const aLow = a - moe, aHigh = a + moe;
    const bLow = b - moe, bHigh = b + moe;
    const overlaps = !(aLow > bHigh || bLow > aHigh);

    // Title
    noStroke();
    fill(26, 58, 108);
    textSize(17);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Polling — Margin of Error', canvasWidth / 2, 6);
    textStyle(NORMAL);
    textSize(11);
    fill(73, 80, 87);
    text('Adjust the sliders. Watch how sample size and the gap between candidates affect whether the lead is real.',
         canvasWidth / 2, 28);

    // Bar chart
    const cx = 60;
    const cy = 70;
    const cw = canvasWidth - 80;
    const ch = drawHeight - cy - 100;

    // Y axis labels
    fill(80);
    textAlign(RIGHT, CENTER);
    textSize(10);
    for (let p = 0; p <= 100; p += 10) {
        const y = cy + ch - (p / 100) * ch;
        text(p + '%', cx - 6, y);
        stroke(220);
        line(cx, y, cx + cw, y);
        noStroke();
    }

    // Bars
    const barW = cw * 0.30;
    const gapX = cw * 0.20;
    const aX = cx + gapX;
    const bX = cx + gapX + barW + cw * 0.10;

    drawBar('Candidate A', a, aLow, aHigh, aX, cy, barW, ch, color(33, 100, 200));
    drawBar('Candidate B', b, bLow, bHigh, bX, cy, barW, ch, color(200, 50, 50));

    // Verdict
    const verdY = cy + ch + 20;
    if (overlaps) {
        fill(255, 248, 220);
        stroke(193, 154, 0);
        rect(cx, verdY, cw, 30, 6);
        noStroke();
        fill(180, 100, 0);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        textSize(13);
        text('STATISTICAL TIE — confidence intervals overlap, no clear winner.',
             cx + cw / 2, verdY + 15);
    } else {
        fill(232, 245, 232);
        stroke(40, 167, 69);
        rect(cx, verdY, cw, 30, 6);
        noStroke();
        fill(20, 100, 40);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        textSize(13);
        const winner = a > b ? 'A' : 'B';
        text('CLEAR LEAD — Candidate ' + winner + ' is statistically ahead (intervals do not overlap).',
             cx + cw / 2, verdY + 15);
    }
    textStyle(NORMAL);

    // MOE formula
    fill(50);
    textAlign(LEFT, TOP);
    textSize(11);
    text('Margin of Error ≈ 1 / √(n) × 100% = ' + moe.toFixed(1) + '%   (n = ' + n + ')',
         cx, verdY + 38);

    // Control region
    noStroke();
    fill(233, 236, 239);
    rect(0, drawHeight, canvasWidth, controlHeight);
    fill(50);
    textAlign(LEFT, CENTER);
    textSize(12);
    text('Sample size:  ' + n, 10, drawHeight + 22);
    text('Cand. A support:  ' + a + '%   |   B: ' + b + '%', 10, drawHeight + 60);
}

function drawBar(name, pct, lo, hi, x, top, w, h, col) {
    const barH = (pct / 100) * h;
    const yTop = top + h - barH;
    fill(col);
    noStroke();
    rect(x, yTop, w, barH);
    // Error bar
    const yLo = top + h - (lo / 100) * h;
    const yHi = top + h - (hi / 100) * h;
    stroke(0);
    strokeWeight(2);
    line(x + w / 2, yHi, x + w / 2, yLo);
    line(x + w / 2 - 8, yHi, x + w / 2 + 8, yHi);
    line(x + w / 2 - 8, yLo, x + w / 2 + 8, yLo);
    strokeWeight(1);
    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(13);
    if (barH > 24) text(pct.toFixed(0) + '%', x + w / 2, yTop + 14);
    textStyle(NORMAL);
    fill(50);
    textAlign(CENTER, TOP);
    textSize(12);
    text(name, x + w / 2, top + h + 4);
    textSize(10);
    text('range: ' + lo.toFixed(1) + '% – ' + hi.toFixed(1) + '%', x + w / 2, top + h + 18);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    sampleSlider.size(canvasWidth - 240);
    supportSlider.size(canvasWidth - 240);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
