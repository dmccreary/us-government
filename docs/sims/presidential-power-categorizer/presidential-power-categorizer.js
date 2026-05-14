// Presidential Power Categorizer — drag and drop classification
// CANVAS_HEIGHT: 660

let containerWidth;
let canvasWidth = 800;
let drawHeight = 600;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// E = Enumerated, I = Informal
const POWERS = [
    { id: 'veto',       label: 'Veto legislation',                ans: 'E', why: 'Article I, §7: every bill must be presented to the President, who may sign or veto.' },
    { id: 'eo',         label: 'Issue executive orders',          ans: 'I', why: 'Not in the Constitution. Practice rooted in the President\'s general executive power and authority over agencies.' },
    { id: 'cic',        label: 'Commander in Chief',              ans: 'E', why: 'Article II, §2: "The President shall be Commander in Chief of the Army and Navy."' },
    { id: 'execagree',  label: 'Negotiate executive agreements',   ans: 'I', why: 'Not in the Constitution but accepted by courts (e.g., U.S. v. Belmont, 1937) as part of executive foreign-affairs power.' },
    { id: 'pardon',     label: 'Grant pardons',                   ans: 'E', why: 'Article II, §2: power to grant reprieves and pardons for offenses against the United States.' },
    { id: 'signing',    label: 'Use signing statements',          ans: 'I', why: 'Not in the Constitution; modern practice (especially since Reagan) of attaching interpretive comments at signing.' },
    { id: 'judges',     label: 'Appoint federal judges',          ans: 'E', why: 'Article II, §2 (Appointments Clause), with Senate advice and consent.' },
    { id: 'emerg',      label: 'Declare national emergencies',    ans: 'I', why: 'Statutory + practice. The National Emergencies Act (1976) grants powers Congress could revoke.' },
    { id: 'treaties',   label: 'Make treaties',                   ans: 'E', why: 'Article II, §2: makes treaties with two-thirds Senate ratification.' },
    { id: 'gopublic',   label: 'Go public — appeal to citizens',   ans: 'I', why: 'Modern practice (Roosevelt fireside chats, weekly addresses, social media). Not a constitutional power.' },
    { id: 'amb',        label: 'Receive ambassadors',             ans: 'E', why: 'Article II, §3: "he shall receive Ambassadors and other public Ministers." Used to recognize foreign governments.' },
    { id: 'impound',    label: 'Impound appropriated funds',      ans: 'I', why: 'Contested informal practice; curtailed by the 1974 Impoundment Control Act after Nixon.' }
];

let cards = [];           // { id, label, ans, why, x, y, w, h, dragging, placed }
let dragOffsetX, dragOffsetY;
let activeCard = null;
let feedback = ''; // text under controls
let feedbackColor = null;
let reviewMode = false;
let reviewBtn, resetBtn;

// Drop zone bounds (computed each frame relative to canvas)
let zoneE = {}, zoneI = {};

function setup() {
    updateCanvasSize();
    const c = createCanvas(containerWidth, containerHeight);
    c.parent(document.querySelector('main'));
    textSize(13);
    initCards();

    reviewBtn = createButton('Show Correct Answers');
    reviewBtn.position(10, drawHeight + 10);
    reviewBtn.mousePressed(() => { reviewMode = true; feedback = ''; });

    resetBtn = createButton('Reset');
    resetBtn.position(180, drawHeight + 10);
    resetBtn.mousePressed(() => { initCards(); reviewMode = false; feedback = ''; });
}

function initCards() {
    cards = POWERS.map((p, i) => ({
        ...p,
        w: 170, h: 38,
        dragging: false, placed: null
    }));
    layoutDeck();
}

function layoutDeck() {
    // Place 12 cards in 3 rows × 4 columns at the bottom
    const top = drawHeight - 200;
    const colW = (canvasWidth - 40) / 4;
    cards.forEach((c, i) => {
        if (c.placed) return; // keep current position if placed in zone
        c.w = Math.min(170, colW - 10);
        const col = i % 4;
        const row = Math.floor(i / 4);
        c.x = 20 + col * colW + (colW - c.w) / 2;
        c.y = top + row * 50;
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
    text('Presidential Power Categorizer', canvasWidth / 2, 6);
    textStyle(NORMAL);
    textSize(11);
    fill(73, 80, 87);
    text('Drag each power into the correct zone. Enumerated = explicitly in the Constitution; ' +
         'Informal = practice-based.', canvasWidth / 2, 28);

    // Drop zones
    const zw = (canvasWidth - 30) / 2;
    const zy = 50;
    const zh = drawHeight - 270;
    zoneE = { x: 10, y: zy, w: zw, h: zh };
    zoneI = { x: 20 + zw, y: zy, w: zw, h: zh };

    drawZone(zoneE, 'Enumerated (Constitutional)', color(40, 167, 69));
    drawZone(zoneI, 'Informal (Practice-Based)', color(102, 16, 242));

    // Place cards: those placed in a zone should sit inside it
    relayoutPlacedCards();

    // Draw cards (active card last so it sits on top)
    cards.forEach(c => { if (c !== activeCard) drawCard(c); });
    if (activeCard) drawCard(activeCard);

    // Status: how many sorted, how many correct
    const placed = cards.filter(c => c.placed).length;
    const correct = cards.filter(c => c.placed === c.ans).length;
    fill(50);
    textAlign(LEFT, TOP);
    textSize(11);
    text('Sorted: ' + placed + '/' + cards.length + '   Correct so far: ' + correct + '/' + placed,
         12, drawHeight - 220);
    if (placed === cards.length && !reviewMode) {
        textSize(13);
        textStyle(BOLD);
        fill(correct === cards.length ? color(20, 100, 40) : color(180, 80, 0));
        text(correct === cards.length
                ? '★ Perfect! All ' + cards.length + ' powers categorized correctly.'
                : 'Review the ones marked with ✗ — drag them to the other zone, or click "Show Correct Answers".',
             12, drawHeight - 200);
        textStyle(NORMAL);
    }

    // Control region
    noStroke();
    fill(233, 236, 239);
    rect(0, drawHeight, canvasWidth, controlHeight);
    if (feedback) {
        noStroke();
        fill(feedbackColor || color(50));
        textAlign(LEFT, TOP);
        textSize(11);
        text(feedback, 280, drawHeight + 16, canvasWidth - 290, 50);
    }
}

function drawZone(z, label, col) {
    noFill();
    stroke(col);
    strokeWeight(2);
    rect(z.x, z.y, z.w, z.h, 8);
    noStroke();
    fill(col);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(13);
    text(label, z.x + z.w / 2, z.y + 6);
    textStyle(NORMAL);
    strokeWeight(1);
}

function drawCard(c) {
    // Determine card color
    let bg = color(255, 255, 255);
    let bd = color(140);
    if (c.placed === 'E') { bg = color(232, 245, 232); bd = color(40, 167, 69); }
    if (c.placed === 'I') { bg = color(240, 230, 252); bd = color(102, 16, 242); }
    if (c === activeCard) bd = color(0);

    // In review mode, color by correctness
    let mark = '';
    if (reviewMode && c.placed) {
        if (c.placed === c.ans) { bg = color(232, 245, 232); bd = color(40, 167, 69); mark = '✓'; }
        else { bg = color(248, 220, 220); bd = color(220, 53, 69); mark = '✗'; }
    } else if (reviewMode && !c.placed) {
        bg = color(255, 248, 220); bd = color(193, 154, 0);
    }

    fill(bg); stroke(bd); strokeWeight(c === activeCard ? 2 : 1);
    rect(c.x, c.y, c.w, c.h, 5);
    noStroke();
    fill(33, 37, 41);
    textAlign(LEFT, CENTER);
    textSize(11);
    text(c.label, c.x + 6, c.y + c.h / 2 - 1, c.w - 24, c.h);
    if (mark) {
        textAlign(RIGHT, CENTER);
        textStyle(BOLD);
        textSize(14);
        fill(mark === '✓' ? color(20, 100, 40) : color(180, 0, 0));
        text(mark, c.x + c.w - 5, c.y + c.h / 2);
        textStyle(NORMAL);
    }
    strokeWeight(1);
}

function relayoutPlacedCards() {
    // Place cards inside their zones in a grid (max 6 per zone)
    const eCards = cards.filter(c => c.placed === 'E' && c !== activeCard);
    const iCards = cards.filter(c => c.placed === 'I' && c !== activeCard);
    placeInZone(eCards, zoneE);
    placeInZone(iCards, zoneI);
}

function placeInZone(list, z) {
    const cols = 1; // single column inside each zone
    const top = z.y + 30;
    const cardW = z.w - 20;
    list.forEach((c, i) => {
        c.w = cardW;
        c.x = z.x + 10;
        c.y = top + i * 42;
        if (c.y + c.h > z.y + z.h - 4) c.y = z.y + z.h - c.h - 4;
    });
}

function mousePressed() {
    // Top-most card under cursor wins
    for (let i = cards.length - 1; i >= 0; i--) {
        const c = cards[i];
        if (mouseX >= c.x && mouseX <= c.x + c.w && mouseY >= c.y && mouseY <= c.y + c.h) {
            activeCard = c;
            c.dragging = true;
            dragOffsetX = mouseX - c.x;
            dragOffsetY = mouseY - c.y;
            return;
        }
    }
}

function mouseDragged() {
    if (activeCard && activeCard.dragging) {
        activeCard.x = mouseX - dragOffsetX;
        activeCard.y = mouseY - dragOffsetY;
    }
}

function mouseReleased() {
    if (!activeCard) return;
    const c = activeCard;
    c.dragging = false;
    // Check zone placement
    const cx = c.x + c.w / 2, cy = c.y + c.h / 2;
    if (cx >= zoneE.x && cx <= zoneE.x + zoneE.w && cy >= zoneE.y && cy <= zoneE.y + zoneE.h) {
        c.placed = 'E';
        showFeedback(c);
    } else if (cx >= zoneI.x && cx <= zoneI.x + zoneI.w && cy >= zoneI.y && cy <= zoneI.y + zoneI.h) {
        c.placed = 'I';
        showFeedback(c);
    } else {
        c.placed = null;
        layoutDeck();
    }
    activeCard = null;
}

function showFeedback(c) {
    if (reviewMode) { feedback = c.label + ' — ' + c.why; feedbackColor = color(50); return; }
    if (c.placed === c.ans) {
        feedback = '✓ Correct: ' + c.label + ' — ' + c.why;
        feedbackColor = color(20, 100, 40);
    } else {
        feedback = '✗ Try again: "' + c.label + '" belongs in the other zone.';
        feedbackColor = color(180, 0, 0);
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    layoutDeck();
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
