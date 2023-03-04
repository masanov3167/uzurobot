const MyFn = require("../TryCatch");
const config = require("../../../config");
// const { readDb } = require("../../utils");
// const fs = require("fs");
// const path = require("path")
const Fn = async (ctx) => {
  if (ctx.from.id === config.dev && ctx.chat.type==="private") {
  ctx.reply(`bu web app`,{
    parse_mode:"markdown",
    reply_markup:{
        inline_keyboard:[
            [{text:"web app bot", web_app:{url:"https://sprightly-scone-772110.netlify.app/"}}]
        ]
    }
  })
    return;
  }
};

const Settings = ctx => {
  MyFn(ctx, Fn(ctx),true);
};

module.exports = Settings;