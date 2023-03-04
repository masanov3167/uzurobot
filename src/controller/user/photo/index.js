const MyFn = require("../../TryCatch");

const Fn = async ctx => {
    await ctx.reply("Sizga qanday turda *rasmlar* kerak tanlang: ",{
        parse_mode:"markdown",
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

const SelectCategory = ctx => MyFn(ctx, Fn(ctx),true);

module.exports = SelectCategory;