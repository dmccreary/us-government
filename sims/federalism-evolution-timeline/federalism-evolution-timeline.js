// Federalism Evolution Timeline — vis-timeline
// CANVAS_HEIGHT: 640
document.addEventListener('DOMContentLoaded', function () {
    const data = [
        // Ghost padding items — invisible spacers that extend the fit window so the
        // earliest and latest real items aren't clipped at the timeline edges.
        { id: 100, year: 1795, era: 'ghost', shift: '', title: '', body: '' },
        { id: 101, year: 2050, era: 'ghost', shift: '', title: '', body: '' },
        // Dual Federalism (1789–1933)
        { id: 1, year: 1819, era: 'dual', shift: 'nat',
          title: 'McCulloch v. Maryland',
          body: 'Established the doctrine of implied powers under the Necessary and Proper Clause and held that states cannot tax federal instrumentalities.' },
        { id: 2, year: 1824, era: 'dual', shift: 'nat',
          title: 'Gibbons v. Ogden',
          body: 'Broadly defined the federal commerce power, allowing Congress to regulate interstate navigation and laying foundation for later federal economic regulation.' },
        { id: 3, year: 1890, era: 'dual', shift: 'nat',
          title: 'Sherman Antitrust Act',
          body: 'First major federal effort to regulate corporate power; signaled growing willingness to intervene in the national economy.' },
        { id: 4, year: 1905, era: 'dual', shift: 'state',
          title: 'Lochner v. New York',
          body: 'Struck down a state maximum-hours law as a violation of "liberty of contract"; symbolized the era\'s constraints on government regulation generally.' },
        // Cooperative (1933–1970s)
        { id: 5, year: 1933, era: 'coop', shift: 'nat',
          title: 'New Deal Programs Begin',
          body: 'Federal government takes lead role in economic recovery via the AAA, NRA, CCC, TVA, and other programs administered cooperatively with states.' },
        { id: 6, year: 1935, era: 'coop', shift: 'nat',
          title: 'Social Security Act',
          body: 'Created a permanent federal old-age insurance system and unemployment program, with state-administered components — the model of cooperative federalism.' },
        { id: 7, year: 1937, era: 'coop', shift: 'nat',
          title: 'NLRB v. Jones & Laughlin Steel',
          body: 'Court abandoned old Commerce Clause limits, upholding broad federal labor regulation. End of the Lochner-era constitutional ceiling on national power.' },
        { id: 8, year: 1965, era: 'coop', shift: 'nat',
          title: 'Great Society Programs',
          body: 'Medicare, Medicaid, federal aid to education, and Voting Rights Act dramatically expanded federal role in social policy.' },
        { id: 9, year: 1970, era: 'coop', shift: 'nat',
          title: 'Clean Air Act',
          body: 'Federal government sets national air-quality standards; states implement and enforce — classic cooperative federalism with federal preemption.' },
        // New Federalism (1970s–present)
        { id: 10, year: 1972, era: 'new', shift: 'state',
          title: 'Nixon General Revenue Sharing',
          body: 'Distributed federal funds to states with few strings attached; signaled deliberate shift toward returning fiscal flexibility to states.' },
        { id: 11, year: 1981, era: 'new', shift: 'state',
          title: 'Reagan Block Grants',
          body: 'Consolidated 77 categorical programs into 9 block grants, giving states broad discretion over spending priorities.' },
        { id: 12, year: 1995, era: 'new', shift: 'state',
          title: 'United States v. Lopez',
          body: 'First decision since the New Deal to strike down a federal statute (Gun-Free School Zones Act) as exceeding Commerce Clause power.' },
        { id: 13, year: 1996, era: 'new', shift: 'state',
          title: 'Welfare Reform Act (PRWORA)',
          body: 'Replaced AFDC entitlement with TANF block grants — gave states wide latitude over welfare policy with federal time and work conditions.' },
        { id: 14, year: 2012, era: 'new', shift: 'state',
          title: 'NFIB v. Sebelius',
          body: 'Upheld ACA individual mandate as a tax but struck the Medicaid expansion mandate as coercive — limiting federal conditional-spending leverage.' }
    ];

    const items = data.map(d => ({
        id: d.id,
        content: d.era === 'ghost' ? '' : d.title,
        start: new Date(d.year, 5, 30),
        className: d.era,
        title: d.era === 'ghost' ? '' : d.title + ' (' + d.year + ')',
        body: d.body,
        era: d.era,
        shift: d.shift
    }));

    const allItems = items.slice();
    const visibleItems = items.filter(i => i.era !== 'ghost');
    const dataset = new vis.DataSet(visibleItems);
    const container = document.getElementById('timeline');

    const options = {
        width: '100%',
        height: '380px',
        margin: { item: { horizontal: 10, vertical: 6 }, axis: 30 },
        orientation: 'top',
        zoomMin: 1000 * 60 * 60 * 24 * 365 * 5,
        zoomMax: 1000 * 60 * 60 * 24 * 365 * 300,
        min: new Date(1789, 0, 1),
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
        const padL = 0, padR = 0;
        timeline.setWindow(new Date(minD - padL), new Date(maxD + padR), { animation: false });
    }
    fitToData();

    const info = document.getElementById('info');
    timeline.on('select', function (props) {
        if (props.items.length === 0) return;
        const it = allItems.find(x => x.id === props.items[0]);
        if (!it) return;
        const shiftText = it.shift === 'nat' ? '↑ Shift toward national power' : '↑ Shift toward state power';
        info.innerHTML = '<h3>' + it.title + '</h3>' +
            '<div class="body">' + it.body + '</div>' +
            '<span class="shift ' + it.shift + '">' + shiftText + '</span>';
    });

    document.getElementById('eraFilter').addEventListener('change', function () {
        const era = this.value;
        const filtered = (era === 'all') ? visibleItems : visibleItems.filter(i => i.era === era);
        dataset.clear();
        dataset.add(filtered);
    });

    document.getElementById('fitBtn').addEventListener('click', fitToData);
});
