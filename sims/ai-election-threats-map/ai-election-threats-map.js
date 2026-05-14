// AI Threats to Elections — Interactive Risk Matrix
// CANVAS_HEIGHT: 700

let containerWidth;
let canvasWidth = 800;
let drawHeight = 640;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let THREATS = [];
let VECTORS = [];
let CELLS = {};
let DEFENSES = [];
let WHAT_WORKS = [];

let dataReady = false;

fetch('data.json')
    .then(r => r.json())
    .then(d => {
        THREATS    = d.threats;
        VECTORS    = d.vectors;
        CELLS      = d.cells;
        DEFENSES   = d.defenses;
        WHAT_WORKS = d.whatWorks;
        dataReady  = true;
    });

let view = 'threat'; // 'threat' or 'defense'
let viewBtn;
let selectedThreat = null;
let selectedVector = null;
let selectedDefense = null;
let cellRects = [];

function setup() {
    updateCanvasSize();
    const c = createCanvas(containerWidth, containerHeight);
    c.parent(document.querySelector('main'));
    textSize(13);

    viewBtn = createButton('Switch to Defense View');
    viewBtn.position(10, drawHeight + 10);
    viewBtn.mousePressed(() => {
        view = (view === 'threat') ? 'defense' : 'threat';
        viewBtn.html(view === 'threat' ? 'Switch to Defense View' : 'Switch to Threat View');
        selectedThreat = selectedVector = selectedDefense = null;
    });
}

function draw() {
    updateCanvasSize();
    background(248, 249, 250);

    if (!dataReady) {
        fill(80);
        textAlign(CENTER, CENTER);
        textSize(14);
        text('Loading data…', canvasWidth / 2, canvasHeight / 2);
        return;
    }

    noStroke();
    fill(26, 58, 108);
    textSize(17);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('AI Threat Taxonomy for Elections', canvasWidth / 2, 6);
    textStyle(NORMAL);
    textSize(11);
    fill(73, 80, 87);
    text(view === 'threat'
            ? 'Click any cell to see the threat description, real example, detection difficulty, and countermeasures.'
            : 'Click any defense to highlight the threats it addresses.',
         canvasWidth / 2, 28);

    // Matrix area
    const mPad = 20;
    const mLeft = mPad;
    const mTop = 60;
    const mW = canvasWidth - mPad * 2;
    const mH = 230;
    const colW = mW / VECTORS.length;
    const rowH = mH / THREATS.length;

    // Column headers
    fill(26, 58, 108);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(11);
    for (let v = 0; v < VECTORS.length; v++) {
        text(VECTORS[v].label, mLeft + colW * v + colW / 2, mTop - 14);
    }
    textStyle(NORMAL);

    // Cells
    cellRects = [];
    for (let t = 0; t < THREATS.length; t++) {
        for (let v = 0; v < VECTORS.length; v++) {
            const x = mLeft + colW * v;
            const y = mTop + rowH * t;
            const key = THREATS[t].id + '|' + VECTORS[v].id;
            const cell = CELLS[key];
            const isSel = (selectedThreat === t && selectedVector === v);
            let bg;
            if (cell.difficulty === 'low')       bg = color(255, 100, 100);
            else if (cell.difficulty === 'med')  bg = color(255, 180, 80);
            else                                 bg = color(140, 200, 100);
            if (view === 'defense' && selectedDefense !== null) {
                const def = DEFENSES[selectedDefense];
                bg = def.addresses.includes(THREATS[t].id) ? color(40, 167, 69) : color(220, 220, 220);
            }
            fill(bg);
            stroke(isSel ? 0 : 255);
            strokeWeight(isSel ? 2 : 1);
            rect(x, y, colW - 2, rowH - 2, 4);
            noStroke();
            fill(60);
            textAlign(CENTER, TOP);
            textSize(9);
            textStyle(BOLD);
            text(THREATS[t].label, x + 4, y + (rowH / 2) - 10, colW - 8, rowH);
            textStyle(NORMAL);
            cellRects.push({ x, y, w: colW - 2, h: rowH - 2, t, v });
        }
    }
    strokeWeight(1);

    // Legend
    const legY = mTop + mH + 10;
    fill(50);
    textAlign(LEFT, CENTER);
    textSize(10);
    text('Detection difficulty:', 12, legY + 8);
    drawSwatch(140, legY, color(255, 100, 100), 'Low (easy to detect)');
    drawSwatch(280, legY, color(255, 180, 80), 'Medium');
    drawSwatch(380, legY, color(140, 200, 100), 'High (hard to detect)');

    // Defenses panel
    const defY = legY + 30;
    fill(255);
    stroke(180);
    rect(10, defY, canvasWidth - 20, drawHeight - defY - 100, 6);
    noStroke();
    fill(26, 58, 108);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(12);
    text(view === 'threat' ? 'Defenses (click to switch to Defense View)'
                           : 'Defenses (click one to highlight which threats it addresses):',
         18, defY + 6);
    textStyle(NORMAL);

    const defBtnW = (canvasWidth - 50) / DEFENSES.length;
    for (let i = 0; i < DEFENSES.length; i++) {
        const x = 18 + i * defBtnW;
        const y = defY + 26;
        const isSel = (view === 'defense' && selectedDefense === i);
        fill(isSel ? color(40, 167, 69) : color(220, 230, 245));
        stroke(40, 167, 69);
        rect(x, y, defBtnW - 6, 30, 5);
        noStroke();
        fill(isSel ? 255 : color(20, 100, 40));
        textAlign(CENTER, CENTER);
        textSize(11);
        textStyle(BOLD);
        text(DEFENSES[i].label, x + (defBtnW - 6) / 2, y + 15);
        textStyle(NORMAL);
        if (mouseIsPressed && _justClicked && mouseX >= x && mouseX <= x + defBtnW - 6 &&
            mouseY >= y && mouseY <= y + 30) {
            view = 'defense';
            viewBtn.html('Switch to Threat View');
            selectedDefense = (selectedDefense === i) ? null : i;
            _justClicked = false;
        }
    }

    // What Works panel
    const wwY = defY + 70;
    fill(102, 77, 0);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(11);
    text('What Works? — expert consensus on near-term defenses', 18, wwY);
    textStyle(NORMAL);
    fill(33, 37, 41);
    textSize(11);
    const wwLines = WHAT_WORKS.map((s, i) => `${i + 1}. ${s}`).join('\n');
    text(wwLines, 18, wwY + 16, canvasWidth - 36, 90);

    // Detail panel (cell selected)
    if (selectedThreat !== null && selectedVector !== null) {
        const cell = CELLS[THREATS[selectedThreat].id + '|' + VECTORS[selectedVector].id];
        const dy = drawHeight - 100;
        fill(255, 248, 220);
        stroke(193, 154, 0);
        rect(10, dy, canvasWidth - 20, 90, 6);
        noStroke();
        fill(102, 77, 0);
        textAlign(LEFT, TOP);
        textStyle(BOLD);
        textSize(12);
        text(THREATS[selectedThreat].label + ' via ' + VECTORS[selectedVector].label, 18, dy + 6);
        textStyle(NORMAL);
        fill(33, 37, 41);
        textSize(11);
        text(THREATS[selectedThreat].desc, 18, dy + 22, canvasWidth - 36, 24);
        textStyle(BOLD);
        text('Example: ', 18, dy + 48);
        textStyle(NORMAL);
        text(cell.example, 76, dy + 48, canvasWidth - 94, 24);
        textStyle(BOLD);
        text('Counter:  ', 18, dy + 74);
        textStyle(NORMAL);
        text(cell.counter, 76, dy + 74, canvasWidth - 94, 24);
    }

    // Capture click on cell
    if (mouseIsPressed && _justClicked) {
        for (const r of cellRects) {
            if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) {
                selectedThreat = r.t;
                selectedVector = r.v;
                _justClicked = false;
                break;
            }
        }
    }

    // Control region
    noStroke();
    fill(233, 236, 239);
    rect(0, drawHeight, canvasWidth, controlHeight);
    fill(50);
    textAlign(LEFT, TOP);
    textSize(11);
    text('Current view: ' + (view === 'threat' ? 'Threat (click matrix cells)' : 'Defense (click defense buttons)'),
         200, drawHeight + 18);
}

function drawSwatch(x, y, col, label) {
    fill(col); noStroke(); rect(x, y + 1, 14, 14, 3);
    fill(50);
    textAlign(LEFT, CENTER);
    textSize(10);
    text(label, x + 18, y + 8);
}

let _justClicked = false;
function mousePressed() { _justClicked = true; }

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
