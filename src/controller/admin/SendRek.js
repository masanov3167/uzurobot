const MyFn = require("../TryCatch");

const Fn = async (ctx) => {
    ctx.scene.enter("sendrek");
    await ctx.reply("*post idsini kiriting :)*",{parse_mode:"markdown"});  
};

const SendRekFn = ( ctx) => {
  MyFn( ctx, Fn,true);
};

module.exports = SendRekFn;
