// ============================================================================
//  UnitMatrix App — ES module entry point
// ============================================================================

import { UNITS } from "./units.js";
import { state } from "./state.js";
import { THEMES, applyTheme, getInitialTheme } from "./theme.js";
import { openModal, closeModal } from "./modals.js";
import {
    SUPPORTED_LOCALES, SUPPORTED_CODES,
    getInitialLanguage, switchLocale, validateLocalesStrict,
} from "./i18n.js";
import { formatNumberForLocale, convert } from "./convert.js";

// ------------------------------------------------------------------------
//  Constants
// ------------------------------------------------------------------------

const LANG_STORAGE_KEY  = "unitmatrix_language";
const THEME_STORAGE_KEY = "unitmatrix_theme";

const OWNER_ADDRESS = [
    "Stefan Radermacher",
    "Siegburger Straße 171",
    "50679 Köln",
    "Deutschland",
];
const EMAIL             = ["info", "unitmatrix.net"].join("@");
const DONATE_PAYPAL_URL = "https://paypal.me/UnitMatrix";

const CONFIG = { OWNER_ADDRESS, EMAIL, DONATE_PAYPAL_URL };

const DEBUG = new URLSearchParams(location.search).has("debug");

// Categories shown in the main grid (in order)
const MAIN_CATEGORIES = [
    "length", "area", "volume", "mass",
    "temperature", "time", "speed", "pressure",
    "energy", "power", "force", "torque",
    "voltage", "current", "frequency", "storage",
];

// SVG inner markup for each category icon
const CATEGORY_ICONS = {
    length:       '<rect x="3" y="8" width="18" height="8" rx="2"/><path d="M7 8v2"/><path d="M11 8v2"/><path d="M15 8v2"/><path d="M19 8v2"/>',
    area:         '<rect x="5" y="5" width="14" height="14" rx="1.5"/><path d="M9 5v4H5"/>',
    volume:       '<path d="M8 4h8"/><path d="M10 4v4.5l-2.5 7.5a2 2 0 0 0 1.9 2.5h5.2a2 2 0 0 0 1.9-2.5L14 8.5V4"/><path d="M9 12h6"/>',
    mass:         '<rect x="8" y="9" width="8" height="7" rx="1.5"/><path d="M10 9V7a2 2 0 0 1 4 0v2"/>',
    temperature:  '<path d="M12 4v9"/><circle cx="12" cy="17" r="3"/><rect x="10" y="4" width="4" height="7" rx="2"/>',
    time:         '<circle cx="12" cy="12" r="7"/><path d="M12 9v4l2 2"/>',
    speed:        '<path d="M5 17a7 7 0 0 1 14 0"/><path d="M12 10l3 3"/><path d="M5 17h14"/>',
    pressure:     '<circle cx="12" cy="12" r="7"/><path d="M12 12l-2.5 3"/><path d="M9 7l1 2"/><path d="M15 7l-1 2"/>',
    energy:       '<path d="M11 3L5 14h5l-1 7 6-11h-5l1-7z"/>',
    power:        '<path d="M12 3v7"/><path d="M7.5 5.75A7 7 0 1 0 16.5 5.75"/>',
    force:        '<rect x="4" y="10" width="6" height="4" rx="1"/><path d="M10 12h10"/><path d="M16 9l4 3-4 3"/>',
    torque:       '<circle cx="12" cy="12" r="3"/><path d="M7 7a7 7 0 0 1 10 0"/><path d="M7 17a7 7 0 0 0 10 0"/><path d="M7 7H5V5"/><path d="M17 17h2v2"/>',
    voltage:      '<path d="M8 5l4 14 4-14"/><path d="M5 5v4"/><path d="M19 15v4"/>',
    current:      '<path d="M12 4v16"/><path d="M9 7h6"/><path d="M9 17h6"/><path d="M10 21l2-1 2 1"/>',
    frequency:    '<path d="M3 14c2-4 4-4 6 0s4 4 6 0 4-4 6 0"/>',
    storage:      '<ellipse cx="12" cy="6" rx="5" ry="2.5"/><path d="M7 6v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V6"/><path d="M7 10v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4"/>',
    resistance:   '<path d="M3 12h3l2 4 4-8 3 8 2-4h4"/>',
    density:      '<rect x="4" y="5" width="16" height="4" rx="1"/><rect x="4" y="10" width="16" height="4" rx="1"/><rect x="4" y="15" width="16" height="4" rx="1"/>',
    fuel_economy: '<circle cx="12" cy="13" r="7"/><path d="M12 13l4-4"/><path d="M7 5c1-1 2.5-2 5-2"/><path d="M17 5c-.5-.5-1.2-1-2-1.3"/><path d="M5 19s2-2 3-4"/>',
    flow:         '<rect x="3" y="9" width="12" height="6" rx="2"/><path d="M15 12h3"/><path d="M18 9l3 3-3 3"/>',
    luminance:    '<path d="M9 14c-1.2-1-2-2.5-2-4a5 5 0 1 1 10 0c0 1.5-.8 3-2 4"/><path d="M10 17h4"/><path d="M9 20h6"/>',
    radioactivity:'<circle cx="12" cy="12" r="2"/><path d="M13.7 4.3A7 7 0 0 1 19 11h-4"/><path d="M10.3 4.3A7 7 0 0 0 5 11h4"/><path d="M5.6 13a7 7 0 0 0 3.5 6.1l2-3.5"/><path d="M18.4 13a7 7 0 0 1-3.5 6.1l-2-3.5"/>',
    viscosity:    '<path d="M12 4s-4 4.5-4 7.5A4 4 0 0 0 12 16a4 4 0 0 0 4-4.5C16 8.5 12 4 12 4z"/><path d="M5 18h3"/><path d="M16 18h3"/>',
    data_rate:    '<path d="M4 9h8"/><path d="M8 5l4 4-4 4"/><path d="M12 15h8"/><path d="M16 11l4 4-4 4"/>',
};

// ------------------------------------------------------------------------
//  DOM cache (filled in init())
// ------------------------------------------------------------------------

let DOM;

// ------------------------------------------------------------------------
//  Utilities
// ------------------------------------------------------------------------

function dbg(...args) { if (DEBUG) console.warn(...args); }

function debounce(fn, delay = 150) {
    let timer;
    return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}

// ------------------------------------------------------------------------
//  Category UI helpers
// ------------------------------------------------------------------------

function updateCategoryTitle() {
    if (!DOM.categoryTitle) return;
    const catLabels = state.currentLocale?.categories || {};
    DOM.categoryTitle.textContent = catLabels[state.category] || state.category || "";
}

function updateCategoryButtons() {
    const labels = state.currentLocale?.categoryButtons || {};
    document.querySelectorAll(".cat-btn").forEach((btn) => {
        const cat     = btn.getAttribute("data-cat");
        const labelEl = btn.querySelector(".cat-label");
        if (!cat || !labelEl) return;
        labelEl.textContent = labels[cat] || cat;
        btn.classList.toggle("active", cat === state.category);
    });
}

function populateUnitSelects() {
    if (!DOM.unitFrom || !DOM.unitTo) return;
    const catData = UNITS[state.category];
    if (!catData?.units) {
        DOM.unitFrom.textContent = "";
        DOM.unitTo.textContent   = "";
        return;
    }

    const units   = catData.units;
    const labels  = state.currentLocale?.unitLabels || {};
    const entries = Object.entries(units);

    function fillSelect(selectEl, selectedId) {
        selectEl.textContent = "";
        entries.forEach(([id, meta]) => {
            const opt = document.createElement("option");
            opt.value = id;
            opt.textContent = `${labels[id] || id}${meta.symbol ? ` (${meta.symbol})` : ""}`;
            opt.selected = id === selectedId;
            selectEl.appendChild(opt);
        });
    }

    const defaultFrom = catData.defaultFrom || entries[0]?.[0];
    const defaultTo   = catData.defaultTo   || entries[1]?.[0] || entries[0]?.[0];
    const validIds    = new Set(Object.keys(units));
    const currentFrom = validIds.has(DOM.unitFrom.value) ? DOM.unitFrom.value : defaultFrom;
    const currentTo   = validIds.has(DOM.unitTo.value)   ? DOM.unitTo.value   : defaultTo;

    fillSelect(DOM.unitFrom, currentFrom);
    fillSelect(DOM.unitTo,   currentTo);
}

function updateMatrixToggleLabel() {
    if (!DOM.matrixToggle || !state.currentLocale?.ui) return;
    const text = state.matrixExpanded
        ? state.currentLocale.ui.matrixLess
        : state.currentLocale.ui.matrixMore;
    if (text) DOM.matrixToggle.textContent = text;
}

function renderCategoryButtons() {
    const mainGrid  = document.querySelector(".unitmatrix-grid");
    const extraGrid = DOM.extraMatrix;
    if (!mainGrid || !extraGrid) return;

    const mainSet   = new Set(MAIN_CATEGORIES);
    const extraKeys = Object.keys(UNITS).filter((k) => !mainSet.has(k));

    function makeButton(catKey) {
        const btn = document.createElement("button");
        btn.type      = "button";
        btn.className = "cat-btn";
        btn.setAttribute("data-cat", catKey);

        const iconSpan = document.createElement("span");
        iconSpan.className = "cat-icon";
        iconSpan.setAttribute("aria-hidden", "true");

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "1.8");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");
        svg.setAttribute("focusable", "false");
        svg.innerHTML = CATEGORY_ICONS[catKey] || "";

        iconSpan.appendChild(svg);
        btn.appendChild(iconSpan);

        const labelSpan = document.createElement("span");
        labelSpan.className = "cat-label";
        btn.appendChild(labelSpan);

        return btn;
    }

    MAIN_CATEGORIES.filter((k) => UNITS[k]).forEach((k) => mainGrid.appendChild(makeButton(k)));
    extraKeys.forEach((k) => extraGrid.appendChild(makeButton(k)));
}

// ------------------------------------------------------------------------
//  Select population
// ------------------------------------------------------------------------

function populateThemeSelect() {
    if (!DOM.themeSelect) return;
    DOM.themeSelect.textContent = "";
    Object.values(THEMES).forEach((theme) => {
        const opt = document.createElement("option");
        opt.value       = theme.id;
        opt.textContent = theme.label;
        DOM.themeSelect.appendChild(opt);
    });
}

function populateLanguageSelect() {
    if (!DOM.langSelect) return;
    DOM.langSelect.textContent = "";
    SUPPORTED_LOCALES.forEach(({code, name}) => {
        const opt = document.createElement("option");
        opt.value       = code;
        opt.textContent = name;
        DOM.langSelect.appendChild(opt);
    });
}

// ------------------------------------------------------------------------
//  UI Update
// ------------------------------------------------------------------------

function updateUI() {
    updateCategoryTitle();
    updateCategoryButtons();
    populateUnitSelects();

    if (DOM.inputValue && DOM.inputValue.value.trim() !== "") {
        convert(DOM, dbg);
    } else if (DOM.outputValue) {
        DOM.outputValue.value = "";
    }

    if (DOM.extraMatrix) DOM.extraMatrix.hidden = !state.matrixExpanded;
    updateMatrixToggleLabel();
}

// ------------------------------------------------------------------------
//  Language wrapper (calls updateUI after locale switch)
// ------------------------------------------------------------------------

async function setLanguage(lang) {
    if (!SUPPORTED_CODES.has(lang)) lang = "en";
    await switchLocale(lang, DOM, CONFIG, LANG_STORAGE_KEY);
    updateUI();
}

// ------------------------------------------------------------------------
//  Events
// ------------------------------------------------------------------------

function bindEvents() {
    const debouncedConvert = debounce(() => convert(DOM, dbg), 150);

    if (DOM.inputValue) {
        DOM.inputValue.addEventListener("input", debouncedConvert);
        DOM.inputValue.addEventListener("keydown", (e) => {
            if (e.key === "Enter") convert(DOM, dbg);
        });
    }

    if (DOM.unitFrom) DOM.unitFrom.addEventListener("change", () => convert(DOM, dbg));
    if (DOM.unitTo)   DOM.unitTo.addEventListener("change",   () => convert(DOM, dbg));

    [document.querySelector(".unitmatrix-grid"), DOM.extraMatrix].forEach((container) => {
        if (!container) return;
        container.addEventListener("click", (e) => {
            const btn    = e.target.closest(".cat-btn");
            if (!btn) return;
            const newCat = btn.getAttribute("data-cat");
            if (!newCat || !UNITS[newCat]) return;
            state.category = newCat;
            const catDefault = UNITS[newCat]?.defaultValue;
            if (catDefault != null && DOM.inputValue) {
                DOM.inputValue.value = formatNumberForLocale(catDefault);
            }
            updateUI();
        });
    });

    if (DOM.langSelect) {
        DOM.langSelect.addEventListener("change", () => {
            setLanguage(DOM.langSelect.value).catch(console.error);
        });
    }

    if (DOM.matrixToggle && DOM.extraMatrix) {
        DOM.matrixToggle.addEventListener("click", () => {
            state.matrixExpanded = !state.matrixExpanded;
            DOM.extraMatrix.hidden = !state.matrixExpanded;
            DOM.matrixToggle.setAttribute("aria-expanded", String(state.matrixExpanded));
            updateMatrixToggleLabel();
        });
    }

    if (DOM.themeSelect) {
        DOM.themeSelect.addEventListener("change", (event) => {
            const newTheme = event.target.value;
            applyTheme(newTheme, DOM);
            try { localStorage.setItem(THEME_STORAGE_KEY, newTheme); } catch (_) {}
        });
    }

    if (DOM.privacyLink && DOM.privacyModal) {
        DOM.privacyLink.addEventListener("click", (event) => {
            event.preventDefault();
            openModal(DOM.privacyModal);
        });
    }

    if (DOM.impressumLink && DOM.impressumModal) {
        DOM.impressumLink.addEventListener("click", (event) => {
            event.preventDefault();
            openModal(DOM.impressumModal);
        });
    }

    if (DOM.swapUnitsBtn && DOM.unitFrom && DOM.unitTo && DOM.inputValue) {
        DOM.swapUnitsBtn.addEventListener("click", () => {
            const oldFrom = DOM.unitFrom.value;
            DOM.unitFrom.value = DOM.unitTo.value;
            DOM.unitTo.value   = oldFrom;
            if (Number.isFinite(state.lastResultValue)) {
                state.lastInputValue = state.lastResultValue;
                DOM.inputValue.value = formatNumberForLocale(state.lastResultValue);
            }
            convert(DOM, dbg);
        });
    }

    if (DOM.copyResultBtn) {
        DOM.copyResultBtn.addEventListener("click", () => {
            if (!Number.isFinite(state.lastResultValue)) return;
            const raw = String(state.lastResultValue);
            if (navigator.clipboard?.writeText) {
                navigator.clipboard.writeText(raw).catch(() => {});
            } else if (DOM.outputValue) {
                DOM.outputValue.select();
            }
        });
    }

    if (DOM.footerSupport && DOM.supportModal) {
        DOM.footerSupport.addEventListener("click", (e) => {
            if (e.target.closest("#supportLink")) {
                e.preventDefault();
                openModal(DOM.supportModal);
            }
        });
    }

    document.querySelectorAll(".modal").forEach((modalEl) => {
        modalEl.addEventListener("click", (event) => {
            if (event.target instanceof HTMLElement && event.target.hasAttribute("data-modal-close")) {
                closeModal();
            }
        });
    });
}

// ------------------------------------------------------------------------
//  Init
// ------------------------------------------------------------------------

async function init() {
    DOM = {
        langSelect:    document.getElementById("languageSelect"),
        themeSelect:   document.getElementById("themeSelect"),
        categoryTitle: document.getElementById("categoryTitle"),
        unitFrom:      document.getElementById("unitFrom"),
        unitTo:        document.getElementById("unitTo"),
        inputValue:    document.getElementById("inputValue"),
        outputValue:   document.getElementById("outputValue"),
        copyResultBtn: document.getElementById("copyResultBtn"),
        swapUnitsBtn:  document.getElementById("swapUnitsBtn"),

        matrixToggle: document.querySelector(".matrix-toggle"),
        extraMatrix:  document.querySelector(".unitmatrix-extra"),
        tagline:      document.querySelector(".tagline"),
        fromLabel:    document.querySelector('label[for="unitFrom"]'),
        toLabel:      document.querySelector('label[for="unitTo"]'),

        footerSupport:    document.getElementById("footerSupport"),
        conversionSummary: document.getElementById("conversionSummary"),
        belowAbsZeroWarn: document.getElementById("belowAbsZeroWarn"),
        metaDescription:  document.querySelector('meta[name="description"]'),
        metaThemeColor:   document.querySelector('meta[name="theme-color"]'),

        privacyModal:      document.getElementById("privacyModal"),
        privacyLink:       document.getElementById("privacyLink"),
        privacyModalTitle: document.getElementById("privacyModalTitle"),
        privacyModalBody:  document.getElementById("privacyModalBody"),

        supportModal:      document.getElementById("supportModal"),
        supportModalTitle: document.getElementById("supportModalTitle"),
        supportModalBody:  document.getElementById("supportModalBody"),

        impressumModal:      document.getElementById("impressumModal"),
        impressumLink:       document.getElementById("impressumLink"),
        impressumModalTitle: document.getElementById("impressumModalTitle"),
        impressumModalBody:  document.getElementById("impressumModalBody"),
    };

    state.category = Object.keys(UNITS)[0] || null;

    populateThemeSelect();
    populateLanguageSelect();
    renderCategoryButtons();

    applyTheme(getInitialTheme(THEME_STORAGE_KEY), DOM);
    await setLanguage(getInitialLanguage(LANG_STORAGE_KEY));

    bindEvents();

    if (DEBUG) validateLocalesStrict();
}

// ------------------------------------------------------------------------
//  Global error UI
// ------------------------------------------------------------------------

let fatalErrorShown = false;

function showFatalError(eventOrError) {
    if (fatalErrorShown) return;
    fatalErrorShown = true;

    let detail = "";
    if (eventOrError instanceof Error) {
        detail = eventOrError.message;
    } else if (eventOrError instanceof ErrorEvent) {
        detail = eventOrError.message;
    } else if (eventOrError instanceof PromiseRejectionEvent) {
        detail = eventOrError.reason instanceof Error
            ? eventOrError.reason.message
            : String(eventOrError.reason);
    }

    const overlay = document.createElement("div");
    overlay.className = "fatal-error";
    overlay.setAttribute("role", "alertdialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "fatalErrorTitle");

    const box   = document.createElement("div");
    box.className = "fatal-error-box";

    const title = document.createElement("h2");
    title.id          = "fatalErrorTitle";
    title.textContent = "Something went wrong";

    const msg = document.createElement("p");
    msg.textContent = "An unexpected error occurred. Please reload the page.";

    if (detail) {
        const pre = document.createElement("pre");
        pre.textContent    = detail;
        pre.style.cssText  = "font-size:12px;opacity:0.6;overflow:auto;text-align:left;margin:0 0 16px";
        box.append(title, pre, msg);
    } else {
        box.append(title, msg);
    }

    const btn = document.createElement("button");
    btn.type        = "button";
    btn.textContent = "Reload";
    btn.addEventListener("click", () => location.reload());
    box.appendChild(btn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    btn.focus();
}

window.addEventListener("error", showFatalError);
window.addEventListener("unhandledrejection", showFatalError);

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch(dbg);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => init().catch(showFatalError));
} else {
    init().catch(showFatalError);
}
