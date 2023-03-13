const MyFn = require("../TryCatch");
const config = require("../../../config");
const { generateButton, readDb } = require("../../utils");
const { Gudok, Kino, Channel } = require("../../models");

const Fn = async (ctx) => {
  if (ctx.from.id === config.dev) {
    const txt = ctx?.message?.text?.split(" ")[0].trim();
    let arr = [];
    if(txt === "/gudok"){
      const gudok = await Gudok.find();
      arr = gudok;
    }
    if(txt === "/kino"){
      const cinemas = await Kino.find();
      arr = cinemas;
    }
    if(txt === "/kanal"){
      const channels = await Channel.find();
      arr = channels;
    }
    if(txt === "/rek"){
      const rek = readDb("settings",true);
      arr = rek.rek;
    }
    const button = generateButton(arr, false,false,txt,1);
    await ctx.reply(`*Botda jami ${arr.length}ta ${txt.substring(1)} bor \n\n ${arr.length>10 ? "N1-sahifa" :""}*`,
      {reply_markup: {inline_keyboard: button}, parse_mode:"markdown"}
    );
  }else{
    await ctx.deleteMessage(ctx.message.message_id)
  }
};

const AdminFn = ( ctx) => {
  MyFn( ctx, Fn,true);
};

module.exports = AdminFn;
