const {
  Scenes: { BaseScene },
} = require("telegraf");
const MyFn = require("../../controller/TryCatch");
const { GenerateStatus, FindNameMeaning, generateRek } = require("../../utils");
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
  const myKey = ctx.session.MeaningNameImg;
  const meaning = await FindNameMeaning(txt);
  if (!meaning) {
    ctx.reply("*Ismingizni ma'nosini topa olmadim ⚠️*", {
      parse_mode: "markdown",
    });
    return;
  }
  const result = await GenerateStatus(
    true,
    meaning,
    150,
    txt,
    "meaning",
    `${myKey.type}${myKey.key}.jpg`
  );

  await ctx.replyWithPhoto(
    { source: result },
    {
      caption: `${generateRek()}`,
      parse_mode: "markdown",
    }
  );
  ctx.scene.leave("photomeaningscene");
};

class MeaningNameImg extends BaseScene {
  constructor() {
    super("photomeaningscene");
    this.on("message", (ctx) => {
      MyFn(ctx,Fn, true);
    });
  }
}
module.exports = new MeaningNameImg();
