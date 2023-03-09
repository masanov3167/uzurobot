const {
  Scenes: { BaseScene },
} = require("telegraf");
const MyFn = require("../../controller/TryCatch");
const { GenerateImg, generateRek } = require("../../utils");
const Fn = async (ctx) => {
  const txt = ctx?.message?.text?.trim();
  if (!txt) {
    ctx.reply(`<b>Faqat matn kiriting! \n\nNamuna: <code>Jumabek</code></b>\n\n${generateRek()}`, {
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
  const myKey = ctx.session.PhotoProScene;
  const buffer = await GenerateImg(
    "red",
    "pro",
    `${myKey.type}${myKey.key}.jpg`,
    false,
    txt
  );

  await ctx.replyWithPhoto({ source: buffer },{
    caption:`${generateRek()}`,
    parse_mode:"markdown"
  });
  ctx.scene.leave("photoproscene");
};

class PhotoProScene extends BaseScene {
  constructor() {
    super("photoproscene");
    this.on("message", (ctx) => {
      MyFn(ctx,ctx => Fn(ctx), true);
    });
  }
}
module.exports = new PhotoProScene();
