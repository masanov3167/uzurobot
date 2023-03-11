const {
  Scenes: { BaseScene },
} = require("telegraf");
const MyFn = require("../controller/TryCatch");
const { Gudok } = require("../models");
const { readDb, updateSettings } = require("../utils");

const Fn = async (ctx) => {
  const type = ctx.session.addType;
  if (type === "addkanal") {
    const chid = ctx?.message?.forward_from_chat;
    if (chid && chid.type === "channel") {
      const oldchannel = readDb("channels").find(
        (item) => item.cid === chid.id
      );
      if (oldchannel) {
        ctx.reply(
          "ushbu kanal bazada avvaldan bor boshqa kanalni ulashga harakat qiling!"
        );
        return;
      }
      ctx.session.chan = chid;
      ctx.scene.leave("add");
      ctx.scene.enter("addchannellink");
      ctx.reply("yaxshi kanal linkini yuboring");
    } else {
      ctx.deleteMessage(ctx.message.message_id);
    }
  }
  if(type === "addgudok"){
    const audio = ctx?.message?.audio;
    if(!audio){
      ctx.reply("*Gudok uchun musiqa fayl yuboring!\n\nEslatma:  gudokning nomini captionga yozib yuboring*",{
        parse_mode:"markdown"
      })
      return
    }
    const caption = ctx?.message?.caption?.trim();

    if(!caption || caption && !/^[A-Za-zА-Яа-яҒғҲҳҚқҚ’қ’ҲҳЎўЎўЧчҒғШшҚқҲҳЪъЁёӨөҚқҲҳҒғҲҳҚқҲҳЎўЎўЧчШшЩщЪъЁёҲҳ0-9!"'`#-=_~&(){?}^<:>*\s]+$/g.test(caption)){
      ctx.reply("*Gudokni nomi bilan saqlab qolish uchun nomini captionga yozib yuboring!\n\nEslatma:  gudokning nomini o'zbek yoki rus alifbolarida ba'zi bir belgilarni qo'shgan holdagina jo'nata olasiz. Gudokning nomini biz qidiruv jarayonida ishlatamiz*",{
        parse_mode:"markdown"
      })
      return
    }

    const fileId = ctx.message.audio.file_id;
    const newGudok = new Gudok({file_id: fileId, text: caption});
    await newGudok.save();
    ctx.scene.leave("add");
    ctx.reply("*Yaxshi gudok muvaffaqiyatli saqlandi! Ko'rish uchun /gudok*",{
      parse_mode:"markdown"
    })
  }
  if (type === "addrek") {
    const text = ctx?.message?.text;
    if (text) {
      const reklama = readDb("settings",true);
      const oldRek = reklama?.rek?.find(
        (item) => item.text === text
      );
      if (oldRek) {
        ctx.reply(
          "ushbu mini reklama bazada avvaldan bor boshqa reklamani ulashga harakat qiling!"
        );
        return;
      }
      ctx.scene.leave("add");
      reklama?.rek?.push({text,_id: reklama?.rek[reklama?.rek?.length -1]?._id +1 || 1});
      updateSettings(reklama);
      ctx.reply("*Yaxshi mini reklama joylandi!*",{parse_mode:"markdown"});
    } else {
      ctx.deleteMessage(ctx.message.message_id);
    }
  }
};


class MyScene extends BaseScene {
  constructor() {
    super("add");
    this.on("message", (ctx) => {
      MyFn(ctx, Fn, true);
    });
  }
}
module.exports = new MyScene();
