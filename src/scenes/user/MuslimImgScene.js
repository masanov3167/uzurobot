const {
  Scenes: { BaseScene },
} = require("telegraf");
const MyFn = require("../../controller/TryCatch");
const { GenerateImg, generateRek } = require("../../utils");
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
  const myKey = ctx.session.muslimScene;
  const buffer = await GenerateImg(
    "red",
    "muslim",
    `${myKey.type}${myKey.key}.jpg`,
    false,
    txt,
    1.12
  );

  await ctx.replyWithPhoto(
    { source: buffer },
    {
      caption: `${generateRek()}`,
      parse_mode: "markdown",
    }
  );
  ctx.scene.leave("photomuslimscene");
};

class Photomuslimscene extends BaseScene {
  constructor() {
    super("photomuslimscene");
    this.on("message", (ctx) => {
      MyFn(ctx,Fn, true);
    });
  }
}
module.exports = new Photomuslimscene();
