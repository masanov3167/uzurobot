const {
    Scenes: { BaseScene },
  } = require("telegraf");
  const MyFn = require("../../controller/TryCatch");
const { GenerateStatus, generateRek } = require("../../utils");
  const Fn = async (ctx) => {
    const txt = ctx?.message?.text?.trim();
    if (!txt) {
      ctx.reply(`<b>Faqat matn kiriting!</b> \n\n${generateRek()}`, {
        parse_mode: "html",
      });
      return;
    }
   
    if (
      txt && !/^[A-Za-zА-Яа-яҒғҲҳҚқҚ’қ’ҲҳЎўЎўЧчҒғШшҚқҲҳЪъЁёӨөҚқҲҳҒғҲҳҚқҲҳЎўЎўЧчШшЩщЪъЁёҲҳ0-9!"'`#-=_~&(){?}ʻ^<:>*\s]+$/g.test(txt)
    ) {
      ctx.reply(
        "<b>Status yozayotganda o'zbek yoki kirillcha yozishingiz va ba'zi bir belgi(character)larni ishlatishingiz mumkin holos! \n\nNamuna: <code>Hammasi yahshi - Ҳаммаси яҳщи :)</code> \n\nAgar sizga yetishmayotgan belgilar mavjud bo'lsa adminlar bilan bog'lanib ko'ring</b>",
        { parse_mode: "html",
      reply_markup:{
        inline_keyboard:[
          [{text:"Bekor qilish",callback_data:"cancelscene"}]
        ]
      }
      }
      );
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
      caption:`${generateRek()}`,
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
  