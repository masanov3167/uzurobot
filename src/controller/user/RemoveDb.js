const config = require("../../../config");
const { User } = require("../../models");
const { removeDb, readDb, updateDb, writeDb } = require("../../utils");

const RemoveDb = async (ctx,bot) => {
  try {
    const chatId = ctx.update.my_chat_member.chat.id;
    const botId = ctx.botInfo.id;
    const member = ctx.update.my_chat_member.new_chat_member;
    const oldMember = ctx.update.my_chat_member.old_chat_member;

    if(oldMember.user.id === botId && oldMember.status === "kicked"){
      ctx.reply("Siz avval botimizni bloklagansiz shuning uchun sizga va kimningdur taklif havolasi orqali kirgan bo'lsangiz unga ham ball berilmaydi 🫡 \n\nBotimizdan unumli foydalanasiz degna umiddaman!");
      const user = new User({cid: ctx.from.id});
      await user.save();
      return
    }

    if (member.user.id === botId && member.status === "kicked") {
      const deleteUser = await User.findOneAndDelete({ cid: chatId });
      if (deleteUser) {
        if(deleteUser?.refid && deleteUser.status ==1){
          const oldUser = await User.findOne({cid: deleteUser.refid})
          if(oldUser){
            await User.findOneAndUpdate({cid:oldUser.cid},{ball: oldUser.ball - config.ball},{new:true});
            bot.telegram.sendMessage(oldUser.cid,`Sizning havolangiz orqali kirgan ${ctx.update.my_chat_member.chat.first_name} ismli foydalanuvchi botimizni blokladi shu sababli sizdan ${config.ball} ball kesiladi\n\nHozirgi ballaringiz: ${oldUser.ball - config.ball}`)
          }
        }
      }
    }
  } catch (e) {
    console.log(e);
    console.log("Userni bazadan o'chirolmadim, Sababi: " + String(e));
  }
};

module.exports = RemoveDb;
