const { readDb } = require("./src/utils")
const settings = readDb("settings",true);
module.exports = settings;