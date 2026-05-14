// How a Bill Becomes a Law — Interactive Flowchart
// CANVAS_HEIGHT: 652

let containerWidth;
let canvasWidth = 800;
let drawHeight = 612;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Step types: 'active' (blue), 'kill' (red), 'success' (green), 'choice' (yellow)
const steps = [
    { id: 1, label: '1. Bill Introduced', type: 'active',
      who: 'Any Senator or Representative',
      what: 'Bill is dropped in the hopper (House) or read into the record (Senate). Receives a number (H.R.### or S.###).',
      stat: '~10,000–15,000 bills introduced per Congress; fewer than 5% become law.' },
    { id: 2, label: '2. Referred to Committee', type: 'active',
      who: 'Speaker (House) or Presiding Officer (Senate)',
      what: 'Bill is referred to the committee(s) with subject-matter jurisdiction.',
      stat: '~80% of bills go to committee and never come back out.' },
    { id: 3, label: '3. Subcommittee Hearing & Markup', type: 'kill',
      who: 'Subcommittee chair and members',
      what: 'Subcommittee may hold hearings, amend the bill, and report it to the full committee.',
      stat: 'KILL POINT: Most bills die here — chair never schedules a hearing.' },
    { id: 4, label: '4. Full Committee Markup & Vote', type: 'kill',
      who: 'Committee chair and members',
      what: 'Full committee debates, amends, and votes whether to report the bill to the floor.',
      stat: 'KILL POINT: Committee can vote not to report the bill.' },
    { id: 5, label: '5. Rules Committee (House only)', type: 'kill',
      who: 'House Rules Committee',
      what: 'Sets terms of floor debate: time allocation, amendments allowed (open/closed/structured rule).',
      stat: 'KILL POINT: Unfavorable rule or no rule granted = bill cannot reach floor.' },
    { id: 6, label: '6. Floor Debate & Amendments', type: 'active',
      who: 'Full chamber',
      what: 'Members debate the bill, propose amendments, and vote on each amendment.',
      stat: 'Senate may filibuster (60 votes to invoke cloture); House debate is rule-bound.' },
    { id: 7, label: '7. Chamber Floor Vote', type: 'kill',
      who: 'Full chamber',
      what: 'Simple majority required to pass (218 House / 51 Senate, with 60 to overcome filibuster).',
      stat: 'KILL POINT: Majority votes no.' },
    { id: 8, label: '8. Other Chamber (repeats 2–7)', type: 'kill',
      who: 'The other chamber of Congress',
      what: 'Bill goes through committees and floor vote in the other chamber.',
      stat: 'KILL POINT: Other chamber kills the bill or never takes it up.' },
    { id: 9, label: '9. Conference Committee (if versions differ)', type: 'choice',
      who: 'Conferees from both chambers',
      what: 'Reconciles differences between House and Senate versions; produces a compromise.',
      stat: 'About 1 in 5 bills that pass both chambers need conference reconciliation.' },
    { id: 10, label: '10. Conference Report Vote', type: 'kill',
      who: 'Both chambers',
      what: 'Each chamber votes up-or-down on the unified conference text — no further amendment.',
      stat: 'KILL POINT: Either chamber rejects the conference report.' },
    { id: 11, label: '11. Enrolled Bill → President', type: 'active',
      who: 'Speaker, President pro tem, and President',
      what: 'Bill is engrossed, signed by chamber leaders, and presented to the President.',
      stat: '' },
    { id: 12, label: '12. Presidential Action', type: 'choice',
      who: 'President',
      what: 'Sign → law. Veto → returns to Congress. Pocket veto (Congress adjourned) = killed. No action while Congress in session = becomes law after 10 days.',
      stat: '' },
    { id: 13, label: '13. Veto Override (if vetoed)', type: 'kill',
      who: 'Both chambers',
      what: '2/3 vote in BOTH chambers required to override a presidential veto.',
      stat: 'KILL POINT: Override fails. Only ~7% of vetoes have been overridden in U.S. history.' },
    { id: 14, label: '14. Becomes Law', type: 'success',
      who: 'United States Code',
      what: 'Bill is assigned a Public Law number (PL ###-###) and codified.',
      stat: '' }
];

let nodeRects = [];
let selected = 0; // default first

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
    text('How a Bill Becomes a Law', canvasWidth / 2, 6);
    textStyle(NORMAL);
    textSize(11);
    fill(73, 80, 87);
    text('Click any step. Red = "kill points" where most bills die. Blue = active steps. Green = success.',
         canvasWidth / 2, 28);

    // Layout: vertical nodes on left half, info panel on right half
    const leftW = canvasWidth * 0.50;
    const rightX = leftW + 8;
    const rightW = canvasWidth - rightX - 10;

    // Compute node positions
    nodeRects = [];
    const top = 50;
    const nodeH = 32;
    const gap = 7;
    const spacing = nodeH + gap;
    for (let i = 0; i < steps.length; i++) {
        const s = steps[i];
        const x = 20;
        const y = top + i * spacing;
        const w = leftW - 30;
        nodeRects.push({ x, y, w, h: nodeH, idx: i });

        // Connector arrow from previous to this
        if (i > 0) {
            stroke(120);
            strokeWeight(2);
            const prev = nodeRects[i - 1];
            line(prev.x + prev.w / 2, prev.y + prev.h, x + w / 2, y);
            // Arrowhead
            noStroke();
            fill(120);
            triangle(x + w / 2 - 4, y - 1, x + w / 2 + 4, y - 1, x + w / 2, y + 5);
        }

        // Node fill by type
        const isSel = selected === i;
        let fillC;
        if (s.type === 'kill')      fillC = color(220, 53, 69);
        else if (s.type === 'success') fillC = color(40, 167, 69);
        else if (s.type === 'choice')  fillC = color(255, 193, 7);
        else                            fillC = color(33, 150, 243);
        if (!isSel) fillC.setAlpha(180);
        noStroke();
        fill(fillC);
        if (isSel) { stroke(0); strokeWeight(2); }
        rect(x, y, w, nodeH, 5);
        noStroke();
        fill(s.type === 'choice' ? color(60, 40, 0) : 255);
        textAlign(LEFT, CENTER);
        textSize(11);
        textStyle(isSel ? BOLD : NORMAL);
        text(s.label, x + 8, y + nodeH / 2);
        textStyle(NORMAL);
    }

    // Info panel on right
    const infoTop = top;
    const infoH = drawHeight - infoTop - 10;
    fill(255);
    stroke(180);
    strokeWeight(1);
    rect(rightX, infoTop, rightW, infoH, 6);
    noStroke();
    const s = steps[selected];
    fill(26, 58, 108);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(14);
    text(s.label, rightX + 12, infoTop + 12, rightW - 24);
    textStyle(NORMAL);

    fill(108, 117, 125);
    textSize(11);
    text('Who is involved:', rightX + 12, infoTop + 50);
    fill(33, 37, 41);
    textSize(12);
    text(s.who, rightX + 12, infoTop + 64, rightW - 24, 40);

    fill(108, 117, 125);
    textSize(11);
    text('What happens:', rightX + 12, infoTop + 110);
    fill(33, 37, 41);
    textSize(12);
    text(s.what, rightX + 12, infoTop + 124, rightW - 24, 100);

    if (s.stat) {
        fill(108, 117, 125);
        textSize(11);
        text('Statistics / kill point:', rightX + 12, infoTop + 230);
        fill(s.stat.startsWith('KILL') ? color(180, 0, 0) : color(33, 37, 41));
        textSize(12);
        textStyle(BOLD);
        text(s.stat, rightX + 12, infoTop + 244, rightW - 24, 90);
        textStyle(NORMAL);
    }

    // Test-a-scenario message
    if (s.type === 'kill') {
        fill(255, 235, 235);
        stroke(220, 53, 69);
        rect(rightX + 12, infoTop + infoH - 90, rightW - 24, 78, 5);
        noStroke();
        fill(120, 25, 35);
        textStyle(BOLD);
        textAlign(LEFT, TOP);
        textSize(12);
        text('Your bill died here.', rightX + 22, infoTop + infoH - 84);
        textStyle(NORMAL);
        textSize(11);
        text('What would it take to revive it? Typically: get the gatekeeper (committee chair, ' +
             'Rules Committee, opposing chamber leadership) to agree to schedule action. Lobbying, ' +
             'leadership pressure, or attaching the bill to "must-pass" legislation are the usual paths.',
             rightX + 22, infoTop + infoH - 66, rightW - 44, 60);
    } else if (s.type === 'success') {
        fill(232, 245, 232);
        stroke(40, 167, 69);
        rect(rightX + 12, infoTop + infoH - 90, rightW - 24, 78, 5);
        noStroke();
        fill(20, 100, 40);
        textStyle(BOLD);
        textAlign(LEFT, TOP);
        textSize(12);
        text('Congratulations — your bill is now law!', rightX + 22, infoTop + infoH - 84);
        textStyle(NORMAL);
        textSize(11);
        text('Of ~10,000–15,000 bills introduced each Congress, fewer than 5% reach this point.',
             rightX + 22, infoTop + infoH - 66, rightW - 44, 60);
    }

    // Control region
    noStroke();
    fill(233, 236, 239);
    rect(0, drawHeight, canvasWidth, controlHeight);
    fill(50);
    textAlign(LEFT, TOP);
    textSize(11);
    text('Click any step in the left flowchart to learn what happens, who is involved, and where bills die.',
         10, drawHeight + 14);
}

function mousePressed() {
    for (const r of nodeRects) {
        if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) {
            selected = r.idx;
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
