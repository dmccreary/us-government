// Three-Tier Federal Court Hierarchy
// CANVAS_HEIGHT: 620

let containerWidth;
let canvasWidth = 800;
let drawHeight = 580;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

const TIERS = [
    { id: 'sct', label: 'Supreme Court of the United States',
      count: '1 court, 9 justices',
      jurisdiction: 'Final appellate jurisdiction over federal questions; original jurisdiction in a narrow set of cases (e.g., disputes between states).',
      who: 'Chief Justice + 8 Associate Justices, lifetime appointed by President with Senate confirmation.',
      detail: 'Hears about 100-150 cases per year out of ~7,000-8,000 petitions for certiorari. Needs 4 votes to grant cert.' },
    { id: 'circ', label: 'U.S. Courts of Appeals (Circuit Courts)',
      count: '13 circuits',
      jurisdiction: 'Intermediate appellate jurisdiction. Hears appeals from district courts within their geographic circuit; the Federal Circuit hears specialized appeals (patents, etc.).',
      who: 'About 180 judges total, sit in panels of 3 (or en banc).',
      detail: '12 regional circuits cover all 50 states + DC + territories. 13th is the Federal Circuit (specialized).' },
    { id: 'dist', label: 'U.S. District Courts',
      count: '94 districts',
      jurisdiction: 'Trial-level federal jurisdiction. Original jurisdiction over federal questions and diversity cases.',
      who: 'About 670 district judges; cases tried before single judge with or without jury.',
      detail: 'Every state has at least one district. Larger states (CA, TX, NY) have four. Where most federal cases begin.' }
];

const STATE = {
    label: 'State Court System',
    detail: 'State Supreme Court rulings on federal/constitutional questions can be appealed directly to the U.S. Supreme Court (~5–10% of SCOTUS docket).'
};

const CIRCUITS = [
    { id: 'DC',  states: 'DC',                                              cx: 0.42, cy: 0.55 },
    { id: '1st', states: 'ME, MA, NH, RI, PR',                              cx: 0.86, cy: 0.18 },
    { id: '2nd', states: 'NY, CT, VT',                                      cx: 0.78, cy: 0.30 },
    { id: '3rd', states: 'PA, NJ, DE, VI',                                  cx: 0.74, cy: 0.45 },
    { id: '4th', states: 'MD, VA, WV, NC, SC',                              cx: 0.65, cy: 0.55 },
    { id: '5th', states: 'TX, LA, MS',                                      cx: 0.42, cy: 0.78 },
    { id: '6th', states: 'OH, MI, KY, TN',                                  cx: 0.55, cy: 0.42 },
    { id: '7th', states: 'IL, IN, WI',                                      cx: 0.45, cy: 0.42 },
    { id: '8th', states: 'MO, AR, IA, MN, NE, ND, SD',                      cx: 0.35, cy: 0.50 },
    { id: '9th', states: 'CA, OR, WA, AZ, NV, ID, MT, AK, HI, GU, MP',      cx: 0.10, cy: 0.45 },
    { id: '10th', states: 'CO, KS, NM, OK, UT, WY',                         cx: 0.25, cy: 0.55 },
    { id: '11th', states: 'AL, FL, GA',                                     cx: 0.62, cy: 0.78 },
    { id: 'Fed', states: 'Specialized (patents, trade, vet. claims)',       cx: 0.50, cy: 0.92 }
];

let selectedTier = 0;
let selectedCircuit = -1;
let traceMode = false;
let traceStep = 0; // 0=district, 1=circuit, 2=SCOTUS
let traceBtn, traceNext;

function setup() {
    updateCanvasSize();
    const c = createCanvas(containerWidth, containerHeight);
    c.parent(document.querySelector('main'));
    textSize(13);
    traceBtn = createButton('Trace a Case');
    traceBtn.position(10, drawHeight + 10);
    traceBtn.mousePressed(() => {
        traceMode = !traceMode;
        traceStep = 0;
        traceBtn.html(traceMode ? 'Exit Trace Mode' : 'Trace a Case');
    });
    traceNext = createButton('Next Step →');
    traceNext.position(140, drawHeight + 10);
    traceNext.mousePressed(() => {
        if (!traceMode) return;
        traceStep = (traceStep + 1) % 4; // 0..3 with 3 = ruling
    });
}

function draw() {
    updateCanvasSize();
    background(248, 249, 250);

    noStroke();
    fill(26, 58, 108);
    textSize(17);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('The Three Tiers of the Federal Court System', canvasWidth / 2, 6);
    textStyle(NORMAL);
    textSize(11);
    fill(73, 80, 87);
    text('Click any tier on the pyramid. Use "Trace a Case" to walk a case from district court to SCOTUS.',
         canvasWidth / 2, 28);

    // Layout: pyramid on the left, info panel on the right
    const leftW = canvasWidth * 0.55;
    const pyrTop = 60, pyrBottom = drawHeight - 220;
    const pyrCx = leftW / 2;
    const tierH = (pyrBottom - pyrTop) / 3 - 10;

    // Tier widths: top narrow (sct), middle wider (circ), bottom widest (dist)
    const tierWidths = [180, 320, 460];
    const tierColors = [color(106, 27, 154), color(13, 71, 161), color(46, 125, 50)];

    // Draw tiers (top to bottom)
    let tierRects = [];
    for (let i = 0; i < 3; i++) {
        const w = Math.min(tierWidths[i], leftW - 40);
        const ty = pyrTop + i * (tierH + 10);
        const tx = pyrCx - w / 2;
        tierRects.push({ x: tx, y: ty, w, h: tierH, idx: i });
        const isSel = selectedTier === i;
        fill(tierColors[i]);
        if (!isSel) fill(red(tierColors[i]), green(tierColors[i]), blue(tierColors[i]), 200);
        stroke(isSel ? 0 : 255);
        strokeWeight(isSel ? 2 : 1);
        rect(tx, ty, w, tierH, 8);
        noStroke();
        fill(255);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        textSize(13);
        text(TIERS[i].label, tx + w / 2, ty + tierH / 2 - 8);
        textStyle(NORMAL);
        textSize(11);
        text(TIERS[i].count, tx + w / 2, ty + tierH / 2 + 10);

        // Trace highlight
        if (traceMode && traceStep === (2 - i)) {
            // i=2 dist when traceStep=0; i=1 circ when traceStep=1; i=0 sct when traceStep=2
            stroke(255, 215, 0);
            strokeWeight(4);
            noFill();
            rect(tx - 4, ty - 4, w + 8, tierH + 8, 10);
        }
    }
    strokeWeight(1);

    // Draw upward "Appeal" arrows between tiers
    stroke(150);
    strokeWeight(2);
    for (let i = 1; i < 3; i++) {
        const top = tierRects[i - 1];
        const bot = tierRects[i];
        const x = pyrCx;
        line(x, bot.y, x, top.y + top.h);
        // Arrowhead pointing up
        noStroke();
        fill(150);
        triangle(x, top.y + top.h - 1, x - 6, top.y + top.h + 6, x + 6, top.y + top.h + 6);
        stroke(150);
        // Label "Appeal"
        noStroke();
        fill(80);
        textAlign(LEFT, CENTER);
        textSize(10);
        text('Appeal ↑', x + 10, (bot.y + top.y + top.h) / 2);
    }
    strokeWeight(1);

    // State court system box (right of pyramid)
    const stateX = leftW - 60;
    const stateY = pyrTop + 30;
    const stateW = 130;
    const stateH = 60;
    fill(255, 248, 220);
    stroke(193, 154, 0);
    strokeWeight(1);
    rect(stateX, stateY, stateW, stateH, 6);
    noStroke();
    fill(102, 77, 0);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(11);
    text('State Supreme Courts', stateX + stateW / 2, stateY + 6);
    textStyle(NORMAL);
    textSize(9);
    text('(federal questions only)', stateX + stateW / 2, stateY + 22);
    text('Direct appeal →', stateX + stateW / 2, stateY + 36);

    // Dotted arrow from state box to SCOTUS
    drawDashedLine(stateX, stateY + stateH / 2,
                   tierRects[0].x + tierRects[0].w, tierRects[0].y + tierRects[0].h / 2,
                   color(193, 154, 0));

    // Circuit map (right side, below info panel will overlap; instead embed below pyramid)
    const mapY = pyrBottom + 20;
    const mapH = 130;
    drawCircuitMap(20, mapY, leftW - 30, mapH);

    // Info panel on right
    const infoX = leftW + 10;
    const infoW = canvasWidth - infoX - 10;
    const infoTop = 60;
    const infoH = drawHeight - infoTop - 80;
    fill(255);
    stroke(180);
    rect(infoX, infoTop, infoW, infoH, 6);
    noStroke();

    if (selectedCircuit >= 0) {
        const cc = CIRCUITS[selectedCircuit];
        fill(13, 71, 161);
        textAlign(LEFT, TOP);
        textStyle(BOLD);
        textSize(14);
        text((cc.id === 'DC' || cc.id === 'Fed' ? cc.id : cc.id) + ' Circuit', infoX + 12, infoTop + 12);
        textStyle(NORMAL);
        fill(33, 37, 41);
        textSize(12);
        text('Coverage: ' + cc.states, infoX + 12, infoTop + 36, infoW - 24, 60);
        fill(108, 117, 125);
        textSize(11);
        text('Each circuit hears appeals from the U.S. District Courts in its geographic area.',
             infoX + 12, infoTop + 90, infoW - 24, 40);
    } else {
        const t = TIERS[selectedTier];
        fill(26, 58, 108);
        textAlign(LEFT, TOP);
        textStyle(BOLD);
        textSize(14);
        text(t.label, infoX + 12, infoTop + 12, infoW - 24);
        textStyle(NORMAL);
        fill(108, 117, 125);
        textSize(11);
        text(t.count, infoX + 12, infoTop + 50);
        fill(33, 37, 41);
        textSize(12);
        text('Jurisdiction: ' + t.jurisdiction, infoX + 12, infoTop + 70, infoW - 24, 90);
        text('Who decides: ' + t.who, infoX + 12, infoTop + 170, infoW - 24, 60);
        textStyle(ITALIC);
        fill(108, 117, 125);
        textSize(11);
        text(t.detail, infoX + 12, infoTop + 240, infoW - 24, 70);
        textStyle(NORMAL);
    }

    // Trace narration
    if (traceMode) {
        const ty = drawHeight - 70;
        fill(255, 248, 220);
        stroke(193, 154, 0);
        rect(infoX, ty, infoW, 60, 6);
        noStroke();
        fill(102, 77, 0);
        textAlign(LEFT, TOP);
        textStyle(BOLD);
        textSize(11);
        text('Tracing a Case (step ' + (traceStep + 1) + ' of 4)', infoX + 8, ty + 5);
        textStyle(NORMAL);
        const traceTxt = [
            'Step 1: Plaintiff files complaint in U.S. District Court. Trial held; judge or jury issues verdict.',
            'Step 2: Losing party appeals to the Circuit Court of Appeals. Three-judge panel reviews legal questions.',
            'Step 3: Circuit ruling appealed to the U.S. Supreme Court via petition for certiorari.',
            'Step 4: SCOTUS grants cert (4 votes), hears oral argument, and issues a final ruling that binds all federal courts.'
        ];
        text(traceTxt[traceStep], infoX + 8, ty + 22, infoW - 16, 38);
    }

    // Capture click on tier
    if (mouseIsPressed && _justClicked) {
        for (const r of tierRects) {
            if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) {
                selectedTier = r.idx;
                selectedCircuit = -1;
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
    text(traceMode
            ? 'Trace mode: click "Next Step →" to walk a case up the appellate ladder.'
            : 'Click a circuit dot below to highlight which states it covers.',
         260, drawHeight + 16);
}

function drawDashedLine(x1, y1, x2, y2, col) {
    stroke(col);
    strokeWeight(1.5);
    const segs = 12;
    for (let i = 0; i < segs; i++) {
        const t1 = i / segs, t2 = (i + 0.5) / segs;
        line(lerp(x1, x2, t1), lerp(y1, y2, t1),
             lerp(x1, x2, t2), lerp(y1, y2, t2));
    }
    strokeWeight(1);
    // Arrowhead
    const ang = Math.atan2(y2 - y1, x2 - x1);
    push();
    translate(x2, y2);
    rotate(ang);
    fill(col);
    noStroke();
    triangle(0, 0, -8, -4, -8, 4);
    pop();
}

function drawCircuitMap(x, y, w, h) {
    fill(255);
    stroke(180);
    rect(x, y, w, h, 6);
    noStroke();
    fill(50);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(11);
    text('U.S. Circuit Courts (click a dot)', x + 8, y + 6);
    textStyle(NORMAL);
    // Dots
    for (let i = 0; i < CIRCUITS.length; i++) {
        const cc = CIRCUITS[i];
        const dx = x + 12 + cc.cx * (w - 24);
        const dy = y + 24 + cc.cy * (h - 36);
        const isSel = selectedCircuit === i;
        fill(isSel ? color(13, 71, 161) : color(100, 149, 237));
        noStroke();
        circle(dx, dy, isSel ? 18 : 14);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(9);
        textStyle(BOLD);
        text(cc.id, dx, dy);
        textStyle(NORMAL);
        if (mouseIsPressed && _justClicked &&
            mouseX > dx - 9 && mouseX < dx + 9 && mouseY > dy - 9 && mouseY < dy + 9) {
            selectedCircuit = (selectedCircuit === i) ? -1 : i;
            _justClicked = false;
        }
    }
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
