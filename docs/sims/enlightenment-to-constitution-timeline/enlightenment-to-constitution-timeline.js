// Enlightenment to Constitution Timeline — vis-timeline
// CANVAS_HEIGHT: 600
document.addEventListener('DOMContentLoaded', function () {
    const data = [
        { id: 0, year: 1675, cat: 'ghost', title: '', body: '' },
        { id: 1, year: 1689, cat: 'philo',
          title: 'Locke publishes Two Treatises of Government',
          body: 'Argues for natural rights to life, liberty, and property; legitimate government rests on consent of the governed and may be replaced if it becomes tyrannical.' },
        { id: 2, year: 1748, cat: 'philo',
          title: 'Montesquieu publishes The Spirit of the Laws',
          body: 'Proposes separation of powers across legislative, executive, and judicial branches; checks and balances prevent any one branch from accumulating tyrannical power.' },
        { id: 3, year: 1762, cat: 'philo',
          title: 'Rousseau publishes The Social Contract',
          body: 'Government derives its authority from a foundational agreement among the people — the "social contract" — and must serve the general will.' },
        { id: 4, year: 1776, cat: 'doc',
          title: 'Declaration of Independence',
          body: 'Jefferson channels Locke\'s natural-rights language ("life, liberty, and the pursuit of happiness") and asserts the right of a people to alter or abolish a destructive government.' },
        { id: 5, year: 1781, cat: 'doc',
          title: 'Articles of Confederation ratified',
          body: 'First American national government — deliberately weak. Reflects Enlightenment skepticism of centralized power inherited from Locke and the colonial experience under Britain.' },
        { id: 6, year: 1786, cat: 'event',
          title: 'Shays\' Rebellion',
          body: 'Massachusetts farmers\' uprising exposed the inability of the Articles\' national government to maintain order or repay debt. Galvanized elite support for constitutional reform.',
          end: 1787 },
        { id: 7, year: 1787, cat: 'event',
          title: 'Constitutional Convention',
          body: 'Philadelphia delegates apply Montesquieu\'s separation of powers (Articles I–III) and Rousseau\'s social-contract premise ("We the People…") in a stronger national framework.' },
        { id: 8, year: 1788, cat: 'doc',
          title: 'Federalist Papers published',
          body: 'Madison, Hamilton, and Jay defend the proposed Constitution to the public, articulating republican-government theory grounded in Enlightenment political philosophy.' },
        { id: 9, year: 1791, cat: 'doc',
          title: 'Bill of Rights ratified',
          body: 'Ten amendments codify Locke\'s natural rights as constitutional limits on government — the explicit guarantee Antifederalists demanded as the price of ratification.' }
    ];

    const items = data.map(d => {
        const it = {
            id: d.id,
            content: d.cat === 'ghost' ? '' : d.title.split(' publishes ').pop().split(' (')[0],
            start: new Date(d.year, 5, 30),
            className: d.cat,
            title: d.title,
            body: d.body
        };
        if (d.end) it.end = new Date(d.end, 5, 30);
        return it;
    });

    const allItems = items.slice();
    const visibleItems = items.filter(i => i.className !== 'ghost');
    const dataset = new vis.DataSet(visibleItems);
    const container = document.getElementById('timeline');

    const options = {
        width: '100%',
        height: '370px',
        margin: { item: { horizontal: 10, vertical: 6 }, axis: 30 },
        orientation: 'top',
        zoomMin: 1000 * 60 * 60 * 24 * 365 * 5,
        zoomMax: 1000 * 60 * 60 * 24 * 365 * 200,
        min: new Date(1640, 0, 1),
        max: new Date(1820, 0, 1),
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
        const padL = 0, padR = 10 * year;
        timeline.setWindow(new Date(minD - padL), new Date(maxD + padR), { animation: false });
    }
    fitToData();

    const info = document.getElementById('info');
    timeline.on('select', function (props) {
        if (props.items.length === 0) return;
        const it = allItems.find(x => x.id === props.items[0]);
        if (!it) return;
        info.innerHTML = '<h3>' + it.title + '</h3><div class="body">' + it.body + '</div>';
    });

    document.getElementById('catFilter').addEventListener('change', function () {
        const cat = this.value;
        const filtered = (cat === 'all') ? visibleItems : visibleItems.filter(i => i.className === cat);
        dataset.clear();
        dataset.add(filtered);
    });

    document.getElementById('fitBtn').addEventListener('click', fitToData);
});
