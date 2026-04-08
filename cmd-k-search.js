/**
 * Scalar — Cmd+K Search Modal
 * Self-contained module: injects CSS, builds the modal, and wires
 * keyboard (⌘K / Ctrl+K) + click on .nav-search to open it.
 *
 * Depends on: data.js  (SCALAR_DB)
 *             tokens.css
 */
(function () {

  /* ─────────────────────────────────────────────────────────────────
     STYLES
  ───────────────────────────────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `

    /* ── overlay ── */
    .ckm-overlay {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 2000;
      background: rgba(15, 23, 42, 0.48);
      backdrop-filter: blur(2px);
      align-items: flex-start;
      justify-content: center;
      padding-top: 96px;
    }
    .ckm-overlay.open { display: flex; }

    /* ── modal card ── */
    .ckm-modal {
      width: 580px;
      max-width: calc(100vw - 32px);
      max-height: calc(100vh - 160px);
      background: var(--color-neutral-white, #fff);
      border-radius: var(--radius-s, 8px);
      box-shadow: 0 8px 40px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.10);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    /* ── search row ── */
    .ckm-input-row {
      display: flex;
      align-items: center;
      gap: var(--spacing-s, 8px);
      padding: 12px var(--spacing-m, 16px);
      border-bottom: 1px solid var(--color-neutral-200, #e3e8f0);
      flex-shrink: 0;
    }
    .ckm-input-row .ckm-icon {
      color: var(--color-neutral-400, #94a3b8);
      font-size: 20px;
      flex-shrink: 0;
    }
    .ckm-input-row input {
      flex: 1;
      border: none;
      outline: none;
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: var(--font-size-m, 14px);
      color: var(--color-neutral-900, #0f172a);
      background: transparent;
      min-width: 0;
    }
    .ckm-input-row input::placeholder {
      color: var(--color-neutral-400, #94a3b8);
    }
    .ckm-kbd-hint {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
    }
    .ckm-kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 2px 6px;
      border: 1px solid var(--color-neutral-300, #cbd5e1);
      border-radius: var(--radius-xs, 4px);
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: var(--font-size-xs, 10px);
      font-weight: var(--font-weight-semibold, 600);
      color: var(--color-neutral-500, #64748b);
      background: var(--color-neutral-100, #f1f5f9);
      line-height: 1;
    }
    .ckm-close-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: var(--radius-xs, 4px);
      cursor: pointer;
      flex-shrink: 0;
      color: var(--color-neutral-400, #94a3b8);
      font-size: 20px;
      transition: background 0.1s;
    }
    .ckm-close-btn:hover {
      background: var(--color-neutral-100, #f1f5f9);
      color: var(--color-neutral-700, #334155);
    }

    /* ── results area ── */
    .ckm-results {
      overflow-y: auto;
      flex: 1;
      padding: var(--spacing-s, 8px);
    }
    .ckm-results::-webkit-scrollbar { width: 4px; }
    .ckm-results::-webkit-scrollbar-track { background: transparent; }
    .ckm-results::-webkit-scrollbar-thumb {
      background: var(--color-neutral-300, #cbd5e1);
      border-radius: 2px;
    }

    /* ── section heading ── */
    .ckm-section-label {
      padding: 8px 8px 4px;
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: var(--font-size-xs, 10px);
      font-weight: var(--font-weight-semibold, 600);
      color: var(--color-neutral-400, #94a3b8);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    /* ── result item ── */
    .ckm-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-s, 8px);
      padding: 8px;
      border-radius: var(--radius-xs, 4px);
      cursor: pointer;
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: var(--font-size-s, 12px);
      color: var(--color-neutral-700, #334155);
      transition: background 0.1s;
      text-decoration: none;
      outline: none;
    }
    .ckm-item:hover,
    .ckm-item.active {
      background: var(--color-neutral-100, #f1f5f9);
    }
    .ckm-item.active { outline: 2px solid transparent; }
    .ckm-item-icon {
      width: 28px;
      height: 28px;
      border-radius: var(--radius-xs, 4px);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 16px;
    }
    /* icon background tints per category */
    .ckm-item-icon.cat-company  { background: var(--color-brand-100, #cde5fa);  color: var(--color-brand-700, #02539a);  }
    .ckm-item-icon.cat-fund     { background: var(--color-accent-100, #cef3e6); color: var(--color-accent-700, #058355); }
    .ckm-item-icon.cat-firm     { background: var(--color-purple-100, #dfcfff); color: var(--color-purple-700, #441da3); }
    .ckm-item-icon.cat-document { background: var(--color-yellow-100, #ffeecc); color: var(--color-yellow-700, #996600); }
    .ckm-item-icon.cat-report   { background: var(--color-orange-100, #ffe0c4); color: var(--color-orange-700, #a04900); }
    .ckm-item-icon.cat-page     { background: var(--color-neutral-200, #e3e8f0); color: var(--color-neutral-600, #475569); }

    .ckm-item-text { flex: 1; min-width: 0; }
    .ckm-item-name {
      font-size: var(--font-size-s, 12px);
      font-weight: var(--font-weight-semibold, 600);
      color: var(--color-neutral-800, #1e293b);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ckm-item-meta {
      font-size: var(--font-size-xs, 10px);
      color: var(--color-neutral-400, #94a3b8);
      margin-top: 1px;
    }
    .ckm-item-badge {
      font-size: var(--font-size-xs, 10px);
      font-weight: var(--font-weight-semibold, 600);
      padding: 2px 6px;
      border-radius: 99px;
      flex-shrink: 0;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .badge-company  { background: var(--color-brand-100, #cde5fa);  color: var(--color-brand-700, #02539a);  }
    .badge-fund     { background: var(--color-accent-100, #cef3e6); color: var(--color-accent-700, #058355); }
    .badge-firm     { background: var(--color-purple-100, #dfcfff); color: var(--color-purple-700, #441da3); }
    .badge-document { background: var(--color-yellow-100, #ffeecc); color: var(--color-yellow-700, #996600); }
    .badge-report   { background: var(--color-orange-100, #ffe0c4); color: var(--color-orange-700, #a04900); }
    .badge-page     { background: var(--color-neutral-200, #e3e8f0); color: var(--color-neutral-600, #475569); }

    /* ── empty state ── */
    .ckm-empty {
      padding: 32px 16px;
      text-align: center;
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: var(--font-size-s, 12px);
      color: var(--color-neutral-400, #94a3b8);
    }
    .ckm-empty .ckm-empty-icon {
      font-size: 32px;
      color: var(--color-neutral-300, #cbd5e1);
      margin-bottom: 8px;
    }

    /* ── footer ── */
    .ckm-footer {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 8px 12px;
      border-top: 1px solid var(--color-neutral-200, #e3e8f0);
      flex-shrink: 0;
    }
    .ckm-footer-hint {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: var(--font-size-xs, 10px);
      color: var(--color-neutral-400, #94a3b8);
    }
  `;
  document.head.appendChild(style);

  /* ─────────────────────────────────────────────────────────────────
     PAGES — always-visible navigation shortcuts
  ───────────────────────────────────────────────────────────────── */
  const PAGES = [
    { name: 'Home',       href: 'index.html',          icon: 'home'          },
    { name: 'Companies',  href: 'companies.html',       icon: 'store'         },
    { name: 'Valuations', href: 'valuations.html',      icon: 'bar_chart'     },
    { name: 'Waterfalls', href: 'waterfalls.html',      icon: 'waterfall_chart' },
    { name: 'Documents',  href: 'documents.html',       icon: 'description'   },
    { name: 'Reports',    href: 'reports.html',         icon: 'summarize'     },
  ];

  /* icon per category */
  const ICONS = {
    company:  'store',
    fund:     'account_balance',
    firm:     'business',
    document: 'description',
    report:   'summarize',
    page:     'link',
  };

  /* ─────────────────────────────────────────────────────────────────
     BUILD MODAL DOM
  ───────────────────────────────────────────────────────────────── */
  const overlay = document.createElement('div');
  overlay.className = 'ckm-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Global search');

  const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);
  const kbdHint = isMac
    ? `<span class="ckm-kbd">⌘</span><span class="ckm-kbd">K</span>`
    : `<span class="ckm-kbd">Ctrl</span><span class="ckm-kbd">K</span>`;

  overlay.innerHTML = `
    <div class="ckm-modal" id="ckmModal">
      <div class="ckm-input-row">
        <span class="mi ckm-icon">search</span>
        <input
          id="ckmInput"
          type="text"
          placeholder="Search companies, funds, documents…"
          autocomplete="off"
          spellcheck="false"
        />
        <div class="ckm-kbd-hint">${kbdHint}</div>
        <div class="ckm-close-btn" id="ckmCloseBtn" title="Close (Esc)">
          <span class="mi">close</span>
        </div>
      </div>

      <div class="ckm-results" id="ckmResults"></div>

      <div class="ckm-footer">
        <div class="ckm-footer-hint">
          <span class="mi" style="font-size:14px;">keyboard_return</span> to open
        </div>
        <div class="ckm-footer-hint">
          <span class="mi" style="font-size:14px;">keyboard_arrow_up</span>
          <span class="mi" style="font-size:14px;">keyboard_arrow_down</span> navigate
        </div>
        <div class="ckm-footer-hint">
          <span class="ckm-kbd">Esc</span> close
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const modal    = overlay.querySelector('#ckmModal');
  const input    = overlay.querySelector('#ckmInput');
  const results  = overlay.querySelector('#ckmResults');
  const closeBtn = overlay.querySelector('#ckmCloseBtn');

  /* ─────────────────────────────────────────────────────────────────
     OPEN / CLOSE
  ───────────────────────────────────────────────────────────────── */
  function openModal() {
    overlay.classList.add('open');
    input.value = '';
    renderResults('');
    activeIndex = -1;
    setTimeout(() => input.focus(), 30);
  }

  function closeModal() {
    overlay.classList.remove('open');
    activeIndex = -1;
  }

  /* ─────────────────────────────────────────────────────────────────
     RENDER RESULTS
  ───────────────────────────────────────────────────────────────── */
  let activeIndex = -1;
  let allItems    = [];   /* flat list of rendered .ckm-item elements */

  function buildItem(name, category, meta, href) {
    const el = document.createElement('a');
    el.className  = 'ckm-item';
    el.href       = href || '#';
    el.tabIndex   = -1;
    const icon    = ICONS[category] || 'link';
    el.innerHTML  = `
      <div class="ckm-item-icon cat-${category}">
        <span class="mi">${icon}</span>
      </div>
      <div class="ckm-item-text">
        <div class="ckm-item-name">${escHtml(name)}</div>
        ${meta ? `<div class="ckm-item-meta">${escHtml(meta)}</div>` : ''}
      </div>
      <span class="ckm-item-badge badge-${category}">${category}</span>
    `;
    el.addEventListener('mouseenter', () => {
      setActive(allItems.indexOf(el));
    });
    el.addEventListener('click', () => closeModal());
    return el;
  }

  function buildSection(label) {
    const el = document.createElement('div');
    el.className   = 'ckm-section-label';
    el.textContent = label;
    return el;
  }

  function renderResults(query) {
    results.innerHTML = '';
    allItems = [];
    activeIndex = -1;

    const q = (query || '').toLowerCase().trim();

    /* ── Pages (always shown when empty; filtered when query present) ── */
    const pageMatches = PAGES.filter(p =>
      !q || p.name.toLowerCase().includes(q)
    );
    if (pageMatches.length) {
      results.appendChild(buildSection(q ? 'Pages' : 'Quick Navigation'));
      pageMatches.forEach(p => {
        const el = buildItem(p.name, 'page', 'Page', p.href);
        el.querySelector('.ckm-item-icon').innerHTML =
          `<span class="mi">${p.icon}</span>`;
        results.appendChild(el);
        allItems.push(el);
      });
    }

    /* ── if no query, show nothing more ── */
    if (!q) return;

    const db = (typeof SCALAR_DB !== 'undefined') ? SCALAR_DB : {};

    /* Companies */
    const companies = (db.companies || []).filter(c => c.toLowerCase().includes(q));
    if (companies.length) {
      results.appendChild(buildSection('Companies'));
      companies.slice(0, 8).forEach(c => {
        const el = buildItem(c, 'company', 'Portfolio Company', 'company-detail.html');
        results.appendChild(el);
        allItems.push(el);
      });
    }

    /* Funds */
    const funds = (db.funds || []).filter(f => f.toLowerCase().includes(q));
    if (funds.length) {
      results.appendChild(buildSection('Funds'));
      funds.slice(0, 5).forEach(f => {
        const el = buildItem(f, 'fund', 'Fund', '#');
        results.appendChild(el);
        allItems.push(el);
      });
    }

    /* Firms */
    const firms = (db.firms || []).filter(f => f.toLowerCase().includes(q));
    if (firms.length) {
      results.appendChild(buildSection('Firms'));
      firms.slice(0, 5).forEach(f => {
        const el = buildItem(f, 'firm', 'Firm', '#');
        results.appendChild(el);
        allItems.push(el);
      });
    }

    /* Documents */
    const docs = (db.documents || []).filter(d => d.name.toLowerCase().includes(q));
    if (docs.length) {
      results.appendChild(buildSection('Documents'));
      docs.slice(0, 5).forEach(d => {
        const el = buildItem(d.name, 'document', d.type.toUpperCase(), 'documents.html');
        results.appendChild(el);
        allItems.push(el);
      });
    }

    /* Reports */
    const rpts = (db.reports || []).filter(r => r.name.toLowerCase().includes(q));
    if (rpts.length) {
      results.appendChild(buildSection('Reports'));
      rpts.slice(0, 5).forEach(r => {
        const el = buildItem(r.name, 'report', r.type.toUpperCase(), 'reports.html');
        results.appendChild(el);
        allItems.push(el);
      });
    }

    /* Empty state */
    if (allItems.length === 0) {
      results.innerHTML = `
        <div class="ckm-empty">
          <div class="ckm-empty-icon mi">search_off</div>
          <div>No results for "<strong>${escHtml(query)}</strong>"</div>
        </div>`;
    }
  }

  /* ─────────────────────────────────────────────────────────────────
     KEYBOARD NAVIGATION
  ───────────────────────────────────────────────────────────────── */
  function setActive(idx) {
    allItems.forEach(el => el.classList.remove('active'));
    activeIndex = idx;
    if (idx >= 0 && idx < allItems.length) {
      allItems[idx].classList.add('active');
      allItems[idx].scrollIntoView({ block: 'nearest' });
    }
  }

  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(Math.min(activeIndex + 1, allItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(Math.max(activeIndex - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && allItems[activeIndex]) {
        allItems[activeIndex].click();
      }
    } else if (e.key === 'Escape') {
      closeModal();
    }
  });

  input.addEventListener('input', e => {
    renderResults(e.target.value);
  });

  /* ─────────────────────────────────────────────────────────────────
     CLOSE BEHAVIOURS
  ───────────────────────────────────────────────────────────────── */
  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', e => {
    if (!modal.contains(e.target)) closeModal();
  });

  /* ─────────────────────────────────────────────────────────────────
     GLOBAL KEYBOARD SHORTCUT  ⌘K / Ctrl+K
  ───────────────────────────────────────────────────────────────── */
  document.addEventListener('keydown', e => {
    const isK = e.key === 'k' || e.key === 'K';
    if ((e.metaKey || e.ctrlKey) && isK) {
      e.preventDefault();
      overlay.classList.contains('open') ? closeModal() : openModal();
    }
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeModal();
    }
  });

  /* ─────────────────────────────────────────────────────────────────
     WIRE .nav-search CLICK (works on any page)
  ───────────────────────────────────────────────────────────────── */
  function attachNavSearch() {
    document.querySelectorAll('.nav-search').forEach(el => {
      if (el.dataset.ckmWired) return;
      el.dataset.ckmWired = '1';
      el.style.cursor = 'pointer';
      el.addEventListener('click', e => {
        e.stopPropagation();
        openModal();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachNavSearch);
  } else {
    attachNavSearch();
  }

  /* ─────────────────────────────────────────────────────────────────
     UTILITY
  ───────────────────────────────────────────────────────────────── */
  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

})();
