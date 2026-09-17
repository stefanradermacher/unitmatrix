// Run with: node test.mjs
import { UNITS } from "./assets/js/units.js";

// ─── Conversion helpers (mirrors app.js logic) ───────────────────────────────

function toBase(unit, value) {
    if (typeof unit.toBase === "function") return unit.toBase(value);
    if (typeof unit.factor === "number")   return value * unit.factor;
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

// ─── Per-unit base-value tests ────────────────────────────────────────────────
// Roundtrip tests (A→B→A) pass even if B's factor is wrong, as long as the same
// wrong factor is used both ways. These check every unit against its category's
// base unit with independently verified real-world values, so a wrong factor
// can no longer hide behind a symmetric roundtrip.

// Fuel economy (nonlinear toBase/fromBase — most worth testing here)
check("1 L/100km  = 1 L/100km (base)",  convert(1,   "l_100km", "l_100km", UNITS.fuel_economy), 1,                  EPS);
check("8 km/L     = 12.5 L/100km",      convert(8,   "km_l",    "l_100km", UNITS.fuel_economy), 12.5,               EPS);
check("30 mpg(US) = 7.840486... L/100km", convert(30, "mpg_us",  "l_100km", UNITS.fuel_economy), 7.84048611111111,  EPS);
check("30 mpg(UK) = 9.416031... L/100km", convert(30, "mpg_uk",  "l_100km", UNITS.fuel_economy), 9.416031211060737, EPS);

// Flow
check("1 m³/min = 1/60 m³/s",     convert(1, "m3_min",  "m3_s", UNITS.flow), 1 / 60,             EPS);
check("1 m³/h   = 1/3600 m³/s",   convert(1, "m3_h",    "m3_s", UNITS.flow), 1 / 3_600,          EPS);
check("1 L/s    = 0.001 m³/s",    convert(1, "l_s",     "m3_s", UNITS.flow), 0.001,              EPS);
check("1 L/min  = 1.6667e-5 m³/s",convert(1, "l_min",   "m3_s", UNITS.flow), 0.001 / 60,         EPS);
check("1 L/h    = 2.7778e-7 m³/s",convert(1, "l_h",     "m3_s", UNITS.flow), 0.001 / 3_600,      EPS);
check("1 ft³/s  = 0.0283168 m³/s",convert(1, "ft3_s",   "m3_s", UNITS.flow), 0.0283168,          EPS);
check("1 gal/min= 6.309e-5 m³/s", convert(1, "gal_min", "m3_s", UNITS.flow), 3.785411784e-3 / 60, EPS);

// Luminance
check("1 nit = 1 cd/m²",       convert(1, "nit", "cd_m2", UNITS.luminance), 1,        EPS);
check("1 fL  = 3.42626 cd/m²", convert(1, "fL",  "cd_m2", UNITS.luminance), 3.42626,  EPS);
check("1 L   = 3183.099 cd/m² (1 lambert = 10000/π cd/m²)", convert(1, "L", "cd_m2", UNITS.luminance), 10_000 / Math.PI, 1e-3);
check("1 sb  = 10000 cd/m²",   convert(1, "sb", "cd_m2", UNITS.luminance), 10_000,   EPS);

// Radioactivity
check("1 kBq     = 1000 Bq",     convert(1, "kBq",     "Bq", UNITS.radioactivity), 1_000,     EPS);
check("1 MBq     = 1e6 Bq",      convert(1, "MBq",     "Bq", UNITS.radioactivity), 1_000_000, EPS);
check("1 GBq     = 1e9 Bq",      convert(1, "GBq",     "Bq", UNITS.radioactivity), 1e9,       EPS);
check("1 Ci      = 3.7e10 Bq",   convert(1, "Ci",      "Bq", UNITS.radioactivity), 3.7e10,    EPS);
check("1 mCi     = 3.7e7 Bq",    convert(1, "mCi",     "Bq", UNITS.radioactivity), 3.7e7,     EPS);
check("1 microCi = 37000 Bq",    convert(1, "microCi", "Bq", UNITS.radioactivity), 37_000,    EPS);

// Viscosity
check("1 mPa·s      = 0.001 Pa·s",    convert(1, "mPa_s",  "Pa_s", UNITS.viscosity), 0.001,   EPS);
check("1 cP         = 0.001 Pa·s",    convert(1, "cP",     "Pa_s", UNITS.viscosity), 0.001,   EPS);
check("1 P          = 0.1 Pa·s",      convert(1, "P",      "Pa_s", UNITS.viscosity), 0.1,     EPS);
check("1 lb/(ft·s)  = 1.48816 Pa·s",  convert(1, "lb_fts", "Pa_s", UNITS.viscosity), 1.48816, EPS);

// Data rate
check("1 kbit/s = 1000 bit/s",   convert(1, "kbit_s", "bit_s", UNITS.data_rate), 1_000,     EPS);
check("1 Mbit/s = 1e6 bit/s",    convert(1, "Mbit_s", "bit_s", UNITS.data_rate), 1_000_000, EPS);
check("1 Gbit/s = 1e9 bit/s",    convert(1, "Gbit_s", "bit_s", UNITS.data_rate), 1e9,       EPS);
check("1 B/s    = 8 bit/s",      convert(1, "B_s",    "bit_s", UNITS.data_rate), 8,         EPS);
check("1 kB/s   = 8000 bit/s",   convert(1, "kB_s",   "bit_s", UNITS.data_rate), 8_000,     EPS);
check("1 MB/s   = 8e6 bit/s",    convert(1, "MB_s",   "bit_s", UNITS.data_rate), 8_000_000, EPS);
check("1 GB/s   = 8e9 bit/s",    convert(1, "GB_s",   "bit_s", UNITS.data_rate), 8e9,       EPS);

// ─── Summary ─────────────────────────────────────────────────────────────────

const total = passed + failed;
console.log(`\n${passed}/${total} tests passed${failed > 0 ? ` — ${failed} FAILED` : " ✓"}`);
if (failed > 0) process.exit(1);
