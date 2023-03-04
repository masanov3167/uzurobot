const MyFn = require("../TryCatch");

const Fn = async (ctx) => {
    ctx.scene.enter("searchgudok");
    await ctx.reply("*Ismingizni kiriting :)*",{parse_mode:"markdown"});  
};

const SearchGudokFn = ( ctx) => {
  MyFn( ctx, Fn(ctx),true);
};

module.exports = SearchGudokFn;
