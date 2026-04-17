// Run with: node test.js
"use strict";

// noinspection JSUnresolvedVariable,JSUnresolvedFunction
const UNITS = require("./assets/js/units.js");

// ─── Conversion helpers (mirrors app.js logic) ───────────────────────────────

function toBase(unit, value) {
    if (typeof unit.toBase   === "function") return unit.toBase(value);
    if (typeof unit.factor   === "number")   return value * unit.factor;
    throw new Error("Unit has neither toBase nor factor");
}

function fromBase(unit, value) {
    if (typeof unit.fromBase === "function") return unit.fromBase(value);
    if (typeof unit.factor   === "number")   return value / unit.factor;
    throw new Error("Unit has neither fromBase nor factor");
}

function convert(value, fromId, toId, cat) {
    return fromBase(cat.units[toId], toBase(cat.units[fromId], value));
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

function check(label, actual, expected, tolerance = 1e-9) {
    const ok = Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected));
    if (ok) {
        passed++;
    } else {
        console.error(`FAIL  ${label}`);
        console.error(`      expected ${expected}, got ${actual}`);
        failed++;
    }
}

// ─── Roundtrip tests (convert A→B→A must equal 1 for all unit pairs) ─────────

for (const [catKey, cat] of Object.entries(UNITS)) {
    const ids = Object.keys(cat.units);
    for (const fromId of ids) {
        for (const toId of ids) {
            const there = convert(1, fromId, toId, cat);
            const back  = convert(there, toId, fromId, cat);
            check(`${catKey}: ${fromId} → ${toId} → ${fromId}`, back, 1);
        }
    }
}

// ─── Known-good values ────────────────────────────────────────────────────────

const EPS = 1e-6;

// Length
check("1 mile = 1609.344 m",     convert(1,    "mi",  "m",   UNITS.length), 1609.344,    EPS);
check("1 inch = 0.0254 m",       convert(1,    "in",  "m",   UNITS.length), 0.0254,      EPS);
check("1 nmi  = 1852 m",         convert(1,    "nmi", "m",   UNITS.length), 1852,        EPS);

// Mass
check("1 lb   = 0.45359237 kg",  convert(1,    "lb",  "kg",  UNITS.mass),   0.45359237,  EPS);

// Temperature
check("100 °C = 212 °F",         convert(100,  "C",   "F",   UNITS.temperature), 212,    EPS);
check("0 °C   = 273.15 K",       convert(0,    "C",   "K",   UNITS.temperature), 273.15, EPS);
check("32 °F  = 0 °C",           convert(32,   "F",   "C",   UNITS.temperature), 0,      EPS);

// Pressure
check("1 psi  = 6894.757... Pa", convert(1,    "psi", "Pa",  UNITS.pressure), 6894.757293168361, EPS);
check("1 atm  = 101325 Pa",      convert(1,    "atm", "Pa",  UNITS.pressure), 101325,    EPS);

// Energy
check("1 BTU  = 1055.056 J",     convert(1,    "BTU", "J",      UNITS.energy),  1055.05585262, EPS);
check("1 kcal = 4184 J",         convert(1,    "kcal","J",      UNITS.energy),  4184,          EPS);

// Speed
check("1 mph  = 0.44704 m/s",    convert(1,    "mph", "m_per_s", UNITS.speed),  0.44704,       EPS);

// Volume
check("1 l    = 0.001 m³",       convert(1,    "l",   "m3",  UNITS.volume),   0.001,     EPS);

// Area
check("1 ha   = 10000 m²",       convert(1,    "ha",  "m2",  UNITS.area),     10000,     EPS);

// ─── Summary ─────────────────────────────────────────────────────────────────

const total = passed + failed;
console.log(`\n${passed}/${total} tests passed${failed > 0 ? ` — ${failed} FAILED` : " ✓"}`);
// noinspection JSUnresolvedVariable
if (failed > 0) process.exit(1);
