const MyFn = require("../TryCatch");

const Fn = async (ctx) => {
    ctx.scene.enter("meaningname");
    await ctx.reply("*Ismingiz ma'nosini bilish uchun menga ismingizni yozib yuboring*",{parse_mode:"markdown"});
};

const MeaningName = ( ctx) => {
  MyFn( ctx, Fn(ctx),ctx?.chat?.type !=="private");
};

module.exports = MeaningName;
