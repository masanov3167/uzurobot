const MyFn = require("../TryCatch");
const config = require("../../../config");
const { generateButton, readDb } = require("../../utils");
const { Gudok } = require("../../models");

const Fn = async (ctx) => {
  if (ctx.from.id === config.dev) {
    const txt = ctx.message.text;
    let arr = [];
    if(txt === "/gudok"){
      const gudok = await Gudok.find();
      arr = gudok;
    }
    if(txt === "/kanal"){
      const channels = readDb("channels");
      arr = channels;
    }
    const button = generateButton(arr, false,false,txt,1)
    await ctx.reply(`*Botda jami ${arr.length}ta ${txt.substring(1)} bor \n\n1-sahifa*`,
      {reply_markup: {inline_keyboard: button}, parse_mode:"markdown"}
    );
  }
};

const AdminFn = ( ctx) => {
  MyFn( ctx, Fn,true);
};

module.exports = AdminFn;
