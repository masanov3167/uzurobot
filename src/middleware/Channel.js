const ErrorAnswerInlineQuery = require("../controller/user/ErrorAnswerInlineQuery");
const { User } = require("../models");
const { generateButton, sendError, readDb, generateRek } = require("../utils");
const config = readDb("settings", true);

const isSubscribe = async (ctx, next) => {
  try {
    if (
      (ctx?.chat?.type === "private" && config.dev !== ctx.from.id) ||
      (ctx?.update?.inline_query && config.dev !== ctx.from.id)
    ) {
      if (!readDb("settings", true).active) {
        if (!ctx?.update?.inline_query) {
          ctx.reply(`*Botda profilaktika ishlari olib borilmoqda 🔐⚠️\n\n${generateRek()}*`, {
            parse_mode: "markdown",
            reply_markup: {
              remove_keyboard: true,
            },
          });
          return;
        }
        ErrorAnswerInlineQuery(
          ctx,
          "Botimizda profilaktika ishlari olib borilmoqda iltimos keyinroq harakat qilib ko'ring :)",
          `Assalomu alaykum ${ctx.from.first_name} \n\nBotimizni sizlar uchun yaxshi yangilik qo'shish uchun biroz muddatga o'chirib turamiz tez orada kotta yangiliklar bilan qaytamiz \n\n*${generateRek()}*`,
          "Bot ta'mirda ⚠️"
        );
        return;
      }
      const channel = readDb("channels");
      const filter = [];
      for (let item of channel) {
        const res = await ctx.tg.getChatMember(item.cid, ctx.from.id);
        if (res?.status === "left") {
          filter.push(item);
        }
      }

      if (filter.length > 0) {
          const txt = ctx?.message?.text;
          if (txt && txt.split(" ")[0] == "/start") {
            const refid = txt.split(" ").filter((item) => item)[1];
            if (
              refid &&
              refid.length > 5 &&
              !isNaN(refid) &&
              refid != ctx.from.id
            ) {
              const findUser = await User.findOne({ cid: refid });
              if (findUser) {
                const checkUser = await User.findOne({ cid: ctx.from.id });
                if (!checkUser) {
                  const value = {
                    cid: ctx.from.id,
                    lang: ctx.from.language_code,
                    refid: refid,
                    ball: config.ball,
                    status: 1,
                  };
                  const newUser = new User(value);
                  await newUser.save();
                }
              }
            }
          }
          if (!ctx?.update?.inline_query) {
          const button = generateButton(filter, true);
          await ctx.reply(
            `*Assalomu alaykum ${ctx.from.first_name.substring(0,30)} \n\nBotdan foydalanishdan avval kanallarimizga obuna bo'ling! \n\n${generateRek()}*`,
            { reply_markup: { inline_keyboard: button },parse_mode:"markdown",disable_web_page_preview:true }
          );
          return;
        }
        const button = generateButton(filter, true,true);
        ErrorAnswerInlineQuery(
          ctx,
          "Bizni qo'llab-quvvatlash uchun kanallarimizga obuna bo'ling :)",
          `Assalomu alaykum ${ctx.from.first_name} \n\nBotdan foydalanishdan avval kanallarimizga obuna bo'ling!`,
          "Kanallarimizga a'zo bo'ling!",
          button
        );
        return;
      }
    }
    next();
  } catch (e) {
    if (!ctx?.update?.inline_query) {
      sendError(e, ctx);
      return;
    }
    ErrorAnswerInlineQuery(
      ctx,
      "Kanallar bilan bog'liq xatolik",
      `Xatolik mazmuni: ${String(e)}`,
      "Xatolik ro'y berdi :("
    );
  }
};

module.exports = isSubscribe;
