// Gerrymandering — Packing and Cracking visualized
// CANVAS_HEIGHT: 620

let containerWidth;
let canvasWidth = 800;
let drawHeight = 540;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// 10x7 grid = 70 cells; voter assignment fixed at 60% blue / 40% red.
const COLS = 10, ROWS = 7;
const NUM_DISTRICTS = 7;

// Voters: 1 = blue, 0 = red. We construct deterministic distribution: 60% blue.
let voters = [];

// District configurations: each is COLS*ROWS array of district IDs (0..6).
let configs = {};

let currentConfig = 'Fair';
let highlightedDist = -1;

let fairBtn, packBtn, crackBtn;

function setup() {
    updateCanvasSize();
    const c = createCanvas(containerWidth, containerHeight);
    c.parent(document.querySelector('main'));
    textSize(13);
    buildVoters();
    buildConfigs();

    fairBtn = createButton('Fair Districts');
    fairBtn.position(10, drawHeight + 10);
    fairBtn.mousePressed(() => { currentConfig = 'Fair'; highlightedDist = -1; });

    packBtn = createButton('Pack Blue');
    packBtn.position(120, drawHeight + 10);
    packBtn.mousePressed(() => { currentConfig = 'Pack'; highlightedDist = -1; });

    crackBtn = createButton('Crack Blue');
    crackBtn.position(220, drawHeight + 10);
    crackBtn.mousePressed(() => { currentConfig = 'Crack'; highlightedDist = -1; });
}

function buildVoters() {
    // Place blue voters in a roughly geographic pattern that's still 60% blue.
    // We'll concentrate blues in the left/center; reds in the right.
    voters = new Array(COLS * ROWS).fill(0);
    let blueIdxs = [];
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            // Blue probability higher on left
            const score = (COLS - c) / COLS;        // 0..1, left=high
            // some randomness via seed
            const rnd = ((r * 31 + c * 17 + 7) % 100) / 100;
            if (rnd < 0.4 + score * 0.4) blueIdxs.push(r * COLS + c);
        }
    }
    // ensure exactly 60% blue
    const target = Math.round(0.6 * COLS * ROWS); // 42 of 70
    while (blueIdxs.length > target) blueIdxs.pop();
    blueIdxs.forEach(i => voters[i] = 1);
}

function buildConfigs() {
    // Each config returns assignment array of length 70 with district ids 0..6 (10 cells each).
    // Fair: 7 columns of size ~10 cells (1 column = 7 cells; we'll use 7 vertical strips of width 10/7 = ~1.4)
    // Simpler: 7 horizontal rows = 10 cells each → COLS=10, ROWS=7, district=row index.
    const fair = new Array(COLS * ROWS);
    for (let r = 0; r < ROWS; r++)
        for (let c = 0; c < COLS; c++) fair[r * COLS + c] = r;
    configs.Fair = fair;

    // Pack Blue: put as many blue voters as possible into 2 districts; spread red across 5.
    // We'll sort cells; blues first → assign first 20 blues to district 0,1 (10 each); rest to 2..6
    const packAssign = new Array(COLS * ROWS);
    const blueCells = [], redCells = [];
    for (let i = 0; i < voters.length; i++) {
        (voters[i] === 1 ? blueCells : redCells).push(i);
    }
    // Pack blue districts (0,1)
    blueCells.slice(0, 10).forEach(i => packAssign[i] = 0);
    blueCells.slice(10, 20).forEach(i => packAssign[i] = 1);
    // Remaining blues + all reds → districts 2..6 (~10 cells each)
    const rest = blueCells.slice(20).concat(redCells);
    for (let k = 0; k < rest.length; k++) {
        packAssign[rest[k]] = 2 + Math.floor(k / 10);
    }
    configs.Pack = packAssign;

    // Crack Blue: split blues across all 7 districts so each district is 6 blue / 4 red? No — we want red wins.
    // With 60/40 overall, if every district is 60/40 blue, blue wins all. So "crack" means slim red majorities.
    // We build districts that each get ~6 blues + 4 reds in 5 districts (red loses there) and pack blues into 2.
    // Wait — that's just packing again. Real cracking spreads blues so each district has slight red majority.
    // 7 districts × 10 = 70. We have 42 blue + 28 red. If each district = 6 reds → impossible (too few reds).
    // Realistic outcome: with only 40% red, you can give red majorities in maybe 3-4 districts.
    // Let's give 4 districts 6 red + 4 blue (red wins) → uses 24 red + 16 blue.
    // Remaining: 4 red + 26 blue across 3 districts (~10 cells each) → blue wins 3.
    // Result: red wins 4, blue wins 3 = red majority despite blue voter majority!
    const crackAssign = new Array(COLS * ROWS);
    const bCells = [...blueCells], rCells = [...redCells];
    let nextRed = 0, nextBlue = 0;
    // Districts 0-3: 6 red + 4 blue each (red wins)
    for (let d = 0; d < 4; d++) {
        for (let k = 0; k < 6; k++) crackAssign[rCells[nextRed++]] = d;
        for (let k = 0; k < 4; k++) crackAssign[bCells[nextBlue++]] = d;
    }
    // Districts 4-6: assign remaining cells (mostly blue, 4 red left, 26 blue left, 30 cells)
    const remaining = [];
    for (let i = 0; i < voters.length; i++) if (crackAssign[i] === undefined) remaining.push(i);
    for (let k = 0; k < remaining.length; k++) {
        crackAssign[remaining[k]] = 4 + Math.floor(k / 10);
    }
    configs.Crack = crackAssign;
}

function draw() {
    updateCanvasSize();
    background(248, 249, 250);

    noStroke();
    fill(26, 58, 108);
    textSize(17);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Gerrymandering — Packing and Cracking', canvasWidth / 2, 6);
    textStyle(NORMAL);
    textSize(11);
    fill(73, 80, 87);
    text('A hypothetical state with 60% Blue / 40% Red voters. Same voters — three different district maps.',
         canvasWidth / 2, 28);

    const assign = (currentConfig === 'Fair') ? configs.Fair :
                   (currentConfig === 'Pack') ? configs.Pack : configs.Crack;

    // Grid layout
    const gridLeft = 20;
    const gridTop = 50;
    const gridW = canvasWidth * 0.55 - 40;
    const cell = Math.min(gridW / COLS, 36);
    const gridRight = gridLeft + cell * COLS;
    const gridBottom = gridTop + cell * ROWS;

    // Draw cells
    let mouseDistrict = -1;
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const i = r * COLS + c;
            const x = gridLeft + c * cell;
            const y = gridTop + r * cell;
            const isBlue = voters[i] === 1;
            const dist = assign[i];
            const dim = (highlightedDist >= 0 && dist !== highlightedDist);
            stroke(220);
            if (isBlue) fill(dim ? color(180, 200, 240) : color(33, 100, 200));
            else fill(dim ? color(240, 195, 195) : color(200, 50, 50));
            rect(x, y, cell, cell);
            if (mouseX >= x && mouseX <= x + cell && mouseY >= y && mouseY <= y + cell) {
                mouseDistrict = dist;
            }
        }
    }

    // Draw district borders
    drawDistrictBorders(assign, gridLeft, gridTop, cell);

    // Capture click on district to highlight
    if (mouseIsPressed && _justClicked && mouseDistrict >= 0) {
        highlightedDist = (highlightedDist === mouseDistrict) ? -1 : mouseDistrict;
        _justClicked = false;
    }

    // Tally per district
    const dCount = {}; // {dist: {blue, red}}
    for (let i = 0; i < voters.length; i++) {
        const d = assign[i];
        if (!dCount[d]) dCount[d] = { blue: 0, red: 0 };
        if (voters[i] === 1) dCount[d].blue++; else dCount[d].red++;
    }

    let blueSeats = 0, redSeats = 0;
    Object.values(dCount).forEach(t => { if (t.blue > t.red) blueSeats++; else redSeats++; });

    // Right panel
    const rx = gridRight + 30;
    const rw = canvasWidth - rx - 20;
    fill(26, 58, 108);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(13);
    text('Configuration: ' + currentConfig, rx, gridTop);
    textStyle(NORMAL);
    textSize(11);
    fill(50);
    text(configDescription(currentConfig), rx, gridTop + 18, rw, 60);

    // Seat distribution
    const sdY = gridTop + 88;
    fill(50);
    textStyle(BOLD);
    text('Seat distribution', rx, sdY);
    textStyle(NORMAL);
    // Bar
    const barX = rx, barY = sdY + 18, barW = rw, barH = 22;
    const blueW = (blueSeats / NUM_DISTRICTS) * barW;
    fill(33, 100, 200);
    rect(barX, barY, blueW, barH, 4);
    fill(200, 50, 50);
    rect(barX + blueW, barY, barW - blueW, barH, 4);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(11);
    if (blueW > 30) text('Blue: ' + blueSeats, barX + blueW / 2, barY + barH / 2);
    if (barW - blueW > 30) text('Red: ' + redSeats, barX + blueW + (barW - blueW) / 2, barY + barH / 2);

    // Voter share vs seat share
    fill(50);
    textAlign(LEFT, TOP);
    textSize(11);
    text('Voter share: 60% Blue / 40% Red', rx, sdY + 50);
    text('Seat share:  ' + Math.round(blueSeats / NUM_DISTRICTS * 100) + '% Blue / ' +
         Math.round(redSeats / NUM_DISTRICTS * 100) + '% Red', rx, sdY + 66);
    const gap = Math.abs(60 - blueSeats / NUM_DISTRICTS * 100);
    fill(gap > 15 ? color(180, 0, 0) : color(50));
    textStyle(BOLD);
    text('Voter→seat gap: ' + gap.toFixed(0) + '%', rx, sdY + 82);
    textStyle(NORMAL);

    // Highlighted district detail
    if (highlightedDist >= 0) {
        const t = dCount[highlightedDist];
        const pct = (t.blue / (t.blue + t.red) * 100).toFixed(0);
        const winner = t.blue > t.red ? 'BLUE' : 'RED';
        const verdict = (Math.abs(t.blue - t.red) >= 4) ? 'SAFE ' + winner :
                        (Math.abs(t.blue - t.red) >= 2) ? 'LIKELY ' + winner : 'LEAN ' + winner;
        fill(255, 248, 220);
        stroke(193, 154, 0);
        rect(rx, sdY + 110, rw, 80, 6);
        noStroke();
        fill(102, 77, 0);
        textStyle(BOLD);
        text('District ' + (highlightedDist + 1) + ': ' + verdict, rx + 10, sdY + 118);
        textStyle(NORMAL);
        text('Blue: ' + t.blue + ' (' + pct + '%)   |   Red: ' + t.red + ' (' + (100 - pct) + '%)',
             rx + 10, sdY + 138);
        textSize(10);
        text('Total voters in district: ' + (t.blue + t.red), rx + 10, sdY + 156);
        textSize(11);
    } else {
        fill(108, 117, 125);
        textSize(10);
        text('Click any district on the grid to see its detailed composition.', rx, sdY + 110, rw, 30);
    }

    // Control region
    noStroke();
    fill(233, 236, 239);
    rect(0, drawHeight, canvasWidth, controlHeight);
    fill(50);
    textAlign(LEFT, TOP);
    textSize(11);
    text('Click a configuration above. Same voters → very different election outcomes.',
         10, drawHeight + 50);
}

function drawDistrictBorders(assign, gridLeft, gridTop, cell) {
    stroke(0);
    strokeWeight(2);
    noFill();
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const i = r * COLS + c;
            const x = gridLeft + c * cell;
            const y = gridTop + r * cell;
            const d = assign[i];
            // Top border
            if (r === 0 || assign[(r - 1) * COLS + c] !== d) line(x, y, x + cell, y);
            // Left border
            if (c === 0 || assign[r * COLS + (c - 1)] !== d) line(x, y, x, y + cell);
            // Right border
            if (c === COLS - 1 || assign[r * COLS + (c + 1)] !== d) line(x + cell, y, x + cell, y + cell);
            // Bottom border
            if (r === ROWS - 1 || assign[(r + 1) * COLS + c] !== d) line(x, y + cell, x + cell, y + cell);
        }
    }
    strokeWeight(1);
}

function configDescription(cfg) {
    if (cfg === 'Fair') return 'Compact horizontal districts. Blue\'s 60% voter majority converts roughly proportionally into seats.';
    if (cfg === 'Pack') return 'Two blue voters\' districts are packed to ~100% blue (wasted votes); red wins the other 5 with comfortable margins.';
    if (cfg === 'Crack') return 'Blue voters are cracked across multiple districts where blue narrowly loses. 4 thin red wins beat 3 packed blue wins.';
    return '';
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
