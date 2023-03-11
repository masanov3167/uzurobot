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
  const myKey = ctx.session.PhotoKreativScene;
  const buffer = await GenerateImg(
    "white",
    "creativ",
    `${myKey.type}${myKey.key}.jpg`,
    false,
    txt,
    myKey.key == 1 && myKey.type == "boy"
      ? 1.4
      : myKey.key == 3 && myKey.type == "boy"
      ? 1.15
      : myKey.type == "boy"
      ? 1.23
      : 1.36
  );

  await ctx.replyWithPhoto({ source: buffer },{
    caption:`*${generateRek()}*`,
    parse_mode:"markdown"
  });
  ctx.scene.leave("photokreativscene");
};

class PhotoKreativScene extends BaseScene {
  constructor() {
    super("photokreativscene");
    this.on("message", (ctx) => {
      MyFn(ctx,Fn, true);
    });
  }
}
module.exports = new PhotoKreativScene();
