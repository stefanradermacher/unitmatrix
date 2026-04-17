window.LOCALES = window.LOCALES || {};

window.LOCALES["zh"] = {
    code: "zh",
    name: "中文",
    htmlLang: "zh-CN",

    ui: {
        title: "UnitMatrix",
        tagline: "所有单位，一个矩阵。",
        titleTag: "UnitMatrix — 通用单位换算工具",
        descriptionTag: "使用 UnitMatrix 即时换算单位：快速、准确、注重隐私，无跟踪无分析。",

        labelFrom: "从",
        labelTo: "到",
        copyResultLabel: "复制结果",
        swapUnitsAria: "交换源单位和目标单位",

        matrixMore:"更多单位…",
        matrixLess: "收起",

        footerSupportText: "UnitMatrix 是免费的非商业项目。如果您想支持开发，{link}。",
        footerSupportLink: "请点击这里",

        privacyLink: "隐私",
        privacyTitle: "隐私与数据使用",
        privacyP1: "UnitMatrix 不在服务器上存储任何个人数据。",
        privacyP2: "我们不使用任何跟踪、分析或第三方 Cookie。",
        privacyP3: "为方便起见，部分偏好设置（如语言、主题）仅存储在您浏览器的本地存储中，这些数据不会离开您的设备。",

        supportTitle: "支持 UnitMatrix",
        supportIntro: "UnitMatrix 是一个私人非商业项目，将永远免费提供。",
        supportP1: "如果您希望支持开发和托管费用，可以进行小额捐款。",
        supportPaypalLabel: "通过 PayPal 捐款",
        supportOtherLabel: "其他支持方式",

        impressumLink: "法律信息",
        impressumTitle: "法律信息",
        impressumProviderLabel: "负责人",
        impressumContactLabel: "联系方式",
        impressumEmailLabel: "电子邮件：",
        impressumP3: "UnitMatrix 是私人非商业项目，所有内容不提供任何保证。",
        impressumP4: "外部链接仅为便利而提供，相关网站的内容由其运营者负责。",
        belowAbsZeroWarning: "⚠ 低于绝对零度（0 K）"
    },

    categories: {
        length:       "长度",
        area:         "面积",
        volume:       "体积",
        mass:         "质量",
        temperature:  "温度",
        time:         "时间",
        speed:        "速度",
        pressure:     "压力",
        energy:       "能量",
        power:        "功率",
        force:        "力",
        torque:       "扭矩",
        voltage:      "电压",
        current:      "电流",
        frequency:    "频率",
        storage:      "数据存储",
        resistance:   "电阻",
        density:      "密度",
        fuel_economy: "燃油经济性",
        flow:         "流量",
        luminance:    "亮度",
        radioactivity:"放射性",
        viscosity:    "粘度",
        data_rate:    "数据速率"
    },

    categoryButtons: {
        length:       "长度",
        area:         "面积",
        volume:       "体积",
        mass:         "质量",
        temperature:  "温度",
        time:         "时间",
        speed:        "速度",
        pressure:     "压力",
        energy:       "能量",
        power:        "功率",
        force:        "力",
        torque:       "扭矩",
        voltage:      "电压",
        current:      "电流",
        frequency:    "频率",
        storage:      "存储",
        resistance:   "电阻",
        density:      "密度",
        fuel_economy: "油耗",
        flow:         "流量",
        luminance:    "亮度",
        radioactivity:"放射性",
        viscosity:    "粘度",
        data_rate:    "速率"
    },

    unitLabels: {
        // 长度
        km:       "千米",
        m:        "米",
        cm:       "厘米",
        mm:       "毫米",
        mi:       "英里",
        ft:       "英尺",
        ly:       "光年",
        yd:       "码",
        in:       "英寸",
        nmi:      "海里",
        angstrom: "埃",
        pc:       "秒差距",

        // 面积
        m2:  "平方米",
        cm2: "平方厘米",
        mm2: "平方毫米",
        km2: "平方千米",
        ha:  "公顷",
        ft2: "平方英尺",
        in2: "平方英寸",
        ac:  "英亩",

        // 体积
        m3:      "立方米",
        l:       "升",
        dl:      "分升",
        ml:      "毫升",
        cm3:     "立方厘米",
        ft3:     "立方英尺",
        in3:     "立方英寸",
        gal_us:  "美制加仑",
        qt_us:   "美制夸脱",
        pt_us:   "美制品脱",
        fl_oz_us: "美制液量盎司",
        cup_us:  "美制杯",
        tbsp_us: "美制汤匙",
        tsp_us:  "美制茶匙",

        // 质量
        kg: "千克",
        g:  "克",
        lb: "磅",
        oz: "盎司",
        t:  "公吨",
        st: "英石",
        gr: "格令",
        ct: "克拉",

        // 温度
        K: "开尔文",
        C: "摄氏度",
        F: "华氏度",
        R: "朗肯",

        // 时间
        s:   "秒",
        min: "分钟",
        h:   "小时",
        d:   "天",
        wk:  "周",
        mo:  "月",
        yr:  "年",

        // 速度
        m_per_s:  "米每秒",
        km_per_h: "千米每小时",
        mph:      "英里每小时",
        kn:       "节",

        // 压力
        Pa:   "帕斯卡",
        kPa:  "千帕",
        MPa:  "兆帕",
        bar:  "巴",
        mbar: "毫巴",
        atm:  "标准大气压",
        psi:  "磅力每平方英寸",
        torr: "托",
        mmHg: "毫米汞柱",

        // 能量
        J:    "焦耳",
        kJ:   "千焦",
        Wh:   "瓦时",
        kWh:  "千瓦时",
        cal:  "卡路里",
        kcal: "千卡",
        BTU:  "英热单位",
        eV:   "电子伏特",

        // 功率
        W:  "瓦特",
        kW: "千瓦",
        MW: "兆瓦",
        PS: "公制马力",
        hp: "马力",

        // 力
        N:   "牛顿",
        kN:  "千牛",
        MN:  "兆牛",
        lbf: "磅力",

        // 扭矩
        N_m:   "牛顿米",
        kN_m:  "千牛米",
        ft_lb: "英尺磅",

        // 电压
        V:  "伏特",
        mV: "毫伏",
        kV: "千伏",

        // 电流
        A:  "安培",
        mA: "毫安",
        kA: "千安",

        // 频率
        Hz:  "赫兹",
        kHz: "千赫",
        MHz: "兆赫",
        GHz: "吉赫",

        // 数据存储
        B:   "字节",
        kB:  "千字节",
        MB:  "兆字节",
        GB:  "吉字节",
        TB:  "太字节",
        KiB: "千位字节",
        MiB: "兆位字节",
        GiB: "吉位字节",
        TiB: "太位字节",

        // 电阻
        ohm:  "欧姆",
        kOhm: "千欧",
        MOhm: "兆欧",

        // 密度
        kg_m3:  "千克每立方米",
        g_cm3:  "克每立方厘米",
        g_l:    "克每升",
        kg_l:   "千克每升",
        lb_ft3: "磅每立方英尺",
        lb_in3: "磅每立方英寸",

        // 燃油经济性
        l_100km: "升每百千米",
        km_l:    "千米每升",
        mpg_us:  "英里每加仑（美）",
        mpg_uk:  "英里每加仑（英）",

        // 流量
        m3_s:    "立方米每秒",
        m3_min:  "立方米每分钟",
        m3_h:    "立方米每小时",
        l_s:     "升每秒",
        l_min:   "升每分钟",
        l_h:     "升每小时",
        ft3_s:   "立方英尺每秒",
        gal_min: "加仑每分钟",

        // 亮度
        cd_m2: "坎德拉每平方米",
        nit:   "尼特",
        fL:    "英尺朗伯",
        L:     "朗伯",
        sb:    "熙提",

        // 放射性
        Bq:  "贝可勒尔",
        kBq: "千贝可勒尔",
        MBq: "兆贝可勒尔",
        GBq: "吉贝可勒尔",
        Ci:  "居里",
        mCi: "毫居里",
        microCi: "微居里",

        // 粘度
        Pa_s:   "帕斯卡秒",
        mPa_s:  "毫帕斯卡秒",
        cP:     "厘泊",
        P:      "泊",
        lb_fts: "磅每英尺秒",

        // 数据速率
        bit_s:  "比特每秒",
        kbit_s: "千比特每秒",
        Mbit_s: "兆比特每秒",
        Gbit_s: "吉比特每秒",
        B_s:    "字节每秒",
        kB_s:   "千字节每秒",
        MB_s:   "兆字节每秒",
        GB_s:   "吉字节每秒",
    }
};

