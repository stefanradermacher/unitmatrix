
export default {
    code: "pt",
    name: "Português",
    commaDecimal: true,
    htmlLang: "pt-PT",

    ui: {
        title: "UnitMatrix",
        tagline: "Todas as unidades. Uma matriz.",
        titleTag: "UnitMatrix — Conversor de unidades universal",
        descriptionTag: "Converta unidades instantaneamente com UnitMatrix: rápido, preciso e respeitador da privacidade.",

        labelFrom: "De",
        labelTo: "Para",
        copyResultLabel: "Copiar resultado",
        swapUnitsAria: "Trocar unidades de origem e destino",

        matrixMore: "Mais unidades…",
        matrixLess: "Menos unidades",

        footerSupportText: "UnitMatrix é um projeto não comercial e continuará gratuito. Se quiser apoiar o desenvolvimento, {link}.",
        footerSupportLink: "clique aqui",

        // About modal
        aboutLink:  "Sobre",
        aboutTitle: "Sobre o UnitMatrix",
        aboutP1:    "O UnitMatrix é uma ferramenta rápida e respeitadora da privacidade para converter unidades. Todos os cálculos são efetuados localmente no seu browser — os seus dados nunca saem do dispositivo.",
        aboutP2:    "O UnitMatrix suporta mais de 200 unidades em 24 categorias.",
        aboutP3:    "Código aberto, licença MIT.",
        aboutDepsLabel: "Componentes open source utilizados:",

        privacyLink: "Privacidade",
        privacyTitle: "Privacidade e Utilização de Dados",
        privacyP1: "O UnitMatrix não armazena quaisquer dados pessoais no servidor.",
        privacyP2: "Não utilizamos rastreamento, análises nem cookies de terceiros.",
        privacyP3: "Para sua comodidade, algumas preferências (idioma, tema) são guardadas no armazenamento local do seu browser. Estes dados nunca saem do seu dispositivo.",

        supportTitle: "Apoiar o UnitMatrix",
        supportIntro: "O UnitMatrix é um projeto privado e não comercial, e continuará sempre gratuito.",
        supportP1: "Se quiser apoiar o desenvolvimento e os custos de alojamento, pode fazer uma pequena doação.",
        supportPaypalLabel: "Doar via PayPal",
        supportOtherLabel: "Outras formas de apoiar",

        impressumLink: "Aviso legal",
        impressumTitle: "Aviso Legal",
        impressumProviderLabel: "Prestador de serviço",
        impressumContactLabel: "Contacto",
        impressumEmailLabel: "E-mail: ",
        impressumP3: "O UnitMatrix é um projeto privado e não comercial. Todo o conteúdo é disponibilizado sem garantias e sem qualquer reivindicação de exatidão ou completude.",
        impressumP4: "As ligações a sítios externos são fornecidas apenas por conveniência. Os respetivos operadores são os únicos responsáveis pelo seu conteúdo.",
        belowAbsZeroWarning: "⚠ Abaixo do zero absoluto (0 K)"
    },

    categories: {
        length: "Comprimento",
        area: "Área",
        volume: "Volume",
        mass: "Massa",
        temperature: "Temperatura",
        time: "Tempo",
        speed: "Velocidade",
        pressure: "Pressão",
        energy: "Energia",
        power: "Potência",
        force: "Força",
        torque: "Binário",
        voltage: "Tensão",
        current: "Corrente Elétrica",
        frequency: "Frequência",
        storage: "Armazenamento",
        resistance: "Resistência",
        density: "Densidade",
        fuel_economy: "Consumo de Combustível",
        flow: "Caudal",
        luminance: "Luminância",
        radioactivity: "Radioatividade",
        viscosity: "Viscosidade",
        data_rate: "Taxa de Dados"
    },

    categoryButtons: {
        length: "Comprim.",
        area: "Área",
        volume: "Volume",
        mass: "Massa",
        temperature: "Temp.",
        time: "Tempo",
        speed: "Velocidade",
        pressure: "Pressão",
        energy: "Energia",
        power: "Potência",
        force: "Força",
        torque: "Binário",
        voltage: "Tensão",
        current: "Corrente",
        frequency: "Frequência",
        storage: "Dados",
        resistance: "Resistência",
        density: "Densidade",
        fuel_economy: "Combustível",
        flow: "Caudal",
        luminance: "Luminância",
        radioactivity: "Radioativ.",
        viscosity: "Viscosidade",
        data_rate: "Dados/s"
    },

    unitLabels: {
        // Comprimento
        km: "Quilómetro",
        m: "Metro",
        cm: "Centímetro",
        mm: "Milímetro",
        mi: "Milha",
        ft: "Pé",
        ly: "Ano-luz",

        // Área
        m2: "Metro Quadrado",
        cm2: "Centímetro Quadrado",
        mm2: "Milímetro Quadrado",
        km2: "Quilómetro Quadrado",
        ha: "Hectare",
        ft2: "Pé Quadrado",
        in2: "Polegada Quadrada",
        ac: "Acre",

        // Volume
        m3: "Metro Cúbico",
        l: "Litro",
        dl: "Decilitro",
        ml: "Mililitro",
        cm3: "Centímetro Cúbico",
        ft3: "Pé Cúbico",
        in3: "Polegada Cúbica",
        gal_us: "Galão Americano",
        qt_us: "Quart Americano",
        pt_us: "Pint Americano",
        fl_oz_us: "Onça Líquida Americana",

        // Massa
        kg: "Quilograma",
        g: "Grama",
        lb: "Libra",
        oz: "Onça",

        // Temperatura
        K: "Kelvin",
        C: "Grau Celsius",
        F: "Grau Fahrenheit",

        // Tempo
        s: "Segundo",
        min: "Minuto",
        h: "Hora",
        d: "Dia",

        // Velocidade
        m_per_s: "Metro por Segundo",
        km_per_h: "Quilómetro por Hora",
        mph: "Milha por Hora",
        kn: "Nó",

        // Pressão
        Pa: "Pascal",
        kPa: "Quilopascal",
        MPa: "Megapascal",
        bar: "Bar",
        mbar: "Milibar",
        atm: "Atmosfera",
        psi: "Libra por Polegada Quadrada",
        torr: "Torr",

        // Energia
        J: "Joule",
        kJ: "Quilojoule",
        Wh: "Watt-hora",
        kWh: "Quilowatt-hora",
        cal: "Caloria",
        kcal: "Quilocaloria",
        BTU: "Unidade Térmica Britânica",

        // Potência
        W: "Watt",
        kW: "Quilowatt",
        MW: "Megawatt",
        PS: "Cavalo-vapor (métrico)",
        hp: "Cavalo-vapor (HP)",

        // Força
        N: "Newton",
        kN: "Quilonewton",
        MN: "Meganewton",
        lbf: "Libra-força",

        // Binário
        N_m: "Newton-metro",
        kN_m: "Quilonewton-metro",
        ft_lb: "Pé-libra",

        // Tensão
        V: "Volt",
        mV: "Milivolt",
        kV: "Quilovolt",

        // Corrente
        A: "Ampere",
        mA: "Miliampere",
        kA: "Quiloampere",

        // Frequência
        Hz: "Hertz",
        kHz: "Quilohertz",
        MHz: "Megahertz",
        GHz: "Gigahertz",

        // Armazenamento
        B: "Byte",
        kB: "Quilobyte",
        MB: "Megabyte",
        GB: "Gigabyte",
        TB: "Terabyte",
        KiB: "Kibibyte",
        MiB: "Mebibyte",
        GiB: "Gibibyte",
        TiB: "Tebibyte",

        // Resistência
        ohm: "Ohm",
        kOhm: "Quiloohm",
        MOhm: "Megaohm",

        // Densidade
        kg_m3:  "Quilograma por Metro Cúbico",
        g_cm3:  "Grama por Centímetro Cúbico",
        g_l:    "Grama por Litro",
        kg_l:   "Quilograma por Litro",
        lb_ft3: "Libra por Pé Cúbico",
        lb_in3: "Libra por Polegada Cúbica",

        // Consumo de combustível
        l_100km: "Litros por 100 Quilómetros",
        km_l:    "Quilómetros por Litro",
        mpg_us:  "Milhas por Galão (EUA)",
        mpg_uk:  "Milhas por Galão (UK)",

        // Caudal
        m3_s:    "Metro Cúbico por Segundo",
        m3_min:  "Metro Cúbico por Minuto",
        m3_h:    "Metro Cúbico por Hora",
        l_s:     "Litro por Segundo",
        l_min:   "Litro por Minuto",
        l_h:     "Litro por Hora",
        ft3_s:   "Pé Cúbico por Segundo",
        gal_min: "Galão por Minuto",

        // Luminância
        cd_m2: "Candela por Metro Quadrado",
        nit:   "Nit",
        fL:    "Foot-Lambert",
        L:     "Lambert",
        sb:    "Stilb",

        // Radioatividade
        Bq:  "Becquerel",
        kBq: "Quilobecquerel",
        MBq: "Megabecquerel",
        GBq: "Gigabecquerel",
        Ci:  "Curie",
        mCi: "Milicurie",
        microCi: "Microcurie",

        // Viscosidade
        Pa_s:   "Pascal-segundo",
        mPa_s:  "Milipascal-segundo",
        cP:     "Centipoise",
        P:      "Poise",
        lb_fts: "Libra por Pé-segundo",

        // Taxa de dados
        bit_s:  "Bit por Segundo",
        kbit_s: "Quilobit por Segundo",
        Mbit_s: "Megabit por Segundo",
        Gbit_s: "Gigabit por Segundo",
        B_s:    "Byte por Segundo",
        kB_s:   "Quilobyte por Segundo",
        MB_s:   "Megabyte por Segundo",
        GB_s:   "Gigabyte por Segundo",

        // length additions
        yd:       "Jarda",
        in:       "Polegada",
        nmi:      "Milha Náutica",
        angstrom: "Ångström",
        pc:       "Parsec",

        // mass additions
        t:  "Tonelada Métrica",
        st: "Stone",
        gr: "Grão",
        ct: "Quilate",

        // temperature additions
        R: "Rankine",

        // time additions
        wk: "Semana",
        mo: "Mês",
        yr: "Ano",

        // volume additions
        cup_us:  "Chávena (EUA)",
        tbsp_us: "Colher de Sopa (EUA)",
        tsp_us:  "Colher de Chá (EUA)",

        // pressure additions
        mmHg: "Milímetro de Mercúrio",

        // energy additions
        eV: "Eletrão-volt",
    }
};

