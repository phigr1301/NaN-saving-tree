let modInfo = {
	name: "超级炸档树",
	id: "zhadangtree2",
	author: "Antimatter Dimensions",
	pointsName: "反物质",
	modFiles: ["layers.js", "tree.js"],

	discordName: "哔哩哔哩",
	discordLink: "114514",
	initialStartPoints: new Decimal (10), // Use是d for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "alpha 0.0.0.1",
	name: "梦开始的地方",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>alpha 0.0.0.1 梦开始的地方</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints() {
	if ((!hasUpgrade('z', 12)) && player.points.gte(new Decimal("1.7977e308"))) return false
	return hasUpgrade('z', 11)
}

// Calculate points/sec!
function getPointGen() {

	if ((!hasUpgrade('z', 12)) && player.points.gte(new Decimal("1.7977e308"))) player.points = new Decimal("1.7977e308")
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal("1e307")
	if (hasUpgrade('z', 13)) gain = gain.mul(player.z.points.pow(0.7))
	if (hasUpgrade('z', 16)) gain = gain.mul(player.points.pow(0.1))
	if (hasUpgrade('z', 17)) gain = gain.pow(1.05)
	if (hasUpgrade('h', 11) && (!hasUpgrade('h', 13))) gain = gain.mul(player.points.sub(new Decimal("1e8436900")).max(0).div(new Decimal("1e8436900")).add(1).pow(0.2))
	if (hasUpgrade('h', 13) && (!hasUpgrade('h', 14))) gain = gain.mul(player.points.sub(new Decimal("1e8436800")).max(0).div(new Decimal("1e8436800")).add(1).pow(0.2))
	if (hasUpgrade('h', 14)) gain = gain.mul(player.points.sub(new Decimal("1e8350000")).max(0).div(new Decimal("1e8350000")).add(1).pow(0.2))
	if (hasUpgrade('h', 25)) gain = gain.pow(1.05)
	if (hasMilestone('GJ', 4)) gain = gain.pow(1.02)
	if(gain.eq(0))gain=new Decimal("1") //防止坏档
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return false
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}