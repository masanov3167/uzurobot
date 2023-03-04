const {
    Scenes: { BaseScene },
  } = require("telegraf");
  const MyFn = require("../../controller/TryCatch");
const { Gudok } = require("../../models");
const config = require("../../../config")
  
  
  const Fn = async (ctx) => {
    const txt = ctx?.message?.text?.trim();
    if (!txt) {
      ctx.reply("<b>Faqat matn kiriting! \n\nNamuna: <code>Jumabek</code></b>", {
        parse_mode: "html",
      });
      return;
    }
    if (
      (txt && txt.split(" ").length > 2) ||
      txt.length > 20 ||
      !/^[^\d]+$/.test(txt)
    ) {
      ctx.reply(
        "<b>Ismingizni to'g'ri kiriting! (faqat lotin harfida) \n\nNamuna: <code>Jumabek</code></b>",
        { parse_mode: "html" }
      );
      return;
    }
  
    const name = await Gudok.find({text:{ $regex: txt, $options: "i"}});
    if (name.length==0) {
      ctx.reply("*Ismingizga gudok topa olmadim ⚠️*", {
        parse_mode: "markdown",
      });
      return;
    }
    ctx.scene.leave("searchgudok");
    ctx.replyWithAudio(name[0].file_id,{
        parse_mode:"markdown",
        caption:`*${name[0].text} - ${config.rek}*`
    });
  };
  
  class SearchGudok extends BaseScene {
    constructor() {
      super("searchgudok");
      this.on("message", (ctx) => {
        MyFn(ctx, Fn(ctx), true);
      });
    }
  }
  module.exports = new SearchGudok();
  