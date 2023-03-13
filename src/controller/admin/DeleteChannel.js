const { Channel, Gudok, Kino } = require("../../models");
const MyFn = require("../TryCatch");
const config = require("../../../config");
const {  readDb,  updateSettings } = require("../../utils");

const Fn = async (ctx) => {
  if (ctx.from.id === config.dev) {
    const cid = ctx.update.callback_query.data.split("_")[1];
    const data = ctx.update.callback_query.data.split("_")[0];
    if (data === "delch") {
      const deletedChannel = await Channel.findOneAndDelete({ _id: cid });
      if (deletedChannel) {
        await ctx.answerCbQuery("Muvaffaqiyatli o'chirildi!");
        return;
      }
    }
    if (data === "delk") {
      const deletedKino = await Kino.findOneAndDelete({ _id: cid });
      if (deletedKino) {
        await ctx.answerCbQuery("Muvaffaqiyatli o'chirildi!");
        return;
      }
    }
    if (data === "delr") {
      const reklama = readDb("settings",true);
      const deletedRek =  reklama?.rek?.find(i => i._id === Number(cid));
      if (deletedRek) {
        const filter = reklama?.rek?.filter(i => i._id !== Number(cid));
        reklama.rek = filter;
        updateSettings(reklama);
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
