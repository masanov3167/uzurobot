const { default: mongoose } = require("mongoose");
const { Telegraf } = require("telegraf");

const config = require("../../config");
const MyScenes = require("../scenes");
const Middlewares = require("../middleware");
const Controllers = require("../controller");
const RemoveDb = require("../controller/user/RemoveDb");
const bot = new Telegraf(config.token);

mongoose.set("strictQuery", false);
mongoose.connect(config.mongoLink, { useNewUrlParser: true }).then(() => console.log("success")).catch((e) => console.log(e));


bot.on("my_chat_member", async (ctx) => RemoveDb(ctx,bot));

// Middlewares(bot);
MyScenes(bot);
Controllers(bot);

bot.launch({ dropPendingUpdates: true });
module.exports = bot;