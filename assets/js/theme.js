export const THEMES = {
    sky:        {id: "sky",        label: "UnitMatrix Sky",        prefers: "light", themeColor: "#d9efff"},
    space:      {id: "space",      label: "UnitMatrix Space",      prefers: "dark",  themeColor: "#111c2f"},
    solar:      {id: "solar",      label: "UnitMatrix Solar",      prefers: "light", themeColor: "#ffecc2"},
    sylvan:     {id: "sylvan",     label: "UnitMatrix Sylvan",     prefers: "light", themeColor: "#e1f3e1"},
    strawberry: {id: "strawberry", label: "UnitMatrix Strawberry", prefers: "light", themeColor: "#ffe3e8"},
    slate:      {id: "slate",      label: "UnitMatrix Slate",      prefers: "dark",  themeColor: "#0f0f1a"},
    sand:       {id: "sand",       label: "UnitMatrix Sand",       prefers: "light", themeColor: "#ede3d0"},
    sterling:   {id: "sterling",   label: "UnitMatrix Sterling",   prefers: "light", themeColor: "#e0e4ec"},
};

export const ALLOWED_THEMES      = new Set(Object.keys(THEMES));
export const DEFAULT_LIGHT_THEME = "sky";
export const DEFAULT_DARK_THEME  = "space";

export function applyTheme(themeKey, DOM) {
    if (!ALLOWED_THEMES.has(themeKey)) themeKey = DEFAULT_LIGHT_THEME;
    const theme = THEMES[themeKey];
    if (!theme) return;
    document.documentElement.setAttribute("data-theme", themeKey);
    if (DOM.themeSelect)    DOM.themeSelect.value = themeKey;
    if (DOM.metaThemeColor) DOM.metaThemeColor.setAttribute("content", theme.themeColor);
}

export function getInitialTheme(storageKey) {
    try {
        const stored = localStorage.getItem(storageKey);
        if (stored && ALLOWED_THEMES.has(stored)) return stored;
    } catch (_) {}
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches
        ? DEFAULT_DARK_THEME
        : DEFAULT_LIGHT_THEME;
}
