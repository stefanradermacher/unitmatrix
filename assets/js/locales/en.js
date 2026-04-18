
export default {
    code: "en",
    name: "English",
    htmlLang: "en-US",

    ui: {
        title: "UnitMatrix",
        tagline: "All Units. One Matrix.",
        titleTag: "UnitMatrix — Universal Unit Converter",
        descriptionTag: "Convert units instantly with UnitMatrix: fast, accurate, and privacy-friendly.",
        
        labelFrom: "From",
        labelTo: "To",
        copyResultLabel: "Copy result",
        swapUnitsAria: "Swap from and to units",

        matrixMore: "More units…",
        matrixLess: "Fewer units",

        footerSupportText: "UnitMatrix is free and non-commercial, but if you want to support development, {link}.",
        footerSupportLink: "click here",

        // About modal
        aboutLink:  "About",
        aboutTitle: "About UnitMatrix",
        aboutP1:    "UnitMatrix is a fast, privacy-friendly tool for converting units. All calculations happen locally in your browser — your data never leaves your device.",
        aboutP2:    "UnitMatrix supports over 200 units across 24 categories.",
        aboutP3:    "Open source, MIT-licensed.",
        aboutDepsLabel: "Open source components used:",

        // NEW: Privacy modal
        privacyLink: "Privacy",
        privacyTitle: "Privacy & Data Use",
        privacyP1: "UnitMatrix does not store any personal data about you on the server.",
        privacyP2: "We do not use tracking, analytics, or third-party cookies.",
        privacyP3: "For your convenience, UnitMatrix stores a few preferences (such as language and theme) in your browser’s local storage. This data never leaves your device and is removed when you clear your browser data.",

        // Support / donate modal
        supportTitle: "Support UnitMatrix",
        supportIntro: "UnitMatrix is a non-commercial side project and will remain free to use.",
        supportP1: "If you still want to support ongoing development and hosting costs, you can send a small donation.",
        supportPaypalLabel: "Donate via PayPal",
        supportOtherLabel: "Other ways to support",

        // NEW: Impressum / Legal Notice modal
        impressumLink: "Legal notice",
        impressumTitle: "Imprint / Legal Notice",
        impressumProviderLabel: "Service provider",
        impressumContactLabel: "Contact",
        impressumEmailLabel: "E-mail: ",
        impressumP3: "UnitMatrix is a private, non-commercial project. All content is provided without guarantee and without any claim to completeness or correctness.",
        impressumP4: "Links to external websites are provided for convenience only. The respective operators are solely responsible for their content.",
        belowAbsZeroWarning: "⚠ Below absolute zero (0 K)"
    },

    // Existing categories – unchanged
    categories: {
        length: "Length",
        area: "Area",
        volume: "Volume",
        mass: "Mass",
        temperature: "Temperature",
        time: "Time",
        speed: "Speed",
        pressure: "Pressure",
        energy: "Energy",
        power: "Power",
        force: "Force",
        torque: "Torque",
        voltage: "Voltage",
        current: "Current",
        frequency: "Frequency",
        storage: "Data Storage",
        resistance: "Resistance",
        density: "Density",
        fuel_economy: "Fuel economy",
        flow: "Flow",
        luminance: "Luminance",
        radioactivity: "Radioactivity",
        viscosity: "Viscosity",
        data_rate: "Data rate"
    },

    // NEW: categoryButtons – default: same labels as categories
    categoryButtons: {
        length: "Length",
        area: "Area",
        volume: "Volume",
        mass: "Mass",
        temperature: "Temperature",
        time: "Time",
        speed: "Speed",
        pressure: "Pressure",
        energy: "Energy",
        power: "Power",
        force: "Force",
        torque: "Torque",
        voltage: "Voltage",
        current: "Current",
        frequency: "Frequency",
        storage: "Storage",
        resistance: "Resistance",
        density: "Density",
        fuel_economy: "Fuel economy",
        flow: "Flow",
        luminance: "Luminance",
        radioactivity: "Radioactivity",
        viscosity: "Viscosity",
        data_rate: "Data rate"
    },

    // KEEP your existing unitLabels block as-is
    unitLabels: {
        // length
        km: "Kilometer",
        m: "Meter",
        cm: "Centimeter",
        mm: "Millimeter",
        mi: "Mile",
        ft: "Foot",
        ly: "Light-Year",

        // area
        m2: "Square Meter",
        cm2: "Square Centimeter",
        mm2: "Square Millimeter",
        km2: "Square Kilometer",
        ha: "Hectare",
        ft2: "Square Foot",
        in2: "Square Inch",
        ac: "Acre",

        // volume
        m3: "Cubic Meter",
        l: "Liter",
        dl: "Deciliter",
        ml: "Milliliter",
        cm3: "Cubic Centimeter",
        ft3: "Cubic Foot",
        in3: "Cubic Inch",
        gal_us: "US Gallon",
        qt_us: "US Quart",
        pt_us: "US Pint",
        fl_oz_us: "US Fluid Ounce",

        // mass
        kg: "Kilogram",
        g: "Gram",
        lb: "Pound",
        oz: "Ounce",

        // temperature
        K: "Kelvin",
        C: "Degree Celsius",
        F: "Degree Fahrenheit",

        // time
        s: "Second",
        min: "Minute",
        h: "Hour",
        d: "Day",

        // speed
        m_per_s: "Meter Per Second",
        km_per_h: "Kilometer Per Hour",
        mph: "Mile Per Hour",
        kn: "Knot",

        // pressure
        Pa: "Pascal",
        kPa: "Kilopascal",
        MPa: "Megapascal",
        bar: "Bar",
        mbar: "Millibar",
        atm: "Atmosphere",
        psi: "Pounds per Square Inch",
        torr: "Torr",

        // energy
        J: "Joule",
        kJ: "Kilojoule",
        Wh: "Watt-Hour",
        kWh: "Kilowatt-Hour",
        cal: "Calorie",
        kcal: "Kilocalorie",
        BTU: "British Thermal Unit",

        // power
        W: "Watt",
        kW: "Kilowatt",
        MW: "Megawatt",
        PS: "Metric Horsepower",
        hp: "Horsepower",

        // force
        N: "Newton",
        kN: "Kilonewton",
        MN: "Meganewton",
        lbf: "Pound-Force",

        // torque
        N_m: "Newton Meter",
        kN_m: "Kilonewton Meter",
        ft_lb: "Foot-Pound",

        // voltage
        V: "Volt",
        mV: "Millivolt",
        kV: "Kilovolt",

        // current
        A: "Ampere",
        mA: "Milliampere",
        kA: "Kiloampere",

        // frequency
        Hz: "Hertz",
        kHz: "Kilohertz",
        MHz: "Megahertz",
        GHz: "Gigahertz",

        // data storage
        B: "Byte",
        kB: "Kilobyte",
        MB: "Megabyte",
        GB: "Gigabyte",
        TB: "Terabyte",
        KiB: "Kibibyte",
        MiB: "Mebibyte",
        GiB: "Gibibyte",
        TiB: "Tebibyte",

        // resistance
        ohm: "Ohm",
        kOhm: "Kiloohm",
        MOhm: "Megaohm",

        // density
        kg_m3:  "Kilogram per Cubic Meter",
        g_cm3:  "Gram per Cubic Centimeter",
        g_l:    "Gram per Liter",
        kg_l:   "Kilogram per Liter",
        lb_ft3: "Pound per Cubic Foot",
        lb_in3: "Pound per Cubic Inch",

        // fuel economy
        l_100km: "Liters per 100 Kilometers",
        km_l:    "Kilometers per Liter",
        mpg_us:  "Miles per Gallon (US)",
        mpg_uk:  "Miles per Gallon (UK)",

        // flow
        m3_s:    "Cubic Meter per Second",
        m3_min:  "Cubic Meter per Minute",
        m3_h:    "Cubic Meter per Hour",
        l_s:     "Liter per Second",
        l_min:   "Liter per Minute",
        l_h:     "Liter per Hour",
        ft3_s:   "Cubic Foot per Second",
        gal_min: "Gallon per Minute",

        // luminance
        cd_m2: "Candela per Square Meter",
        nit:   "Nit",
        fL:    "Foot-Lambert",
        L:     "Lambert",
        sb:    "Stilb",

        // radioactivity
        Bq:  "Becquerel",
        kBq: "Kilobecquerel",
        MBq: "Megabecquerel",
        GBq: "Gigabecquerel",
        Ci:  "Curie",
        mCi: "Millicurie",
        microCi: "Microcurie",

        // viscosity
        Pa_s:   "Pascal-Second",
        mPa_s:  "Millipascal-Second",
        cP:     "Centipoise",
        P:      "Poise",
        lb_fts: "Pound per Foot-Second",

        // data rate
        bit_s:  "Bit per Second",
        kbit_s: "Kilobit per Second",
        Mbit_s: "Megabit per Second",
        Gbit_s: "Gigabit per Second",
        B_s:    "Byte per Second",
        kB_s:   "Kilobyte per Second",
        MB_s:   "Megabyte per Second",
        GB_s:   "Gigabyte per Second",

        // length additions
        yd:       "Yard",
        in:       "Inch",
        nmi:      "Nautical Mile",
        angstrom: "Ångström",
        pc:       "Parsec",

        // mass additions
        t:  "Metric Ton",
        st: "Stone",
        gr: "Grain",
        ct: "Carat",

        // temperature additions
        R: "Rankine",

        // time additions
        wk: "Week",
        mo: "Month",
        yr: "Year",

        // volume additions
        cup_us:  "US Cup",
        tbsp_us: "US Tablespoon",
        tsp_us:  "US Teaspoon",

        // pressure additions
        mmHg: "Millimeter of Mercury",

        // energy additions
        eV: "Electronvolt",
    }
};

