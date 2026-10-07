/* ============================================================
 * main.js — theme, language, filters, comparison and rendering.
 * No frameworks, no dependencies.
 *
 * Tuning knobs:
 *   INITIAL_BATCH — cards shown on first load
 *   LOAD_BATCH    — cards revealed per "Load more" click
 *   MAX_COMPARE   — max cards in a side-by-side comparison
 * ============================================================ */

const INITIAL_BATCH = 4;
const LOAD_BATCH = 4;
const MAX_COMPARE = 4;
const MIN_COMPARE = 2;

const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");
const langSelect = document.getElementById("langSelect");
const filtersEl = document.getElementById("filters");
const gridEl = document.getElementById("grid");
const footEl = document.getElementById("gridFoot");
const barEl = document.getElementById("compareBar");
const countEl = document.getElementById("compareCount");
const compareBtn = document.getElementById("compareBtn");
const compareClear = document.getElementById("compareClear");
const compareBack = document.getElementById("compareBack");
const sidebarEl = document.getElementById("sidebar");

/* ---------- storage (safe in private-browsing edge cases) ---------- */
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
};

/* ---------- theme ---------- */
const systemDark = () => matchMedia("(prefers-color-scheme: dark)").matches;

/** Effective theme: manual choice wins; otherwise follow the OS. */
function currentTheme() {
  const saved = store.get("theme");
  if (saved === "light" || saved === "dark") return saved;
  return systemDark() ? "dark" : "light";
}

function paintTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeBtn.setAttribute(
    "aria-label",
    theme === "dark" ? t("theme.light") : t("theme.dark")
  );
}

themeBtn.addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  store.set("theme", next); // manual choice is remembered for future visits
  paintTheme(next);
});

// Keep following the OS until the user makes a manual choice.
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  if (!store.get("theme")) paintTheme(e.matches ? "dark" : "light");
});

/* ---------- i18n ---------- */
function pickLang() {
  const saved = store.get("lang");
  if (saved && I18N[saved]) return saved;
  const nav = (navigator.language || "").toLowerCase();
  for (const l of SUPPORTED_LANGS) {
    if (l.match.includes(nav) || (nav && l.match.includes(nav.slice(0, 2)))) {
      return l.code;
    }
  }
  return DEFAULT_LANG;
}

const state = {
  lang: pickLang(),
  family: "all",
  visible: INITIAL_BATCH,
  view: "gallery", // "gallery" | "compare"
  selected: new Set(), // card file paths selected for comparison
};

/* ---------- registry order ----------
 * The site shows the NEWEST cards first. `models.js` stays append-only and
 * carries an `added` date (YYYY-MM-DD) per entry; we sort on it here instead
 * of reordering the registry by hand.
 *
 * Rules (kept in sync with the header comment in models.js and AGENTS.md):
 *   • `added` descending — newest additions render at the top.
 *   • Entries without `added` sink to the bottom, in written order.
 *   • Entries sharing an `added` date keep their written order, which keeps
 *     reasoning-effort variants adjacent.
 *
 * Every render path must read ORDER, never MODELS: the card grid, the family
 * filter chips, the sidebar and the jump-to-card pagination all derive their
 * order from the same array, so mixing the two would desynchronise them.
 */
function orderRegistry() {
  return MODELS.map((m, i) => ({ m, i }))
    .sort(
      (a, b) =>
        String(b.m.added || "").localeCompare(String(a.m.added || "")) || a.i - b.i
    )
    .map((x) => x.m);
}

const ORDER = orderRegistry();

function t(key) {
  const dict = I18N[state.lang] || {};
  return dict[key] ?? I18N[DEFAULT_LANG][key] ?? key;
}

function applyStaticI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  root.lang = state.lang;
}

function buildLangSelect() {
  langSelect.innerHTML = "";
  for (const l of SUPPORTED_LANGS) {
    const opt = document.createElement("option");
    opt.value = l.code;
    opt.textContent = l.label;
    langSelect.appendChild(opt);
  }
  langSelect.value = state.lang;
}

langSelect.addEventListener("change", () => {
  state.lang = langSelect.value;
  store.set("lang", state.lang);
  render();
});

/* ---------- filters ---------- */
function renderFilters() {
  const families = [...new Set(ORDER.map((m) => m.family))];
  filtersEl.innerHTML = "";

  const makeChip = (key, label) => {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "chip" + (key === state.family ? " active" : "");
    el.textContent = label;
    el.addEventListener("click", () => {
      state.family = key;
      state.visible = INITIAL_BATCH; // reset pagination per filter
      renderFilters();
      renderGrid();
    });
    return el;
  };

  filtersEl.appendChild(makeChip("all", t("filter.all")));
  families.forEach((f) => filtersEl.appendChild(makeChip(f, f)));
}

/* ---------- sidebar navigation (quick jump only) ---------- */
// Sidebar links never filter or change the comparison selection; they only
// scroll to a card. The anchor id is derived from the card file path.
function slug(file) {
  return file.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function buildSidebar() {
  sidebarEl.innerHTML = "";

  const title = document.createElement("p");
  title.className = "sidebar-title";
  title.textContent = t("nav.models");
  sidebarEl.appendChild(title);

  const families = [...new Set(ORDER.map((m) => m.family))];
  families.forEach((f) => {
    const models = ORDER.filter((m) => m.family === f);

    const det = document.createElement("details");
    det.className = "nav-family";

    const sum = document.createElement("summary");
    const name = document.createElement("span");
    name.textContent = f;
    const cnt = document.createElement("span");
    cnt.className = "nav-count";
    cnt.textContent = models.length;
    sum.append(name, cnt);

    const ul = document.createElement("ul");
    models.forEach((m) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#card-" + slug(m.file);
      a.textContent = m.effort ? `${m.variant} (${m.effort})` : m.variant;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        jumpToCard(m.file);
      });
      li.appendChild(a);
      ul.appendChild(li);
    });

    det.append(sum, ul);
    sidebarEl.appendChild(det);
  });
}

function jumpToCard(file) {
  if (state.view === "compare") return;
  let target = document.getElementById("card-" + slug(file));
  if (!target) {
    // Card not in the DOM yet (pagination) or hidden by an active family
    // filter — widen the grid to include it, then scroll.
    state.family = "all";
    const idx = ORDER.findIndex((m) => m.file === file);
    state.visible = Math.max(INITIAL_BATCH, idx + 1);
    renderFilters();
    renderGrid();
    target = document.getElementById("card-" + slug(file));
  }
  if (target) {
    requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "start" }));
  }
}

/* ---------- comparison ---------- */
function renderCompareBar() {
  const n = state.selected.size;
  const comparing = state.view === "compare";
  barEl.hidden = !comparing && n === 0;
  filtersEl.hidden = comparing;
  sidebarEl.hidden = comparing;
  countEl.textContent = comparing
    ? t("compare.viewing").replace("%n", n)
    : t("compare.selected").replace("%n", n);
  compareBtn.hidden = comparing;
  compareClear.hidden = comparing;
  compareBack.hidden = !comparing;
  compareBtn.disabled = n < MIN_COMPARE;
}

function refreshChecks() {
  document.querySelectorAll(".card-check").forEach((c) => {
    c.disabled = !c.checked && state.selected.size >= MAX_COMPARE;
  });
}

compareBtn.addEventListener("click", () => {
  if (state.selected.size < MIN_COMPARE) return;
  state.view = "compare";
  renderGrid();
  barEl.scrollIntoView({ behavior: "smooth", block: "start" });
});

compareClear.addEventListener("click", () => {
  state.selected.clear();
  renderGrid();
});

compareBack.addEventListener("click", () => {
  state.view = "gallery";
  renderGrid();
});

/* ---------- card grid ---------- */
function cardElement(m) {
  const wrap = document.createElement("article");
  wrap.className = "model-card";
  wrap.id = "card-" + slug(m.file);

  const head = document.createElement("div");
  head.className = "model-head";

  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = m.family;

  const name = document.createElement("h2");
  name.textContent = m.variant;

  head.append(badge, name);

  if (m.effort) {
    const chip = document.createElement("span");
    chip.className = "chip effort";
    chip.textContent = `${t("label.effort")}: ${m.effort}`;
    head.appendChild(chip);
  }

  // Optional runtime / quantization tags, e.g. ["llama.cpp", "Q4_K_M", "ctx 4096"]
  (m.notes || []).forEach((s) => {
    const chip = document.createElement("span");
    chip.className = "note-chip";
    chip.textContent = s;
    head.appendChild(chip);
  });

  // Optional structured generation params, e.g. { quant: "Q8_0", temperature: 0.6 }.
  // Rendered as tags so they show in both gallery and comparison views.
  if (m.params) {
    Object.entries(m.params).forEach(([key, value]) => {
      const chip = document.createElement("span");
      chip.className = "note-chip";
      chip.textContent = `${t("params." + key)}: ${value}`;
      head.appendChild(chip);
    });
  }

  // Optional source links, e.g. { chatTemplate: "...", model: "..." }.
  if (m.links) {
    Object.entries(m.links).forEach(([key, href]) => {
      const a = document.createElement("a");
      a.className = "note-chip link-chip";
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = `${t("links." + key)} ↗`;
      head.appendChild(a);
    });
  }

  const check = document.createElement("input");
  check.type = "checkbox";
  check.className = "card-check";
  check.title = t("compare.label");
  check.checked = state.selected.has(m.file);
  check.addEventListener("change", () => {
    if (check.checked) state.selected.add(m.file);
    else state.selected.delete(m.file);
    renderCompareBar();
    refreshChecks();
  });

  const link = document.createElement("a");
  link.href = m.file;
  link.target = "_blank";
  link.rel = "noopener";
  link.className = "open-link";
  link.textContent = `${t("card.open")} ↗`;

  head.append(check, link);

  const frame = document.createElement("iframe");
  frame.src = m.file;
  frame.loading = "lazy";
  frame.className = "card-frame";
  frame.title = `${m.variant}${m.effort ? ` (${m.effort})` : ""} — ${t("site.title")}`;

  wrap.append(head, frame);
  return wrap;
}

function renderGrid() {
  gridEl.innerHTML = "";
  footEl.innerHTML = "";

  const comparing = state.view === "compare";
  gridEl.classList.toggle("compare", comparing);

  let items;
  if (comparing) {
    items = ORDER.filter((m) => state.selected.has(m.file));
    gridEl.style.gridTemplateColumns = "repeat(2, minmax(0, 1fr))";
  } else {
    gridEl.style.gridTemplateColumns = "";
    const pool = ORDER.filter(
      (m) => state.family === "all" || m.family === state.family
    );
    items = pool.slice(0, state.visible);
    const remaining = pool.length - state.visible;
    if (remaining > 0) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "loadmore";
      btn.textContent = t("loadmore.button").replace("%n", remaining);
      btn.addEventListener("click", () => {
        state.visible += LOAD_BATCH;
        renderGrid();
      });
      footEl.appendChild(btn);
    }
  }

  items.forEach((m) => gridEl.appendChild(cardElement(m)));
  renderCompareBar();
  refreshChecks();
}

/* ---------- boot ---------- */
function render() {
  applyStaticI18n();
  buildLangSelect();
  paintTheme(currentTheme());
  renderFilters();
  buildSidebar();
  renderGrid();
}

render();
