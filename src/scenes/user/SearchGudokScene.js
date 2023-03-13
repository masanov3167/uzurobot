const {
  Scenes: { BaseScene },
} = require("telegraf");
const MyFn = require("../../controller/TryCatch");
const { Gudok, Kino } = require("../../models");
const { generateRek } = require("../../utils");

async function Fn(ctx) {
  const txt = ctx?.message?.text?.trim();
  const search = ctx?.session?.kino;
  if (!txt) {
    ctx.reply(
      `<b>Faqat matn kiriting! \n\nNamuna: <code>${
        search ? "Avatar" : "Jumabek"
      }</code></b>`,
      {
        parse_mode: "html",
      }
    );
    return;
  }

  if (
    (!search && txt && txt.split(" ").length > 2) ||
    txt.length > 20 ||
    !/^[^\d]+$/.test(txt)
  ) {
    ctx.reply(
      "<b>Ismingizni to'g'ri kiriting! (faqat lotin harfida) \n\nNamuna: <code>Jumabek</code></b>",
      { parse_mode: "html" }
    );
    return;
  }
  const notFound = () => {
    ctx.reply("*topa olmadim ⚠️*", {
      parse_mode: "markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "Qidiruvni to'xtatish", callback_data: "cancelscene" }],
        ],
      },
    });
  };
  if (search) {
    const result = await Kino.find({ text: { $regex: txt, $options: "i" } });
    if (result.length == 0) {
      notFound();
      return;
    }
    let count = 0;
    const end = result.length>8 ? 8 : result.length;
    let message = `*Qidiruv natijalari :${end}*\n\n`;
    for (let i = 0; i < end; i++) {
      message += `${i + 1})- [${result[i]?.text.substring(0,100).split("\n").join(" ")}](${result[i]?.link})\n`;
      count++;
    }
    if (count === end) {
      ctx.scene.leave("searchgudok");
      ctx.reply(`${message} \n*${generateRek()}*`, {
        parse_mode:"markdown",
        disable_web_page_preview: true
      });
    }
    return;
  } else {
    const result = await Gudok.find({ text: { $regex: txt, $options: "i" } });
    if (result.length == 0) {
      notFound();
      return;
    }
    ctx.replyWithAudio(result[0].file_id, {
      parse_mode: "markdown",
      caption: `*${result[0].text} \n\n ${generateRek()}*`,
    });
  }
  ctx.scene.leave("searchgudok");
}

class SearchGudok extends BaseScene {
  constructor() {
    super("searchgudok");
    this.on("message", (ctx) => {
      MyFn(ctx, Fn, true);
    });
  }
}
module.exports = new SearchGudok();
