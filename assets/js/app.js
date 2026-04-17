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
import { CATEGORY_ICONS } from "./icons.js";

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
        eventOrError.preventDefault();
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
