// Constitutional Amendment Timeline — vis-timeline
// CANVAS_HEIGHT: 660
document.addEventListener('DOMContentLoaded', function () {
    // Course-highlighted amendments (per spec): 1, 2, 4, 5, 6, 8, 14, 15, 19, 26
    const starred = new Set([1, 2, 4, 5, 6, 8, 14, 15, 19, 26]);

    const data = [
        { n: 1,  year: 1791, era: 'bor',    summary: 'Freedom of religion, speech, press, assembly, and petition.',                       driver: 'Antifederalist demand for explicit civil-liberty guarantees as a price of ratification.' },
        { n: 2,  year: 1791, era: 'bor',    summary: 'Right to keep and bear arms; prefatory clause references a well-regulated militia.',driver: 'Suspicion of standing armies; reliance on state militias for common defense.' },
        { n: 3,  year: 1791, era: 'bor',    summary: 'Bars peacetime quartering of soldiers in private homes without consent.',           driver: 'Direct response to British Quartering Acts that preceded the Revolution.' },
        { n: 4,  year: 1791, era: 'bor',    summary: 'Protects against unreasonable searches and seizures; warrants require probable cause.', driver: 'Reaction to British "writs of assistance" — open-ended general search warrants.' },
        { n: 5,  year: 1791, era: 'bor',    summary: 'Grand jury, double jeopardy, self-incrimination, due process, and takings clauses.', driver: 'English common-law protections against arbitrary criminal prosecution.' },
        { n: 6,  year: 1791, era: 'bor',    summary: 'Speedy and public jury trial; right to counsel and to confront witnesses.',         driver: 'Concern about secret trials and politically motivated prosecution.' },
        { n: 7,  year: 1791, era: 'bor',    summary: 'Right to a jury trial in federal civil cases above a $20 threshold.',                driver: 'Continuation of the English civil-jury tradition.' },
        { n: 8,  year: 1791, era: 'bor',    summary: 'No excessive bail or fines; no cruel and unusual punishments.',                       driver: 'Mirrors the English Bill of Rights of 1689.' },
        { n: 9,  year: 1791, era: 'bor',    summary: 'Rights enumerated in the Constitution do not deny other rights retained by the people.', driver: 'Federalist worry that listing rights would be read as exclusive.' },
        { n: 10, year: 1791, era: 'bor',    summary: 'Powers not delegated to the U.S. nor prohibited to the states are reserved to the states or the people.', driver: 'Foundational federalism principle protecting state authority.' },
        { n: 11, year: 1795, era: 'other',  summary: 'Limits federal-court suits brought against a state by citizens of another state.',  driver: 'Reaction to Chisholm v. Georgia (1793), which allowed such a suit.' },
        { n: 12, year: 1804, era: 'other',  summary: 'Separate electoral ballots for President and Vice President.',                       driver: 'Election of 1800 deadlock between Jefferson and Burr exposed the original system\'s flaw.' },
        { n: 13, year: 1865, era: 'civ',    summary: 'Abolished slavery and involuntary servitude (except as criminal punishment).',       driver: 'Civil War; the Emancipation Proclamation needed permanent constitutional standing.' },
        { n: 14, year: 1868, era: 'civ',    summary: 'Birthright citizenship, Due Process and Equal Protection clauses; basis for incorporation.', driver: 'Reconstruction; required to overturn Dred Scott (1857) and protect freed-people\'s rights.' },
        { n: 15, year: 1870, era: 'civ',    summary: 'Right to vote may not be denied on account of race, color, or previous condition of servitude.', driver: 'Reconstruction-era effort to secure Black male suffrage.' },
        { n: 16, year: 1913, era: 'prog',   summary: 'Authorized federal income tax without apportionment among states.',                  driver: 'Progressive-era demand to replace tariffs with a more progressive revenue source.' },
        { n: 17, year: 1913, era: 'prog',   summary: 'Direct popular election of U.S. senators (replacing state-legislature selection).', driver: 'Progressive reform reacting to corruption and deadlocked legislative selections.' },
        { n: 18, year: 1919, era: 'prog',   summary: 'National prohibition of the manufacture, sale, and transport of alcohol.',           driver: 'Decades-long temperance movement; later repealed by the 21st Amendment.' },
        { n: 19, year: 1920, era: 'prog',   summary: 'Right to vote may not be denied on account of sex (women\'s suffrage).',             driver: 'Decades of organizing by NAWSA, NWP, and state-level suffragists.' },
        { n: 20, year: 1933, era: 'expand', summary: 'Moved presidential and congressional terms to January, ending "lame duck" sessions.', driver: 'Modern transportation made the long March transition unnecessary.' },
        { n: 21, year: 1933, era: 'expand', summary: 'Repealed the 18th Amendment (Prohibition).',                                          driver: 'Failure of Prohibition to curb alcohol use; rise of organized crime.' },
        { n: 22, year: 1951, era: 'expand', summary: 'Two-term limit (or maximum 10 years) for the presidency.',                            driver: 'Reaction to FDR\'s four elections; codified the Washington two-term tradition.' },
        { n: 23, year: 1961, era: 'expand', summary: 'Granted DC three electoral votes for presidential elections.',                       driver: 'Civil-rights-era recognition that DC residents lacked presidential franchise.' },
        { n: 24, year: 1964, era: 'expand', summary: 'Banned poll taxes in federal elections.',                                             driver: 'Civil rights movement targeting Jim Crow voter-suppression measures.' },
        { n: 25, year: 1967, era: 'expand', summary: 'Presidential succession and disability procedures, including VP vacancy filling.',   driver: 'Kennedy assassination revealed gaps in the original Constitution\'s succession rules.' },
        { n: 26, year: 1971, era: 'expand', summary: 'Lowered voting age to 18 in all elections.',                                          driver: 'Vietnam War — "old enough to fight, old enough to vote."' },
        { n: 27, year: 1992, era: 'other',  summary: 'Congressional pay raises take effect only after the next House election.',           driver: 'Originally proposed in 1789; ratified after a 203-year campaign by Gregory Watson.' }
    ];

    const items = data.map(d => ({
        id: d.n,
        content: starred.has(d.n) ? '★ ' + d.n : String(d.n),
        start: new Date(d.year, 5, 30),
        title: 'Amendment ' + d.n + ' (' + d.year + ')',
        className: d.era + (starred.has(d.n) ? ' starred' : ''),
        n: d.n, year: d.year, era: d.era, summary: d.summary, driver: d.driver
    }));

    const allItems = items.slice();
    const dataset = new vis.DataSet(allItems);
    const container = document.getElementById('timeline');

    const options = {
        width: '100%',
        height: '500px',
        margin: { item: { horizontal: 10, vertical: 6 }, axis: 30 },
        orientation: 'top',
        zoomMin: 1000 * 60 * 60 * 24 * 365 * 5,
        zoomMax: 1000 * 60 * 60 * 24 * 365 * 300,
        min: new Date(1780, 0, 1),
        max: new Date(2050, 0, 1),
        stack: true,
        selectable: true,
        showCurrentTime: false,
        moveable: true,
        zoomable: false,
        align: 'center'
    };

    const timeline = new vis.Timeline(container, dataset, options);

    container.addEventListener('wheel', function (e) {
        if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) e.stopImmediatePropagation();
    }, true);

    function fitToData() {
        const ts = allItems.map(i => i.start.getTime());
        const minD = Math.min(...ts), maxD = Math.max(...ts);
        const year = 365 * 24 * 60 * 60 * 1000;
        const padL = 8 * year, padR = 20 * year;
        timeline.setWindow(new Date(minD - padL), new Date(maxD + padR), { animation: false });
    }
    fitToData();

    const info = document.getElementById('info');
    timeline.on('select', function (props) {
        if (props.items.length === 0) return;
        const it = allItems.find(x => x.id === props.items[0]);
        if (!it) return;
        const star = starred.has(it.n) ? ' <span style="color:#b8860b">★ Course-covered</span>' : '';
        info.innerHTML =
            '<h3>Amendment ' + it.n + ' — ' + it.year + star + '</h3>' +
            '<div class="summary">' + it.summary + '</div>' +
            '<div class="driver">Historical driver: ' + it.driver + '</div>';
    });

    document.getElementById('eraFilter').addEventListener('change', function () {
        const era = this.value;
        const filtered = (era === 'all') ? allItems : allItems.filter(i => i.era === era);
        dataset.clear();
        dataset.add(filtered);
    });

    document.getElementById('fitBtn').addEventListener('click', fitToData);
});
