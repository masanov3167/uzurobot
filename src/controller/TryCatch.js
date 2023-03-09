const { sendError } = require("../utils");
const StarTer = require("./StarTer");
const StarterBtn = require("./StarterBtn");

const MyFn = async (ctx, Handler, del) => {
  try {
    const activeScene = ctx?.session?.__scenes?.current;
    const txt = ctx?.message?.text?.trim();
    const data = ctx?.update?.callback_query?.data?.trim();
    if ((activeScene && txt && txt === "/cancel") || (activeScene && data && data === "cancelscene")) {
      await ctx.scene.leave(activeScene);
      await ctx.reply("*Yaxshi holat bekor qilindi*", {
        parse_mode: "markdown",
      });
      await ctx.reply(StarTer(), {
        parse_mode: "markdown",
        reply_markup: { keyboard: StarterBtn() },
      });
      return
    } 
   await Handler(ctx)
      
    if (!del) {
      await ctx.deleteMessage(
        ctx?.message?.message_id || ctx.update.callback_query.message.message_id
      );
    }
  } catch (e) {
    console.log(e);
    sendError(String(e), ctx);
  }
};

module.exports = MyFn;
