const config = require("../../../config");
const MyFn = require("../TryCatch");

const Fn = async ctx => {
    await ctx.reply(`Ball ishlash uchun botimizga do'stlaringizni taklif qiling.\nHar bir taklif qilgan do'stingiz uchun ${config.ball}balldan olasiz\n\nSizning taklif havolangiz 👇`,{
        reply_markup:{
            inline_keyboard: [
                [{text:"Do'stlarga yuborish", switch_inline_query:"havola"}]
            ]
        }
    });
}

const BallFn = ctx => MyFn(ctx, Fn(ctx),true);

module.exports = BallFn;