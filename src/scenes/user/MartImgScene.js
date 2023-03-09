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
  const myKey = ctx.session.MartImgScene;

  const result = await GenerateImg(
    (myKey.type === "nav" && myKey.key > 2) ||
      (myKey.type === "ram" && myKey.key == 3)
      ? "white"
      : "red",
    "mart",
    `${myKey.type}${myKey.key}.jpg`,
    myKey.type === "mart" ? "bold 40px Arial" : false,
    `${txt[0].toUpperCase()}${txt.substring(1).toLowerCase()}`,
    myKey.type === "nav" && myKey.key > 2
      ? 1.3 : myKey.type === "nav" && myKey.key ==2 ? 1.2
      : myKey.type === "mart" && myKey.key == 4
      ? 1.3
      : myKey.type === "mart"
      ? 1.7
      : (myKey.type === "ram" && myKey.key == 1) || myKey.key == 2
      ? 1.5
      : myKey.type === "ram" && myKey.key == 3 
      ? 2.3 :
      myKey.type ==="ram"&&myKey.key == 4 ? 2
      : 1.2,
    myKey.type === "nav" && myKey.key == 4
      ? 4
      : myKey.type === "mart" && myKey.key == 3
      ? 3.7
      : myKey.type === "mart" && myKey.key == 4
      ? 1.4
      : myKey.type === "mart"
      ? 1.6
      : myKey.type ==="ram"&& myKey.key ==3 ? 1.8
      : false,
    myKey.type === "mart"
  );

  await ctx.replyWithPhoto({ source: result },
    {
      caption: `${generateRek()}`,
      parse_mode: "markdown",
    });
  ctx.scene.leave("photomartscene");
};

class MartImgScene extends BaseScene {
  constructor() {
    super("photomartscene");
    this.on("message", (ctx) => {
      MyFn(ctx,Fn, true);
    });
  }
}
module.exports = new MartImgScene();
