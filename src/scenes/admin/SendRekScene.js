const {
    Scenes: { BaseScene },
  } = require("telegraf");
  const MyFn = require("../../controller/TryCatch");
const { Gudok, User } = require("../../models");
const config = require("../../../config")
  
  
  const Fn = async (ctx) => {
    const txt = ctx?.message?.text?.trim();
    if (!txt) {
      ctx.reply("<b>Faqat post idsini kiriting! \n\nNamuna: <code>t.me/yourchannel/123</code></b>", {
        parse_mode: "html",
      });
      return;
    }
    if (
      (txt && txt.split(" ").length > 1)
    ) {
      ctx.reply(
        "<b>Idni to'g'ri kiriting!",
        { parse_mode: "html" }
      );
      return;
    }
  
  

    const users = await User.find();

    for(let i of users){
        setTimeout(()=>{
            ctx.telegram.copyMessage(i.cid,-1001786348256, txt);
        },100)
    }
      await ctx.scene.leave("sendrek");
      await ctx.reply("Userlarga habar yuborildi",{parse_mode:"markdown"})
  };
  
  class SendRekScene extends BaseScene {
    constructor() {
      super("sendrek");
      this.on("message", (ctx) => {
        MyFn(ctx,Fn, true);
      });
    }
  }
  module.exports = new SendRekScene();
  