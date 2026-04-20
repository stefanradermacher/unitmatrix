
export default {
    code: "de",
    name: "Deutsch",
    commaDecimal: true,
    htmlLang: "de-DE",

    ui: {
        title: "UnitMatrix",
        tagline: "Alle Einheiten. Eine Matrix.",
        titleTag: "UnitMatrix — Universeller Einheitenrechner",
        descriptionTag: "Sofort Einheiten umrechnen mit UnitMatrix: schnell, genau und datenschutzfreundlich.",

        labelFrom: "Von",
        labelTo: "Nach",
        copyResultLabel: "Ergebnis kopieren",
        swapUnitsAria: "Ausgangs- und Zieleinheit tauschen",

        matrixMore: "Weitere Einheiten…",
        matrixLess: "Weniger Einheiten",

        footerSupportText: "UnitMatrix ist kostenlos und nicht-kommerziell. Wenn du die Entwicklung unterstützen möchtest, {link}.",
        footerSupportLink: "klicke hier",

        // Über-Modal
        aboutLink:  "Über",
        aboutTitle: "Über UnitMatrix",
        aboutP1:    "UnitMatrix ist ein schnelles, datenschutzfreundliches Werkzeug zum Umrechnen von Einheiten. Alle Berechnungen finden lokal in deinem Browser statt — deine Daten verlassen dein Gerät nicht.",
        aboutP2:    "UnitMatrix unterstützt über 200 Einheiten aus 24 Kategorien.",
        aboutP3:    "Open Source, MIT-lizenziert.",
        aboutDepsLabel: "Verwendete Open-Source-Komponenten:",

        // NEU: Datenschutzhinweis
        privacyLink: "Datenschutz",
        privacyTitle: "Datenschutz & Datennutzung",
        privacyP1: "UnitMatrix speichert keine personenbezogenen Daten von dir auf dem Server.",
        privacyP2: "Wir verwenden kein Tracking, keine Analytics und keine Cookies von Drittanbietern.",
        privacyP3: "Zur Bequemlichkeit werden einige Einstellungen (z. B. Sprache und Theme) lokal im Speicher deines Browsers abgelegt. Diese Daten verlassen dein Gerät nicht und werden gelöscht, wenn du die Browserdaten entfernst.",

        // Support-Modal
        supportTitle: "UnitMatrix unterstützen",
        supportIntro: "UnitMatrix ist ein nicht-kommerzielles Hobby-Projekt und bleibt für dich kostenlos.",
        supportP1: "Wenn du die Weiterentwicklung und das Hosting mit einer freiwilligen Spende unterstützen möchtest, kannst du das hier tun.",
        supportPaypalLabel: "Über PayPal spenden",
        supportOtherLabel: "Weitere Unterstützungsmöglichkeiten",

        // NEU: Impressum-Modal
        impressumLink: "Impressum",
        impressumTitle: "Impressum",
        impressumProviderLabel: "Dienstanbieter",
        impressumContactLabel: "Kontakt",
        impressumEmailLabel: "E-Mail: ",
        impressumP3: "UnitMatrix ist ein privates, nicht-kommerzielles Projekt. Alle Inhalte werden ohne Gewähr und ohne Anspruch auf Vollständigkeit oder Richtigkeit bereitgestellt.",
        impressumP4: "Verlinkte externe Seiten werden ausschließlich als Service angeboten. Für deren Inhalte sind ausschließlich die jeweiligen Betreiber verantwortlich.",
        belowAbsZeroWarning: "⚠ Unterhalb des absoluten Nullpunkts (0 K)"
    },

    categories: {
        length: "Länge",
        area: "Fläche",
        volume: "Volumen",
        mass: "Masse",
        temperature: "Temperatur",
        time: "Zeit",
        speed: "Geschwindig\u00ADkeit",
        pressure: "Druck",
        energy: "Energie",
        power: "Leistung",
        force: "Kraft",
        torque: "Drehmoment",
        voltage: "Spannung",
        current: "Stromstärke",
        frequency: "Frequenz",
        storage: "Speicher",
        resistance: "Widerstand",
        density: "Dichte",
        fuel_economy: "Kraftstoff\u00ADverbrauch",
        flow: "Durchfluss",
        luminance: "Leuchtdichte",
        radioactivity: "Radioaktivität",
        viscosity: "Viskosität",
        data_rate: "Datenrate"
    },

    // NEW: Kategorie-Button-Beschriftungen (hier identisch zu categories)
    categoryButtons: {
        length: "Länge",
        area: "Fläche",
        volume: "Volumen",
        mass: "Masse",
        temperature: "Temperatur",
        time: "Zeit",
        speed: "Geschwindig\u00ADkeit",
        pressure: "Druck",
        energy: "Energie",
        power: "Leistung",
        force: "Kraft",
        torque: "Drehmoment",
        voltage: "Spannung",
        current: "Stromstärke",
        frequency: "Frequenz",
        storage: "Speicher",
        resistance: "Widerstand",
        density: "Dichte",
        fuel_economy: "Kraftstoff\u00ADverbrauch",
        flow: "Durchfluss",
        luminance: "Leuchtdichte",
        radioactivity: "Radioaktivität",
        viscosity: "Viskosität",
        data_rate: "Datenrate"
    },

    // LASS dieses unitLabels-Objekt unverändert (nur hier zur Vollständigkeit angedeutet)
    unitLabels: {
        // Länge
        km: "Kilometer",
        m: "Meter",
        cm: "Zentimeter",
        mm: "Millimeter",
        mi: "Meile",
        ft: "Fuß",
        ly: "Lichtjahr",

        // Fläche
        m2: "Quadratmeter",
        cm2: "Quadratzentimeter",
        mm2: "Quadratmillimeter",
        km2: "Quadratkilometer",
        ha: "Hektar",
        ft2: "Quadratfuß",
        in2: "Quadratzoll",
        ac: "Acre",

        // Volumen
        m3: "Kubikmeter",
        l: "Liter",
        dl: "Deziliter",
        ml: "Milliliter",
        cm3: "Kubikzentimeter",
        ft3: "Kubikfuß",
        in3: "Kubikzoll",
        gal_us: "US-Gallone",
        qt_us: "US-Quart",
        pt_us: "US-Pint",
        fl_oz_us: "US-Flüssigunze",

        // Masse
        kg: "Kilogramm",
        g: "Gramm",
        lb: "Pfund",
        oz: "Unze",

        // Temperatur
        K: "Kelvin",
        C: "Grad Celsius",
        F: "Grad Fahrenheit",

        // Zeit
        s: "Sekunde",
        min: "Minute",
        h: "Stunde",
        d: "Tag",

        // Geschwindigkeit
        m_per_s: "Meter pro Sekunde",
        km_per_h: "Kilometer pro Stunde",
        mph: "Meile pro Stunde",
        kn: "Knoten",

        // Druck
        Pa: "Pascal",
        kPa: "Kilopascal",
        MPa: "Megapascal",
        bar: "Bar",
        mbar: "Millibar",
        atm: "Atmosphäre",
        psi: "Pfund pro Quadratzoll",
        torr: "Torr",

        // Energie
        J: "Joule",
        kJ: "Kilojoule",
        Wh: "Wattstunde",
        kWh: "Kilowattstunde",
        cal: "Kalorie",
        kcal: "Kilokalorie",
        BTU: "Britische Wärmeeinheit",

        // Leistung
        W: "Watt",
        kW: "Kilowatt",
        MW: "Megawatt",
        PS: "Pferdestärke",
        hp: "Horsepower",

        // Kraft
        N: "Newton",
        kN: "Kilonewton",
        MN: "Meganewton",
        lbf: "Pfundkraft",

        // Drehmoment
        N_m: "Newtonmeter",
        kN_m: "Kilonewtonmeter",
        ft_lb: "Fuß-Pfund",

        // Spannung
        V: "Volt",
        mV: "Millivolt",
        kV: "Kilovolt",

        // Strom
        A: "Ampere",
        mA: "Milliampere",
        kA: "Kiloampere",

        // Frequenz
        Hz: "Hertz",
        kHz: "Kilohertz",
        MHz: "Megahertz",
        GHz: "Gigahertz",

        // Speicher
        B: "Byte",
        kB: "Kilobyte",
        MB: "Megabyte",
        GB: "Gigabyte",
        TB: "Terabyte",
        KiB: "Kibibyte",
        MiB: "Mebibyte",
        GiB: "Gibibyte",
        TiB: "Tebibyte",

        // Widerstand
        ohm: "Ohm",
        kOhm: "Kiloohm",
        MOhm: "Megaohm",

        // Dichte
        kg_m3:  "Kilogramm pro Kubikmeter",
        g_cm3:  "Gramm pro Kubikzentimeter",
        g_l:    "Gramm pro Liter",
        kg_l:   "Kilogramm pro Liter",
        lb_ft3: "Pfund pro Kubikfuß",
        lb_in3: "Pfund pro Kubikzoll",

        // Kraftstoffverbrauch
        l_100km: "Liter pro 100 Kilometer",
        km_l:    "Kilometer pro Liter",
        mpg_us:  "Meilen pro Gallone (US)",
        mpg_uk:  "Meilen pro Gallone (UK)",

        // Durchfluss
        m3_s:    "Kubikmeter pro Sekunde",
        m3_min:  "Kubikmeter pro Minute",
        m3_h:    "Kubikmeter pro Stunde",
        l_s:     "Liter pro Sekunde",
        l_min:   "Liter pro Minute",
        l_h:     "Liter pro Stunde",
        ft3_s:   "Kubikfuß pro Sekunde",
        gal_min: "Gallone pro Minute",

        // Leuchtdichte
        cd_m2: "Candela pro Quadratmeter",
        nit:   "Nit",
        fL:    "Foot-Lambert",
        L:     "Lambert",
        sb:    "Stilb",

        // Radioaktivität
        Bq:  "Becquerel",
        kBq: "Kilobecquerel",
        MBq: "Megabecquerel",
        GBq: "Gigabecquerel",
        Ci:  "Curie",
        mCi: "Millicurie",
        microCi: "Mikrocurie",

        // Viskosität
        Pa_s:   "Pascalsekunde",
        mPa_s:  "Millipascalsekunde",
        cP:     "Centipoise",
        P:      "Poise",
        lb_fts: "Pfund pro Fuß-Sekunde",

        // Datenrate
        bit_s:  "Bit pro Sekunde",
        kbit_s: "Kilobit pro Sekunde",
        Mbit_s: "Megabit pro Sekunde",
        Gbit_s: "Gigabit pro Sekunde",
        B_s:    "Byte pro Sekunde",
        kB_s:   "Kilobyte pro Sekunde",
        MB_s:   "Megabyte pro Sekunde",
        GB_s:   "Gigabyte pro Sekunde",

        // length additions
        yd:       "Yard",
        in:       "Zoll",
        nmi:      "Seemeile",
        angstrom: "Ångström",
        pc:       "Parsec",

        // mass additions
        t:  "Tonne",
        st: "Stone",
        gr: "Gran",
        ct: "Karat",

        // temperature additions
        R: "Rankine",

        // time additions
        wk: "Woche",
        mo: "Monat",
        yr: "Jahr",

        // volume additions
        cup_us:  "US-Tasse",
        tbsp_us: "US-Esslöffel",
        tsp_us:  "US-Teelöffel",

        // pressure additions
        mmHg: "Millimeter Quecksilbersäule",

        // energy additions
        eV: "Elektronenvolt",
    }
};

