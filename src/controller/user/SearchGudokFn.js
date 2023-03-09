const MyFn = require("../TryCatch");

const Fn = async (ctx) => {
    ctx.scene.enter("searchgudok");
    await ctx.reply("*Ismingizni kiriting :)*",{parse_mode:"markdown",reply_markup:{
      inline_keyboard:[[{text:"Bekor qilish", callback_data:"cancelscene"}]]
    }});  
};

const SearchGudokFn = ( ctx) => {
  MyFn( ctx, Fn,true);
};

module.exports = SearchGudokFn;
