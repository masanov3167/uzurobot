const {
  Scenes: { BaseScene },
} = require("telegraf");
const MyFn = require("../../controller/TryCatch");
const {  FindNameMeaning, generateRek } = require("../../utils");


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

  const name = await FindNameMeaning(txt);
  if (!name) {
    ctx.reply("*Ismingizni ma'nosini topa olmadim ⚠️*", {
      parse_mode: "markdown",
    });
    return;
  }
  ctx.scene.leave("meaningname");
  ctx.reply(`Ismiz ma'nosi 👇\n\n *${name}*! \n\n*${generateRek()}*`, {
    parse_mode: "markdown",
    disable_web_page_preview:true
  });
};

class MeaningName extends BaseScene {
  constructor() {
    super("meaningname");
    this.on("message", (ctx) => {
      MyFn(ctx,Fn, true);
    });
  }
}
module.exports = new MeaningName();
