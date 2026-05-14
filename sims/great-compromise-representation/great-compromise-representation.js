// Great Compromise — Representation in House vs. Senate
// CANVAS_HEIGHT: 620

let containerWidth;
let canvasWidth = 800;
let drawHeight = 510;
let controlHeight = 110;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

const houseStates = [
    { name: 'CA', full: 'California',     pop: 39.0, seats: 52 },
    { name: 'TX', full: 'Texas',          pop: 30.5, seats: 38 },
    { name: 'FL', full: 'Florida',        pop: 22.6, seats: 28 },
    { name: 'NY', full: 'New York',       pop: 19.5, seats: 26 },
    { name: 'WY', full: 'Wyoming',        pop: 0.58, seats: 1 },
    { name: 'VT', full: 'Vermont',        pop: 0.65, seats: 1 },
    { name: 'AK', full: 'Alaska',         pop: 0.73, seats: 1 },
    { name: 'SD', full: 'South Dakota',   pop: 0.91, seats: 1 },
    { name: 'ND', full: 'North Dakota',   pop: 0.78, seats: 1 },
    { name: 'RI', full: 'Rhode Island',   pop: 1.10, seats: 2 }
];

const TOTAL_POP = 333;
const TOTAL_HOUSE = 435;
const PEOPLE_PER_SEAT = TOTAL_POP / TOTAL_HOUSE;

let popSlider;
let showWhy = false;
let whyBtn;
let selectedState = null;
let selectedSenateState = null;

const stateCodes = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
                    'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
                    'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
                    'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
                    'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

function setup() {
    updateCanvasSize();
    const c = createCanvas(containerWidth, containerHeight);
    c.parent(document.querySelector('main'));
    textSize(14);

    popSlider = createSlider(100, 40000, 5000, 100);
    popSlider.position(160, drawHeight + 50);
    popSlider.size(canvasWidth - 200);

    whyBtn = createButton('Show "Why This Still Matters"');
    whyBtn.position(10, drawHeight + 78);
    whyBtn.mousePressed(() => {
        showWhy = !showWhy;
        whyBtn.html(showWhy ? 'Hide "Why This Still Matters"' : 'Show "Why This Still Matters"');
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
    text('The Great Compromise — Two Chambers, Two Theories of Representation', canvasWidth / 2, 8);
    textStyle(NORMAL);
    textSize(11);
    fill(73, 80, 87);
    text('Drag the slider — watch how population reshapes House seats while Senate seats never change. Click any bar or dot-pair for details.', canvasWidth / 2, 30);

    const panelTop = 50;
    const panelHeight = drawHeight - panelTop - 10;
    const colW = (canvasWidth - 30) / 2;
    const popVal = popSlider.value();

    drawHousePanel(10, panelTop, colW, panelHeight, popVal);
    drawSenatePanel(20 + colW, panelTop, colW, panelHeight, popVal);

    // Slider readout
    const popM = popVal / 1000;
    const estSeats = Math.max(1, Math.round(popM / PEOPLE_PER_SEAT));
    fill(50);
    textAlign(LEFT, CENTER);
    textSize(12);
    text('Your hypothetical state:', 10, drawHeight + 20);
    fill(0, 140, 65);
    textStyle(BOLD);
    text(formatPop(popVal) + '  →  House: ' + estSeats + (estSeats === 1 ? ' seat' : ' seats') +
         '   |   Senate: always 2 seats', 185, drawHeight + 20);
    textStyle(NORMAL);

    // Why It Matters band
    if (showWhy) {
        fill(255, 248, 220);
        stroke(193, 154, 0);
        rect(10, drawHeight - 100, canvasWidth - 20, 90, 6);
        noStroke();
        fill(102, 77, 0);
        textAlign(LEFT, TOP);
        textSize(11);
        textStyle(BOLD);
        text('Why This Still Matters', 18, drawHeight - 95);
        textStyle(NORMAL);
        text('A senator from Wyoming represents ~290,000 people. A senator from California represents ~19.5 million ' +
             '— a 67× difference. AP FRQ 4 often asks students to evaluate whether equal Senate representation ' +
             'remains a fair price for the small-state buy-in to the Constitution. Both views are defensible.',
             18, drawHeight - 78, canvasWidth - 36, 70);
    }

    // Control region background
    noStroke();
    fill(233, 236, 239);
    rect(0, drawHeight, canvasWidth, controlHeight);
    fill(50);
    textAlign(LEFT, TOP);
    textSize(11);
    text('Drag slider — your hypothetical state population:', 10, drawHeight + 38);
    text('Scale: 100,000 (left)  →  40,000,000 (right)', 10, drawHeight + 70);
}

function drawHousePanel(x, y, w, h, hypoPop) {
    fill(255, 244, 230);
    stroke(255, 152, 0);
    rect(x, y, w, h, 8);
    noStroke();
    fill(196, 89, 0);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(13);
    text('House of Representatives', x + w / 2, y + 6);
    textStyle(NORMAL);
    textSize(10);
    fill(110, 60, 0);
    text('Seats proportional to population (435 total).', x + w / 2, y + 22);

    const chartTop = y + 42;
    const chartH = h - 100;
    const innerLeft = x + 50;
    const innerRight = x + w - 16;
    const chartW = innerRight - innerLeft;

    const hypoSeats = Math.max(1, Math.round((hypoPop / 1000) / PEOPLE_PER_SEAT));
    const maxSeats = Math.max(Math.max(...houseStates.map(s => s.seats)), hypoSeats);
    const totalBars = houseStates.length + 1;
    const barH = (chartH - 20) / totalBars - 2;

    textAlign(LEFT, CENTER);
    textSize(10);

    for (let i = 0; i < houseStates.length; i++) {
        const s = houseStates[i];
        const by = chartTop + i * (barH + 2);
        fill(60);
        text(s.name, x + 10, by + barH / 2);
        const bw = (s.seats / maxSeats) * (chartW - 30);
        const isSel = selectedState === s.name;
        fill(isSel ? color(196, 89, 0) : color(255, 152, 0));
        noStroke();
        rect(innerLeft, by, bw, barH, 3);
        fill(60);
        textAlign(LEFT, CENTER);
        text(s.seats, innerLeft + bw + 4, by + barH / 2);
        if (mouseIsPressed && mouseX >= innerLeft && mouseX <= innerRight &&
            mouseY >= by && mouseY <= by + barH && _justClicked) {
            selectedState = s.name;
            selectedSenateState = null;
            _justClicked = false;
        }
    }

    // "You" bar — grows and shrinks with the slider
    const hypoBy = chartTop + houseStates.length * (barH + 2);
    stroke(160, 200, 160);
    strokeWeight(0.5);
    line(x + 8, hypoBy - 1, x + w - 8, hypoBy - 1);
    strokeWeight(1);
    noStroke();
    fill(0, 120, 55);
    textAlign(LEFT, CENTER);
    textSize(10);
    text('You', x + 10, hypoBy + barH / 2);
    const hypoBw = Math.max(4, (hypoSeats / maxSeats) * (chartW - 30));
    fill(0, 180, 90);
    noStroke();
    rect(innerLeft, hypoBy, hypoBw, barH, 3);
    fill(0, 100, 45);
    textAlign(LEFT, CENTER);
    text(hypoSeats + (hypoSeats === 1 ? ' seat' : ' seats'), innerLeft + hypoBw + 4, hypoBy + barH / 2);

    // Detail box
    const det = selectedState ? houseStates.find(s => s.name === selectedState) : null;
    fill(255);
    stroke(255, 152, 0);
    rect(x + 8, y + h - 52, w - 16, 44, 4);
    noStroke();
    fill(110, 60, 0);
    textAlign(LEFT, TOP);
    textSize(10);
    if (det) {
        text(det.full + ': ' + det.pop.toFixed(2) + 'M people, ' + det.seats + ' House seats' +
             '   (~' + ((det.pop * 1000) / det.seats).toFixed(0) + 'K people per representative)',
             x + 14, y + h - 48, w - 28, 40);
    } else {
        text('Click a bar to see the state\'s population and seat count.', x + 14, y + h - 48, w - 28, 40);
    }
}

function drawSenatePanel(x, y, w, h, hypoPop) {
    fill(232, 240, 254);
    stroke(13, 71, 161);
    rect(x, y, w, h, 8);
    noStroke();
    fill(13, 71, 161);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(13);
    text('Senate', x + w / 2, y + 6);
    textStyle(NORMAL);
    textSize(10);
    fill(13, 71, 161);
    text('Two senators per state — equal regardless of population.', x + w / 2, y + 22);

    // gridH shrunk to carve out room for the "You" row above the detail box
    const gridTop = y + 42;
    const gridH = h - 150;
    const hypoRowTop = y + h - 104;
    const innerW = w - 24;
    const cols = 10, rows = 5;
    const colSpace = innerW / cols;
    const rowSpace = (gridH - 10) / rows;
    const dotR = Math.min(colSpace, rowSpace) * 0.30;

    for (let i = 0; i < stateCodes.length; i++) {
        const code = stateCodes[i];
        const c = i % cols, r = Math.floor(i / cols);
        const cx = x + 12 + colSpace / 2 + c * colSpace;
        const cy = gridTop + rowSpace / 2 + r * rowSpace;
        const isSel = selectedSenateState === code;
        for (let k = 0; k < 2; k++) {
            const dx2 = (k === 0) ? -dotR * 0.8 : dotR * 0.8;
            fill(isSel ? color(13, 71, 161) : color(100, 149, 237));
            noStroke();
            circle(cx + dx2, cy, dotR * 1.4);
        }
        fill(20);
        textAlign(CENTER, TOP);
        textSize(9);
        text(code, cx, cy + dotR + 1);
        if (mouseIsPressed && _justClicked) {
            const d = dist(mouseX, mouseY, cx, cy);
            if (d < dotR * 2) {
                selectedSenateState = code;
                selectedState = null;
                _justClicked = false;
            }
        }
    }

    // "You" row — always 2 green dots regardless of slider position
    stroke(160, 190, 240);
    strokeWeight(0.5);
    line(x + 12, hypoRowTop, x + w - 12, hypoRowTop);
    strokeWeight(1);
    noStroke();

    const hypoCY = hypoRowTop + 20;
    fill(0, 110, 55);
    textAlign(LEFT, CENTER);
    textSize(10);
    text('You:', x + 14, hypoCY);

    const dotCX = x + 14 + 34;
    for (let k = 0; k < 2; k++) {
        const dx2 = (k === 0) ? -dotR * 0.8 : dotR * 0.8;
        fill(0, 180, 90);
        noStroke();
        circle(dotCX + dx2, hypoCY, dotR * 1.4);
    }

    fill(0, 100, 45);
    textAlign(LEFT, CENTER);
    textSize(9);
    text('= 2 senators — same as every other state, no matter the population',
         dotCX + dotR * 1.4 + 4, hypoCY);

    // Detail box
    fill(255);
    stroke(13, 71, 161);
    rect(x + 8, y + h - 52, w - 16, 44, 4);
    noStroke();
    fill(13, 71, 161);
    textAlign(LEFT, TOP);
    textSize(10);
    if (selectedSenateState) {
        text('Every state — including ' + selectedSenateState + ' — sends exactly 2 senators. ' +
             'Wyoming (~290K) and California (~39M) each have 2.',
             x + 14, y + h - 48, w - 28, 40);
    } else {
        text('Click a state\'s dot-pair to see its senator count.', x + 14, y + h - 48, w - 28, 40);
    }
}

let _justClicked = false;
function mousePressed() { _justClicked = true; }

function formatPop(thousands) {
    if (thousands >= 1000) return (thousands / 1000).toFixed(2) + 'M';
    return thousands + 'K';
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    popSlider.size(canvasWidth - 200);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
