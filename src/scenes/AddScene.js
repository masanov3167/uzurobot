const {
  Scenes: { BaseScene },
} = require("telegraf");
const MyFn = require("../controller/TryCatch");
const { Gudok, Kino, Channel } = require("../models");
const { readDb, updateSettings } = require("../utils");
const config = require("../../config");

const Fn = async (ctx) => {
  const type = ctx.session.addType;
  if (type === "addkanal") {
    const chid = ctx?.message?.forward_from_chat;
    if (chid && chid.type === "channel") {
      const oldchannel = await Channel.findOne({cid: chid.id})
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
  if (type === "addgudok") {
    const audio = ctx?.message?.audio;
    if (!audio) {
      ctx.reply(
        "*Gudok uchun musiqa fayl yuboring!\n\nEslatma:  gudokning nomini captionga yozib yuboring*",
        {
          parse_mode: "markdown",
        }
      );
      return;
    }
    const caption = ctx?.message?.caption?.trim();

    if (
      !caption ||
      (caption &&
        !/^[A-Za-zА-Яа-яҒғҲҳҚқҚ’қ’ҲҳЎўЎўЧчҒғШшҚқҲҳЪъЁёӨөҚқҲҳҒғҲҳҚқҲҳЎўЎўЧчШшЩщЪъЁёҲҳ0-9!"'`#-=_~&(){?}^<:>*\s]+$/g.test(
          caption
        ))
    ) {
      ctx.reply(
        "*Gudokni nomi bilan saqlab qolish uchun nomini captionga yozib yuboring!\n\nEslatma:  gudokning nomini o'zbek yoki rus alifbolarida ba'zi bir belgilarni qo'shgan holdagina jo'nata olasiz. Gudokning nomini biz qidiruv jarayonida ishlatamiz*",
        {
          parse_mode: "markdown",
        }
      );
      return;
    }

    const fileId = ctx.message.audio.file_id;
    const newGudok = new Gudok({ file_id: fileId, text: caption });
    await newGudok.save();
    ctx.scene.leave("add");
    ctx.reply("*Yaxshi gudok muvaffaqiyatli saqlandi! Ko'rish uchun /gudok*", {
      parse_mode: "markdown",
    });
  }
  if (type === "addrek") {
    const text = ctx?.message?.text;
    if (text) {
      const reklama = readDb("settings", true);
      const oldRek = reklama?.rek?.find((item) => item.text === text);
      if (oldRek) {
        ctx.reply(
          "ushbu mini reklama bazada avvaldan bor boshqa reklamani ulashga harakat qiling!"
        );
        return;
      }
      ctx.scene.leave("add");
      reklama?.rek?.push({
        text,
        _id: reklama?.rek[reklama?.rek?.length - 1]?._id + 1 || 1,
      });
      updateSettings(reklama);
      ctx.reply("*Yaxshi mini reklama joylandi!*", { parse_mode: "markdown" });
    } else {
      ctx.deleteMessage(ctx.message.message_id);
    }
  }
  if (type === "addkino") {
    const video = ctx?.message?.video;
    if (!video) {
      ctx.reply(
        "*Kino uchun video fayl yuboring!\n\nEslatma:  kinoning nomini captionga yozib yuboring*",
        {
          parse_mode: "markdown",
        }
      );
      return;
    }
    const caption = ctx?.message?.caption?.trim();

    if (!caption) {
      ctx.reply(
        "*Kinoni nomi bilan saqlab qolish uchun nomini captionga yozib yuboring!\n\nEslatma: Kinoning nomini biz qidiruv jarayonida ishlatamiz*",
        {
          parse_mode: "markdown",
        }
      );
      return;
    }

    const fileId = ctx.message.video.file_id;
    const result = await ctx.telegram.sendVideo(config.db_channel, fileId, {
      caption,
    });
    if (result) {
      const newKino = new Kino({
        text: caption,
        link: `t.me/${result.sender_chat?.username}/${result.message_id}`,
      });
      await newKino.save();
      ctx.reply("*Yaxshi kino muvaffaqiyatli saqlandi! Ko'rish uchun /kino*", {
        parse_mode: "markdown",
      });
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
