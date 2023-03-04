const {
  Scenes: { BaseScene },
} = require("telegraf");
const MyFn = require("../../controller/TryCatch");
const { Channel } = require("../../models");
const { writeDb } = require("../../utils");
const Fn = async ctx =>{
  const txt = ctx?.message?.text;
  if (txt) {
    const { id, title } = ctx.session.chan;
    if (
      /^https?:\/\/t(?:elegram)?\.me\/(?!joinchat\/)\S+$/.test(txt) ||
      /^https?:\/\/(?:t(elegram)?\.me|telegram\.org)\/joinchat\/([a-zA-Z0-9_-]{22,})$/.test(
        txt
      )
    ) {
      const value = { text: title, cid: id, link: txt };
      const channel = new Channel(value);
      await channel.save();
      writeDb(channel,"channels")
      ctx.scene.leave("addchannel");
      ctx.reply(
        `Yaxshi saqlandi! 🐳\n\nKanlaningiz idsi ${id}\nKanalingiz nomi ${title}\nKanalingiz havolasi ${txt}\n\Ko'rish /kanal`,
        {disable_web_page_preview: true});
      ctx.scene.leave("addchannellink");
      return;
    }
    ctx.reply(
      "Telegram kanal havolasini https://t.me/telegram ko'rinishida yuboring",
      {disable_web_page_preview: true});
  } else {
    ctx.deleteMessage(ctx.message.message_id);
  }
}

class AddChannelLink extends BaseScene {
  constructor() {
    super("addchannellink");

    this.on("message", (ctx) => {
      MyFn(ctx, Fn(ctx),ctx?.chat?.type !=="private");
    });
  }
}

module.exports = new AddChannelLink();