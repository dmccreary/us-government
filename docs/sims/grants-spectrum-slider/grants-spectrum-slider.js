// Grants Spectrum — Categorical to Block (and conditional in between)
// CANVAS_HEIGHT: 525

let containerWidth;
let canvasWidth = 800;
let drawHeight = 485;
let controlHeight = 45;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// 0 = pure categorical (full federal control)
// 100 = pure block (max state flexibility)
let spectrumSlider;
const presets = [
    { name: 'Medicaid',     val: 18,
      note: 'Categorical with state matching — strict federal eligibility & service rules; states can apply for limited 1115 waivers.' },
    { name: 'Highway Funds\n(Conditional Categorical)', val: 35,
      note: 'States get federal highway dollars but must enforce conditions like the 21 drinking age (South Dakota v. Dole).' },
    { name: 'TANF (Welfare Block)', val: 80,
      note: 'PRWORA (1996) replaced AFDC entitlement with state-administered TANF block grants — wide state discretion within federal time/work limits.' }
];

let activePreset = 0;

function setup() {
    updateCanvasSize();
    const c = createCanvas(containerWidth, containerHeight);
    c.parent(document.querySelector('main'));
    textSize(13);

    spectrumSlider = createSlider(0, 100, presets[0].val);
    spectrumSlider.position(20, drawHeight + 12);
    spectrumSlider.size(canvasWidth - 40);
}

function draw() {
    updateCanvasSize();

    // MicroSim Standard layout
    fill('aliceblue');
    // draw a light gray line about both the drawing area and the control area
    stroke('silver');
    rect(0, 0, canvasWidth, drawHeight);
    // draw a white background for the control area
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);
    
    const v = spectrumSlider.value();

    // Title
    noStroke();
    fill(26, 58, 108);
    textSize(18);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Grants Spectrum — Federal Control vs. State Flexibility', canvasWidth / 2, 8);
    textStyle(NORMAL);

    // Preset buttons across the top
    const btnY = 38;
    const totalBtnW = canvasWidth - 40;
    const btnW = totalBtnW / presets.length;
    for (let i = 0; i < presets.length; i++) {
        const x = 20 + i * btnW;
        const isActive = activePreset === i;
        fill(isActive ? color(26, 58, 108) : color(220, 220, 220));
        stroke(140);
        rect(x + 4, btnY, btnW - 8, 28, 6);
        noStroke();
        fill(isActive ? 255 : 50);
        textAlign(CENTER, CENTER);
        textSize(11);
        textStyle(BOLD);
        text(presets[i].name, x + btnW / 2, btnY + 14);
        textStyle(NORMAL);
        if (mouseIsPressed && _justClicked && mouseX > x + 4 && mouseX < x + btnW - 4 && mouseY > btnY && mouseY < btnY + 28) {
            activePreset = i;
            spectrumSlider.value(presets[i].val);
            _justClicked = false;
        }
    }

    // Update activePreset based on slider value
    const newPreset = closestPreset(v);
    if (newPreset !== activePreset && Math.abs(v - presets[newPreset].val) < 3) {
        activePreset = newPreset;
    }

    // Spectrum bar
    const sx = 30, sy = 115, sw = canvasWidth - 60, sh = 30;
    // gradient bar
    for (let x = 0; x < sw; x++) {
        const t = x / sw;
        const r = lerp(220, 200, t);
        const g = lerp(53, 220, t);
        const b = lerp(69, 80, t);
        stroke(r, g, b);
        line(sx + x, sy, sx + x, sy + sh);
    }
    noStroke();
    fill(0);
    textAlign(LEFT, CENTER);
    textSize(11);
    textStyle(BOLD);
    fill(140, 0, 0);
    text('CATEGORICAL', sx + 4, sy + sh / 2);
    textAlign(RIGHT, CENTER);
    fill(0, 100, 30);
    text('BLOCK', sx + sw - 4, sy + sh / 2);
    textStyle(NORMAL);

    // Marker on spectrum
    const markerX = sx + (v / 100) * sw;
    fill(26, 58, 108);
    noStroke();
    triangle(markerX, sy - 10, markerX - 8, sy - 22, markerX + 8, sy - 22);
    rect(markerX - 2, sy, 4, sh);
    fill(50);
    textAlign(CENTER, BOTTOM);
    textSize(11);
    text('You are here: ' + describePosition(v), markerX, sy - 24);

    // Two perspective panels
    const panelTop = sy + sh + 20;
    const panelH = drawHeight - panelTop - 70;
    const colW = (canvasWidth - 30) / 2;
    drawPerspectivePanel(10, panelTop, colW, panelH,
        'Federal Government Perspective', color(40, 100, 180), federalText(v));
    drawPerspectivePanel(20 + colW, panelTop, colW, panelH,
        'State Government Perspective', color(170, 80, 30), stateText(v));

    // Bottom AP fact
    fill(255, 248, 220);
    stroke(193, 154, 0);
    rect(10, drawHeight - 65, canvasWidth - 20, 55, 6);
    noStroke();
    fill(102, 77, 0);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(11);
    text('Key AP Fact', 18, drawHeight - 60);
    textStyle(NORMAL);
    text('Congress determines grant type when it appropriates funds. Presidents can advocate for a shift, ' +
         'but only Congress can pass the legislation that converts categorical grants into block grants (or vice versa).',
         18, drawHeight - 45, canvasWidth - 36, 38);

    // Control region
    noStroke();
    fill(233, 236, 239);
    rect(0, drawHeight, canvasWidth, controlHeight);
    fill(50);
    textAlign(LEFT, TOP);
    textSize(10);
    text('Drag the slider →', 20, drawHeight + 32);
}

function drawPerspectivePanel(x, y, w, h, title, col, body) {
    fill(col);
    rect(x, y, w, 26, 6);
    fill(255);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    textSize(13);
    text(title, x + 10, y + 13);

    fill(255);
    stroke(col);
    rect(x, y + 24, w, h - 24, 6);
    noStroke();
    fill(33, 37, 41);
    textAlign(LEFT, TOP);
    textStyle(NORMAL);
    textSize(12);
    text(body, x + 10, y + 32, w - 20, h - 36);
}

function federalText(v) {
    if (v < 25) {
        return '✓ Maximum accountability. National standards uniformly enforced.\n\n' +
               '✓ Funds can only be used for narrow, specified purposes.\n\n' +
               '✗ Heavy reporting and audit burden on the federal agency.\n\n' +
               '✗ Less ability to adapt to local conditions or innovation.';
    } else if (v < 50) {
        return '✓ National standards still set, but with conditional flexibility.\n\n' +
               '✓ Federal goals achieved by attaching strings to spending (e.g., 21 drinking age, Title IX compliance).\n\n' +
               '— Compromise: still oversight, but less prescriptive.';
    } else if (v < 75) {
        return '— Federal government sets broad goals only.\n\n' +
               '✗ Reduced ability to ensure consistent national outcomes.\n\n' +
               '✗ Harder to detect waste or misuse without itemized spending controls.\n\n' +
               '✓ Lower administrative cost at the federal level.';
    } else {
        return '✗ Minimum accountability. National standards largely advisory.\n\n' +
               '✗ Federal agency loses most leverage over how money is spent.\n\n' +
               '✓ Lowest federal administrative cost; few audits.\n\n' +
               '✗ Hard to ensure programs reach intended populations across all states.';
    }
}

function stateText(v) {
    if (v < 25) {
        return '✗ Minimal flexibility. Money comes with detailed federal rules.\n\n' +
               '✗ Heavy compliance and reporting burden on state agencies.\n\n' +
               '✓ Funds are reliable and tied to specific national priorities.\n\n' +
               '— Hard to innovate or address local conditions.';
    } else if (v < 50) {
        return '— Some flexibility but federal conditions still apply.\n\n' +
               '— States must comply with strings (e.g., highway funds tied to drinking age) to receive money.\n\n' +
               '✓ Predictable funding stream.';
    } else if (v < 75) {
        return '✓ Significant freedom to design local programs.\n\n' +
               '✓ Can target funds to highest-need populations within the state.\n\n' +
               '✗ Risk of underfunding programs the federal government once mandated.\n\n' +
               '— Funding may be more politically vulnerable to congressional cuts.';
    } else {
        return '✓ Maximum flexibility. States choose how to spend within broad goals.\n\n' +
               '✓ Encourages "laboratories of democracy" — state-level policy experimentation.\n\n' +
               '✗ Less protection from interest groups capturing the program.\n\n' +
               '✗ Funding may not keep pace with population growth (block grants often capped).';
    }
}

function describePosition(v) {
    if (v < 15) return 'Pure Categorical';
    if (v < 35) return 'Categorical / Conditional';
    if (v < 55) return 'Mixed (Conditional)';
    if (v < 75) return 'Block-Leaning';
    return 'Pure Block';
}

function closestPreset(v) {
    let best = 0, bestD = Infinity;
    for (let i = 0; i < presets.length; i++) {
        const d = Math.abs(v - presets[i].val);
        if (d < bestD) { bestD = d; best = i; }
    }
    return best;
}

let _justClicked = false;
function mousePressed() { _justClicked = true; }

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    spectrumSlider.size(canvasWidth - 40);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
