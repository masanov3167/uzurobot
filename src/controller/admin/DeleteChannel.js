const { Channel, Gudok } = require("../../models");
const MyFn = require("../TryCatch");
const config = require("../../../config");
const { removeDb } = require("../../utils");

const Fn = async (ctx) => {
  if (ctx.from.id === config.dev) {
    const cid = ctx.update.callback_query.data.split("_")[1];
    const data = ctx.update.callback_query.data.split("_")[0];
    if (data === "delch") {
      const deletedChannel = await Channel.findOneAndDelete({ _id: cid });
      if (deletedChannel) {
        removeDb("_id", cid, "channels");
        await ctx.answerCbQuery("Muvaffaqiyatli o'chirildi!");
        return;
      }
    }
    if (data === "delsome") {
      const deletedGudok = await Gudok.findOneAndDelete({ _id: cid });
      if (deletedGudok) {
        await ctx.answerCbQuery("Muvaffaqiyatli o'chirildi!");
        return;
      }
    }
    await ctx.reply("O'chirishda qandeydur xatolik yuz berdi :(");
    return;
  }
  ctx.answerCbQuery("Ha qo'ying endi tegmang turursin shu :(");
};

const DeleteChannelFn = (ctx) => {
  MyFn(ctx, Fn, ctx?.chat?.type !=="private");
};

module.exports = DeleteChannelFn;
