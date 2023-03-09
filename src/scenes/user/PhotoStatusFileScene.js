const {
    Scenes: { BaseScene },
  } = require("telegraf");
  const MyFn = require("../../controller/TryCatch");
  const Fn = async (ctx) => {
   
    const photo = ctx?.message?.photo;
    if(!photo){
        ctx.reply("*Status yozish uchun rasm yuboring! \n\nEslatma ⚠️ statusga mos tushadigan obyektlari kamroq (5x5) rasm yuboring :)*",{parse_mode:"markdown"});
        return
    }

    ctx.scene.leave("statusfile");
    ctx.scene.enter("statusname");
    ctx.session.statusFile = photo[photo.length -1]
    ctx.reply("*Statusingizni matnini kiriting! \n\nEslatma ⚠️ faqat lotin-harflar bilan status yozing va 90tadan oshiq harf qatnashmasin*",{parse_mode: "markdown"});
  };
  
  class PhotoStatusFileScene extends BaseScene {
    constructor() {
      super("statusfile");
      this.on("message", (ctx) => {
        MyFn(ctx, Fn, true);
      });
    }
  }
  module.exports = new PhotoStatusFileScene();
  