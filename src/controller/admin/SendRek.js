const { removeDb } = require("../../utils");
const MyFn = require("../TryCatch");

const Fn = async (ctx) => {
    ctx.scene.enter("sendrek");
    removeDb("id",1,"rek");
    await ctx.reply("*Postni kanaldan forward qiling \n\nEslatma bot kanalda admin bo'lishi kerak*",{parse_mode:"markdown"});  
};

const SendRekFn = ( ctx) => {
  MyFn( ctx, Fn,true);
};

module.exports = SendRekFn;
