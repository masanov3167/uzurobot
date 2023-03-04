const { readDb } = require("./src/utils")
const settings = readDb("settings",true);
settings.rek = `@${settings.boturl} 🐳🫶`
module.exports = settings;