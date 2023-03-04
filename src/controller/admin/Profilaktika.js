const MyFn = require("../TryCatch");
const config = require("../../../config");
const { readDb } = require("../../utils");
const fs = require("fs");
const path = require("path")

const Fn = async (ctx) => {
  if (ctx.from.id === config.dev) {
   const settings =  readDb("settings",true);
   settings.active = !settings.active;
   fs.writeFileSync(
    path.join(__dirname,"..","..","..","settings.json"),
    JSON.stringify(settings,null,2)
   )
  ctx.reply(`Botning holati o'zgartirildi! \n\nHozirgi holat: *${settings.active ? "faol":"nofaol"}*`,{
    parse_mode:"markdown"
  })
    return;
  }
};

const Profilaktika = ctx => {
  MyFn(ctx, Fn(ctx),true);
};

module.exports = Profilaktika;