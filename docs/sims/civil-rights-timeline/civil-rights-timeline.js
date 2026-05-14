// Civil Rights Milestones — vis-timeline
// CANVAS_HEIGHT: 820
document.addEventListener('DOMContentLoaded', function () {
    const items = [
        // Court decisions (purple)
        { id: 1, cat: 'case', ap: true,
          content: 'Plessy v. Ferguson',
          start: '1896-05-18',
          title: 'Plessy v. Ferguson (1896)',
          players: 'Homer Plessy; Justice Henry Billings Brown (majority); Justice Harlan (dissent)',
          significance: 'Established the "separate but equal" doctrine, legitimizing racial segregation laws across the South.',
          conn: 'Overturned by Brown v. Board of Education (1954).' },
        { id: 2, cat: 'case', ap: true,
          content: 'Brown v. Board',
          start: '1954-05-17',
          title: 'Brown v. Board of Education (1954)',
          players: 'Thurgood Marshall (NAACP); Chief Justice Earl Warren; Linda Brown',
          significance: 'Unanimously ruled that segregated public schools violate the Fourteenth Amendment\'s Equal Protection Clause.',
          conn: 'Overturned Plessy; led to the Civil Rights movement of the 1950s-60s.' },
        { id: 3, cat: 'case', ap: false,
          content: 'Heart of Atlanta v. U.S.',
          start: '1964-12-14',
          title: 'Heart of Atlanta Motel v. United States (1964)',
          players: 'U.S. Solicitor General Archibald Cox; Justice Tom Clark',
          significance: 'Upheld the Civil Rights Act\'s public accommodations provisions under the Commerce Clause.',
          conn: 'Validated the constitutional foundation of the Civil Rights Act of 1964.' },
        { id: 4, cat: 'case', ap: false,
          content: 'Loving v. Virginia',
          start: '1967-06-12',
          title: 'Loving v. Virginia (1967)',
          players: 'Mildred & Richard Loving; Chief Justice Earl Warren',
          significance: 'Struck down state laws banning interracial marriage as violating Equal Protection and Due Process.',
          conn: 'Foundational citation in later marriage-equality cases including Obergefell.' },
        { id: 5, cat: 'case', ap: false,
          content: 'Regents v. Bakke',
          start: '1978-06-28',
          title: 'Regents of the University of California v. Bakke (1978)',
          players: 'Allan Bakke; Justice Lewis Powell',
          significance: 'Allowed race as one factor in admissions but struck down rigid racial quotas.',
          conn: 'Set the framework challenged in Grutter (2003) and ultimately revisited in SFFA v. Harvard (2023).' },
        { id: 6, cat: 'case', ap: false,
          content: 'Grutter v. Bollinger',
          start: '2003-06-23',
          title: 'Grutter v. Bollinger (2003)',
          players: 'Barbara Grutter; Justice Sandra Day O\'Connor',
          significance: 'Reaffirmed that universities may consider race as one factor among many to achieve diversity.',
          conn: 'Largely overturned by SFFA v. Harvard (2023).' },
        { id: 7, cat: 'case', ap: false,
          content: 'Shelby County v. Holder',
          start: '2013-06-25',
          title: 'Shelby County v. Holder (2013)',
          players: 'Chief Justice John Roberts; AG Eric Holder',
          significance: 'Struck down the coverage formula in Section 4 of the Voting Rights Act, ending federal preclearance.',
          conn: 'Weakened the 1965 Voting Rights Act; sparked new state voting laws and redistricting fights.' },
        { id: 8, cat: 'case', ap: false,
          content: 'Obergefell v. Hodges',
          start: '2015-06-26',
          title: 'Obergefell v. Hodges (2015)',
          players: 'Jim Obergefell; Justice Anthony Kennedy',
          significance: 'Recognized a constitutional right to same-sex marriage under the Fourteenth Amendment.',
          conn: 'Built on Loving v. Virginia (1967); extended the equal-protection logic of marriage rights.' },
        { id: 9, cat: 'case', ap: false,
          content: 'Bostock v. Clayton County',
          start: '2020-06-15',
          title: 'Bostock v. Clayton County (2020)',
          players: 'Gerald Bostock; Justice Neil Gorsuch',
          significance: 'Title VII\'s ban on sex discrimination prohibits firing employees for being gay or transgender.',
          conn: 'Extended the reach of the 1964 Civil Rights Act to LGBTQ workplace protections.' },
        { id: 10, cat: 'case', ap: false,
          content: 'SFFA v. Harvard',
          start: '2023-06-29',
          title: 'Students for Fair Admissions v. Harvard (2023)',
          players: 'Edward Blum (SFFA); Chief Justice John Roberts',
          significance: 'Held that race-conscious admissions programs at Harvard and UNC violate the Equal Protection Clause.',
          conn: 'Effectively overturned Grutter (2003) and the Bakke framework for race in admissions.' },

        // Legislation / Events / Executive (lower band)
        { id: 21, cat: 'event', ap: false,
          content: 'Montgomery Bus Boycott',
          start: '1955-12-05', end: '1956-12-20',
          title: 'Montgomery Bus Boycott (1955-56)',
          players: 'Rosa Parks; Dr. Martin Luther King Jr.; Montgomery Improvement Association',
          significance: 'Yearlong boycott that ended segregation on Montgomery\'s public buses.',
          conn: 'Launched MLK as a national leader; modeled later nonviolent protest campaigns.' },
        { id: 22, cat: 'event', ap: false,
          content: 'Greensboro Sit-ins',
          start: '1960-02-01',
          title: 'Greensboro Sit-ins (1960)',
          players: 'Four NC A&T students; SNCC organizers',
          significance: 'Ignited a wave of nonviolent sit-ins that desegregated lunch counters across the South.',
          conn: 'Built grassroots momentum that pushed the Civil Rights Act forward.' },
        { id: 23, cat: 'event', ap: false,
          content: 'March on Washington',
          start: '1963-08-28',
          title: 'March on Washington for Jobs and Freedom (1963)',
          players: 'A. Philip Randolph; Bayard Rustin; Dr. Martin Luther King Jr.',
          significance: '~250,000-person march where MLK delivered the "I Have a Dream" speech.',
          conn: 'Built decisive public pressure for the Civil Rights Act of 1964.' },
        { id: 24, cat: 'legislation', ap: false,
          content: 'Civil Rights Act',
          start: '1964-07-02',
          title: 'Civil Rights Act of 1964',
          players: 'Pres. Lyndon B. Johnson; Sen. Hubert Humphrey; Rep. Emanuel Celler',
          significance: 'Banned discrimination on the basis of race, color, religion, sex, or national origin in public accommodations and employment.',
          conn: 'Implemented the constitutional promise reasserted in Brown (1954); upheld in Heart of Atlanta (1964).' },
        { id: 25, cat: 'event', ap: false,
          content: 'Selma Marches',
          start: '1965-03-07', end: '1965-03-25',
          title: 'Selma to Montgomery Marches (1965)',
          players: 'John Lewis; Hosea Williams; Dr. Martin Luther King Jr.',
          significance: 'Marches met with violence on "Bloody Sunday" focused national attention on voting-rights abuses.',
          conn: 'Created the political momentum that produced the Voting Rights Act of 1965.' },
        { id: 26, cat: 'legislation', ap: false,
          content: 'Voting Rights Act',
          start: '1965-08-06',
          title: 'Voting Rights Act of 1965',
          players: 'Pres. Lyndon B. Johnson; AG Nicholas Katzenbach',
          significance: 'Banned literacy tests and authorized federal preclearance of voting changes in covered jurisdictions.',
          conn: 'Largely gutted by Shelby County v. Holder (2013).' },
        { id: 27, cat: 'legislation', ap: false,
          content: 'Fair Housing Act',
          start: '1968-04-11',
          title: 'Fair Housing Act of 1968',
          players: 'Pres. Lyndon B. Johnson; Sen. Walter Mondale',
          significance: 'Prohibited discrimination in the sale, rental, and financing of housing.',
          conn: 'Title VIII of the Civil Rights Act of 1968; passed days after MLK\'s assassination.' },
        { id: 28, cat: 'legislation', ap: false,
          content: 'Americans with Disabilities Act',
          start: '1990-07-26',
          title: 'Americans with Disabilities Act (1990)',
          players: 'Pres. George H.W. Bush; Sen. Tom Harkin; Rep. Tony Coelho',
          significance: 'Banned discrimination against people with disabilities in employment, public services, and accommodations.',
          conn: 'Extended the civil-rights framework of 1964 to disability status.' }
    ];

    // Stamp class names by category and AP status
    items.forEach(it => {
        let cls = it.cat;
        if (it.ap) cls += ' ap';
        it.className = cls;
    });

    const allItems = items.slice();
    const dataset = new vis.DataSet(allItems);
    const container = document.getElementById('timeline');

    const options = {
        width: '100%',
        height: '500px',
        margin: { item: { horizontal: 10, vertical: 6 }, axis: 30 },
        orientation: 'top',
        zoomMin: 1000 * 60 * 60 * 24 * 365 * 5,
        zoomMax: 1000 * 60 * 60 * 24 * 365 * 200,
        min: new Date(1880, 0, 1),
        max: new Date(2045, 0, 1),
        stack: true,
        selectable: true,
        showCurrentTime: false,
        moveable: true,
        zoomable: false,
        align: 'center'
    };

    const timeline = new vis.Timeline(container, dataset, options);

    // Don't hijack page vertical scroll
    container.addEventListener('wheel', function (e) {
        const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
        if (!isHorizontal) {
            e.stopImmediatePropagation();
        }
    }, true);

    function fitToData() {
        const ts = allItems.map(i => new Date(i.start).getTime());
        const minD = Math.min(...ts), maxD = Math.max(...ts);
        const year = 365 * 24 * 60 * 60 * 1000;
        const padL = 18 * year, padR = 15 * year;
        timeline.setWindow(new Date(minD - padL), new Date(maxD + padR), { animation: false });
    }
    fitToData();

    // Detail panel
    const info = document.getElementById('info');
    timeline.on('select', function (props) {
        if (props.items.length === 0) return;
        const it = allItems.find(x => x.id === props.items[0]);
        if (!it) return;
        info.innerHTML =
            '<h3>' + it.title + '</h3>' +
            '<div class="meta">Key players: ' + it.players + '</div>' +
            '<div>' + it.significance + '</div>' +
            (it.conn ? '<div class="conn">→ ' + it.conn + '</div>' : '');
    });

    // Filter by category
    document.getElementById('catFilter').addEventListener('change', function (e) {
        applyFilters();
    });
    // AP toggle
    const apBtn = document.getElementById('apBtn');
    let apOnly = false;
    apBtn.addEventListener('click', function () {
        apOnly = !apOnly;
        apBtn.classList.toggle('on', apOnly);
        apBtn.textContent = apOnly ? 'Show All Cases' : 'Show AP Required Cases Only';
        applyFilters();
    });

    function applyFilters() {
        const cat = document.getElementById('catFilter').value;
        let filtered = allItems.filter(it => {
            if (cat !== 'all' && it.cat !== cat) return false;
            if (apOnly && !it.ap) return false;
            return true;
        });
        dataset.clear();
        dataset.add(filtered);
    }

    document.getElementById('fitBtn').addEventListener('click', fitToData);
});
