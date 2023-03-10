const { User } = require("../../models");
const config = require("../../../config");
const { sendError, generateRek } = require("../../utils");
const StartFn = require("../Start");

const Subcription = async (ctx, bot) => {
  try {
    const cid = ctx.update.callback_query.from.id;
    const findUser = await User.findOne({cid});
    if (findUser && findUser.refid && findUser.status === 1) {
      await User.findOneAndUpdate({ cid }, { status: 2 }, {new:true});
      const oldUser = await User.findOne({ cid: findUser.refid})
      if (oldUser) {
      await User.findOneAndUpdate({ cid: findUser.refid },{ ball: oldUser.ball + config.ball },{new:true});
       await bot.telegram.sendMessage(
          findUser.refid,
          `<b> Sizning taklif havolangiz orqali <a href="tg://user?id=${cid}">foydalanuvchi</a> botga kirdi va kanallarga a'zo bo'ldi.Sizga ${
            config.ball
          } ball berildi. \nHozir sizda ${
            oldUser.ball + config.ball
          } ta ball bor! \n\n${generateRek()}</b>`,
          { parse_mode: "HTML", disable_web_page_preview:true }
        );
      }
    }
    await ctx.deleteMessage(ctx.update.callback_query.message.message_id)
    await StartFn(ctx);
  } catch(e) {
    sendError(e,ctx)
  }
};

module.exports = Subcription;
