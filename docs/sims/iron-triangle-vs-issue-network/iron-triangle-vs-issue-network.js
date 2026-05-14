// Iron Triangle vs. Issue Network — Structural Comparison
// CANVAS_HEIGHT: 660

let containerWidth;
let canvasWidth = 800;
let drawHeight = 600;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Case studies — each modifies the labels and adds verdict text.
const CASES = {
    'Generic': {
        label: 'Generic Model',
        triangleNodes: ['Congressional Subcommittee', 'Executive Agency', 'Interest Group'],
        verdict: 'Generic model: works best where one industry dominates a small policy area with limited public attention.'
    },
    'Agriculture': {
        label: 'Agriculture Policy',
        triangleNodes: ['House/Senate Ag Committees', 'USDA', 'Farm Bureau & commodity groups'],
        verdict: 'Iron triangle FITS WELL: agriculture is a textbook example. Stable, narrow set of well-organized groups.',
        ironFit: true
    },
    'Defense': {
        label: 'Defense Procurement',
        triangleNodes: ['House/Senate Armed Services', 'DoD', 'Defense contractors'],
        verdict: 'Iron triangle MOSTLY FITS: classic "military-industrial complex" Eisenhower warned about. But increasing media scrutiny pulls toward issue-network.',
        ironFit: true
    },
    'Banking': {
        label: 'Banking Regulation',
        triangleNodes: ['House Financial Services / Senate Banking', 'Federal Reserve / OCC / FDIC', 'Bank lobbyists & ABA'],
        verdict: 'MIXED: Iron-triangle features (banking lobby, sympathetic committees), but financial crises trigger broader issue-network engagement (consumer groups, academics, media).'
    },
    'Environment': {
        label: 'Environmental Regulation',
        triangleNodes: ['House Energy / Senate Environment', 'EPA', 'Industry + environmental groups'],
        verdict: 'Issue NETWORK fits better: many competing actors (industry vs. environmental groups, courts, scientists, journalists, state AGs) — no single closed circle.',
        ironFit: false
    }
};

let caseKey = 'Generic';
let caseSelect;

function setup() {
    updateCanvasSize();
    const c = createCanvas(containerWidth, containerHeight);
    c.parent(document.querySelector('main'));
    textSize(13);

    caseSelect = createSelect();
    caseSelect.position(120, drawHeight + 12);
    Object.keys(CASES).forEach(k => caseSelect.option(CASES[k].label, k));
    caseSelect.changed(() => { caseKey = caseSelect.value(); });
}

function draw() {
    updateCanvasSize();
    background(248, 249, 250);

    noStroke();
    fill(26, 58, 108);
    textSize(17);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Iron Triangle vs. Issue Network', canvasWidth / 2, 6);
    textStyle(NORMAL);
    textSize(11);
    fill(73, 80, 87);
    text('Two models of how policy is shaped. Use the case study selector to apply each model to a real policy domain.',
         canvasWidth / 2, 28);

    const colW = (canvasWidth - 30) / 2;
    const panelTop = 50;
    const panelH = drawHeight - panelTop - 100;

    drawIronTriangle(10, panelTop, colW, panelH);
    drawIssueNetwork(20 + colW, panelTop, colW, panelH);

    // Case-study verdict
    const cur = CASES[caseKey];
    const vy = drawHeight - 90;
    fill(255, 248, 220);
    stroke(193, 154, 0);
    rect(10, vy, canvasWidth - 20, 80, 6);
    noStroke();
    fill(102, 77, 0);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(12);
    text('Case study: ' + cur.label, 18, vy + 6);
    textStyle(NORMAL);
    fill(50);
    textSize(11);
    text('Which model fits better?', 18, vy + 26);
    fill(33, 37, 41);
    textSize(12);
    text(cur.verdict, 18, vy + 42, canvasWidth - 36, 36);

    // Control region
    noStroke();
    fill(233, 236, 239);
    rect(0, drawHeight, canvasWidth, controlHeight);
    fill(50);
    textAlign(LEFT, TOP);
    textSize(12);
    text('Case study:', 10, drawHeight + 16);
}

function drawIronTriangle(x, y, w, h) {
    // Header
    fill(180, 30, 50);
    rect(x, y, w, 24, 6);
    fill(255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(13);
    text('Iron Triangle', x + w / 2, y + 12);
    textStyle(NORMAL);

    fill(255);
    stroke(180, 30, 50);
    rect(x, y + 24, w, h - 24, 6);
    noStroke();

    const cur = CASES[caseKey];
    const labels = cur.triangleNodes;

    // Three nodes positioned in a triangle
    const cx = x + w / 2;
    const cy = y + 24 + (h - 24) / 2 - 10;
    const rad = Math.min(w * 0.32, (h - 24) * 0.32);

    const nodes = [
        { x: cx,            y: cy - rad * 0.85,  label: labels[0], col: color(180, 30, 50) },
        { x: cx + rad,      y: cy + rad * 0.55,  label: labels[1], col: color(102, 16, 242) },
        { x: cx - rad,      y: cy + rad * 0.55,  label: labels[2], col: color(40, 100, 40) }
    ];

    // Edges with arrows + labels
    const edges = [
        { from: 0, to: 1, fwd: 'Funding & policy backing', back: 'Implementation' },
        { from: 1, to: 2, fwd: 'Regulation', back: 'Money & expertise' },
        { from: 2, to: 0, fwd: 'Campaign $ & support', back: 'Friendly legislation' }
    ];
    for (const e of edges) {
        const a = nodes[e.from], b = nodes[e.to];
        stroke(120);
        strokeWeight(1.5);
        // double-headed line, slightly offset
        line(a.x, a.y, b.x, b.y);
        // arrowheads at each end
        drawArrowhead(b.x, b.y, Math.atan2(b.y - a.y, b.x - a.x));
        drawArrowhead(a.x, a.y, Math.atan2(a.y - b.y, a.x - b.x));
        // label
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        noStroke();
        fill(255, 255, 255, 220);
        const lab = e.fwd;
        textSize(9);
        const tw = textWidth(lab);
        rect(mx - tw / 2 - 3, my - 7, tw + 6, 12, 3);
        fill(60);
        textAlign(CENTER, CENTER);
        text(lab, mx, my - 1);
    }

    // Nodes
    for (const n of nodes) {
        fill(n.col);
        noStroke();
        circle(n.x, n.y, 60);
        fill(255);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        textSize(10);
        text(n.label, n.x, n.y, 100, 60);
        textStyle(NORMAL);
    }
}

function drawIssueNetwork(x, y, w, h) {
    fill(13, 71, 161);
    rect(x, y, w, 24, 6);
    fill(255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(13);
    text('Issue Network', x + w / 2, y + 12);
    textStyle(NORMAL);

    fill(255);
    stroke(13, 71, 161);
    rect(x, y + 24, w, h - 24, 6);
    noStroke();

    const cur = CASES[caseKey];
    const cx = x + w / 2;
    const cy = y + 24 + (h - 24) / 2 - 10;
    const rad = Math.min(w * 0.36, (h - 24) * 0.38);

    // Many nodes around in a loose web
    const nodeLabels = [
        'Congressional Committee',
        cur.triangleNodes[1] || 'Executive Agency',
        cur.triangleNodes[2] || 'Interest Groups',
        'Think Tanks',
        'Academic Researchers',
        'Journalists / Media',
        'Advocacy Orgs',
        'State Agencies',
        'Affected Industry',
        'Public Citizens'
    ];

    // Distribute around an ellipse with one center node
    const nodes = [{ x: cx, y: cy, label: nodeLabels[0], col: color(13, 71, 161) }];
    for (let i = 1; i < nodeLabels.length; i++) {
        const a = (i - 1) / (nodeLabels.length - 1) * Math.PI * 2;
        const nx = cx + Math.cos(a) * rad;
        const ny = cy + Math.sin(a) * rad * 0.9;
        nodes.push({ x: nx, y: ny, label: nodeLabels[i], col: color(80 + (i * 17) % 150, 100 + (i * 23) % 100, 200) });
    }

    // Tangled edges: connect each peripheral node to center plus a couple of neighbors
    stroke(180);
    strokeWeight(1);
    for (let i = 1; i < nodes.length; i++) {
        line(nodes[i].x, nodes[i].y, nodes[0].x, nodes[0].y);
    }
    // Cross-connections
    const cross = [[1, 3], [1, 5], [2, 4], [2, 7], [3, 5], [3, 6], [4, 6], [5, 8], [6, 9], [7, 9], [8, 9]];
    for (const [a, b] of cross) {
        line(nodes[a].x, nodes[a].y, nodes[b].x, nodes[b].y);
    }
    strokeWeight(1);

    // Nodes
    for (const n of nodes) {
        fill(n.col);
        noStroke();
        circle(n.x, n.y, 44);
        fill(255);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        textSize(8);
        text(n.label, n.x, n.y, 70, 44);
        textStyle(NORMAL);
    }
}

function drawArrowhead(x, y, ang) {
    push();
    translate(x, y);
    rotate(ang);
    fill(120);
    noStroke();
    triangle(0, 0, -8, -4, -8, 4);
    pop();
}

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
