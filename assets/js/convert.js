import { state } from "./state.js";
import { UNITS } from "./units.js";

export function parseLocaleNumber(raw) {
    if (raw == null) return NaN;
    let value = String(raw).trim();
    if (!value) return NaN;

    const usesCommaDecimal = state.currentLocale?.commaDecimal === true;
    value = value.replace(/[\s\u00A0\u202F]/g, "");

    if (usesCommaDecimal) {
        const hasComma = value.includes(",");
        const hasDot = value.includes(".");

        if (hasComma && hasDot) {
            // Mixed separators: whichever comes last is the decimal separator
            // ("1.234,5" -> German, "1,234.5" -> pasted English format).
            const decimalIsComma = value.lastIndexOf(",") > value.lastIndexOf(".");
            if (decimalIsComma) {
                value = value.replace(/\./g, "").replace(",", ".");
            } else {
                value = value.replace(/,/g, "");
            }
        } else if (hasComma) {
            value = value.replace(",", ".");
        } else if (hasDot) {
            // A single dot is only a thousands separator if it forms valid
            // grouping (e.g. "1.500", "1.234.567"). Otherwise treat it as a
            // decimal point ("1.5") rather than silently multiplying by 10.
            const isGrouped = /^\d{1,3}(\.\d{3})+$/.test(value);
            if (isGrouped) {
                value = value.replace(/\./g, "");
            } else if ((value.match(/\./g) || []).length > 1) {
                // Multiple dots that don't form valid grouping is ambiguous.
                return NaN;
            }
        }
    } else {
        value = value.replace(/,/g, "");
    }

    return parseFloat(value);
}

export function formatNumberForLocale(num, opts = {}) {
    if (num == null || !Number.isFinite(num)) return "";
    const localeTag = state.currentLocale?.htmlLang || "en-US";
    return new Intl.NumberFormat(localeTag, {
        maximumFractionDigits: opts.maximumFractionDigits ?? 10,
        minimumFractionDigits: opts.minimumFractionDigits ?? 0,
        useGrouping: opts.useGrouping !== false,
    }).format(num);
}

export function getUnitSymbol(unitKey) {
    if (!unitKey) return "";
    const cat = UNITS[state.category];
    if (cat?.units?.[unitKey]?.symbol) return cat.units[unitKey].symbol;
    for (const c of Object.values(UNITS)) {
        if (c.units?.[unitKey]?.symbol) return c.units[unitKey].symbol;
    }
    return unitKey;
}

export function updateConversionSummary(inputValue, result, DOM) {
    if (!DOM.conversionSummary) return;
    if (!Number.isFinite(result)) { DOM.conversionSummary.textContent = ""; return; }

    const fromText = getUnitSymbol(DOM.unitFrom.value) || DOM.unitFrom.value;
    const toText   = getUnitSymbol(DOM.unitTo.value)   || DOM.unitTo.value;

    DOM.conversionSummary.textContent =
        `${formatNumberForLocale(inputValue)} ${fromText} = ${formatNumberForLocale(result)} ${toText}`;
}

export function convert(DOM, dbg) {
    const categoryKey = state.category;
    const catData = UNITS[categoryKey];

    if (!catData) {
        dbg?.("convert(): unknown category", categoryKey);
        if (DOM.outputValue) DOM.outputValue.value = "";
        return;
    }

    const units  = catData.units;
    const fromId = DOM.unitFrom.value;
    const toId   = DOM.unitTo.value;
    const fromUnit = units[fromId];
    const toUnit   = units[toId];

    const raw = (DOM.inputValue.value || "").toString().trim();
    const value = parseLocaleNumber(raw);

    const invalidInput = raw !== "" && isNaN(value);
    DOM.inputValue.classList.toggle("is-invalid", invalidInput);
    DOM.inputValue.setAttribute("aria-invalid", invalidInput ? "true" : "false");

    if (!fromUnit || !toUnit || isNaN(value)) {
        DOM.outputValue.value = "";
        if (DOM.conversionSummary) DOM.conversionSummary.textContent = "";
        if (DOM.belowAbsZeroWarn) DOM.belowAbsZeroWarn.hidden = true;
        return;
    }

    let baseValue;
    if (typeof fromUnit.toBase === "function") {
        baseValue = fromUnit.toBase(value);
    } else if (typeof fromUnit.factor === "number") {
        baseValue = value * fromUnit.factor;
    } else {
        dbg?.("convert(): fromUnit has neither factor nor toBase", fromId);
        DOM.outputValue.value = "";
        if (DOM.conversionSummary) DOM.conversionSummary.textContent = "";
        return;
    }

    if (DOM.belowAbsZeroWarn) {
        const isBelowAbsZero = categoryKey === "temperature" && baseValue < 0;
        DOM.belowAbsZeroWarn.hidden = !isBelowAbsZero;
        if (isBelowAbsZero) {
            DOM.belowAbsZeroWarn.textContent =
                state.currentLocale?.ui?.belowAbsZeroWarning || "⚠ Below absolute zero (0 K)";
        }
    }

    let result;
    if (typeof toUnit.fromBase === "function") {
        result = toUnit.fromBase(baseValue);
    } else if (typeof toUnit.factor === "number") {
        result = baseValue / toUnit.factor;
    } else {
        dbg?.("convert(): toUnit has neither factor nor fromBase", toId);
        DOM.outputValue.value = "";
        if (DOM.conversionSummary) DOM.conversionSummary.textContent = "";
        return;
    }

    if (!Number.isFinite(result)) {
        DOM.outputValue.value = "";
        if (DOM.conversionSummary) DOM.conversionSummary.textContent = "";
        state.lastInputValue  = null;
        state.lastResultValue = null;
        return;
    }

    state.lastInputValue  = value;
    state.lastResultValue = result;
    DOM.outputValue.value = formatNumberForLocale(result);
    updateConversionSummary(value, result, DOM);
}
