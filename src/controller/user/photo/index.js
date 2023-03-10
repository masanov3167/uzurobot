const { generateRek } = require("../../../utils");
const MyFn = require("../../TryCatch");

const Fn = async ctx => {
    await ctx.reply(`Sizga qanday turda *rasmlar* kerak tanlang: \n\n*${generateRek()}*`,{
        parse_mode:"markdown",
        disable_web_page_preview:true,
        reply_markup:{
            inline_keyboard: [
                [{text:"Muslim 👳 / Muslima 🧕",callback_data:"muslim"}],
                [{text:"🥰 Be'takror ❤️",callback_data:"photopro"}],
                [{text:"Kreativ 🫀🫶",callback_data:"kreativ"}],
                [{text:"🪶 Status yozish 🌚",callback_data:"status"}],
                [{text:"🎭 Ismingiz ma'nosi 🐳",callback_data:"meaning"}],
                [{text:"🍓 Bahoriy 🍃",callback_data:"mart"}],
            ]
        }
    });
}

const SelectCategory = ctx => MyFn(ctx, Fn,true);

module.exports = SelectCategory;