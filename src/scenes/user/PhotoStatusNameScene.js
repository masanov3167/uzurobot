const {
    Scenes: { BaseScene },
  } = require("telegraf");
  const MyFn = require("../../controller/TryCatch");
const { GenerateStatus, generateRek } = require("../../utils");
  const Fn = async (ctx) => {
    const txt = ctx?.message?.text?.trim();
    if (!txt) {
      ctx.reply(`<b>Faqat matn kiriting!</b> \n\n<b>${generateRek()}</b>`, {
        parse_mode: "html",
      });
      return;
    }
   
    const myFile = ctx.session.statusFile
    const photo = await ctx.telegram.getFileLink(myFile.file_id);
  
    const result = await GenerateStatus(photo.href,txt);

    if(!result){
      ctx.reply("*Qandeydur muammo chiqdi! Iltimos boshidan urinib ko'ring :(*",{parse_mode: "markdown"});
      return
    }
    ctx.scene.leave("statusname")
    ctx.replyWithPhoto({ source: result }, {
      caption:`*${generateRek()}*`,
      parse_mode:"markdown"
    });
  };
  
  class PhotoStatusNameScene extends BaseScene {
    constructor() {
      super("statusname");
      this.on("message", (ctx) => {
        MyFn(ctx, Fn, true);
      });
    }
  }
  module.exports = new PhotoStatusNameScene();
  