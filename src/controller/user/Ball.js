const config = require("../../../config");
const { User } = require("../../models");
const MyFn = require("../TryCatch");

const Fn = async ctx => {
    const user = await User.findOne({cid:ctx.from.id});
    await ctx.reply(`*Ball - o'zi nima?*\nBall - sizning botimizdan foydalanishingiz uchun imkoniyat, balingiz yetarli bo'lmasa botimizni ishlata olmaysiz :(\n\n*Botni ishlatishga qancha ball kerak?*\nBotni ishlatish uchun bir ishlatgan kuningizga ${config.mball}ball yetarli.Ishlatmagan kuningizga ball yechib olmaymiz\n\n*Qanday ball ishlayman?*\nBallni faqatgina quyidagi taklif havolangiz orqali do'stlaringizni botga taklif qilib ishlasangiz bo'ladi\n\n*1ta taklif uchun qancha ball beriladi?*\nBitta taklif uchun ${config.ball}ball beriladi\n\n*Men do'stlarimni taklif qildim lekin ball bermadi?*\nQachonki siz referal havolangizni to'gri yuborsangiz va sizning do'stingiz avval botni ishlatmagan bo'lsa va botdagi homiy kanallarga a'zo bo'lsa sizga ball beramiz.Agarda sizda shu holatlarning qaysidur biri inkor etilsa sizga ball berilmaydi\n\n*Ballarim kuyib ketishi mumkinmi?*\nAgar siz botni bloklasangiz to'plagan barcha ballingiz kuyib ketadi yoki sizning taklif qilgan do'stingiz botni bloklasa sizning qisman ballingiz kesiladi\n\n*Ballarimni pulga almashtirsam bo'ladimi?*\nAfsuski yo'q :(`,
    {parse_mode:"markdown"}
    );
    await ctx.reply(`*Sizning taklif havolangiz 👇*\n\nHozir sizda *${user.ball}* ball bor`,{
        parse_mode:"markdown",
        reply_markup:{
            inline_keyboard: [
                [{text:"Do'stlarga yuborish", switch_inline_query:"havola"}]
            ]
        }
    });
}

const BallFn = ctx => MyFn(ctx, Fn,true);

module.exports = BallFn;