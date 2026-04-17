// ============================================================================
//  UnitMatrix App
// ============================================================================
(() => {
    "use strict";

    const DEBUG = new URLSearchParams(location.search).has("debug");

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

    // Categories shown in the main grid (in order); everything else goes into the "extra" section
    const MAIN_CATEGORIES = [
        "length", "area", "volume", "mass",
        "temperature", "time", "speed", "pressure",
        "energy", "power", "force", "torque",
        "voltage", "current", "frequency", "storage",
    ];

    // SVG inner markup for each category icon (outer <svg> is added by renderCategoryButtons)
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
    //  DOM Cache (filled in init() after DOM is ready)
    // ------------------------------------------------------------------------

    let DOM;

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
        if (DEBUG) console.warn(...args);
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
        if (!SUPPORTED_CODES.has(code)) code = FALLBACK_LANG;
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
        const labels = state.currentLocale.categoryButtons || {};

        document.querySelectorAll(".cat-btn").forEach((btn) => {
            const cat = btn.getAttribute("data-cat");
            const labelEl = btn.querySelector(".cat-label");
            if (!cat || !labelEl) return;
            labelEl.textContent = labels[cat] || cat;
            btn.classList.toggle("active", cat === state.category);
        });
    }

    function populateUnitSelects() {
        if (!DOM.unitFrom || !DOM.unitTo) return;

        const category = state.category;
        const catData = UNITS[category];

        if (!catData || !catData.units) {
            dbg("populateUnitSelects(): unknown category", category);
            DOM.unitFrom.textContent = "";
            DOM.unitTo.textContent = "";
            return;
        }

        const units = catData.units;
        const labels = state.currentLocale.unitLabels || {};

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
        const defaultTo = catData.defaultTo || entries[1]?.[0] || entries[0]?.[0];

        const validIds = new Set(Object.keys(units));
        const currentFrom = validIds.has(DOM.unitFrom.value) ? DOM.unitFrom.value : defaultFrom;
        const currentTo   = validIds.has(DOM.unitTo.value)   ? DOM.unitTo.value   : defaultTo;

        fillSelect(DOM.unitFrom, currentFrom);
        fillSelect(DOM.unitTo, currentTo);
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
    //  Category button rendering
    // ------------------------------------------------------------------------

    function renderCategoryButtons() {
        const mainGrid  = document.querySelector(".unitmatrix-grid");
        const extraGrid = DOM.extraMatrix;
        if (!mainGrid || !extraGrid) return;

        const mainSet   = new Set(MAIN_CATEGORIES);
        const extraKeys = Object.keys(UNITS).filter((k) => !mainSet.has(k));

        function makeButton(catKey) {
            const btn = document.createElement("button");
            btn.type = "button";
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

        if (focusable.length === 0) {
            if (event.key === "Escape") closeModal();
            return;
        }

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

        DOM.themeSelect.textContent = "";
        Object.values(THEMES).forEach((theme) => {
            const opt = document.createElement("option");
            opt.value = theme.id;
            opt.textContent = theme.label;
            DOM.themeSelect.appendChild(opt);
        });
    }

    function populateLanguageSelect() {
        if (!DOM.langSelect) return;

        DOM.langSelect.textContent = "";
        SUPPORTED_LOCALES.forEach(({code, name}) => {
            const opt = document.createElement("option");
            opt.value = code;
            opt.textContent = name;
            DOM.langSelect.appendChild(opt);
        });
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

        [document.querySelector(".unitmatrix-grid"), DOM.extraMatrix].forEach((container) => {
            if (!container) return;
            container.addEventListener("click", (e) => {
                const btn = e.target.closest(".cat-btn");
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
        DOM = {
            langSelect: document.getElementById("languageSelect"),
            themeSelect: document.getElementById("themeSelect"),
            categoryTitle: document.getElementById("categoryTitle"),
            unitFrom: document.getElementById("unitFrom"),
            unitTo: document.getElementById("unitTo"),
            inputValue: document.getElementById("inputValue"),
            outputValue: document.getElementById("outputValue"),
            copyResultBtn: document.getElementById("copyResultBtn"),
            swapUnitsBtn: document.getElementById("swapUnitsBtn"),

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
            impressumModalBody: document.getElementById("impressumModalBody"),
        };

        const categories = Object.keys(UNITS || {});
        state.category = categories[0] || null;

        populateThemeSelect();
        populateLanguageSelect();
        renderCategoryButtons();

        const initialTheme = getInitialTheme();
        applyTheme(initialTheme);

        const initialLang = getInitialLanguage();
        await setLanguage(initialLang);

        bindEvents();

        // Strict validation
        if (DEBUG) {
            validateLocalesStrict();
        }
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

        const box = document.createElement("div");
        box.className = "fatal-error-box";

        const title = document.createElement("h2");
        title.id = "fatalErrorTitle";
        title.textContent = "Something went wrong";

        const msg = document.createElement("p");
        msg.textContent = "An unexpected error occurred. Please reload the page.";

        if (detail) {
            const pre = document.createElement("pre");
            pre.textContent = detail;
            pre.style.cssText = "font-size:12px;opacity:0.6;overflow:auto;text-align:left;margin:0 0 16px";
            box.append(title, pre, msg);
        } else {
            box.append(title, msg);
        }

        const btn = document.createElement("button");
        btn.type = "button";
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
})();
