// ============================================================================
//  UnitMatrix App
// ============================================================================
/* global DEBUG */

(() => {
    "use strict";

    // ------------------------------------------------------------------------
    //  Constants
    // ------------------------------------------------------------------------

    const LANG_STORAGE_KEY = "unitmatrix_language";
    const THEME_STORAGE_KEY = "unitmatrix_theme";

    const FALLBACK_LANG = "en";

    const OWNER_ADDRESS = [
        "Stefan Radermacher",
        "Siegburger Straße 171",
        "50679 Köln",
        "Deutschland",
    ];
    const EMAIL = ["info", "unitmatrix.net"].join("@");

    // ------------------------------------------------------------------------
    //  Number formatting per locale
    // ------------------------------------------------------------------------

    const SUPPORTED_LOCALES = [
        {code: "en", name: "English"},
        {code: "de", name: "Deutsch"},
        {code: "es", name: "Español"},
        {code: "fr", name: "Français"},
        {code: "nl", name: "Nederlands"},
        {code: "pl", name: "Polski"},
        {code: "pt", name: "Português"},
        {code: "ru", name: "Русский"},
        {code: "tr", name: "Türkçe"},
        {code: "uk", name: "Українська"},
        {code: "ja", name: "日本語"},
        {code: "zh", name: "中文"},
    ];

    const SUPPORTED_CODES = new Set(SUPPORTED_LOCALES.map(l => l.code));

    const THEMES = {
        sky:        {id: "sky",        label: "UnitMatrix Sky",        prefers: "light", themeColor: "#d9efff"},
        space:      {id: "space",      label: "UnitMatrix Space",      prefers: "dark",  themeColor: "#111c2f"},
        solar:      {id: "solar",      label: "UnitMatrix Solar",      prefers: "light", themeColor: "#ffecc2"},
        sylvan:     {id: "sylvan",     label: "UnitMatrix Sylvan",     prefers: "light", themeColor: "#e1f3e1"},
        strawberry: {id: "strawberry", label: "UnitMatrix Strawberry", prefers: "light", themeColor: "#ffe3e8"},
        slate:      {id: "slate",      label: "UnitMatrix Slate",      prefers: "dark",  themeColor: "#0f0f1a"},
        sand:       {id: "sand",       label: "UnitMatrix Sand",       prefers: "light", themeColor: "#ede3d0"},
        sterling:   {id: "sterling",   label: "UnitMatrix Sterling",   prefers: "light", themeColor: "#e0e4ec"},
    };

    const ALLOWED_THEMES = new Set(Object.keys(THEMES));
    const DEFAULT_LIGHT_THEME = "sky";
    const DEFAULT_DARK_THEME = "space";

    const DONATE_PAYPAL_URL = "https://paypal.me/UnitMatrix";


    // ------------------------------------------------------------------------
    //  DOM Cache
    // ------------------------------------------------------------------------

    const DOM = {
        langSelect: document.getElementById("languageSelect"),
        themeSelect: document.getElementById("themeSelect"),
        categoryTitle: document.getElementById("categoryTitle"),
        unitFrom: document.getElementById("unitFrom"),
        unitTo: document.getElementById("unitTo"),
        inputValue: document.getElementById("inputValue"),
        outputValue: document.getElementById("outputValue"),
        copyResultBtn: document.getElementById("copyResultBtn"),
        swapUnitsBtn: document.getElementById("swapUnitsBtn"),

        catButtons: document.querySelectorAll(".cat-btn"),
        matrixToggle: document.querySelector(".matrix-toggle"),
        extraMatrix: document.querySelector(".unitmatrix-extra"),
        tagline: document.querySelector(".tagline"),
        fromLabel: document.querySelector('label[for="unitFrom"]'),
        toLabel: document.querySelector('label[for="unitTo"]'),

        footerSupport: document.getElementById("footerSupport"),
        conversionSummary: document.getElementById("conversionSummary"),
        belowAbsZeroWarn: document.getElementById("belowAbsZeroWarn"),
        metaDescription: document.querySelector('meta[name="description"]'),
        metaThemeColor: document.querySelector('meta[name="theme-color"]'),

        privacyModal: document.getElementById("privacyModal"),
        privacyLink: document.getElementById("privacyLink"),
        privacyModalTitle: document.getElementById("privacyModalTitle"),
        privacyModalBody: document.getElementById("privacyModalBody"),

        supportModal: document.getElementById("supportModal"),
        supportModalTitle: document.getElementById("supportModalTitle"),
        supportModalBody: document.getElementById("supportModalBody"),

        impressumModal: document.getElementById("impressumModal"),
        impressumLink: document.getElementById("impressumLink"),
        impressumModalTitle: document.getElementById("impressumModalTitle"),
        impressumModalBody: document.getElementById("impressumModalBody")

    };

    // ------------------------------------------------------------------------
    //  State
    // ------------------------------------------------------------------------

    const state = {
        currentLocale: null,
        category: null,
        matrixExpanded: false,
        lastInputValue: null,
        lastResultValue: null
    };

    // ------------------------------------------------------------------------
    //  Utilities
    // ------------------------------------------------------------------------

    function dbg(...args) {
        if (typeof DEBUG !== "undefined" && DEBUG) console.warn(...args);
    }

    function debounce(fn, delay = 150) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    }

    // Parse user input as a locale-aware float
    function parseLocaleNumber(raw) {
        if (raw == null) return NaN;
        let value = String(raw).trim();
        if (!value) return NaN;

        const usesCommaDecimal = state.currentLocale?.commaDecimal === true;

        // Remove all types of whitespace
        value = value.replace(/[\s\u00A0\u202F]/g, "");

        if (usesCommaDecimal) {
            const hasComma = value.includes(",");
            const hasDot = value.includes(".");

            if (hasComma) {
                // "1.234,56" -> "1234.56"
                value = value.replace(/\./g, "").replace(",", ".");
            } else if (hasDot) {
                // "1.000" -> "1000"
                value = value.replace(/\./g, "");
            }
            //  Neither comma nor dot: use parseFloat directly
        } else {
            // English: "1,234.56" -> "1234.56"
            value = value.replace(/,/g, "");
        }

        return parseFloat(value);
    }

    // Format numbers for the current locale
    function formatNumberForLocale(num, opts = {}) {
        if (num == null || !Number.isFinite(num)) return "";

        const localeTag = state.currentLocale?.htmlLang || "en-US";

        const formatter = new Intl.NumberFormat(localeTag, {
            maximumFractionDigits: opts.maximumFractionDigits ?? 10,
            minimumFractionDigits: opts.minimumFractionDigits ?? 0,
            useGrouping: opts.useGrouping !== false
        });

        return formatter.format(num);
    }

    // ------------------------------------------------------------------------
    //  Language & Locale
    // ------------------------------------------------------------------------

    async function loadLocale(code) {
        if (window.LOCALES?.[code]) return;
        try {
            await import(`./locales/${code}.js`);
        } catch (_) {
            if (code !== FALLBACK_LANG) await loadLocale(FALLBACK_LANG);
        }
    }

    function getInitialLanguage() {
        // 1. localStorage
        try {
            const stored = localStorage.getItem(LANG_STORAGE_KEY);
            if (stored && SUPPORTED_CODES.has(stored)) return stored;
        } catch (_) {
            // ignore
        }

        // 2. Browser language
        const browserLang = (navigator.language || "").slice(0, 2).toLowerCase();
        if (SUPPORTED_CODES.has(browserLang)) return browserLang;

        // 3. Fallback
        return FALLBACK_LANG;
    }

    function applyLocale() {
        if (!state.currentLocale) return;
        const locale = state.currentLocale;
        const ui = locale.ui || {};

        // Document SEO title: prefer titleTag, fall back to title
        const seoTitle = ui.titleTag || ui.title;
        if (seoTitle) {
            document.title = seoTitle;
        }

        // Meta description
        if (DOM.metaDescription && ui.descriptionTag) {
            DOM.metaDescription.setAttribute("content", ui.descriptionTag);
        }

        // Tagline (in-page heading)
        if (DOM.tagline && ui.tagline) {
            DOM.tagline.textContent = ui.tagline;
        }

        // Form labels
        if (DOM.fromLabel && ui.labelFrom) {
            DOM.fromLabel.textContent = ui.labelFrom;
        }
        if (DOM.toLabel && ui.labelTo) {
            DOM.toLabel.textContent = ui.labelTo;
        }

        if (DOM.swapUnitsBtn) {
            if (ui.swapUnitsAria) {
                DOM.swapUnitsBtn.setAttribute("aria-label", ui.swapUnitsAria);
            }
        }

        if (DOM.copyResultBtn) {
            DOM.copyResultBtn.textContent = ui.copyResultLabel;
        }

        // Footer support text & link
        if (DOM.footerSupport && ui.footerSupportText) {
            const parts = ui.footerSupportText.split("{link}");
            DOM.footerSupport.textContent = "";
            DOM.footerSupport.appendChild(document.createTextNode(parts[0] || ""));
            const a = document.createElement("a");
            a.href = "#";
            a.id = "supportLink";
            a.textContent = ui.footerSupportLink || "";
            DOM.footerSupport.appendChild(a);
            DOM.footerSupport.appendChild(document.createTextNode(parts[1] || ""));
        }

        // Privacy link label
        if (DOM.privacyLink && ui.privacyLink) {
            DOM.privacyLink.textContent = ui.privacyLink;
        }

        // Privacy modal content
        if (DOM.privacyModalTitle && ui.privacyTitle) {
            DOM.privacyModalTitle.textContent = ui.privacyTitle;
        }
        if (DOM.privacyModalBody) {
            DOM.privacyModalBody.textContent = "";
            [ui.privacyP1, ui.privacyP2, ui.privacyP3].filter(Boolean).forEach((text) => {
                const p = document.createElement("p");
                p.textContent = text;
                DOM.privacyModalBody.appendChild(p);
            });
        }

        // Support modal content
        if (DOM.supportModalTitle && ui.supportTitle) {
            DOM.supportModalTitle.textContent = ui.supportTitle;
        }
        if (DOM.supportModalBody) {
            DOM.supportModalBody.textContent = "";
            [ui.supportIntro, ui.supportP1].filter(Boolean).forEach((text) => {
                const p = document.createElement("p");
                p.textContent = text;
                DOM.supportModalBody.appendChild(p);
            });
            const row = document.createElement("div");
            row.className = "support-button-row";
            const donateLink = document.createElement("a");
            donateLink.className = "support-button support-button-primary";
            donateLink.href = DONATE_PAYPAL_URL;
            donateLink.target = "_blank";
            donateLink.rel = "noopener noreferrer";
            donateLink.textContent = ui.supportPaypalLabel || "Donate via PayPal";
            row.appendChild(donateLink);
            DOM.supportModalBody.appendChild(row);
        }

        if (DOM.impressumLink && ui.impressumLink) {
            DOM.impressumLink.textContent = ui.impressumLink;
        }

        // Impressum modal content
        if (DOM.impressumModalTitle && ui.impressumTitle) {
            DOM.impressumModalTitle.textContent = ui.impressumTitle;
        }
        if (DOM.impressumModalBody) {
            DOM.impressumModalBody.textContent = "";

            // Provider block
            const p1 = document.createElement("p");
            const providerLabel = document.createElement("strong");
            providerLabel.textContent = ui.impressumProviderLabel || "Service provider";
            p1.appendChild(providerLabel);
            OWNER_ADDRESS.forEach((line) => {
                p1.appendChild(document.createElement("br"));
                p1.appendChild(document.createTextNode(line));
            });
            DOM.impressumModalBody.appendChild(p1);

            // Contact block
            const p2 = document.createElement("p");
            const contactLabel = document.createElement("strong");
            contactLabel.textContent = ui.impressumContactLabel || "Contact";
            p2.appendChild(contactLabel);
            p2.appendChild(document.createElement("br"));
            p2.appendChild(document.createTextNode(ui.impressumEmailLabel || "E-mail: "));
            const emailLink = document.createElement("a");
            emailLink.href = "mailto:" + EMAIL;
            emailLink.textContent = EMAIL;
            p2.appendChild(emailLink);
            DOM.impressumModalBody.appendChild(p2);

            // Plain-text paragraphs
            [ui.impressumP3, ui.impressumP4].filter(Boolean).forEach((text) => {
                const p = document.createElement("p");
                p.textContent = text;
                DOM.impressumModalBody.appendChild(p);
            });
        }
    }

    async function setLanguage(lang) {
        if (!SUPPORTED_CODES.has(lang)) lang = FALLBACK_LANG;

        await loadLocale(lang);

        state.currentLocale = window.LOCALES?.[lang] || window.LOCALES?.[FALLBACK_LANG] || {};

        const code = state.currentLocale.code || lang;
        document.documentElement.setAttribute("lang", state.currentLocale.htmlLang || code);

        if (DOM.langSelect) {
            DOM.langSelect.value = code;
        }

        applyLocale();
        updateUI();

        try {
            localStorage.setItem(LANG_STORAGE_KEY, code);
        } catch (_) {
            // ignore
        }
    }

    // ------------------------------------------------------------------------
    //  Theme handling
    // ------------------------------------------------------------------------

    function applyTheme(themeKey) {
        const root = document.documentElement;
        if (!ALLOWED_THEMES.has(themeKey)) {
            themeKey = DEFAULT_LIGHT_THEME;
        }
        const theme = THEMES[themeKey];
        if (!theme) return;

        root.setAttribute("data-theme", themeKey);

        if (DOM.themeSelect) {
            DOM.themeSelect.value = themeKey;
        }

        if (DOM.metaThemeColor) {
            DOM.metaThemeColor.setAttribute("content", theme.themeColor);
        }
    }

    function getInitialTheme() {
        // 1. localStorage
        try {
            const stored = localStorage.getItem(THEME_STORAGE_KEY);
            if (stored && ALLOWED_THEMES.has(stored)) {
                return stored;
            }
        } catch (_) {
            // ignore
        }

        // 2. System-Theme → map to internal themes
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return DEFAULT_DARK_THEME;
        }

        // 3. Fallback
        return DEFAULT_LIGHT_THEME;
    }

    // ------------------------------------------------------------------------
    //  Category & Units
    // ------------------------------------------------------------------------

    function updateCategoryTitle() {
        if (!DOM.categoryTitle) return;

        const locale = state.currentLocale;
        const catKey = state.category;
        const catLabels = locale.categories || {};
        DOM.categoryTitle.textContent = catLabels[catKey] || catKey || "";
    }

    function updateCategoryButtons() {
        if (!DOM.catButtons || !DOM.catButtons.length) return;

        const labels = state.currentLocale.categoryButtons || {};

        DOM.catButtons.forEach((btn) => {
            const cat = btn.getAttribute("data-cat");
            const labelEl = btn.querySelector(".cat-label");

            if (!cat || !labelEl) return;

            if (labels[cat]) {
                labelEl.textContent = labels[cat];
            } else {
                labelEl.textContent = cat;
            }

            // Active state
            if (cat === state.category) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
    }

    function populateUnitSelects() {
        if (!DOM.unitFrom || !DOM.unitTo) return;

        const category = state.category;
        const catData = UNITS[category];

        if (!catData || !catData.units) {
            dbg("populateUnitSelects(): unknown category", category);
            DOM.unitFrom.innerHTML = "";
            DOM.unitTo.innerHTML = "";
            return;
        }

        const units = catData.units;
        const labels = state.currentLocale.unitLabels || {};

        const entries = Object.entries(units);

        function makeOptions(selectedId) {
            return entries
                .map(([id, meta]) => {
                    const symbol = meta.symbol ? ` (${meta.symbol})` : "";
                    const text = `${labels[id] || id}${symbol}`;
                    const selected = id === selectedId ? " selected" : "";
                    return `<option value="${id}"${selected}>${text}</option>`;
                })
                .join("");
        }

        const defaultFrom = catData.defaultFrom || entries[0]?.[0];
        const defaultTo = catData.defaultTo || entries[1]?.[0] || entries[0]?.[0];

        const validIds = new Set(Object.keys(units));
        const currentFrom = validIds.has(DOM.unitFrom.value) ? DOM.unitFrom.value : defaultFrom;
        const currentTo   = validIds.has(DOM.unitTo.value)   ? DOM.unitTo.value   : defaultTo;

        DOM.unitFrom.innerHTML = makeOptions(currentFrom);
        DOM.unitTo.innerHTML = makeOptions(currentTo);
    }

    // ------------------------------------------------------------------------
    //  Matrix toggle
    // ------------------------------------------------------------------------

    function updateMatrixToggleLabel() {
        if (!DOM.matrixToggle || !state.currentLocale.ui) return;

        const ui = state.currentLocale.ui;
        const text = state.matrixExpanded ? ui.matrixLess : ui.matrixMore;

        if (text) {
            DOM.matrixToggle.textContent = text;
        }
    }

    // ------------------------------------------------------------------------
    //  Conversion
    // ------------------------------------------------------------------------

    function convert() {
        const categoryKey = state.category;
        const catData = UNITS[categoryKey];

        if (!catData) {
            dbg("convert(): unknown category", categoryKey);
            if (DOM.outputValue) DOM.outputValue.value = "";
            return;
        }

        if (!DOM.unitFrom || !DOM.unitTo || !DOM.inputValue || !DOM.outputValue) {
            dbg("convert(): missing DOM elements");
            return;
        }

        const units = catData.units;
        const fromId = DOM.unitFrom.value;
        const toId = DOM.unitTo.value;

        const fromUnit = units[fromId];
        const toUnit = units[toId];

        const raw = (DOM.inputValue.value || "").toString().trim();
        const value = parseLocaleNumber(raw);

        const invalidInput = raw !== "" && isNaN(value);
        if (DOM.inputValue) {
            DOM.inputValue.classList.toggle("is-invalid", invalidInput);
            DOM.inputValue.setAttribute("aria-invalid", invalidInput ? "true" : "false");
        }

        if (!fromUnit || !toUnit || isNaN(value)) {
            DOM.outputValue.value = "";
            if (DOM.conversionSummary) DOM.conversionSummary.textContent = "";
            if (DOM.belowAbsZeroWarn) DOM.belowAbsZeroWarn.hidden = true;
            return;
        }

        let baseValue;

        // 1. source to base
        if (typeof fromUnit.toBase === "function") {
            baseValue = fromUnit.toBase(value);
        } else if (typeof fromUnit.factor === "number") {
            baseValue = value * fromUnit.factor;
        } else {
            dbg("convert(): fromUnit has neither factor nor toBase", fromId);
            DOM.outputValue.value = "";
            if (DOM.conversionSummary) DOM.conversionSummary.textContent = "";
            return;
        }

        // Warn if temperature is below absolute zero
        if (DOM.belowAbsZeroWarn) {
            const isBelowAbsZero = categoryKey === "temperature" && baseValue < 0;
            DOM.belowAbsZeroWarn.hidden = !isBelowAbsZero;
            if (isBelowAbsZero) {
                DOM.belowAbsZeroWarn.textContent =
                    state.currentLocale?.ui?.belowAbsZeroWarning || "⚠ Below absolute zero (0 K)";
            }
        }

        // 2. base to destination
        let result;

        if (typeof toUnit.fromBase === "function") {
            result = toUnit.fromBase(baseValue);
        } else if (typeof toUnit.factor === "number") {
            result = baseValue / toUnit.factor;
        } else {
            dbg("convert(): toUnit has neither factor nor fromBase", toId);
            DOM.outputValue.value = "";
            if (DOM.conversionSummary) DOM.conversionSummary.textContent = "";
            return;
        }

        if (!Number.isFinite(result)) {
            if (DOM.outputValue) DOM.outputValue.value = "";
            if (DOM.conversionSummary) DOM.conversionSummary.textContent = "";
            state.lastInputValue = null;
            state.lastResultValue = null;
            return;
        }

        // Store raw values for summary & copy
        state.lastInputValue = value;
        state.lastResultValue = result;

        const formattedResult = formatNumberForLocale(result);
        if (DOM.outputValue) {
            DOM.outputValue.value = formattedResult;
        }

        updateConversionSummary(value, result);
    }

    function updateConversionSummary(inputValue, result) {
        if (!DOM.conversionSummary) return;

        if (!Number.isFinite(result)) {
            DOM.conversionSummary.textContent = "";
            return;
        }

        const fromKey = DOM.unitFrom.value;
        const toKey = DOM.unitTo.value;

        const formattedInput = formatNumberForLocale(inputValue);
        const formattedResult = formatNumberForLocale(result);

        const fromSymbol = getUnitSymbol(fromKey);
        const toSymbol = getUnitSymbol(toKey);

        // Fallback: if for some reason no symbol is found, use the key itself
        const fromText = fromSymbol || fromKey;
        const toText = toSymbol || toKey;

        DOM.conversionSummary.textContent =
            `${formattedInput} ${fromText} = ${formattedResult} ${toText}`;
    }

    function getUnitSymbol(unitKey) {
        if (!unitKey) return "";

        const currentCategory = state.category;
        if (currentCategory && UNITS[currentCategory]?.units?.[unitKey]?.symbol) {
            return UNITS[currentCategory].units[unitKey].symbol;
        }

        // Fallback: search all categories once
        for (const cat of Object.values(UNITS)) {
            if (cat.units && cat.units[unitKey]?.symbol) {
                return cat.units[unitKey].symbol;
            }
        }

        // Final fallback: just return the key
        return unitKey;
    }


    // ------------------------------------------------------------------------
    //  UI Update
    // ------------------------------------------------------------------------

    function updateUI() {
        updateCategoryTitle();
        updateCategoryButtons();
        populateUnitSelects();

        if (DOM.inputValue && DOM.inputValue.value.trim() !== "") {
            convert();
        } else if (DOM.outputValue) {
            DOM.outputValue.value = "";
        }

        if (DOM.extraMatrix) {
            DOM.extraMatrix.hidden = !state.matrixExpanded;
        }
        updateMatrixToggleLabel();
    }

    // ------------------------------------------------------------------------
    //  Modals
    // ------------------------------------------------------------------------

    let lastFocusedElement = null;
    let currentModal = null;

    function openModal(modalEl) {
        if (!modalEl) return;

        // remember previous focus
        lastFocusedElement =
            document.activeElement && document.activeElement instanceof HTMLElement
                ? document.activeElement
                : null;

        currentModal = modalEl;
        currentModal.classList.add("is-open");
        currentModal.setAttribute("aria-hidden", "false");

        const focusTarget =
            currentModal.querySelector(".modal-close") ||
            currentModal.querySelector(".modal-dialog");

        if (focusTarget && typeof focusTarget.focus === "function") {
            focusTarget.focus();
        }

        document.addEventListener("keydown", trapFocus);
    }

    function closeModal() {
        if (!currentModal) return;

        currentModal.classList.remove("is-open");
        currentModal.setAttribute("aria-hidden", "true");

        document.removeEventListener("keydown", trapFocus);

        if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
            lastFocusedElement.focus();
        }

        currentModal = null;
    }

    function trapFocus(event) {
        const focusable = Array.from(
            currentModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        ).filter(el => !el.disabled);

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.key === "Tab") {
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
        if (event.key === "Escape") closeModal();
    }
    
    // ------------------------------------------------------------------------
    //  Strict Locale / Unit Validation
    // ------------------------------------------------------------------------

    function validateLocalesStrict() {
        if (!LOCALES || !UNITS) return;

        const requiredUiKeys = [
            "title",
            "tagline",
            "labelFrom",
            "labelTo",
            "matrixMore",
            "matrixLess",
            "footerSupportText",
            "footerSupportLink"
        ];

        console.groupCollapsed && console.groupCollapsed("UnitMatrix: Locale & Unit validation");

        const allUnitIds = new Set();
        Object.values(UNITS).forEach((cat) => {
            if (!cat.units) return;
            Object.keys(cat.units).forEach((id) => allUnitIds.add(id));
        });

        const allCategoryKeys = Object.keys(UNITS);

        Object.entries(LOCALES).forEach(([code, locale]) => {
            const prefix = `[${code}]`;
            const ui = locale.ui || {};
            const catLabels = locale.categories || {};
            const catButtons = locale.categoryButtons || {};
            const unitLabels = locale.unitLabels || {};

            // 1. Required UI keys
            requiredUiKeys.forEach((key) => {
                if (typeof ui[key] === "undefined") {
                    console.error(`${prefix} Missing ui.${key}`);
                }
            });

            // 2. Categories: every UNITS category must have a label
            allCategoryKeys.forEach((catKey) => {
                if (!catLabels[catKey]) {
                    console.warn(`${prefix} Missing categories["${catKey}"] label`);
                }
            });

            //    And no extra categories in locale
            Object.keys(catLabels).forEach((catKey) => {
                if (!UNITS[catKey]) {
                    console.warn(`${prefix} categories["${catKey}"] has no matching UNITS category`);
                }
            });

            // 3. categoryButtons should only reference valid categories
            Object.keys(catButtons).forEach((catKey) => {
                if (!catLabels[catKey]) {
                    console.warn(`${prefix} categoryButtons["${catKey}"] has no matching categories["${catKey}"]`);
                }
                if (!UNITS[catKey]) {
                    console.warn(`${prefix} categoryButtons["${catKey}"] has no matching UNITS category`);
                }
            });

            // 4. Units: all units must have labels
            allUnitIds.forEach((unitId) => {
                if (!unitLabels[unitId]) {
                    console.error(`${prefix} Missing unitLabels["${unitId}"]`);
                }
            });

            //    And no extra unit labels
            Object.keys(unitLabels).forEach((labelId) => {
                if (!allUnitIds.has(labelId)) {
                    console.warn(`${prefix} unitLabels["${labelId}"] does not match any UNITS entry`);
                }
            });
        });

        console.groupEnd && console.groupEnd();
    }

    // ------------------------------------------------------------------------
    //  Dynamic select population
    // ------------------------------------------------------------------------

    function populateThemeSelect() {
        if (!DOM.themeSelect) return;

        DOM.themeSelect.innerHTML = Object.values(THEMES)
            .map((theme) => `<option value="${theme.id}">${theme.label}</option>`)
            .join("");
    }

    function populateLanguageSelect() {
        if (!DOM.langSelect) return;

        DOM.langSelect.innerHTML = SUPPORTED_LOCALES
            .map(({code, name}) => `<option value="${code}">${name}</option>`)
            .join("");
    }

    // ------------------------------------------------------------------------
    //  Events
    // ------------------------------------------------------------------------

    function bindEvents() {
        const debouncedConvert = debounce(convert, 150);

        if (DOM.inputValue) {
            DOM.inputValue.addEventListener("input", debouncedConvert);
            DOM.inputValue.addEventListener("keydown", (e) => {
                if (e.key === "Enter") convert();
            });
        }

        if (DOM.unitFrom) DOM.unitFrom.addEventListener("change", convert);
        if (DOM.unitTo) DOM.unitTo.addEventListener("change", convert);

        if (DOM.catButtons && DOM.catButtons.length) {
            DOM.catButtons.forEach((btn) => {
                btn.addEventListener("click", () => {
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
        }

        if (DOM.langSelect) {
            DOM.langSelect.addEventListener("change", () => {
                setLanguage(DOM.langSelect.value).catch(console.error);
            });
        }

        if (DOM.matrixToggle && DOM.extraMatrix) {
            DOM.matrixToggle.addEventListener("click", () => {
                state.matrixExpanded = !state.matrixExpanded;
                DOM.extraMatrix.hidden = !state.matrixExpanded;
                updateMatrixToggleLabel();
            });
        }

        if (DOM.themeSelect) {
            DOM.themeSelect.addEventListener("change", (event) => {
                const newTheme = event.target.value;
                applyTheme(newTheme);
                try {
                    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
                } catch (_) {
                    // ignore
                }
            });
        }

        // Privacy modal: open from footer link
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
                DOM.unitTo.value = oldFrom;

                // if we have a last result, use it as new input
                if (Number.isFinite(state.lastResultValue)) {
                    const newInput = state.lastResultValue;
                    state.lastInputValue = newInput;
                    DOM.inputValue.value = formatNumberForLocale(newInput);
                }

                // Recalculate with swapped units
                convert();
            });
        }


        if (DOM.copyResultBtn) {
            DOM.copyResultBtn.addEventListener("click", () => {
                if (!Number.isFinite(state.lastResultValue)) return;

                const raw = String(state.lastResultValue); // always dot as decimal
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(raw).catch(() => {
                        // clipboard write failed silently — no fallback available
                    });
                } else {
                    // very old browsers: put it into the output field so user can copy manually
                    if (DOM.outputValue) {
                        DOM.outputValue.select();
                    }
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

        // Close modals when clicking backdrop or elements with [data-modal-close]
        document.querySelectorAll(".modal").forEach((modalEl) => {
            modalEl.addEventListener("click", (event) => {
                const target = event.target;
                if (!(target instanceof HTMLElement)) return;

                if (target.hasAttribute("data-modal-close")) {
                    closeModal();
                }
            });
        });
    }

    // ------------------------------------------------------------------------
    //  Init
    // ------------------------------------------------------------------------

    async function init() {
        const categories = Object.keys(UNITS || {});
        state.category = categories[0] || null;

        populateThemeSelect();
        populateLanguageSelect();

        const initialTheme = getInitialTheme();
        applyTheme(initialTheme);

        const initialLang = getInitialLanguage();
        await setLanguage(initialLang);

        bindEvents();

        // Strict validation
        if (typeof DEBUG !== "undefined" && DEBUG) {
            validateLocalesStrict();
        }
    }

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js").catch(console.error);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init().catch(console.error);
    }
})();
