// Cognitive Bias in Political Reasoning — Scenario Identifier
// CANVAS_HEIGHT: 540

let containerWidth;
let canvasWidth = 800;
let drawHeight = 460;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

const BIASES = [
    { id: 'confirm',  label: 'Confirmation bias' },
    { id: 'motiv',    label: 'Motivated reasoning' },
    { id: 'avail',    label: 'Availability heuristic' },
    { id: 'ingroup',  label: 'In-group favoritism' },
    { id: 'anchor',   label: 'Anchoring bias' }
];

const SCENARIOS = [
    {
        text: 'When I heard the crime rate had dropped, I immediately looked for reasons the statistic might be wrong — because I believe crime is getting worse.',
        ans: 'confirm',
        also: ['motiv'],
        explain: 'Confirmation bias: actively seeking out reasons to dismiss information that contradicts a prior belief, while uncritically accepting confirming information. Closely related to motivated reasoning — both share the trait of treating evidence asymmetrically depending on whether it supports your prior view.'
    },
    {
        text: 'I read about a recent terrorist attack and now I think terrorism is the #1 threat facing the country, even though car accidents kill far more Americans each year.',
        ans: 'avail',
        explain: 'Availability heuristic: judging the probability of an event by how easily examples come to mind. Vivid, recent, or memorable events feel more frequent than they are. Cable news coverage of terrorism dwarfs coverage of mundane causes of death like car crashes.'
    },
    {
        text: 'I think my party\'s candidate using executive orders to bypass Congress is normal and necessary, but the other party\'s candidate doing the exact same thing is a constitutional crisis.',
        ans: 'ingroup',
        also: ['motiv'],
        explain: 'In-group favoritism: applying different standards to actions by your own group versus the opposing group. Often combined with motivated reasoning — you generate post-hoc justifications for why your side\'s behavior is acceptable while the other side\'s is not.'
    },
    {
        text: 'The pollster first told me the candidate was at 70%, so when they revised down to 52%, it still felt high — even though 52% is much closer to a coin flip than to a landslide.',
        ans: 'anchor',
        explain: 'Anchoring bias: the first number you hear becomes a mental reference point that pulls subsequent judgments toward it. The 70% figure "anchored" your sense of normal, making 52% feel impressive when in absolute terms it\'s a slim lead.'
    },
    {
        text: 'I only follow news sources that share my political views. When my friend sends me an article from the other side, I don\'t even read it before I dismiss it as biased.',
        ans: 'confirm',
        explain: 'Confirmation bias: deliberately curating your information environment to filter out disconfirming evidence. The behavior reinforces itself over time — your news diet keeps confirming what you already believe.'
    },
    {
        text: 'I supported a policy for years. Then a study showed it doesn\'t work. Instead of updating my view, I attacked the methodology of the study without reading it.',
        ans: 'motiv',
        also: ['confirm'],
        explain: 'Motivated reasoning: the unconscious process of evaluating evidence based on whether it supports a desired conclusion. You apply higher scrutiny to evidence that threatens your position and lower scrutiny to evidence that supports it.'
    },
    {
        text: 'A school shooting was on the news every day for two weeks. I now feel that schools have become unsafe, even though school shooting deaths remain statistically rare per student per year.',
        ans: 'avail',
        explain: 'Availability heuristic: extensive news coverage makes events feel more common. Risk perception is shaped more by the visibility of an event than by its statistical frequency.'
    },
    {
        text: 'During a debate, the moderator says "this candidate raised taxes by 45% in their last term." Even when fact-checkers show the figure was actually 4.5%, my impression of the candidate as a "huge tax raiser" persists.',
        ans: 'anchor',
        explain: 'Anchoring bias: the original (wrong) anchor of 45% pulled your overall impression in that direction, even after correction. Studies show retractions rarely fully undo the impact of the initial claim.'
    }
];

let currentIdx = 0;
let answered = new Array(SCENARIOS.length).fill(null); // store the bias id chosen
let prevBtn, nextBtn, biasBtns;
let resetBtn;

function setup() {
    updateCanvasSize();
    const c = createCanvas(containerWidth, containerHeight);
    c.parent(document.querySelector('main'));
    textSize(13);

    prevBtn = createButton('← Previous');
    prevBtn.position(10, drawHeight + 10);
    prevBtn.mousePressed(() => { currentIdx = (currentIdx - 1 + SCENARIOS.length) % SCENARIOS.length; });

    nextBtn = createButton('Next →');
    nextBtn.position(110, drawHeight + 10);
    nextBtn.mousePressed(() => { currentIdx = (currentIdx + 1) % SCENARIOS.length; });

    resetBtn = createButton('Reset Quiz');
    resetBtn.position(canvasWidth - 100, drawHeight + 10);
    resetBtn.mousePressed(() => { answered = new Array(SCENARIOS.length).fill(null); currentIdx = 0; });
}

function draw() {
    updateCanvasSize();
    background(248, 249, 250);

    // Title
    noStroke();
    fill(26, 58, 108);
    textSize(17);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Identify the Cognitive Bias', canvasWidth / 2, 6);
    textStyle(NORMAL);
    textSize(11);
    fill(73, 80, 87);
    text('Read each scenario and click the bias that best describes the reasoning. Then read the explanation.',
         canvasWidth / 2, 28);

    // Score in the corner
    const correct = answered.reduce((s, a, i) => s + (a === SCENARIOS[i].ans ? 1 : 0), 0);
    const done = answered.filter(a => a !== null).length;
    fill(50);
    textAlign(RIGHT, TOP);
    textSize(11);
    text('Score: ' + correct + ' / ' + done + ' (of ' + SCENARIOS.length + ')',
         canvasWidth - 12, 8);

    // Card area
    const cardX = 20, cardY = 50;
    const cardW = canvasWidth - 40;
    const cardH = drawHeight - 110;

    fill(255);
    stroke(180);
    rect(cardX, cardY, cardW, cardH, 8);
    noStroke();

    // Card header (scenario number)
    fill(26, 58, 108);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(12);
    text('Scenario ' + (currentIdx + 1) + ' of ' + SCENARIOS.length,
         cardX + 12, cardY + 10);
    textStyle(NORMAL);

    // Scenario text
    const sc = SCENARIOS[currentIdx];
    fill(33, 37, 41);
    textSize(13);
    textStyle(ITALIC);
    text('"' + sc.text + '"', cardX + 12, cardY + 32, cardW - 24, 100);
    textStyle(NORMAL);

    const choiceTop = cardY + 142;
    const ans = answered[currentIdx];

    if (ans === null) {
        // Choices
        fill(73, 80, 87);
        textSize(11);
        text('Which bias best fits this reasoning?', cardX + 12, choiceTop);
        const btnW = (cardW - 30) / BIASES.length;
        const btnH = 40;
        for (let i = 0; i < BIASES.length; i++) {
            const bx = cardX + 12 + i * btnW;
            const by = choiceTop + 22;
            const hovering = mouseX > bx && mouseX < bx + btnW - 6 &&
                             mouseY > by && mouseY < by + btnH;
            fill(hovering ? color(13, 71, 161) : color(220, 230, 245));
            stroke(13, 71, 161);
            rect(bx, by, btnW - 6, btnH, 6);
            noStroke();
            fill(hovering ? 255 : color(13, 71, 161));
            textAlign(CENTER, CENTER);
            textStyle(BOLD);
            textSize(11);
            text(BIASES[i].label, bx + (btnW - 6) / 2, by + btnH / 2);
            textStyle(NORMAL);
            if (mouseIsPressed && _justClicked && hovering) {
                answered[currentIdx] = BIASES[i].id;
                _justClicked = false;
            }
        }
    } else {
        // Reveal answer
        const correctAns = (ans === sc.ans) || (sc.also && sc.also.includes(ans));
        const ansBias = BIASES.find(b => b.id === ans);
        const trueBias = BIASES.find(b => b.id === sc.ans);

        fill(correctAns ? color(40, 167, 69) : color(220, 53, 69));
        textAlign(LEFT, TOP);
        textStyle(BOLD);
        textSize(13);
        text((correctAns ? '✓ ' : '✗ ') + 'Your answer: ' + ansBias.label,
             cardX + 12, choiceTop);
        textStyle(NORMAL);
        fill(33, 37, 41);
        textSize(12);
        text('Best answer: ' + trueBias.label +
             (sc.also ? '  (also reasonable: ' + sc.also.map(id => BIASES.find(b => b.id === id).label).join(', ') + ')' : ''),
             cardX + 12, choiceTop + 22, cardW - 24);

        textStyle(BOLD);
        text('Why:', cardX + 12, choiceTop + 50);
        textStyle(NORMAL);
        text(sc.explain, cardX + 12, choiceTop + 66, cardW - 24, cardH - (choiceTop + 66 - cardY) - 12);
    }

    // Final summary screen if all answered
    const allAnswered = answered.every(a => a !== null);
    if (allAnswered && currentIdx === SCENARIOS.length - 1) {
        const banY = drawHeight - 90;
        fill(255, 248, 220);
        stroke(193, 154, 0);
        rect(20, banY, canvasWidth - 40, 30, 6);
        noStroke();
        fill(102, 77, 0);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        textSize(13);
        text('★ Quiz complete: ' + correct + ' of ' + SCENARIOS.length +
             ' correct.  Click "Reset Quiz" to try again.',
             canvasWidth / 2, banY + 15);
        textStyle(NORMAL);
    }

    // Control region
    noStroke();
    fill(233, 236, 239);
    rect(0, drawHeight, canvasWidth, controlHeight);
    fill(50);
    textAlign(LEFT, TOP);
    textSize(11);
    text('Use ← / → to walk through all 8 scenarios. Each click is recorded toward your score.',
         210, drawHeight + 18);
}

let _justClicked = false;
function mousePressed() { _justClicked = true; }

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    resetBtn.position(canvasWidth - 100, drawHeight + 10);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
