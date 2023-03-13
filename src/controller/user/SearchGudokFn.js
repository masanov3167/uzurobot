const MyFn = require("../TryCatch");

const Fn = async (ctx) => {
  const txt = ctx?.message?.text;
  const option = {parse_mode:"markdown",reply_markup:{
    inline_keyboard:[[{text:"Bekor qilish", callback_data:"cancelscene"}]]
  }}
  ctx.scene.enter("searchgudok");
  if(txt === "🔍 Kino izlash 🍿"){
    ctx.session.kino = true;
    ctx.reply("Kinoni nomini kiriting :)",option);
    return
  }
  ctx.session.kino = false
    await ctx.reply("*Ismingizni kiriting :)*",option);  
};

const SearchGudokFn = ( ctx) => {
  MyFn( ctx, Fn,true);
};

module.exports = SearchGudokFn;
