const { generateRek } = require("../../../utils");
const MyFn = require("../../TryCatch");

const Fn = async ctx => {
    await ctx.reply(`Sizga qanday turda *rasmlar* kerak tanlang: \n\n*${generateRek()}*`,{
        parse_mode:"markdown",
        disable_web_page_preview:true,
        reply_markup:{
            inline_keyboard: [
                [{text:"Muslim ðģ / Muslima ð§",callback_data:"muslim"}],
                [{text:"ðĨ° Be'takror âĪïļ",callback_data:"photopro"}],
                [{text:"Kreativ ðŦðŦķ",callback_data:"kreativ"}],
                [{text:"ðŠķ Status yozish ð",callback_data:"status"}],
                [{text:"ð­ Ismingiz ma'nosi ðģ",callback_data:"meaning"}],
                [{text:"ð Bahoriy ð",callback_data:"mart"}],
            ]
        }
    });
}

const SelectCategory = ctx => MyFn(ctx, Fn,true);

module.exports = SelectCategory;