import { state } from "./state.js";
import { UNITS } from "./units.js";

export const SUPPORTED_LOCALES = [
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

export const SUPPORTED_CODES = new Set(SUPPORTED_LOCALES.map(l => l.code));
export const FALLBACK_LANG   = "en";

const LOCALES = {};

export async function loadLocale(code) {
    if (!SUPPORTED_CODES.has(code)) code = FALLBACK_LANG;
    if (LOCALES[code]) return;
    try {
        const mod = await import(`./locales/${code}.js`);
        LOCALES[code] = mod.default;
    } catch (_) {
        if (code !== FALLBACK_LANG) await loadLocale(FALLBACK_LANG);
    }
}

export function getInitialLanguage(storageKey) {
    try {
        const stored = localStorage.getItem(storageKey);
        if (stored && SUPPORTED_CODES.has(stored)) return stored;
    } catch (_) {}
    const browserLang = (navigator.language || "").slice(0, 2).toLowerCase();
    if (SUPPORTED_CODES.has(browserLang)) return browserLang;
    return FALLBACK_LANG;
}

export function applyLocale(DOM, config) {
    if (!state.currentLocale) return;
    const locale = state.currentLocale;
    const ui     = locale.ui || {};

    const seoTitle = ui.titleTag || ui.title;
    if (seoTitle) document.title = seoTitle;

    if (DOM.metaDescription && ui.descriptionTag) {
        DOM.metaDescription.setAttribute("content", ui.descriptionTag);
    }
    if (DOM.tagline  && ui.tagline)  DOM.tagline.textContent  = ui.tagline;
    if (DOM.fromLabel && ui.labelFrom) DOM.fromLabel.textContent = ui.labelFrom;
    if (DOM.toLabel   && ui.labelTo)   DOM.toLabel.textContent   = ui.labelTo;
    if (DOM.swapUnitsBtn && ui.swapUnitsAria) {
        DOM.swapUnitsBtn.setAttribute("aria-label", ui.swapUnitsAria);
    }
    if (DOM.copyResultBtn) DOM.copyResultBtn.textContent = ui.copyResultLabel;

    if (DOM.footerSupport && ui.footerSupportText) {
        const parts = ui.footerSupportText.split("{link}");
        DOM.footerSupport.textContent = "";
        DOM.footerSupport.appendChild(document.createTextNode(parts[0] || ""));
        const a = document.createElement("a");
        a.href      = "#";
        a.id        = "supportLink";
        a.textContent = ui.footerSupportLink || "";
        DOM.footerSupport.appendChild(a);
        DOM.footerSupport.appendChild(document.createTextNode(parts[1] || ""));
    }

    if (DOM.aboutLink && ui.aboutLink) DOM.aboutLink.textContent = ui.aboutLink;
    if (DOM.aboutModalTitle && ui.aboutTitle) DOM.aboutModalTitle.textContent = ui.aboutTitle;
    if (DOM.aboutModalBody) {
        DOM.aboutModalBody.textContent = "";
        [ui.aboutP1, ui.aboutP2, ui.aboutP3].filter(Boolean).forEach((text) => {
            const p = document.createElement("p");
            p.textContent = text;
            DOM.aboutModalBody.appendChild(p);
        });

        const deps = document.createElement("div");
        deps.className = "modal-deps";
        const depsLabel = document.createElement("p");
        depsLabel.textContent = ui.aboutDepsLabel || "Open source components used:";
        deps.appendChild(depsLabel);
        [
            { name: "Inter", author: "The Inter Project Authors", license: "SIL Open Font License 1.1", url: "https://github.com/rsms/inter" },
        ].forEach(({ name, author, license, url }) => {
            const p = document.createElement("p");
            const a = document.createElement("a");
            a.href = url;
            a.target = "_blank";
            a.rel = "noopener";
            a.textContent = name;
            p.appendChild(a);
            p.appendChild(document.createTextNode(` — ${author} — ${license}`));
            deps.appendChild(p);
        });
        DOM.aboutModalBody.appendChild(deps);
    }

    if (DOM.privacyLink && ui.privacyLink) DOM.privacyLink.textContent = ui.privacyLink;
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
        donateLink.href      = config.DONATE_PAYPAL_URL;
        donateLink.target    = "_blank";
        donateLink.rel       = "noopener noreferrer";
        donateLink.textContent = ui.supportPaypalLabel || "Donate via PayPal";
        row.appendChild(donateLink);
        DOM.supportModalBody.appendChild(row);
    }

    if (DOM.impressumLink && ui.impressumLink) DOM.impressumLink.textContent = ui.impressumLink;
    if (DOM.impressumModalTitle && ui.impressumTitle) {
        DOM.impressumModalTitle.textContent = ui.impressumTitle;
    }
    if (DOM.impressumModalBody) {
        DOM.impressumModalBody.textContent = "";

        const p1 = document.createElement("p");
        const providerLabel = document.createElement("strong");
        providerLabel.textContent = ui.impressumProviderLabel || "Service provider";
        p1.appendChild(providerLabel);
        config.OWNER_ADDRESS.forEach((line) => {
            p1.appendChild(document.createElement("br"));
            p1.appendChild(document.createTextNode(line));
        });
        DOM.impressumModalBody.appendChild(p1);

        const p2 = document.createElement("p");
        const contactLabel = document.createElement("strong");
        contactLabel.textContent = ui.impressumContactLabel || "Contact";
        p2.appendChild(contactLabel);
        p2.appendChild(document.createElement("br"));
        p2.appendChild(document.createTextNode(ui.impressumEmailLabel || "E-mail: "));
        const emailLink = document.createElement("a");
        emailLink.href        = "mailto:" + config.EMAIL;
        emailLink.textContent = config.EMAIL;
        p2.appendChild(emailLink);
        DOM.impressumModalBody.appendChild(p2);

        [ui.impressumP3, ui.impressumP4].filter(Boolean).forEach((text) => {
            const p = document.createElement("p");
            p.textContent = text;
            DOM.impressumModalBody.appendChild(p);
        });
    }
}

// Switches locale state + applies to DOM; does NOT call updateUI — caller's responsibility
export async function switchLocale(lang, DOM, config, storageKey) {
    if (!SUPPORTED_CODES.has(lang)) lang = FALLBACK_LANG;
    await loadLocale(lang);
    state.currentLocale = LOCALES[lang] || LOCALES[FALLBACK_LANG] || {};
    const code = state.currentLocale.code || lang;
    document.documentElement.setAttribute("lang", state.currentLocale.htmlLang || code);
    if (DOM.langSelect) DOM.langSelect.value = code;
    applyLocale(DOM, config);
    try { localStorage.setItem(storageKey, code); } catch (_) {}
}

export function validateLocalesStrict() {
    const requiredUiKeys = [
        "title", "tagline", "labelFrom", "labelTo",
        "matrixMore", "matrixLess", "footerSupportText", "footerSupportLink",
    ];

    console.groupCollapsed?.("UnitMatrix: Locale & Unit validation");

    const allUnitIds = new Set(Object.values(UNITS).flatMap(c => Object.keys(c.units || {})));
    const allCatKeys = Object.keys(UNITS);

    Object.entries(LOCALES).forEach(([code, locale]) => {
        const prefix     = `[${code}]`;
        const ui         = locale.ui || {};
        const catLabels  = locale.categories || {};
        const catButtons = locale.categoryButtons || {};
        const unitLabels = locale.unitLabels || {};

        requiredUiKeys.forEach((key) => {
            if (ui[key] === undefined) console.error(`${prefix} Missing ui.${key}`);
        });

        allCatKeys.forEach((k) => {
            if (!catLabels[k]) console.warn(`${prefix} Missing categories["${k}"]`);
        });
        Object.keys(catLabels).forEach((k) => {
            if (!UNITS[k]) console.warn(`${prefix} categories["${k}"] has no UNITS match`);
        });
        Object.keys(catButtons).forEach((k) => {
            if (!UNITS[k]) console.warn(`${prefix} categoryButtons["${k}"] has no UNITS match`);
        });

        allUnitIds.forEach((id) => {
            if (!unitLabels[id]) console.error(`${prefix} Missing unitLabels["${id}"]`);
        });
        Object.keys(unitLabels).forEach((id) => {
            if (!allUnitIds.has(id)) console.warn(`${prefix} unitLabels["${id}"] not in UNITS`);
        });
    });

    console.groupEnd?.();
}
