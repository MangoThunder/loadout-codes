(function () {
  "use strict";

  const data = window.GUN_BUILDS || { config: {}, builds: [] };
  const cfg = Object.assign(
    { name: "Streamer", avatar: "", game: "Delta Force", twitch: "", tagline: "", currency: "", live: false, showSampleNotice: false, socials: [] },
    data.config
  );
  const builds = (data.builds || []).map((b) => Object.assign({ attachments: [], tags: [] }, b));

  const TIER_ORDER = { Meta: 0, S: 1, A: 2, B: 3, C: 4 };
  const STAT_LABELS = { damage: "Damage", range: "Range", control: "Control", handling: "Handling", stability: "Stability" };
  const FAV_KEY = "gunbuilds:favs";

  // localStorage can be blocked (private windows, embeds), so every access is guarded.
  const store = {
    get(key, fallback) {
      try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : fallback;
      } catch (e) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {}
    }
  };

  const state = {
    q: "",
    category: "All",
    role: "All",
    sort: "featured",
    favsOnly: false,
    favs: new Set(store.get(FAV_KEY, []))
  };

  // ── helpers ────────────────────────────────────────────────
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const uniq = (arr) => [...new Set(arr.filter(Boolean))];
  const tierKey = (t) => String(t || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const byId = (id) => builds.find((b) => b.id === id);
  const fmtDate = (iso) => {
    const d = new Date(iso + "T00:00:00");
    return isNaN(d) ? "" : d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  };
  // "240K" -> 240000, "1.2M" -> 1200000; anything unreadable sorts last.
  const costValue = (c) => {
    const m = String(c || "").replace(/,/g, "").match(/([\d.]+)\s*([km])?/i);
    if (!m) return Infinity;
    return parseFloat(m[1]) * ({ k: 1e3, m: 1e6 }[(m[2] || "").toLowerCase()] || 1);
  };
  const costText = (b) => (b.cost ? `${b.cost}${cfg.currency ? " " + cfg.currency : ""}` : "");
  // Tier badge only shows for builds that have a tier set in builds.js.
  const tierBadge = (b) => (b.tier ? `<span class="tier tier-${tierKey(b.tier)}">${esc(b.tier)}</span>` : "");
  // Screenshots a build can have: "image" (Modify screen) and "calibration" (Calibrate screen).
  // Each one present gets a button that opens it full size in the viewer.
  const PICTURES = {
    image: { label: "View build", title: "build" },
    calibration: { label: "Calibration", title: "calibration" }
  };
  const viewBtn = (b, cls) =>
    Object.keys(PICTURES)
      .filter((k) => b[k])
      .map((k) => `<button type="button" class="${cls || "text-btn"} view-btn" data-view="${esc(b.id)}" data-pic="${k}">${k === "calibration" ? icon.sliders : icon.image} ${PICTURES[k].label}</button>`)
      .join("");
  const metaLine = (b, extra) => [b.role, costText(b), extra].filter(Boolean).map(esc).join(" · ");
  const initials = (name) =>
    String(name)
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .split(/[\s_-]+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const categories = uniq(builds.map((b) => b.category));
  const roles = uniq(builds.map((b) => b.role));
  const lastUpdated = builds.map((b) => b.updated).filter(Boolean).sort().pop();
  const featured = builds.find((b) => b.featured) || builds[0];
  const twitchUrl = cfg.twitch ? "https://www.twitch.tv/" + encodeURIComponent(cfg.twitch) : "";

  const icon = {
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>',
    sliders: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/></svg>',
    external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    image: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/></svg>',
    copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/></svg>',
    link: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    twitch: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3 3 7v13h5v3h3l3-3h4l4-4V3zm16 12-3 3h-5l-3 3v-3H5V5h15z"/><path d="M15 8h2v5h-2zM10 8h2v5h-2z"/></svg>'
  };

  // ── promo (replaces the featured build when config.promo is set) ──
  const coinStack = `<svg class="promo-coins" viewBox="0 0 160 152" aria-hidden="true">
    ${[0, 1, 2, 3, 4].map((i) => `<g transform="translate(18 ${112 - i * 15})"><ellipse cx="44" cy="10" rx="44" ry="13" fill="#a8741c"/><rect x="0" y="0" width="88" height="10" fill="#a8741c"/><ellipse cx="44" cy="0" rx="44" ry="13" fill="#f2c14e" stroke="#c48a22" stroke-width="2"/></g>`).join("")}
    <g transform="translate(118 38) rotate(14)"><circle r="34" fill="#c48a22"/><circle r="31" fill="#f6cf5f"/><circle r="23" fill="none" stroke="#c48a22" stroke-width="3"/><text x="0" y="8" text-anchor="middle" font-family="Chakra Petch, sans-serif" font-weight="700" font-size="22" fill="#8a5a10">+</text></g>
  </svg>`;
  function promoHTML(p) {
    return `
          <a class="promo" href="${esc(p.url)}" target="_blank" rel="noopener sponsored">
            <span class="eyebrow promo-eyebrow">${esc(p.eyebrow || "Top-up deal")}</span>
            <span class="promo-body">
              <span class="promo-copy">
                <span class="promo-big">${esc(p.bonus)}</span>
                <span class="promo-label">${esc(p.headline)}</span>
                <span class="promo-text">${esc(p.text)}</span>
              </span>
              ${coinStack}
            </span>
            <span class="promo-cta">${esc(p.button)} ${icon.external}</span>
          </a>`;
  }

  // ── shell ──────────────────────────────────────────────────
  const app = document.getElementById("app");

  function selectHTML(id, label, options, value) {
    return `<label class="select" for="${id}"><span>${label}</span>
      <select id="${id}">${options.map((o) => `<option value="${esc(o.value)}"${o.value === value ? " selected" : ""}>${esc(o.label)}</option>`).join("")}</select></label>`;
  }

  function codeBlock(b, size) {
    return `<div class="code-row ${size || ""}">
      <code class="code" title="Build code">${esc(b.code)}</code>
      <button class="copy-btn" type="button" data-copy="${esc(b.code)}" aria-label="Copy ${esc(b.weapon)} build code">${icon.copy}<span>Copy</span></button>
    </div>`;
  }

  app.innerHTML = `
    <header class="topbar">
      <div class="wrap topbar-inner">
        <a class="brand" href="#" data-home>
          ${cfg.avatar
            ? `<img class="brand-mark brand-avatar" src="${esc(cfg.avatar)}" alt="" width="34" height="34">`
            : `<span class="brand-mark" aria-hidden="true">${esc(initials(cfg.name))}</span>`}
          <span class="brand-text"><span class="brand-name">${esc(cfg.name)}</span><span class="brand-sub">${esc(cfg.game)} loadouts</span></span>
        </a>
        <nav class="topnav">
          <button class="nav-btn" type="button" id="nav-saved" aria-pressed="false">${icon.star}<span>Saved</span><span class="badge" id="saved-count">0</span></button>
          ${twitchUrl ? `<a class="nav-live ${cfg.live ? "is-live" : ""}" href="${twitchUrl}" target="_blank" rel="noopener">
            ${cfg.live ? '<span class="live-dot" aria-hidden="true"></span><span>Live now</span>' : `${icon.twitch}<span>Twitch</span>`}</a>` : ""}
        </nav>
      </div>
    </header>

    ${cfg.showSampleNotice ? `<div class="notice"><div class="wrap">Sample builds shown. Replace them in <code>js/builds.js</code>.</div></div>` : ""}

    <main>
      <section class="hero">
        <div class="wrap hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">${esc(cfg.game)} · Operations builds</p>
            <h1>Every Operations build from stream, ready to import.</h1>
            ${cfg.tagline ? `<p class="lede">${esc(cfg.tagline)}</p>` : ""}
            <div class="search">
              ${icon.search}
              <input id="search" type="search" placeholder="Search a gun or code" autocomplete="off" aria-label="Search builds">
              <kbd aria-hidden="true">/</kbd>
            </div>
            <dl class="hero-stats">
              <div><dt>Builds</dt><dd>${builds.length}</dd></div>
              <div><dt>Weapon classes</dt><dd>${categories.length}</dd></div>
              ${lastUpdated ? `<div><dt>Last updated</dt><dd>${esc(fmtDate(lastUpdated))}</dd></div>` : ""}
            </dl>
          </div>
          ${cfg.promo && cfg.promo.url ? promoHTML(cfg.promo) : featured ? `
          <aside class="featured" aria-label="Featured build">
            <div class="featured-top">
              <span class="eyebrow">Featured build</span>
              ${tierBadge(featured)}
            </div>
            <h2 class="featured-name">${esc(featured.weapon)}</h2>
            <p class="featured-meta">${[esc(featured.category), metaLine(featured)].filter(Boolean).join(" · ")}</p>
            ${codeBlock(featured, "lg")}
            ${featured.attachments.length ? `<ul class="featured-atts">${featured.attachments.slice(0, 6).map((a) => `<li><span>${esc(a.slot)}</span>${esc(a.name)}</li>`).join("")}</ul>` : ""}
            <div class="featured-actions">
              ${viewBtn(featured)}
              <button class="text-btn" type="button" data-open="${esc(featured.id)}">Full build ${icon.arrow}</button>
            </div>
          </aside>` : ""}
        </div>
      </section>

      <section class="wrap controls" id="builds" aria-label="Filters">
        <div class="filter-row">
          <div class="chips" role="group" aria-label="Weapon class">
            ${["All", ...categories].map((c) => `<button type="button" class="chip" data-cat="${esc(c)}" aria-pressed="${c === state.category}">${esc(c === "All" ? "All classes" : c)}</button>`).join("")}
          </div>
          <div class="selects">
            ${roles.length ? selectHTML("role", "Range", [{ value: "All", label: "Any range" }, ...roles.map((r) => ({ value: r, label: r }))], state.role) : ""}
            ${selectHTML("sort", "Sort", [
              { value: "featured", label: "Default order" },
              ...(lastUpdated ? [{ value: "newest", label: "Recently updated" }] : []),
              ...(builds.some((b) => b.cost) ? [{ value: "cheapest", label: "Cheapest first" }] : []),
              { value: "az", label: "A to Z" }
            ], state.sort)}
          </div>
        </div>
        <div class="result-line">
          <p id="count" aria-live="polite"></p>
          <button type="button" class="text-btn" id="reset" hidden>Clear filters</button>
        </div>
      </section>

      <section class="wrap" aria-label="Builds">
        <div class="grid" id="grid"></div>
        <div class="empty" id="empty" hidden>
          <p class="empty-title">No builds match that.</p>
          <p id="empty-hint">Try another search or clear the filters.</p>
          <button type="button" class="btn" data-reset>Clear filters</button>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="wrap footer-inner">
        <div>
          <p class="footer-name">${esc(cfg.name)}</p>
          <p class="footer-note">Codes are for Operations only and can break after a game update. If one stops working, check back after the next stream.</p>
        </div>
        <ul class="socials">${cfg.socials.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a></li>`).join("")}</ul>
      </div>
    </footer>

    <div class="modal" id="modal" hidden>
      <div class="modal-backdrop" data-close></div>
      <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1" id="modal-panel"></div>
    </div>

    <div class="viewer" id="viewer" hidden role="dialog" aria-modal="true" aria-label="Build picture">
      <div class="viewer-backdrop" data-viewer-close></div>
      <figure class="viewer-panel">
        <figcaption class="viewer-bar">
          <span class="viewer-title" id="viewer-title"></span>
          <span class="viewer-actions">
            <a class="viewer-full" id="viewer-full" href="#" target="_blank" rel="noopener">Open full size</a>
            <button type="button" class="icon-btn" data-viewer-close aria-label="Close picture" id="viewer-close">${icon.close}</button>
          </span>
        </figcaption>
        <img id="viewer-img" alt="">
      </figure>
    </div>

    <div class="toast" id="toast" role="status" aria-live="polite"></div>
  `;

  const $ = (sel) => app.querySelector(sel);
  const grid = $("#grid");
  const empty = $("#empty");
  const count = $("#count");
  const search = $("#search");
  const modal = $("#modal");
  const panel = $("#modal-panel");
  const toastEl = $("#toast");
  const viewer = $("#viewer");

  // ── list ───────────────────────────────────────────────────
  function filtered() {
    const q = state.q.trim().toLowerCase();
    const list = builds.filter((b) => {
      if (state.category !== "All" && b.category !== state.category) return false;
      if (state.role !== "All" && b.role !== state.role) return false;
      if (state.favsOnly && !state.favs.has(b.id)) return false;
      if (!q) return true;
      const hay = [b.weapon, b.category, b.role, b.code, b.notes, b.tier, ...b.tags, ...b.attachments.map((a) => a.name)]
        .join(" ")
        .toLowerCase();
      return q.split(/\s+/).every((word) => hay.includes(word));
    });
    const tier = (b) => (b.tier in TIER_ORDER ? TIER_ORDER[b.tier] : 9);
    const sorters = {
      featured: (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || tier(a) - tier(b) || (b.updated || "").localeCompare(a.updated || ""),
      newest: (a, b) => (b.updated || "").localeCompare(a.updated || ""),
      cheapest: (a, b) => costValue(a.cost) - costValue(b.cost),
      az: (a, b) => a.weapon.localeCompare(b.weapon)
    };
    return list.sort(sorters[state.sort] || sorters.featured);
  }

  function cardHTML(b) {
    const fav = state.favs.has(b.id);
    const shown = b.attachments.slice(0, 5);
    const more = b.attachments.length - shown.length;
    return `<article class="card" data-id="${esc(b.id)}">
      <div class="card-head">
        <div class="card-tags">
          ${tierBadge(b)}
          <span class="cat">${esc(b.category)}</span>
        </div>
        <button type="button" class="icon-btn fav${fav ? " is-on" : ""}" data-fav="${esc(b.id)}" aria-pressed="${fav}" aria-label="${fav ? "Remove from saved" : "Save build"}">${icon.star}</button>
      </div>
      <h3 class="card-title"><button type="button" data-open="${esc(b.id)}">${esc(b.weapon)}</button></h3>
      ${metaLine(b) ? `<p class="card-meta">${metaLine(b)}</p>` : ""}
      ${shown.length ? `<ul class="att-list">
        ${shown.map((a) => `<li><span class="slot">${esc(a.slot)}</span><span class="att">${esc(a.name)}</span></li>`).join("")}
        ${more > 0 ? `<li class="more"><span class="slot"></span><span class="att">+${more} more</span></li>` : ""}
      </ul>` : ""}
      ${codeBlock(b)}
      <div class="card-foot">
        ${viewBtn(b) ? `<span class="pic-btns">${viewBtn(b)}</span>` : `<span>${b.updated ? "Updated " + esc(fmtDate(b.updated)) : ""}</span>`}
        <button type="button" class="text-btn" data-open="${esc(b.id)}">Details ${icon.arrow}</button>
      </div>
    </article>`;
  }

  function render() {
    const list = filtered();
    grid.innerHTML = list.map(cardHTML).join("");
    grid.hidden = list.length === 0;
    empty.hidden = list.length !== 0;
    $("#empty-hint").textContent =
      state.favsOnly && state.favs.size === 0
        ? "You haven't saved any builds yet. Tap the star on a build to keep it here."
        : "Try another search or clear the filters.";
    count.textContent = `${list.length} ${list.length === 1 ? "build" : "builds"}${state.favsOnly ? " saved" : ""}`;

    const dirty = state.q || state.category !== "All" || state.role !== "All" || state.favsOnly;
    $("#reset").hidden = !dirty;

    app.querySelectorAll("[data-cat]").forEach((el) => el.setAttribute("aria-pressed", String(el.dataset.cat === state.category)));
    $("#nav-saved").setAttribute("aria-pressed", String(state.favsOnly));
    $("#saved-count").textContent = state.favs.size;
  }

  function resetFilters() {
    Object.assign(state, { q: "", category: "All", role: "All", favsOnly: false });
    search.value = "";
    if ($("#role")) $("#role").value = "All";
    render();
  }

  // ── modal ──────────────────────────────────────────────────
  let lastFocus = null;

  function modalHTML(b) {
    const fav = state.favs.has(b.id);
    const stats = b.stats
      ? Object.keys(STAT_LABELS)
          .filter((k) => typeof b.stats[k] === "number")
          .map((k) => {
            const v = Math.max(0, Math.min(100, b.stats[k]));
            return `<li><span class="stat-label">${STAT_LABELS[k]}</span><span class="bar"><span style="width:${v}%"></span></span><span class="stat-val">${v}</span></li>`;
          })
          .join("")
      : "";
    return `
      <div class="modal-head">
        <div class="card-tags">
          ${tierBadge(b)}
          <span class="cat">${esc(b.category)}</span>
        </div>
        <div class="modal-actions">
          <button type="button" class="icon-btn fav${fav ? " is-on" : ""}" data-fav="${esc(b.id)}" aria-pressed="${fav}" aria-label="${fav ? "Remove from saved" : "Save build"}">${icon.star}</button>
          <button type="button" class="icon-btn" data-close aria-label="Close">${icon.close}</button>
        </div>
      </div>
      <h2 id="modal-title" class="modal-title">${esc(b.weapon)}</h2>
      ${metaLine(b, b.updated ? "Updated " + fmtDate(b.updated) : "") ? `<p class="card-meta">${metaLine(b, b.updated ? "Updated " + fmtDate(b.updated) : "")}</p>` : ""}
      ${codeBlock(b, "lg")}
      <p class="how-to">In Operations, open the ${esc(b.weapon)} in the Gunsmith, choose Import and paste the code.</p>
      <div class="modal-links">
        ${viewBtn(b, "btn")}
        <button type="button" class="text-btn share" data-share="${esc(b.id)}">${icon.link} Copy link to this build</button>
      </div>
      ${b.attachments.length || stats ? `<div class="modal-body">
        ${b.attachments.length ? `<section>
          <h3 class="section-label">Attachments</h3>
          <ul class="att-list full">${b.attachments.map((a) => `<li><span class="slot">${esc(a.slot)}</span><span class="att">${esc(a.name)}</span></li>`).join("")}</ul>
        </section>` : ""}
        ${stats ? `<section><h3 class="section-label">Stats</h3><ul class="stats">${stats}</ul></section>` : ""}
      </div>` : ""}
      ${b.notes ? `<section class="notes"><h3 class="section-label">From ${esc(cfg.name)}</h3><p>${esc(b.notes)}</p></section>` : ""}
      ${b.clip ? `<a class="btn" href="${esc(b.clip)}" target="_blank" rel="noopener">Watch the clip ${icon.arrow}</a>` : ""}
    `;
  }

  function openModal(id, fromHash) {
    const b = byId(id);
    if (!b) return;
    if (modal.hidden) lastFocus = document.activeElement;
    panel.innerHTML = modalHTML(b);
    panel.dataset.id = id;
    modal.hidden = false;
    document.documentElement.classList.add("no-scroll");
    panel.focus();
    if (!fromHash && location.hash !== "#" + id) {
      try {
        history.replaceState(null, "", "#" + id);
      } catch (e) {}
    }
  }

  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    panel.dataset.id = "";
    document.documentElement.classList.remove("no-scroll");
    if (location.hash) {
      try {
        history.replaceState(null, "", location.pathname + location.search);
      } catch (e) {}
    }
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  // ── build picture viewer ───────────────────────────────────
  let viewerFocus = null;
  function openViewer(id, kind) {
    const b = byId(id);
    const pic = PICTURES[kind] ? kind : "image";
    if (!b || !b[pic]) return;
    viewerFocus = document.activeElement;
    $("#viewer-img").src = b[pic];
    $("#viewer-full").href = b[pic];
    $("#viewer-img").alt = `${b.weapon} ${PICTURES[pic].title} in the Gunsmith`;
    $("#viewer-title").textContent = `${b.weapon} ${PICTURES[pic].title}`;
    viewer.hidden = false;
    document.documentElement.classList.add("no-scroll");
    $("#viewer-close").focus();
  }
  function closeViewer() {
    if (viewer.hidden) return;
    viewer.hidden = true;
    if (modal.hidden) document.documentElement.classList.remove("no-scroll");
    if (viewerFocus && viewerFocus.focus) viewerFocus.focus();
  }

  // ── copy + toast ───────────────────────────────────────────
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
  }

  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (e) {}
    ta.remove();
    return ok;
  }

  function copy(text, label, btn) {
    const done = () => {
      toast(label + " copied");
      if (btn) {
        btn.classList.add("copied");
        const span = btn.querySelector("span");
        const prev = span && span.textContent;
        if (span) span.textContent = "Copied";
        setTimeout(() => {
          btn.classList.remove("copied");
          if (span) span.textContent = prev;
        }, 1600);
      }
    };
    const fail = () => {
      if (fallbackCopy(text)) return done();
      const codeEl = btn && btn.parentElement && btn.parentElement.querySelector(".code");
      if (codeEl) {
        const range = document.createRange();
        range.selectNodeContents(codeEl);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
      toast("Couldn't copy automatically. The code is selected, press Ctrl+C.");
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fail);
    } else {
      fail();
    }
  }

  function toggleFav(id) {
    if (state.favs.has(id)) {
      state.favs.delete(id);
      toast("Removed from saved");
    } else {
      state.favs.add(id);
      toast("Saved");
    }
    store.set(FAV_KEY, [...state.favs]);
    render();
    if (!modal.hidden && panel.dataset.id === id) panel.innerHTML = modalHTML(byId(id));
  }

  // ── events ─────────────────────────────────────────────────
  app.addEventListener("click", (e) => {
    const t = e.target.closest("[data-copy],[data-fav],[data-open],[data-close],[data-cat],[data-share],[data-reset],[data-home],[data-view],[data-viewer-close]");
    if (!t) return;
    const d = t.dataset;
    if ("copy" in d) copy(d.copy, "Code", t);
    else if ("fav" in d) toggleFav(d.fav);
    else if ("open" in d) openModal(d.open);
    else if ("close" in d) closeModal();
    else if ("view" in d) openViewer(d.view, d.pic);
    else if ("viewerClose" in d) closeViewer();
    else if ("share" in d) copy(location.href.split("#")[0] + "#" + d.share, "Link", null);
    else if ("reset" in d) resetFilters();
    else if ("home" in d) {
      e.preventDefault();
      closeModal();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if ("cat" in d) {
      state.category = d.cat;
      render();
    }
  });

  search.addEventListener("input", () => {
    state.q = search.value;
    render();
  });
  $("#role") && $("#role").addEventListener("change", (e) => {
    state.role = e.target.value;
    render();
  });
  $("#sort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });
  $("#reset").addEventListener("click", resetFilters);
  $("#nav-saved").addEventListener("click", () => {
    state.favsOnly = !state.favsOnly;
    render();
    $("#builds").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !viewer.hidden) {
      closeViewer();
      return;
    }
    if (e.key === "Escape" && !modal.hidden) {
      closeModal();
      return;
    }
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement && document.activeElement.tagName);
    if (e.key === "/" && !typing && modal.hidden) {
      e.preventDefault();
      search.focus();
    }
    // The picture viewer only has its close button to focus.
    if (e.key === "Tab" && !viewer.hidden) {
      e.preventDefault();
      $("#viewer-close").focus();
      return;
    }
    // Keep Tab inside the open modal.
    if (e.key === "Tab" && !modal.hidden) {
      const items = [...panel.querySelectorAll("button,a[href]")];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  function syncHash() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (id && byId(id)) openModal(id, true);
    else if (!id) closeModal();
  }
  window.addEventListener("hashchange", syncHash);

  render();
  syncHash();
})();
