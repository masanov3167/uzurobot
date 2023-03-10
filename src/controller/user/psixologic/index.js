const { generateRek } = require("../../../utils");
const MyFn = require("../../TryCatch");
const { buttons } = require("./SinglePsixologic");

const Fn = async ctx => {
    await ctx.reply(`*O'zingiz haqingizda batafsilroq ma'lumot kerakmi unda Qaysi faslda tug'ilgansiz tanlang!👇\n\n${generateRek()}*`,{
        parse_mode:"markdown",
        disable_web_page_preview:true,
        reply_markup:{
            inline_keyboard: buttons()
        }
    });
}

const Psixologic = ctx => MyFn(ctx, Fn,true);

module.exports = Psixologic;