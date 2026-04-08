/**
 * Scalar — Companies Dropdown
 * Self-contained module: injects CSS, builds the dropdown panel,
 * and attaches it to the .nav-picker (Companies) element.
 *
 * Depends on: data.js (SCALAR_DB.companies)
 */
(function () {
  /* ── STYLES ── */
  const style = document.createElement('style');
  style.textContent = `
    .cdp-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    /* open state: rotate chevron */
    .cdp-wrapper.open .nav-picker .mi:last-child {
      transform: rotate(180deg);
      transition: transform 0.15s ease;
    }
    .nav-picker .mi:last-child { transition: transform 0.15s ease; }

    /* ── PANEL ── */
    .cdp-panel {
      display: none;
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      z-index: 600;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.08);
      padding: 8px;
      width: 220px;
      gap: 8px;
      display: none;
      flex-direction: column;
    }
    .cdp-wrapper.open .cdp-panel { display: flex; }

    /* ── SEARCH ── */
    .cdp-search {
      display: flex;
      align-items: center;
      gap: 4px;
      background: var(--neutral-200);
      border: 1px solid var(--neutral-500);
      border-radius: 8px;
      padding: 4px 8px;
    }
    .cdp-search .mi {
      color: var(--neutral-600);
      font-size: 16px;
      flex-shrink: 0;
    }
    .cdp-search input {
      flex: 1;
      border: none;
      background: transparent;
      font-family: var(--font);
      font-size: 14px;
      color: var(--neutral-800);
      outline: none;
      min-width: 0;
    }
    .cdp-search input::placeholder { color: var(--neutral-500); }

    /* ── LIST ── */
    .cdp-list {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-height: 280px; /* ~10 items at ~28px each */
      overflow-y: auto;
      overflow-x: hidden;
    }
    .cdp-list::-webkit-scrollbar {
      width: 4px;
    }
    .cdp-list::-webkit-scrollbar-track {
      background: transparent;
    }
    .cdp-list::-webkit-scrollbar-thumb {
      background: var(--neutral-300);
      border-radius: 2px;
    }
    .cdp-list::-webkit-scrollbar-thumb:hover {
      background: var(--neutral-400);
    }

    /* ── ITEMS ── */
    .cdp-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 8px;
      border-radius: 4px;
      font-size: 12px;
      color: var(--neutral-600);
      cursor: pointer;
      white-space: nowrap;
      position: relative;
    }
    .cdp-item:hover { background: var(--neutral-50); }
    .cdp-item .cdp-chevron {
      color: var(--neutral-400);
      font-size: 14px;
      flex-shrink: 0;
    }

    /* "See All Companies" — no chevron, slightly different weight */
    .cdp-see-all {
      font-weight: 400;
      color: var(--neutral-600);
    }
    .cdp-see-all:hover { background: var(--neutral-50); }

    /* ── SUBMENU (level 2) ── */
    .cdp-submenu {
      display: none;
      position: absolute;
      z-index: 700;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.08);
      padding: 8px;
      width: 184px;
      flex-direction: column;
    }

    /* ── SUBMENU (level 3 — Cap Table) ── */
    .cdp-submenu2 {
      display: none;
      position: absolute;
      z-index: 800;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.08);
      padding: 8px;
      width: 184px;
      flex-direction: column;
    }
    .cdp-submenu-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 8px;
      border-radius: 4px;
      font-size: 12px;
      color: #475569;
      cursor: pointer;
      white-space: nowrap;
    }
    .cdp-submenu-item:hover { background: var(--neutral-50); }
    .cdp-submenu-item .cdp-sub-chevron {
      color: var(--neutral-400);
      font-size: 14px;
      flex-shrink: 0;
    }

    /* no results */
    .cdp-empty {
      padding: 8px;
      font-size: 12px;
      color: var(--neutral-400);
      text-align: center;
    }

    /* ── ADD NEW COMPANY ── */
    .cdp-add-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      width: 100%;
      padding: 6px;
      border: 1px solid var(--brand-500);
      border-radius: 4px;
      background: transparent;
      font-family: var(--font);
      font-size: 12px;
      font-weight: 600;
      color: var(--brand-500);
      cursor: pointer;
      flex-shrink: 0;
    }
    .cdp-add-btn:hover { background: #e8f3fd; }
    .cdp-add-btn .mi { font-size: 14px; }
  `;
  document.head.appendChild(style);

  /* ── INIT (run after DOM ready) ── */
  function init() {
    const picker = document.querySelector('.nav-picker');
    if (!picker) return;

    const SUBMENU_DEFS = [
      { label: 'Summary',    hasChevron: false },
      { label: 'Financials', hasChevron: false },
      { label: 'Cap Table',  hasChevron: true  },
      { label: 'Valuations', hasChevron: true  },
      { label: 'Waterfalls', hasChevron: false },
    ];

    const L3_DEFS = {
      'Cap Table': [
        'Cap Table',
        'Fund Ownership',
        'Breakpoint Analysis',
        'Cash Flow Ledger',
      ],
      'Valuations': [
        'Summary',
        'GPC',
        'GT',
        'Backsolve',
        'Future Exit',
        'Discounted Cash Flow',
        'External Valuation',
      ],
    };

    /* wrap picker in a relative container */
    const wrapper = document.createElement('div');
    wrapper.className = 'cdp-wrapper';
    picker.parentNode.insertBefore(wrapper, picker);
    wrapper.appendChild(picker);

    /* build panel */
    const panel = document.createElement('div');
    panel.className = 'cdp-panel';

    /* search */
    const searchBox = document.createElement('div');
    searchBox.className = 'cdp-search';
    searchBox.innerHTML =
      `<span class="mi">search</span>` +
      `<input type="text" id="cdpSearchInput" placeholder="Find a Company" autocomplete="off" />`;
    panel.appendChild(searchBox);

    /* list */
    const list = document.createElement('div');
    list.className = 'cdp-list';
    panel.appendChild(list);

    /* add button */
    const addBtn = document.createElement('button');
    addBtn.className = 'cdp-add-btn';
    addBtn.innerHTML = `<span class="mi">add</span>Add New Company`;
    addBtn.addEventListener('click', e => { e.stopPropagation(); });
    panel.appendChild(addBtn);

    /* ── shared level-2 submenu ── */
    const submenu = document.createElement('div');
    submenu.className = 'cdp-submenu';

    SUBMENU_DEFS.forEach(si => {
      const sItem = document.createElement('div');
      sItem.className = 'cdp-submenu-item';
      sItem.innerHTML = `<span>${si.label}</span>` +
        (si.hasChevron ? `<span class="mi cdp-sub-chevron">chevron_right</span>` : '');
      sItem.addEventListener('click', e => { e.stopPropagation(); closePanel(); });

      /* wire level-3 for items that have sub-definitions */
      if (L3_DEFS[si.label]) {
        sItem.addEventListener('mouseenter', () => showSubmenu2(sItem, L3_DEFS[si.label]));
        sItem.addEventListener('mouseleave', scheduleHide2);
      } else {
        sItem.addEventListener('mouseenter', hideSubmenu2);
      }

      submenu.appendChild(sItem);
    });

    /* ── shared level-3 submenu (dynamic content) ── */
    const submenu2 = document.createElement('div');
    submenu2.className = 'cdp-submenu2';

    wrapper.appendChild(panel);
    wrapper.appendChild(submenu);
    wrapper.appendChild(submenu2);

    /* ── hover helpers ── */
    let hideTimer  = null;
    let hide2Timer = null;

    /* level-2 */
    function showSubmenu(anchorItem) {
      clearTimeout(hideTimer);
      hideSubmenu2();
      const wrapRect = wrapper.getBoundingClientRect();
      const itemRect = anchorItem.getBoundingClientRect();
      submenu.style.top  = (itemRect.top  - wrapRect.top)  + 'px';
      submenu.style.left = (itemRect.right - wrapRect.left + 4) + 'px';
      submenu.style.display = 'flex';
    }

    function scheduleHide() {
      hideTimer = setTimeout(() => {
        submenu.style.display = 'none';
        /* only hide level-3 if the user isn't hovering it */
        if (!submenu2.matches(':hover')) hideSubmenu2();
      }, 300);
    }

    /* level-3 — populates with the given items array before showing */
    function showSubmenu2(anchorItem, items) {
      clearTimeout(hide2Timer);
      /* rebuild content */
      submenu2.innerHTML = '';
      items.forEach(label => {
        const s2Item = document.createElement('div');
        s2Item.className = 'cdp-submenu-item';
        s2Item.innerHTML = `<span>${label}</span>`;
        s2Item.addEventListener('click', e => { e.stopPropagation(); closePanel(); });
        submenu2.appendChild(s2Item);
      });
      const wrapRect = wrapper.getBoundingClientRect();
      const itemRect = anchorItem.getBoundingClientRect();
      submenu2.style.top  = (itemRect.top  - wrapRect.top)  + 'px';
      submenu2.style.left = (itemRect.right - wrapRect.left + 4) + 'px';
      submenu2.style.display = 'flex';
    }

    function scheduleHide2() {
      hide2Timer = setTimeout(() => { submenu2.style.display = 'none'; }, 400);
    }

    function hideSubmenu2() {
      clearTimeout(hide2Timer);
      submenu2.style.display = 'none';
    }

    /* keep level-2 alive while hovering it */
    submenu.addEventListener('mouseenter', () => clearTimeout(hideTimer));
    submenu.addEventListener('mouseleave', scheduleHide);

    /* keep level-3 alive while hovering it — also keep level-2 alive */
    submenu2.addEventListener('mouseenter', () => {
      clearTimeout(hide2Timer);
      clearTimeout(hideTimer);
    });
    submenu2.addEventListener('mouseleave', scheduleHide2);

    /* populate list */
    function renderList(query) {
      list.innerHTML = '';
      submenu.style.display = 'none';

      /* "See All Companies" always first */
      const seeAll = document.createElement('div');
      seeAll.className = 'cdp-item cdp-see-all';
      seeAll.textContent = 'See All Companies';
      seeAll.addEventListener('click', e => {
        e.stopPropagation();
        window.location.href = 'companies.html';
      });
      list.appendChild(seeAll);

      /* filter companies */
      const matches = (SCALAR_DB.companies || []).filter(c =>
        c.toLowerCase().includes((query || '').toLowerCase())
      );

      if (matches.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'cdp-empty';
        empty.textContent = 'No companies found';
        list.appendChild(empty);
        return;
      }

      matches.forEach(company => {
        const item = document.createElement('div');
        item.className = 'cdp-item';
        item.innerHTML = `<span>${company}</span><span class="mi cdp-chevron">chevron_right</span>`;

        item.addEventListener('mouseenter', () => showSubmenu(item));
        item.addEventListener('mouseleave', scheduleHide);
        item.addEventListener('click', e => { e.stopPropagation(); closePanel(); });
        list.appendChild(item);
      });
    }

    renderList('');

    /* search input */
    searchBox.querySelector('#cdpSearchInput').addEventListener('input', e => {
      renderList(e.target.value);
    });
    searchBox.addEventListener('click', e => e.stopPropagation());

    /* open / close */
    function openPanel() {
      wrapper.classList.add('open');
      searchBox.querySelector('input').value = '';
      renderList('');
      list.scrollTop = 0;
      submenu.style.display = 'none';
      submenu2.style.display = 'none';
      setTimeout(() => searchBox.querySelector('input').focus(), 50);
    }

    function closePanel() {
      wrapper.classList.remove('open');
      submenu.style.display = 'none';
      submenu2.style.display = 'none';
    }

    picker.addEventListener('click', e => {
      e.stopPropagation();
      wrapper.classList.contains('open') ? closePanel() : openPanel();
    });

    document.addEventListener('click', e => {
      if (!wrapper.contains(e.target)) closePanel();
    });
  }

  /* wait for DOM */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
