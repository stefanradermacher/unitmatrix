window.LOCALES = window.LOCALES || {};

window.LOCALES["fr"] = {
    code: "fr",
    name: "Français",
    commaDecimal: true,
    htmlLang: "fr-FR",

    ui: {
        title: "UnitMatrix",
        tagline: "Toutes les unités. Une seule matrice.",

        labelFrom: "De",
        labelTo: "À",
        copyResultLabel: "Copier le résultat",
        swapUnitsAria: "Permuter les unités de départ et d’arrivée",

        matrixMore: "Plus d’unités…",
        matrixLess: "Moins d’unités",

        footerSupportText: "UnitMatrix est un projet non commercial et restera gratuit. Pour soutenir son développement, {link}.",
        footerSupportLink: "cliquez ici",

        // SEO
        titleTag: "UnitMatrix — Convertisseur d’unités universel",
        descriptionTag:
            "Convertissez instantanément vos unités avec UnitMatrix : rapide, précis et respectueux de la vie privée, sans aucun suivi.",

        // Privacy modal
        privacyLink: "Confidentialité",
        privacyTitle: "Confidentialité et utilisation des données",
        privacyP1: "UnitMatrix ne stocke aucune donnée personnelle sur le serveur.",
        privacyP2: "Aucun suivi, aucune analyse, aucun cookie tiers n’est utilisé.",
        privacyP3: "Pour votre confort, seulement quelques préférences (langue, thème) sont conservées dans le stockage local de votre navigateur. Elles ne quittent jamais votre appareil.",

        // Support modal
        supportTitle: "Soutenir UnitMatrix",
        supportIntro: "UnitMatrix est un projet privé et non commercial, et restera toujours gratuit.",
        supportP1: "Si vous souhaitez soutenir son développement ou les coûts d’hébergement, vous pouvez faire un petit don.",
        supportPaypalLabel: "Faire un don via PayPal",
        supportOtherLabel: "Autres moyens de soutenir",

        // Impressum
        impressumLink: "Mentions légales",
        impressumTitle: "Mentions légales",
        impressumProviderLabel: "Éditeur",
        impressumContactLabel: "Contact",
        impressumEmailLabel: "E-mail : ",
        impressumP3: "UnitMatrix est un projet privé et non commercial, fourni sans garantie et sans prétention d’exhaustivité.",
        impressumP4: "Les liens externes sont fournis uniquement à titre pratique. Leur contenu relève de la responsabilité exclusive de leurs opérateurs.",
        belowAbsZeroWarning: "⚠ En dessous du zéro absolu (0 K)"
    },

    categories: {
        length: "Longueur",
        area: "Aire",
        volume: "Volume",
        mass: "Masse",
        temperature: "Température",
        time: "Temps",
        speed: "Vitesse",
        pressure: "Pression",
        energy: "Énergie",
        power: "Puissance",
        force: "Force",
        torque: "Couple",
        voltage: "Tension",
        current: "Courant Électrique",
        frequency: "Fréquence",
        storage: "Stockage De Données",
        resistance: "Résistance",
        density: "Densité",
        fuel_economy: "Consommation De Carburant",
        flow: "Débit",
        luminance: "Luminance",
        radioactivity: "Radioactivité",
        viscosity: "Viscosité",
        data_rate: "Débit De Données"
    },

    categoryButtons: {
        length: "Longueur",
        area: "Aire",
        volume: "Volume",
        mass: "Masse",
        temperature: "Température",
        time: "Temps",
        speed: "Vitesse",
        pressure: "Pression",
        energy: "Énergie",
        power: "Puissance",
        force: "Force",
        torque: "Couple",
        voltage: "Tension",
        current: "Courant",
        frequency: "Fréquence",
        storage: "Données",
        resistance: "Résistance",
        density: "Densité",
        fuel_economy: "Carburant",
        flow: "Débit",
        luminance: "Luminance",
        radioactivity: "Radioactivité",
        viscosity: "Viscosité",
        data_rate: "Débit"
    },

    unitLabels: {
        // --------------------
        // LENGTH
        // --------------------
        km: "Kilomètre",
        m: "Mètre",
        cm: "Centimètre",
        mm: "Millimètre",
        mi: "Mille",
        ft: "Pied",
        ly: "Année-lumière",

        // --------------------
        // AREA
        // --------------------
        m2: "Mètre Carré",
        cm2: "Centimètre Carré",
        mm2: "Millimètre Carré",
        km2: "Kilomètre Carré",
        ha: "Hectare",
        ft2: "Pied Carré",
        in2: "Pouce Carré",
        ac: "Acre",

        // --------------------
        // VOLUME
        // --------------------
        m3: "Mètre Cube",
        l: "Litre",
        dl: "Décilitre",
        ml: "Millilitre",
        cm3: "Centimètre Cube",
        ft3: "Pied Cube",
        in3: "Pouce Cube",
        gal_us: "Gallon Américain",
        qt_us: "Quart Américain",
        pt_us: "Pinte Américaine",
        fl_oz_us: "Once Liquide Américaine",

        // --------------------
        // MASS
        // --------------------
        kg: "Kilogramme",
        g: "Gramme",
        lb: "Livre",
        oz: "Once",

        // --------------------
        // TEMPERATURE
        // --------------------
        K: "Kelvin",
        C: "Degré Celsius",
        F: "Degré Fahrenheit",

        // --------------------
        // TIME
        // --------------------
        s: "Seconde",
        min: "Minute",
        h: "Heure",
        d: "Jour",

        // --------------------
        // SPEED
        // --------------------
        m_per_s: "Mètre Par Seconde",
        km_per_h: "Kilomètre Par Heure",
        mph: "Mille Par Heure",
        kn: "Nœud",

        // --------------------
        // PRESSURE
        // --------------------
        Pa: "Pascal",
        kPa: "Kilopascal",
        MPa: "Mégapascal",
        bar: "Bar",
        mbar: "Millibar",
        atm: "Atmosphère",
        psi: "Psi (Livre Par Pouce Carré)",
        torr: "Torr",

        // --------------------
        // ENERGY
        // --------------------
        J: "Joule",
        kJ: "Kilojoule",
        Wh: "Wattheure",
        kWh: "Kilowattheure",
        cal: "Calorie",
        kcal: "Kilocalorie",
        BTU: "BTU (Unité Thermique Britannique)",

        // --------------------
        // POWER
        // --------------------
        W: "Watt",
        kW: "Kilowatt",
        MW: "Mégawatt",
        PS: "Cheval-vapeur (Métrique)",
        hp: "Cheval-vapeur (HP)",

        // --------------------
        // FORCE
        // --------------------
        N: "Newton",
        kN: "Kilonewton",
        MN: "Méganewton",
        lbf: "Livre-force",

        // --------------------
        // TORQUE
        // --------------------
        N_m: "Newton-mètre",
        kN_m: "Kilonewton-mètre",
        ft_lb: "Pied-livre",

        // --------------------
        // FREQUENCY
        // --------------------
        Hz: "Hertz",
        kHz: "Kilohertz",
        MHz: "Mégahertz",
        GHz: "Gigahertz",

        // --------------------
        // VOLTAGE
        // --------------------
        V: "Volt",
        mV: "Millivolt",
        kV: "Kilovolt",

        // --------------------
        // CURRENT
        // --------------------
        A: "Ampère",
        mA: "Milliampère",
        kA: "Kiloampère",

        // --------------------
        // DATA STORAGE
        // --------------------
        B: "Octet",
        kB: "Kilooctet",
        MB: "Mégaoctet",
        GB: "Gigaoctet",
        TB: "Téraoctet",

        KiB: "Kibioctet",
        MiB: "Mébioctet",
        GiB: "Gibioctet",
        TiB: "Tébioctet",

        // --------------------
        // RESISTANCE
        // --------------------
        ohm: "Ohm",
        kOhm: "Kiloohm",
        MOhm: "Mégaohm",

        // Densité
        kg_m3:  "Kilogramme par Mètre Cube",
        g_cm3:  "Gramme par Centimètre Cube",
        g_l:    "Gramme par Litre",
        kg_l:   "Kilogramme par Litre",
        lb_ft3: "Livre par Pied Cube",
        lb_in3: "Livre par Pouce Cube",

        // Consommation de carburant
        l_100km: "Litres pour 100 Kilomètres",
        km_l:    "Kilomètres par Litre",
        mpg_us:  "Miles par Gallon (US)",
        mpg_uk:  "Miles par Gallon (UK)",

        // Débit
        m3_s:    "Mètre Cube par Seconde",
        m3_min:  "Mètre Cube par Minute",
        m3_h:    "Mètre Cube par Heure",
        l_s:     "Litre par Seconde",
        l_min:   "Litre par Minute",
        l_h:     "Litre par Heure",
        ft3_s:   "Pied Cube par Seconde",
        gal_min: "Gallon par Minute",

        // Luminance
        cd_m2: "Candela par Mètre Carré",
        nit:   "Nit",
        fL:    "Foot-Lambert",
        L:     "Lambert",
        sb:    "Stilb",

        // Radioactivité
        Bq:  "Becquerel",
        kBq: "Kilobecquerel",
        MBq: "Mégabecquerel",
        GBq: "Gigabecquerel",
        Ci:  "Curie",
        mCi: "Millicurie",
        microCi: "Microcurie",

        // Viscosité
        Pa_s:   "Pascal-Seconde",
        mPa_s:  "Millipascal-Seconde",
        cP:     "Centipoise",
        P:      "Poise",
        lb_fts: "Livre par Pied-Seconde",

        // Débit de données
        bit_s:  "Bit par Seconde",
        kbit_s: "Kilobit par Seconde",
        Mbit_s: "Mégabit par Seconde",
        Gbit_s: "Gigabit par Seconde",
        B_s:    "Octet par Seconde",
        kB_s:   "Kilooctet par Seconde",
        MB_s:   "Mégaoctet par Seconde",
        GB_s:   "Gigaoctet par Seconde",

        // length additions
        yd:       "Yard",
        in:       "Pouce",
        nmi:      "Mille Marin",
        angstrom: "Ångström",
        pc:       "Parsec",

        // mass additions
        t:  "Tonne Métrique",
        st: "Stone",
        gr: "Grain",
        ct: "Carat",

        // temperature additions
        R: "Rankine",

        // time additions
        wk: "Semaine",
        mo: "Mois",
        yr: "Année",

        // volume additions
        cup_us:  "Tasse (US)",
        tbsp_us: "Cuillère à Soupe (US)",
        tsp_us:  "Cuillère à Café (US)",

        // pressure additions
        mmHg: "Millimètre de Mercure",

        // energy additions
        eV: "Électronvolt",
    }

};

