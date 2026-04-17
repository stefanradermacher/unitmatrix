export const UNITS = {

    length: {
        base: "m",
        defaultFrom: "km",
        defaultTo: "m",
        units: {
            km:       {factor: 1_000,                 symbol: "km"},
            m:        {factor: 1,                     symbol: "m"},
            cm:       {factor: 0.01,                  symbol: "cm"},
            mm:       {factor: 0.001,                 symbol: "mm"},
            mi:       {factor: 1_609.344,             symbol: "mi"},
            yd:       {factor: 0.9144,                symbol: "yd"},
            ft:       {factor: 0.3048,                symbol: "ft"},
            in:       {factor: 0.0254,                symbol: "in"},
            nmi:      {factor: 1_852,                 symbol: "nmi"},
            angstrom: {factor: 1e-10,                 symbol: "Å"},
            ly:       {factor: 9_460_730_472_580_800, symbol: "ly"},
            pc:       {factor: 3.085677581491367e16,  symbol: "pc"}
        }
    },

    area: {
        base: "m2",
        defaultFrom: "m2",
        defaultTo: "ft2",
        units: {
            m2:  {factor: 1,            symbol: "m²"},
            cm2: {factor: 1e-4,         symbol: "cm²"},
            mm2: {factor: 1e-6,         symbol: "mm²"},
            km2: {factor: 1e6,          symbol: "km²"},
            ha:  {factor: 1e4,          symbol: "ha"},
            ft2: {factor: 0.09290304,   symbol: "sq.ft."},
            in2: {factor: 0.00064516,   symbol: "sq.in."},
            ac:  {factor: 4046.8564224, symbol: "ac"}
        }
    },

    volume: {
        base: "m3",
        defaultFrom: "l",
        defaultTo: "gal_us",
        units: {
            m3:       {factor: 1,                  symbol: "m³"},
            l:        {factor: 0.001,              symbol: "l"},
            dl:       {factor: 0.0001,             symbol: "dl"},
            ml:       {factor: 1e-6,               symbol: "ml"},
            cm3:      {factor: 1e-6,               symbol: "cm³"},
            ft3:      {factor: 0.028316846592,     symbol: "cu.ft."},
            in3:      {factor: 0.000016387064,     symbol: "cu.in."},
            gal_us:   {factor: 0.003785411784,     symbol: "gal"},
            qt_us:    {factor: 0.000946352946,     symbol: "qt"},
            pt_us:    {factor: 0.000473176473,     symbol: "pt"},
            cup_us:   {factor: 0.0002365882365,    symbol: "cup"},
            fl_oz_us: {factor: 2.95735295625e-5,   symbol: "fl oz"},
            tbsp_us:  {factor: 1.47867647813e-5,   symbol: "tbsp"},
            tsp_us:   {factor: 4.92892159375e-6,   symbol: "tsp"}
        }
    },

    mass: {
        base: "kg",
        defaultFrom: "kg",
        defaultTo: "lb",
        units: {
            kg: {factor: 1,               symbol: "kg"},
            g:  {factor: 0.001,           symbol: "g"},
            t:  {factor: 1_000,           symbol: "t"},
            lb: {factor: 0.45359237,      symbol: "lb"},
            oz: {factor: 0.028349523125,  symbol: "oz"},
            st: {factor: 6.35029318,      symbol: "st"},
            gr: {factor: 6.479891e-5,     symbol: "gr"},
            ct: {factor: 0.0002,          symbol: "ct"}
        }
    },

    temperature: {
        base: "K",
        defaultFrom: "C",
        defaultTo: "F",
        defaultValue: 100,
        units: {
            K: {
                symbol:   "K",
                toBase:   (v) => v,
                fromBase: (v) => v
            },
            C: {
                symbol:   "°C",
                toBase:   (v) => v + 273.15,
                fromBase: (v) => v - 273.15
            },
            F: {
                symbol:   "°F",
                toBase:   (v) => (v - 32) * 5 / 9 + 273.15,
                fromBase: (v) => (v - 273.15) * 9 / 5 + 32
            },
            R: {
                symbol:   "°R",
                toBase:   (v) => v * 5 / 9,
                fromBase: (v) => v * 9 / 5
            }
        }
    },

    time: {
        base: "s",
        defaultFrom: "h",
        defaultTo: "min",
        units: {
            s:   {factor: 1,           symbol: "s"},
            min: {factor: 60,          symbol: "min"},
            h:   {factor: 3_600,       symbol: "h"},
            d:   {factor: 86_400,      symbol: "d"},
            wk:  {factor: 604_800,     symbol: "wk"},
            mo:  {factor: 2_629_746,   symbol: "mo"},
            yr:  {factor: 31_556_952,  symbol: "yr"}
        }
    },

    speed: {
        base: "m_per_s",
        defaultFrom: "km_per_h",
        defaultTo: "mph",
        units: {
            m_per_s:  {factor: 1,              symbol: "m/s"},
            km_per_h: {factor: 1000 / 3600,    symbol: "km/h"},
            mph:      {factor: 1609.344 / 3600, symbol: "mph"},
            kn:       {factor: 1852 / 3600,    symbol: "kn"}
        }
    },

    pressure: {
        base: "Pa",
        defaultFrom: "bar",
        defaultTo: "psi",
        units: {
            Pa:   {factor: 1,             symbol: "Pa"},
            kPa:  {factor: 1_000,         symbol: "kPa"},
            MPa:  {factor: 1_000_000,     symbol: "MPa"},
            bar:  {factor: 100_000,       symbol: "bar"},
            mbar: {factor: 100,           symbol: "mbar"},
            atm:  {factor: 101_325,       symbol: "atm"},
            psi:  {factor: 6_894.757293,  symbol: "psi"},
            torr: {factor: 133.322368,    symbol: "Torr"},
            mmHg: {factor: 133.322387415, symbol: "mmHg"}
        }
    },

    energy: {
        base: "J",
        defaultFrom: "kJ",
        defaultTo: "BTU",
        units: {
            J:    {factor: 1,               symbol: "J"},
            kJ:   {factor: 1_000,           symbol: "kJ"},
            Wh:   {factor: 3_600,           symbol: "Wh"},
            kWh:  {factor: 3_600_000,       symbol: "kWh"},
            cal:  {factor: 4.184,           symbol: "cal"},
            kcal: {factor: 4_184,           symbol: "kcal"},
            BTU:  {factor: 1055.05585262,   symbol: "BTU"},
            eV:   {factor: 1.602176634e-19, symbol: "eV"}
        }
    },

    power: {
        base: "W",
        defaultFrom: "kW",
        defaultTo: "hp",
        units: {
            W:  {factor: 1,                   symbol: "W"},
            kW: {factor: 1_000,               symbol: "kW"},
            MW: {factor: 1_000_000,           symbol: "MW"},
            PS: {factor: 735.49875,           symbol: "PS"},
            hp: {factor: 745.69987158227022,  symbol: "hp"}
        }
    },

    force: {
        base: "N",
        defaultFrom: "N",
        defaultTo: "lbf",
        units: {
            N:   {factor: 1,                   symbol: "N"},
            kN:  {factor: 1_000,               symbol: "kN"},
            MN:  {factor: 1_000_000,           symbol: "MN"},
            lbf: {factor: 4.4482216152605,     symbol: "lbf"}
        }
    },

    torque: {
        base: "N_m",
        defaultFrom: "N_m",
        defaultTo: "ft_lb",
        units: {
            N_m:   {factor: 1,                      symbol: "N·m"},
            kN_m:  {factor: 1_000,                  symbol: "kN·m"},
            ft_lb: {factor: 1.3558179483314004,     symbol: "ft·lb"}
        }
    },

    frequency: {
        base: "Hz",
        defaultFrom: "MHz",
        defaultTo: "GHz",
        units: {
            Hz:  {factor: 1,             symbol: "Hz"},
            kHz: {factor: 1_000,         symbol: "kHz"},
            MHz: {factor: 1_000_000,     symbol: "MHz"},
            GHz: {factor: 1_000_000_000, symbol: "GHz"}
        }
    },

    voltage: {
        base: "V",
        defaultFrom: "V",
        defaultTo: "mV",
        units: {
            V:  {factor: 1,       symbol: "V"},
            mV: {factor: 0.001,   symbol: "mV"},
            kV: {factor: 1_000,   symbol: "kV"}
        }
    },

    current: {
        base: "A",
        defaultFrom: "A",
        defaultTo: "mA",
        units: {
            A:  {factor: 1,       symbol: "A"},
            mA: {factor: 0.001,   symbol: "mA"},
            kA: {factor: 1_000,   symbol: "kA"}
        }
    },

    storage: {
        base: "B",
        defaultFrom: "GB",
        defaultTo: "GiB",
        units: {
            B:   {factor: 1,                symbol: "B"},
            kB:  {factor: 1_000,            symbol: "kB"},
            MB:  {factor: 1_000_000,        symbol: "MB"},
            GB:  {factor: 1_000_000_000,    symbol: "GB"},
            TB:  {factor: 1_000_000_000_000, symbol: "TB"},
            KiB: {factor: 1024,             symbol: "KiB"},
            MiB: {factor: 1024 ** 2,        symbol: "MiB"},
            GiB: {factor: 1024 ** 3,        symbol: "GiB"},
            TiB: {factor: 1024 ** 4,        symbol: "TiB"}
        }
    },

    resistance: {
        base: "ohm",
        defaultFrom: "ohm",
        defaultTo: "kOhm",
        units: {
            ohm:  {factor: 1,           symbol: "Ω"},
            kOhm: {factor: 1_000,       symbol: "kΩ"},
            MOhm: {factor: 1_000_000,   symbol: "MΩ"}
        }
    },

    density: {
        base: "kg_m3",
        defaultFrom: "kg_m3",
        defaultTo: "g_cm3",
        units: {
            kg_m3:  {factor: 1,        symbol: "kg/m³"},
            g_cm3:  {factor: 1_000,    symbol: "g/cm³"},
            g_l:    {factor: 1,        symbol: "g/L"},
            kg_l:   {factor: 1_000,    symbol: "kg/L"},
            lb_ft3: {factor: 0.45359237 / 0.028316846592,  symbol: "lb/ft³"},
            lb_in3: {factor: 0.45359237 / 1.6387064e-5,    symbol: "lb/in³"}
        }
    },

    fuel_economy: {
        base: "l_100km",
        defaultFrom: "l_100km",
        defaultTo: "mpg_us",
        units: {
            l_100km: {
                symbol:   "L/100km",
                toBase:   (v) => v,
                fromBase: (v) => v
            },
            km_l: {
                symbol:   "km/L",
                toBase:   (v) => 100 / v,
                fromBase: (v) => 100 / v
            },
            mpg_us: {
                symbol:   "mpg (US)",
                toBase:   (v) => (3.785411784 * 100 / 1.609344) / v,
                fromBase: (v) => (3.785411784 * 100 / 1.609344) / v
            },
            mpg_uk: {
                symbol:   "mpg (UK)",
                toBase:   (v) => (4.54609 * 100 / 1.609344) / v,
                fromBase: (v) => (4.54609 * 100 / 1.609344) / v
            }
        }
    },

    flow: {
        base: "m3_s",
        defaultFrom: "l_min",
        defaultTo: "m3_h",
        units: {
            m3_s:    {factor: 1,              symbol: "m³/s"},
            m3_min:  {factor: 1 / 60,         symbol: "m³/min"},
            m3_h:    {factor: 1 / 3_600,      symbol: "m³/h"},
            l_s:     {factor: 0.001,          symbol: "L/s"},
            l_min:   {factor: 0.001 / 60,     symbol: "L/min"},
            l_h:     {factor: 0.001 / 3_600,  symbol: "L/h"},
            ft3_s:   {factor: 0.0283168,      symbol: "ft³/s"},
            gal_min: {factor: 3.785411784e-3 / 60, symbol: "gal/min"}
        }
    },

    luminance: {
        base: "cd_m2",
        defaultFrom: "cd_m2",
        defaultTo: "nit",
        units: {
            cd_m2: {factor: 1,          symbol: "cd/m²"},
            nit:   {factor: 1,          symbol: "nit"},
            fL:    {factor: 3.42626,    symbol: "fL"},
            L:     {factor: 3_183.099,  symbol: "L"},
            sb:    {factor: 10_000,     symbol: "sb"}
        }
    },

    radioactivity: {
        base: "Bq",
        defaultFrom: "Bq",
        defaultTo: "kBq",
        units: {
            Bq:      {factor: 1,           symbol: "Bq"},
            kBq:     {factor: 1_000,       symbol: "kBq"},
            MBq:     {factor: 1_000_000,   symbol: "MBq"},
            GBq:     {factor: 1e9,         symbol: "GBq"},
            Ci:      {factor: 3.7e10,      symbol: "Ci"},
            mCi:     {factor: 3.7e7,       symbol: "mCi"},
            microCi: {factor: 37_000,      symbol: "µCi"}
        }
    },

    viscosity: {
        base: "Pa_s",
        defaultFrom: "mPa_s",
        defaultTo: "cP",
        units: {
            Pa_s:   {factor: 1,        symbol: "Pa·s"},
            mPa_s:  {factor: 0.001,    symbol: "mPa·s"},
            cP:     {factor: 0.001,    symbol: "cP"},
            P:      {factor: 0.1,      symbol: "P"},
            lb_fts: {factor: 1.48816,  symbol: "lb/(ft·s)"}
        }
    },

    data_rate: {
        base: "bit_s",
        defaultFrom: "Mbit_s",
        defaultTo: "MB_s",
        units: {
            bit_s:  {factor: 1,           symbol: "bit/s"},
            kbit_s: {factor: 1_000,       symbol: "kbit/s"},
            Mbit_s: {factor: 1_000_000,   symbol: "Mbit/s"},
            Gbit_s: {factor: 1e9,         symbol: "Gbit/s"},
            B_s:    {factor: 8,           symbol: "B/s"},
            kB_s:   {factor: 8_000,       symbol: "kB/s"},
            MB_s:   {factor: 8_000_000,   symbol: "MB/s"},
            GB_s:   {factor: 8e9,         symbol: "GB/s"}
        }
    }
};
