// Spoils System vs. Merit System — Comparing Federal Employment Eras
// CANVAS_HEIGHT: 600

let containerWidth;
let canvasWidth = 800;
let drawHeight = 560;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

const SPOILS = [
    { year: 1829, label: 'Jackson\'s "rotation in office"',
      detail: 'President Jackson defended replacing federal officeholders as a democratic principle: "To the victor belong the spoils." Mass turnover of postmasters, customs collectors, etc.',
      now: 'Set the model that turning federal jobs into political rewards was acceptable.' },
    { year: 1869, label: 'Patronage under Grant',
      detail: 'By the Grant administration, ~100,000+ patronage jobs existed. Cabinet positions and customs houses were openly traded for party loyalty and campaign contributions.',
      now: 'Demonstrated how spoils corrupted basic government functions.' },
    { year: 1881, label: 'Garfield assassination',
      detail: 'Disappointed office-seeker Charles Guiteau shot President James A. Garfield, who died 80 days later. Public outrage at the spoils system reached its peak.',
      now: 'The shock galvanized public support for civil service reform.' }
];

const MERIT = [
    { year: 1883, label: 'Pendleton Civil Service Act',
      detail: 'Created the Civil Service Commission. Initially classified ~10% of federal jobs as "merit" positions filled by competitive examination.',
      now: 'Foundational law of the modern federal workforce.' },
    { year: 1900, label: 'Merit system expansion',
      detail: 'Successive presidents extended merit coverage. By 1900, the merit system covered roughly 40% of federal civil service positions.',
      now: 'Established the principle that bureaucratic competence outweighs political loyalty.' },
    { year: 1939, label: 'Hatch Act',
      detail: 'Restricts political activity of federal employees: cannot use authority to influence elections; cannot run for partisan office while in covered jobs.',
      now: 'Insulates the day-to-day bureaucracy from political pressure.' },
    { year: 1978, label: 'Civil Service Reform Act',
      detail: 'Abolished the Civil Service Commission and created OPM (Office of Personnel Management) and MSPB (Merit Systems Protection Board). Created the Senior Executive Service.',
      now: 'Modern HR structure of the federal government.' }
];

const COMPARE = [
    { criterion: 'Hiring basis',          spoils: 'Political loyalty / patronage', merit: 'Competitive examination & qualifications' },
    { criterion: 'Job protection',         spoils: 'None — fired with each new administration', merit: 'Protected; fired only "for cause" with appeal rights' },
    { criterion: 'Dismissal grounds',     spoils: 'Disloyalty to ruling party',     merit: 'Misconduct or poor performance documented' },
    { criterion: 'Political activity',    spoils: 'Required (campaign work, kickbacks)', merit: 'Restricted (Hatch Act 1939)' },
    { criterion: 'Approx. % of fed jobs', spoils: '~90% before 1883',                merit: '~90% today (covered by some merit protection)' }
];

let selected = { side: 'spoils', idx: 0 };

function setup() {
    updateCanvasSize();
    const c = createCanvas(containerWidth, containerHeight);
    c.parent(document.querySelector('main'));
    textSize(13);
}

function draw() {
    updateCanvasSize();
    background(248, 249, 250);

    noStroke();
    fill(26, 58, 108);
    textSize(17);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Spoils System vs. Merit System — Federal Employment Eras', canvasWidth / 2, 6);
    textStyle(NORMAL);
    textSize(11);
    fill(73, 80, 87);
    text('Click any milestone (left = Spoils Era, right = Merit Era) to read details.',
         canvasWidth / 2, 28);

    // Two-column layout
    const colW = (canvasWidth - 30) / 2;
    const headerY = 50;
    const headerH = 30;

    // Spoils header (red)
    fill(220, 53, 69);
    rect(10, headerY, colW, headerH, 6);
    fill(255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(13);
    text('Spoils Era (1829–1883)', 10 + colW / 2, headerY + headerH / 2);

    // Merit header (green)
    fill(40, 167, 69);
    rect(20 + colW, headerY, colW, headerH, 6);
    fill(255);
    text('Merit Era (1883–present)', 20 + colW + colW / 2, headerY + headerH / 2);
    textStyle(NORMAL);

    // Cards under each header
    drawCards(SPOILS, 'spoils', 10, headerY + headerH + 10, colW, color(220, 53, 69));
    drawCards(MERIT, 'merit', 20 + colW, headerY + headerH + 10, colW, color(40, 167, 69));

    // Detail panel (mid)
    const detTop = headerY + headerH + 10 + Math.max(SPOILS.length, MERIT.length) * 60 + 10;
    const list = selected.side === 'spoils' ? SPOILS : MERIT;
    const item = list[selected.idx];
    fill(255);
    stroke(180);
    rect(10, detTop, canvasWidth - 20, 80, 6);
    noStroke();
    fill(selected.side === 'spoils' ? color(180, 30, 50) : color(20, 100, 40));
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(13);
    text(item.year + ' — ' + item.label, 18, detTop + 8);
    textStyle(NORMAL);
    fill(33, 37, 41);
    textSize(12);
    text(item.detail, 18, detTop + 28, canvasWidth - 36, 30);
    textStyle(ITALIC);
    fill(108, 117, 125);
    textSize(11);
    text('Why it matters: ' + item.now, 18, detTop + 60, canvasWidth - 36, 16);
    textStyle(NORMAL);

    // Comparison table
    const tableTop = detTop + 90;
    const tableH = drawHeight - tableTop - 10;
    if (tableH > 100) drawComparisonTable(10, tableTop, canvasWidth - 20, tableH);

    // Control region
    noStroke();
    fill(233, 236, 239);
    rect(0, drawHeight, canvasWidth, controlHeight);
    fill(50);
    textAlign(LEFT, TOP);
    textSize(11);
    text('Spoils → Merit transition driven by reform demand after the Garfield assassination (1881).',
         10, drawHeight + 14);
}

function drawCards(list, side, x, y, w, col) {
    list.forEach((item, i) => {
        const cy = y + i * 60;
        const isSel = (selected.side === side && selected.idx === i);
        fill(isSel ? col : color(255));
        stroke(col);
        strokeWeight(isSel ? 2 : 1);
        rect(x, cy, w, 50, 6);
        noStroke();
        // year badge
        fill(isSel ? 255 : col);
        textAlign(LEFT, TOP);
        textStyle(BOLD);
        textSize(13);
        text(item.year, x + 10, cy + 8);
        textStyle(NORMAL);
        fill(isSel ? 255 : color(33, 37, 41));
        textSize(11);
        text(item.label, x + 60, cy + 8, w - 70, 38);
        // icon
        textAlign(RIGHT, TOP);
        textSize(13);
        textStyle(BOLD);
        text(side === 'spoils' ? '⚠' : '✓', x + w - 10, cy + 8);
        textStyle(NORMAL);
        if (mouseIsPressed && _justClicked && mouseX >= x && mouseX <= x + w &&
            mouseY >= cy && mouseY <= cy + 50) {
            selected = { side, idx: i };
            _justClicked = false;
        }
    });
    strokeWeight(1);
}

function drawComparisonTable(x, y, w, h) {
    fill(255);
    stroke(180);
    rect(x, y, w, h, 6);
    noStroke();
    const colW1 = w * 0.34;
    const colW2 = (w - colW1) / 2;
    const headerH = 22;
    // Headers
    fill(26, 58, 108);
    rect(x, y, w, headerH, 6, 6, 0, 0);
    fill(255);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    textSize(11);
    text('Criterion', x + 8, y + headerH / 2);
    text('Spoils System', x + colW1 + 8, y + headerH / 2);
    text('Merit System', x + colW1 + colW2 + 8, y + headerH / 2);
    textStyle(NORMAL);

    const rowH = (h - headerH - 8) / COMPARE.length;
    for (let i = 0; i < COMPARE.length; i++) {
        const ry = y + headerH + i * rowH;
        if (i % 2 === 0) {
            fill(248, 249, 250);
            noStroke();
            rect(x + 1, ry, w - 2, rowH);
        }
        // dividers
        stroke(220);
        line(x + colW1, ry, x + colW1, ry + rowH);
        line(x + colW1 + colW2, ry, x + colW1 + colW2, ry + rowH);
        noStroke();
        fill(60);
        textAlign(LEFT, CENTER);
        textSize(10);
        textStyle(BOLD);
        text(COMPARE[i].criterion, x + 8, ry + rowH / 2);
        textStyle(NORMAL);
        fill(180, 30, 50);
        text(COMPARE[i].spoils, x + colW1 + 8, ry + rowH / 2, colW2 - 16);
        fill(20, 100, 40);
        text(COMPARE[i].merit,  x + colW1 + colW2 + 8, ry + rowH / 2, colW2 - 16);
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
