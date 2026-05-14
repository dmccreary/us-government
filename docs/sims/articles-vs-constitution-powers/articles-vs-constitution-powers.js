// Powers Comparison — Articles of Confederation vs. U.S. Constitution
// CANVAS_HEIGHT: 660
// Click any card to flip and reveal the real-world consequence.

let containerWidth;
let canvasWidth = 800;
let drawHeight = 620;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let powers = [
    { topic: 'Tax citizens directly',
      art: false, artOut: 'Government couldn\'t pay soldiers or war debts; had to beg states for funds.',
      con: true,  conOut: 'Congress funds national programs through income tax, tariffs, and excise taxes.',
      now: 'Today: every paycheck has federal tax withholding because of the 16th Amendment.' },
    { topic: 'Regulate interstate commerce',
      art: false, artOut: 'States set tariffs against each other; trade collapsed in the 1780s.',
      con: true,  conOut: 'Congress sets uniform commerce rules; foundation of much modern federal law.',
      now: 'Today: Commerce Clause cases (Wickard, Lopez, Sebelius) shape regulation of food, drugs, climate, healthcare.' },
    { topic: 'Maintain a standing army',
      art: false, artOut: 'No federal army; states refused requisitions for soldiers and supplies.',
      con: true,  conOut: 'Congress raises and supports armies; President is Commander in Chief.',
      now: 'Today: ~1.3 million active-duty service members under unified federal command.' },
    { topic: 'Enforce federal law on individuals',
      art: false, artOut: 'Congress could only act on states, not citizens; laws had no teeth.',
      con: true,  conOut: 'Federal law applies directly to individuals via federal courts and agencies.',
      now: 'Today: an FBI arrest, IRS audit, or EPA fine all operate on individual citizens.' },
    { topic: 'Coin national currency',
      art: false, artOut: 'States issued their own money; rampant inflation and worthless paper.',
      con: true,  conOut: 'Only Congress coins money; states cannot. Federal Reserve manages the dollar.',
      now: 'Today: a single national currency enables interstate commerce and modern banking.' },
    { topic: 'Make and enforce treaties',
      art: false, artOut: 'States ignored treaties (e.g., 1783 Treaty of Paris debts); foreign nations distrusted U.S.',
      con: true,  conOut: 'President negotiates, Senate ratifies by 2/3; treaties are supreme federal law.',
      now: 'Today: NATO, NAFTA/USMCA, climate accords are negotiated by the executive branch.' },
    { topic: 'Create federal courts',
      art: false, artOut: 'Only state courts existed; no uniform interpretation of national law.',
      con: true,  conOut: 'Article III courts apply federal law uniformly across all states.',
      now: 'Today: 94 federal district courts, 13 circuit courts, and the U.S. Supreme Court.' },
    { topic: 'Amend the governing document',
      art: false, artOut: 'Required unanimous state consent — never amended once in 8 years.',
      con: true,  conOut: 'Amendable by 2/3 of Congress + 3/4 of states; 27 amendments since 1791.',
      now: 'Today: realistic threshold means change is hard but possible — last amendment ratified 1992.' }
];

let flipped = []; // parallel: 'none' | 'art' | 'con'
let cardRects = []; // {x,y,w,h, side, idx}
let showWhy = false;
let whyBtn;

function setup() {
    updateCanvasSize();
    const c = createCanvas(containerWidth, containerHeight);
    c.parent(document.querySelector('main'));
    textSize(14);
    flipped = powers.map(() => 'none');
    whyBtn = createButton('Show "Why It Matters" Today');
    whyBtn.position(10, drawHeight + 8);
    whyBtn.mousePressed(() => {
        showWhy = !showWhy;
        whyBtn.html(showWhy ? 'Hide "Why It Matters" Today' : 'Show "Why It Matters" Today');
    });
}

function draw() {
    updateCanvasSize();
    background(248, 249, 250);

    // Title and instructions
    noStroke();
    fill(26, 58, 108);
    textSize(18);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Powers of the National Government — Articles vs. Constitution', canvasWidth / 2, 8);
    textStyle(NORMAL);
    textSize(12);
    fill(73, 80, 87);
    text('Click any card to flip it and reveal the real-world consequence.', canvasWidth / 2, 30);

    // Column headers
    const colW = (canvasWidth - 30) / 2;
    const leftX = 10, rightX = 20 + colW;
    const headerY = 50, headerH = 32;
    fill(220, 53, 69);
    rect(leftX, headerY, colW, headerH, 6);
    fill(40, 167, 69);
    rect(rightX, headerY, colW, headerH, 6);
    fill(255);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    textSize(15);
    text('Articles of Confederation (1781–89)', leftX + colW / 2, headerY + headerH / 2);
    text('U.S. Constitution (1789–present)', rightX + colW / 2, headerY + headerH / 2);
    textStyle(NORMAL);

    // Cards
    cardRects = [];
    const cardH = 50, gap = 6;
    let y = headerY + headerH + 8;
    for (let i = 0; i < powers.length; i++) {
        const p = powers[i];
        // Topic label centered between
        // Left card
        drawCard(leftX, y, colW, cardH, i, 'art', p);
        // Right card
        drawCard(rightX, y, colW, cardH, i, 'con', p);
        y += cardH + gap;
    }

    // Why it matters band
    if (showWhy) {
        const wy = y + 4;
        const wh = drawHeight - wy - 6;
        if (wh > 30) {
            fill(255, 248, 220);
            stroke(193, 154, 0);
            rect(10, wy, canvasWidth - 20, wh, 6);
            noStroke();
            fill(102, 77, 0);
            textAlign(LEFT, TOP);
            textSize(12);
            textStyle(BOLD);
            text('Why It Still Matters', 18, wy + 6);
            textStyle(NORMAL);
            // Show "now" for the most recently flipped card; else first
            let lastIdx = flipped.findIndex(f => f !== 'none');
            // pick the LAST flipped, walking from end
            for (let i = flipped.length - 1; i >= 0; i--) {
                if (flipped[i] !== 'none') { lastIdx = i; break; }
            }
            const showIdx = lastIdx >= 0 ? lastIdx : 0;
            text('"' + powers[showIdx].topic + '" — ' + powers[showIdx].now,
                 18, wy + 24, canvasWidth - 36, wh - 28);
        }
    }

    // Control region background
    noStroke();
    fill(233, 236, 239);
    rect(0, drawHeight, canvasWidth, controlHeight);
}

function drawCard(x, y, w, h, idx, side, p) {
    const isFront = flipped[idx] !== side;
    const has = side === 'art' ? p.art : p.con;
    cardRects.push({ x, y, w, h, side, idx });

    if (isFront) {
        // Front shows: power name + ✓ or ❌
        if (side === 'art') {
            fill(252, 230, 230);
            stroke(220, 53, 69);
        } else {
            fill(232, 245, 232);
            stroke(40, 167, 69);
        }
        rect(x, y, w, h, 6);
        noStroke();
        fill(side === 'art' ? color(120, 25, 35) : color(20, 100, 40));
        textAlign(LEFT, CENTER);
        textSize(13);
        textStyle(NORMAL);
        text(p.topic, x + 28, y + h / 2 - 1, w - 60, h);
        // Status icon
        textSize(20);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        if (has) {
            fill(40, 167, 69);
            text('✓', x + 14, y + h / 2);
        } else {
            fill(220, 53, 69);
            text('✗', x + 14, y + h / 2);
        }
        textStyle(NORMAL);
        textSize(10);
        fill(108, 117, 125);
        textAlign(RIGHT, CENTER);
        text('click to flip', x + w - 8, y + h - 8);
    } else {
        // Back shows: consequence
        const out = side === 'art' ? p.artOut : p.conOut;
        if (side === 'art') {
            fill(220, 53, 69);
        } else {
            fill(40, 167, 69);
        }
        stroke(side === 'art' ? color(150, 25, 35) : color(20, 100, 40));
        rect(x, y, w, h, 6);
        noStroke();
        fill(255);
        textAlign(LEFT, TOP);
        textSize(11);
        textStyle(BOLD);
        text('CONSEQUENCE:', x + 8, y + 4);
        textStyle(NORMAL);
        text(out, x + 8, y + 18, w - 16, h - 22);
        textSize(9);
        textAlign(RIGHT, BOTTOM);
        text('click to flip back', x + w - 8, y + h - 4);
    }
}

function mousePressed() {
    for (const r of cardRects) {
        if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) {
            flipped[r.idx] = (flipped[r.idx] === r.side) ? 'none' : r.side;
            return;
        }
    }
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
