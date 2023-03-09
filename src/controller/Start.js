const StarTer = require("./StarTer");
const StarterBtn = require("./StarterBtn");
const MyFn = require("./TryCatch");

const Fn = async ctx => await ctx.reply(
    StarTer(), 
    {reply_markup:{
        keyboard: StarterBtn(),
        resize_keyboard: true,
        one_time_keyboard: true
    },
    parse_mode:"markdown"
});

const StartFn = ctx => MyFn(ctx,ctx => Fn(ctx),true);

module.exports = StartFn;