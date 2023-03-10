const {
  Scenes: { BaseScene },
} = require("telegraf");
const MyFn = require("../../controller/TryCatch");
const { readDb, updateDb, writeDb } = require("../../utils");
const { User } = require("../../models");

const Fn = async (ctx) => {
  const Text = `Shu xolicha jo'natishni istaysizmi?\n\n<code>/send</code> - shu xolicha yuborish\n<code>/add - Status yozish:status:1</code> - callbackli tugma qo'shish\n<code>/add - Havolani ulashish:havola:2</code> - inline tugma qo'shish\n<code>/add - Kanalga kirish:t.me/uzurobot:3</code> - url tugma qo'shish`;
  const obj = readDb("rek");
  if (!obj[0]?.msgId) {
    const chid = ctx?.message?.chat;
    const msgId = ctx?.message?.message_id;
    if (msgId) {
      const ob = { id: 1, msgId, chid: chid.id, buttons: [] };
      writeDb(ob, "rek");
      const copy = await ctx.telegram.copyMessage(ctx.from.id, chid.id, msgId, {
        parse_mode: "markdown",
      });
      if (copy) {
        await ctx.reply(Text, { parse_mode: "html" });
      }
      return;
    }
    await ctx.deleteMessage(ctx.message.message_id);
  }
  if (obj[0]?.msgId) {
    const txt = ctx?.message?.text.trim();
    if (!txt) {
      await ctx.reply("tekst formatda yuboring!");
      return;
    }
    if (txt === "/send") {
      const users = await User.find();
      for await (let item of users) {
        setTimeout(() => {
          ctx.telegram.copyMessage(item.cid, obj[0]?.chid, obj[0]?.msgId, {
            parse_mode: "markdown",
            disable_web_page_preview: true,
            reply_markup: {
              inline_keyboard: obj[0]?.buttons,
            },
          });
        }, 90);
      }
      await ctx.reply("Yaxshi habar yuborildi");
      return;
    }

    const command = txt.split("-");
    if (
      command[0].trim() !== "/add" ||
      command.length == 1 ||
      (command.length > 1 && command[1].split(":").length < 2)
    ) {
      await ctx.reply(`Buyrurqni to'gri ishlating :(\n\n${Text}`, {
        parse_mode: "html",
        disable_web_page_preview: true,
      });
      return;
    }
    const check = command[1].split(":");
    const type = check[check.length - 1]?.trim();
    const data = check
      .slice(1, check.length - 1)
      .join(":")
      ?.trim();
    const value = { text: check[0]?.trim() };
    if (type && [1, 2].some((i) => i == type)) {
      if (
        !/[A-Za-z]/g.test(data) ||
        data.split(" ").length > 1 ||
        data.length > 62
      ) {
        await ctx.reply(
          ` <code>${
            type == 1 ? "callback_data" : "switch_inline_query"
          }</code> button uchun tugmaga datani faqat ingliz harflarida, orasida probellarsiz bering va harflar 62tadan oshib ketmasin bo'lmasin`,
          {
            parse_mode: "html",
          }
        );
        return;
      }
      value[`${type == 1 ? "callback_data" : "switch_inline_query"}`] = data;
    }
    if (!type || type == 3) {
      if (!/((http|https):\/\/[^\s]+)/g) {
        await ctx.reply("Button uchun urlni to'gri kiriting");
        return;
      }
      value.url = data;
    }
    obj[0].buttons.push([value]);
    updateDb("id", 1, obj[0], "rek");
    await ctx.telegram.copyMessage(ctx.from.id, obj[0]?.chid, obj[0]?.msgId, {
      parse_mode: "markdown",
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: obj[0]?.buttons,
      },
    });
    await ctx.reply(Text, { parse_mode: "html" });
  }
};

class SendRekScene extends BaseScene {
  constructor() {
    super("sendrek");
    this.on("message", (ctx) => {
      MyFn(ctx, Fn, true);
    });
  }
}
module.exports = new SendRekScene();
