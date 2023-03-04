const ErrorAnswerInlineQuery = require("../controller/user/ErrorAnswerInlineQuery");
const { User } = require("../models");
const { sendError } = require("../utils");
const config = require("../../config");

const DbCheck = async (ctx, next) => {
  try {
    if (ctx?.chat?.type === "private" || ctx?.update?.inline_query) {
      const user = await User.findOne({ cid: ctx.from.id });
      if (!user) {
        const value = {
          cid: ctx.from.id,
          ball: 5,
          lang: ctx.from.language_code,
        };
        const Saved = new User(value);
        await Saved.save();
      } else {
        if (ctx.from.id !== config.dev) {
          const ball = user.ball;
          const now = new Date();
          const lastLogin = new Date(user.last_upd);
          const diffTime = Math.abs(now - lastLogin);
          const result = diffTime > 86400000;
          if (result) {
            if (ball < 2) {
              ctx.reply(
                "*Sizning balingiz yetarli emas botni ishlatish uchun kuniga 2ball sarflashinigiz kerak sizda esa 2ball yo'q shuning uchun pastdagi tugmani bosib do'stlaringizni taklif qiling! Ular ushbu havola orqali kirib kanallarimizga obuna bo'lsa va oldin botni ishlatmagan bo'lsa biz sizga ball beramiz*",
                {
                  parse_mode: "markdown",
                  reply_markup: {
                    inline_keyboard: [
                      [
                        {
                          text: "Do'stlarga yuborish",
                          switch_inline_query: "havola",
                        },
                      ],
                    ],
                  },
                }
              );
              return;
            }
            await User.findOneAndUpdate(
              { cid: ctx.from.id },
              { ball: ball - 2, last_upd: new Date() }
            );
          }
        }
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
      "Baza bilan bog'liq xatolik",
      `Xatolik mazmuni: ${String(e)}`,
      "Xatolik ro'y berdi :("
    );
  }
};

module.exports = DbCheck;
