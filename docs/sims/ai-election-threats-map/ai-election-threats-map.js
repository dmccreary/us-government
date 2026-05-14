// AI Threats to Elections — Interactive Risk Matrix
// CANVAS_HEIGHT: 700

let containerWidth;
let canvasWidth = 800;
let drawHeight = 640;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

const THREATS = [
    { id: 'deepfake',  label: 'Deepfakes (audio/video)',
      desc: 'AI-generated images, audio, or video of candidates saying or doing things they never did.' },
    { id: 'textdis',   label: 'Text disinformation',
      desc: 'Mass-produced fake news stories, comments, and posts authored by language models.' },
    { id: 'micro',     label: 'Micro-targeting',
      desc: 'AI-personalized ads and messages tailored to individual voters\' psychological vulnerabilities.' },
    { id: 'suppress',  label: 'Voter suppression via false info',
      desc: 'False information about voting locations, hours, eligibility, or ID requirements.' },
    { id: 'infra',     label: 'Infrastructure attacks',
      desc: 'AI-enhanced attacks on voter rolls, election websites, or vote-tabulation systems.' }
];

const VECTORS = [
    { id: 'social',   label: 'Social Media' },
    { id: 'email',    label: 'Email / SMS' },
    { id: 'broadcast',label: 'Broadcast / Web Video' },
    { id: 'inperson', label: 'In-Person / Robocalls' }
];

// Cell content keyed by threat-vector. difficulty = 'low' | 'med' | 'high'
const CELLS = {
    'deepfake|social':   { difficulty: 'low',  example: '2024: AI-generated voice clips circulated on TikTok/X within hours of original posts; many viral before fact-check.', counter: 'Platform watermarking; rapid-response fact-check teams.' },
    'deepfake|email':    { difficulty: 'med',  example: 'Targeted spear-phishing with deepfake audio of a campaign manager authorizing actions.', counter: 'Out-of-band verification; staff training.' },
    'deepfake|broadcast':{ difficulty: 'low',  example: '2024 NH primary: AI-cloned voice of President Biden urged voters not to vote in primary (robocall).', counter: 'FCC ban on AI voice in robocalls (Feb 2024); broadcast-network verification.' },
    'deepfake|inperson': { difficulty: 'high', example: 'AI-generated robocalls in rural areas where independent fact-checking is sparse.', counter: 'State-level criminal penalties for election deception.' },

    'textdis|social':    { difficulty: 'low',  example: 'LLM-generated comment armies make fringe positions appear mainstream.', counter: 'Bot detection; provenance signals (C2PA); platform moderation.' },
    'textdis|email':     { difficulty: 'med',  example: 'AI-tailored phishing emails impersonate poll workers or candidates.', counter: 'DMARC/SPF email authentication; reporting tools.' },
    'textdis|broadcast': { difficulty: 'med',  example: 'Fake "news" sites use LLMs to produce thousands of articles cited on social media.', counter: 'Source-credibility tools; media literacy.' },
    'textdis|inperson':  { difficulty: 'high', example: 'AI-generated flyers and door-hangers that mimic official election materials.', counter: 'State election-board enforcement; voter education.' },

    'micro|social':      { difficulty: 'low',  example: 'AI tailors ad copy to each voter\'s emotional triggers, A/B-tested in real time.', counter: 'Ad-transparency laws; ban on issue ads close to election.' },
    'micro|email':       { difficulty: 'med',  example: 'Personalized fundraising emails using AI-inferred psychological profiles.', counter: 'Privacy laws (GDPR-style); campaign-finance disclosure.' },
    'micro|broadcast':   { difficulty: 'high', example: 'Geo-targeted streaming ads use AI to serve different versions to different demographics.', counter: 'Ad-archive disclosure rules; FCC oversight of streaming.' },
    'micro|inperson':    { difficulty: 'high', example: 'AI-driven canvassing apps prioritize visits based on predicted persuadability.', counter: 'Limited counter-measures; mostly transparency-based.' },

    'suppress|social':   { difficulty: 'low',  example: 'False posts claiming polls closed early or voter ID is required when it isn\'t.', counter: 'Platform priority labeling for election-day misinformation.' },
    'suppress|email':    { difficulty: 'med',  example: 'AI-generated emails to voters in targeted precincts with wrong polling place addresses.', counter: 'Election-board email verification; voter-education campaigns.' },
    'suppress|broadcast':{ difficulty: 'med',  example: 'AI-altered video of officials announcing fake voting changes.', counter: 'Same as deepfake/broadcast.' },
    'suppress|inperson': { difficulty: 'high', example: '2020-style robocalls falsely warning of arrests at polling places (now AI-enhanced).', counter: 'Federal & state election-deception statutes; rapid law enforcement.' },

    'infra|social':      { difficulty: 'low',  example: 'AI-coordinated DDoS or doxxing campaigns against election workers.', counter: 'Threat protection programs (CISA); local-law-enforcement coordination.' },
    'infra|email':       { difficulty: 'med',  example: 'AI-crafted phishing of election officials\' credentials to access voter rolls or pollbooks.', counter: 'MFA mandates; CISA security guidance.' },
    'infra|broadcast':   { difficulty: 'high', example: 'AI-generated fake "results" feeds spliced into news broadcasts.', counter: 'Multi-source verification; AP & state EOS protocols.' },
    'infra|inperson':    { difficulty: 'high', example: 'AI-coordinated harassment of poll workers tied to false fraud claims.', counter: 'Federal protections (DOJ Election Threats Task Force).' }
};

// Defenses
const DEFENSES = [
    { id: 'water',     label: 'Watermarking & provenance', addresses: ['deepfake', 'textdis'] },
    { id: 'platform',  label: 'Platform moderation',        addresses: ['deepfake', 'textdis', 'micro', 'suppress'] },
    { id: 'literacy',  label: 'Media literacy',             addresses: ['deepfake', 'textdis', 'micro', 'suppress'] },
    { id: 'legal',     label: 'Legal penalties',            addresses: ['deepfake', 'suppress', 'infra'] },
    { id: 'detect',    label: 'Technical detection',        addresses: ['deepfake', 'textdis', 'infra'] }
];

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
    const mLeft = 180;
    const mTop = 60;
    const mW = canvasWidth - mLeft - 20;
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

    // Row labels
    textAlign(RIGHT, CENTER);
    for (let t = 0; t < THREATS.length; t++) {
        text(THREATS[t].label, mLeft - 8, mTop + rowH * t + rowH / 2, 160);
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
            // Color by difficulty
            let bg;
            if (cell.difficulty === 'low')  bg = color(255, 100, 100);
            else if (cell.difficulty === 'med') bg = color(255, 180, 80);
            else                                bg = color(140, 200, 100);
            // Defense view: dim cells not addressed by selected defense
            if (view === 'defense' && selectedDefense !== null) {
                const def = DEFENSES[selectedDefense];
                if (!def.addresses.includes(THREATS[t].id)) bg = color(220, 220, 220);
                else bg = color(40, 167, 69);
            }
            fill(bg);
            stroke(isSel ? 0 : 255);
            strokeWeight(isSel ? 2 : 1);
            rect(x, y, colW - 2, rowH - 2, 4);
            noStroke();
            // Difficulty label
            fill(60);
            textAlign(CENTER, CENTER);
            textSize(10);
            textStyle(BOLD);
            const diffTxt = view === 'defense' ? '' :
                (cell.difficulty === 'low' ? 'Low' : cell.difficulty === 'med' ? 'Med' : 'High');
            text(diffTxt, x + (colW - 2) / 2, y + (rowH - 2) / 2);
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

    // Defenses panel (right side or bottom depending on view)
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
    text('1. Provenance/watermarking standards (C2PA) being adopted by major platforms and AI vendors.\n' +
         '2. Faster human + automated fact-check pipelines coupled with platform priority labeling.\n' +
         '3. Media-literacy curricula starting in middle school.\n' +
         '4. Targeted legal penalties for election-deception (state laws + federal robocall ban).\n' +
         '5. CISA and DOJ Election Threats Task Force coordination on infrastructure security.',
         18, wwY + 16, canvasWidth - 36, 90);

    // Detail panel below the matrix (replaces above when cell selected)
    if (view === 'threat' && selectedThreat !== null && selectedVector !== null) {
        const cell = CELLS[THREATS[selectedThreat].id + '|' + VECTORS[selectedVector].id];
        const dy = drawHeight - 100;
        fill(255, 248, 220);
        stroke(193, 154, 0);
        rect(150, dy, canvasWidth - 160, 90, 6);
        noStroke();
        fill(102, 77, 0);
        textAlign(LEFT, TOP);
        textStyle(BOLD);
        textSize(12);
        text(THREATS[selectedThreat].label + ' via ' + VECTORS[selectedVector].label, 158, dy + 6);
        textStyle(NORMAL);
        fill(33, 37, 41);
        textSize(11);
        text(THREATS[selectedThreat].desc, 158, dy + 22, canvasWidth - 176, 24);
        textStyle(BOLD);
        text('Example: ', 158, dy + 48);
        textStyle(NORMAL);
        text(cell.example, 210, dy + 48, canvasWidth - 226, 24);
        textStyle(BOLD);
        text('Counter:  ', 158, dy + 74);
        textStyle(NORMAL);
        text(cell.counter, 210, dy + 74, canvasWidth - 226, 24);
    }

    // Capture click on cell
    if (mouseIsPressed && _justClicked && view === 'threat') {
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
