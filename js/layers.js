addLayer("z", {
    name: "炸档层1", // This is optional, only used in a few无 places, If absent it just uses the layer id.
    symbol: "炸", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#e0e1cc",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "炸档点", // Name of prestige currency
    baseResource: "反物质", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.95, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('z', 14)) mult = mult.mul(player.points.pow(0.3))
        if (hasUpgrade('h', 12)) mult = mult.mul(100000)
        if (hasUpgrade('h', 21)) mult = mult.mul(player.h.points.min(100000000).add(1).pow(100000))
        if (hasUpgrade('h', 27)) mult = mult.mul(player.h.points.min("1e308").sub(100000000).max(0).div(100000000).add(1).pow(1000))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        expont = new Decimal(1)

        if (hasUpgrade('h', 17)) expont = expont.add(0.02)
        return expont
    },
    passiveGeneration() {
        mult = new Decimal(0)
        if (hasUpgrade('z', 15))
            mult = new Decimal(2);
        if (hasUpgrade('h', 15))
            mult = mult.add(2);
        return mult
    },
    autoUpgrade() {
        upg = false
        if (hasUpgrade('h', 15)) upg = true
        return upg
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [],

    upgrades: {
        11: {
            title: "这是反物质维度？",
            description: "开始反物质生产，每秒生产1e307反物质",
            cost: new Decimal(1),
        },
        12: {
            title: "所以你设置个无限又有什么用",
            description: "打破无限",
            cost: new Decimal("2e292"),
            unlocked() { return (hasUpgrade('z', 11)) },
        },
        13: {
            title: "是时间墙，我们没救了",
            description: "炸档点增加反物质获取，效果为炸档点^0.7",
            cost: new Decimal("1e293"),
            unlocked() { return (hasUpgrade('z', 12)) },
        },
        14: {
            title: "？？你这样很快就炸档了",
            description: "反物质增加炸档点获取，效果为反物质^0.3",
            cost: new Decimal("1e872"),
            unlocked() { return (hasUpgrade('z', 13)) },
        },
        15: {
            title: "ok了终于不用一直点了",
            description: "每秒获得200%重置时可获得的炸档点",
            cost: new Decimal("5e3071"),
            unlocked() { return (hasUpgrade('z', 14)) },
        },
        16: {
            title: "这游戏没救了",
            description: "反物质增加自身获取，效果为反物质^0.1",
            cost: new Decimal("1e3083"),
            unlocked() { return (hasUpgrade('z', 15)) },
        },
        17: {
            title: "炸档不如咬打火机",
            description: "反物质获取为原来的1.05次方（在乘数之后）",
            cost: new Decimal("1e15325"),
            unlocked() { return (hasUpgrade('z', 16)) },
        },
        21: {
            title: "挂机？启动！",
            description: "解锁挂机层",
            cost: new Decimal("1e14020202"),
            unlocked() { return (hasUpgrade('z', 17)) },
        },
    },
    layerShown() { return true }
});
addLayer("GJ", {
    name: "挂机层", // This is optional, only used in a few无 places, If absent it just uses the layer id.
    symbol: "挂", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked() { return hasUpgrade('z', 21) || player.GJ.points.gt(0) },
            points: new Decimal(0),
        }
    },
    color: "#1e9999",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "挂机时间（单位为毫秒）", // Name of prestige currency
    baseResource: "时间倍率", // Name of resource prestige is based on
    baseAmount() {
        if(hasMilestone('GJ',2))return new Decimal(3)
        return new Decimal(1)
    }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        expont = new Decimal(1)
        return expont
    },
    passiveGeneration() {
        mult = new Decimal(0)
        if (hasUpgrade('z', 21)||player.GJ.points.gt(0))
            mult = new Decimal(1000);
        return mult
    }, resetsNothing() { return true },
    autoUpgrade() {
        return false
    },
    doReset(resettingLayer) {
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [],
    milestones: {
        0: {
            requirementDescription: "挂机达到5分钟",
            effectDescription: "所以这是时间墙吗？",
            done() { return player.GJ.points.gte(300000) }
        },
        1: {
            requirementDescription: "挂机达到7分钟",
            effectDescription: "基于挂机时间给予炸档点2增益，效果为10^(挂机分钟数)，最多计入1天",
            done() { return player.GJ.points.gte(420000) }
        },
        2: {
            requirementDescription: "炸档点2达到1e240",
            effectDescription: "时间倍率变为3倍",
            done() { return player.h.points.gte("1e240") }
        },
        3: {
            requirementDescription: "炸档点2达到1e246",
            effectDescription: "炸档点2获取除以0.1",
            done() { return player.h.points.gte("1e246") }
        },
        4: {
            requirementDescription: "炸档点2达到1e255",
            effectDescription: "反物质获取变为原来的1.02次方",
            done() { return player.h.points.gte("1e255") }
        },
        5: {
            requirementDescription: "炸档点2达到1.7977e308",
            effectDescription: "炸档点2获取变为原来的1.2次方",
            done() { return player.h.points.gte("1.7977e308") }
        },
        6: {
            requirementDescription: "挂机达到1小时",
            effectDescription: "解锁第三行炸档点2升级",
            done() { return player.GJ.points.gte(3600000) }
        },
    },
    upgrades: {
    },
    layerShown() { return hasUpgrade('z', 21) || player.GJ.points.gt(0) }
});
addLayer("h", {
    name: "炸档层2", // This is optional, only used in a few无 places, If absent it just uses the layer id.
    symbol: "档", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#66ccff",
    requires: new Decimal("1e8436900"), // Can be a function that takes requirement increases into account
    resource: "炸档点2", // Name of prestige currency
    baseResource: "反物质", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.000001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('h', 16)) mult = mult.div(0.34)
        if (hasUpgrade('h', 23)) mult = mult.mul(player.h.points.add(1).pow(0.3))
        if (hasUpgrade('h', 24)) mult = mult.mul(player.points.add(10).log(10))
        if (hasUpgrade('h', 26)) mult = mult.mul(player.z.points.pow(1e-5))
        if (hasMilestone('GJ', 1)) mult = mult.mul(new Decimal(10).pow(player.GJ.points.div(60000).min(1440)))
        if (hasMilestone('GJ', 3)) mult = mult.div(0.1)
        if (hasMilestone('GJ', 5)) mult = mult.pow(1.2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        mult = new Decimal(0)
        if (hasUpgrade('h', 22))
            mult = new Decimal(2);
        return mult
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [],

    upgrades: {
        11: {
            title: "不是我炸的档怎么没了",
            description: "基于反物质超过1e8436900的部分增益反物质，效果是((反物质-1e8436900)/1e8436900)^0.2，在1.05次方之后",
            cost: new Decimal(1),
        },
        12: {
            title: "还是去掉时间墙吧",
            description: "炸档点获取*1e5",
            cost: new Decimal(1),
            unlocked() { return (hasUpgrade('h', 11)) },
        },
        13: {
            title: "档要炸了",
            description: "升级11的所有“1e8436900”改为“1e8436800”",
            cost: new Decimal(2),
            unlocked() { return (hasUpgrade('h', 12)) },
        },
        14: {
            title: "还没炸？",
            description: "升级11的所有“1e8436800”改为“1e8350000”",
            cost: new Decimal(3),
            unlocked() { return (hasUpgrade('h', 13)) },
        },
        15: {
            title: "挂机了",
            description: "每秒获得200%重置时可获得的炸档点，自动购买炸层升级",
            cost: new Decimal(0),
            unlocked() { return (hasUpgrade('h', 14)) },
        },
        16: {
            title: "快炸",
            description: "炸档点2除以0.34",
            cost: new Decimal(3),
            unlocked() { return (hasUpgrade('h', 15)) },
        },
        17: {
            title: "炸",
            description: "炸档点指数+0.02",
            cost: new Decimal(10),
            unlocked() { return (hasUpgrade('h', 16)) },
        },
        21: {
            title: "炸不了",
            description: "炸档点2增加炸档点获取，效果为(炸档点2)^100000，最多计入1亿炸档点2",
            cost: new Decimal(10),
            unlocked() { return (hasUpgrade('h', 17)) },
        },
        22: {
            title: "存档恢复10%",
            description: "每秒获得200%重置时可获得的炸档点2",
            cost: new Decimal(100),
            unlocked() { return (hasUpgrade('h', 21)) },
        },
        23: {
            title: "存档恢复20%",
            description: "炸档点2增加自身获取，效果为(炸档点2)^0.3",
            cost: new Decimal(10000),
            unlocked() { return (hasUpgrade('h', 22)) },
        },
        24: {
            title: "存档恢复99%",
            description: "反物质增加炸档点2获取，效果为log10(反物质)",
            cost: new Decimal(1000000),
            unlocked() { return (hasUpgrade('h', 23)) },
        },
        25: {
            title: "软上限了？",
            description: "反物质获取为原来的1.05次方（在所有乘数之后）",
            cost: new Decimal(1e17),
            unlocked() { return (hasUpgrade('h', 24)) },
        },
        26: {
            title: "炸档点2也膨胀了？",
            description: "炸档点增加炸档点2获取，效果为炸档点^0.00001",
            cost: new Decimal(4e21),
            unlocked() { return (hasUpgrade('h', 25)) },
        },
        27: {
            title: "存档恢复100%",
            description: "超过1亿的炸档点2增加炸档点获取，效果为(max(0,(炸档点2-1亿))/1亿+1)^1000，最多计入1e308炸档点2",
            cost: new Decimal("2e215"),
            unlocked() { return (hasUpgrade('h', 26)) },
        },
    },
    layerShown() { return true }
})
