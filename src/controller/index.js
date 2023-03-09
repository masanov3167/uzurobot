const StartFn = require("./Start");
const BallFn = require("./user/Ball");
const SelectCategory = require("./user/photo");
const ShareReferal = require("./user/ShareReferal");
const Subcription = require("./user/Subscription");
const MuslimFn = require("./user/photo/muslim/index");
const SingleMuslim = require("./user/photo/muslim/Single");
const InfoChannelFn = require("./admin/InfoChannel");
const DeleteChannelFn = require("./admin/DeleteChannel");
const AdminFn = require("./admin/Admin");
const AddFn = require("./admin/Add");
const Profilaktika = require("./admin/Profilaktika");
const Settings = require("./admin/Settings");
const Psixologic = require("./user/psixologic");
const { SinglePsixologic } = require("./user/psixologic/SinglePsixologic");
const MeaningName = require("./user/MeaningName");
const TelegramFon = require("./user/TelegramFon");
const PhotoProFn = require("./user/photo/pro");
const PhotoProHandler = require("./user/photo/pro/PhotoProHandler");
const KreativPhotoFn = require("./user/photo/kreativ");
const PhotoKreativHandler = require("./user/photo/kreativ/Single");
const PhotoStatusHandler = require("./user/photo/status");
const Subscribe = require("../middleware/Channel");
const MeaningPhotoFn = require("./user/photo/meaning");
const MeaningNameImgHandler = require("./user/photo/meaning/Single");
const MartPhotoFn = require("./user/photo/mart");
const MartImgHandler = require("./user/photo/mart/Single");
const DbCheck = require("../middleware/Db");
const GudokPaginationFn = require("./admin/GudokPagination");
const SearchGudokFn = require("./user/SearchGudokFn");
const StatFn = require("./admin/Stat");
const SendRekFn = require("./admin/SendRek");

const Controllers = async (bot) => {
  // start the bot
  bot.start(
    (ctx, next) => {
      Subscribe(ctx, next);
    },
    (ctx) => {
      StartFn(ctx);
    }
  );

  bot.on("left_chat_member", (ctx) => {
    console.log(ctx.fom);
  });
  // admin panelga
  bot.command("kanal", (ctx) => AdminFn(ctx));
  bot.command("gudok", (ctx) => AdminFn(ctx));
  bot.command("prof", async (ctx) => Profilaktika(ctx));
  bot.command("web", async (ctx) => Settings(ctx));
  bot.command("stat", async (ctx) => StatFn(ctx));
  bot.hears("/otkaz", async (ctx) => {console.log("toxta endi");});

  // callbacklarni handle qilish
  bot.on(
    "callback_query",
    (ctx, next) => {
      const data = ctx.update.callback_query.data;
      if (data === "addkanal") {
        AddFn(ctx);
        return;
      }
      if (data === "addgudok") {
        AddFn(ctx);
        return;
      }
      if (data === "sendrek") {
      SendRekFn(ctx)
        return;
      }
      if (data === "delmsg") {
        ctx.deleteMessage(ctx.update.callback_query.message.message_id);
        return;
      }
      if (data.split("_")[0] === "page") {
        GudokPaginationFn(ctx);
        return;
      }
      if (data.split("_").length === 2 && data.substring(0, 3) === "del") {
        DeleteChannelFn(ctx);
        return;
      }
      if (data.split("_").length === 2 && data.substring(0, 4) === "info") {
        InfoChannelFn(ctx);
        return;
      }
      if (data.split("_")[0] === "psix") {
        SinglePsixologic(ctx);
        return;
      }
      if (data.split("_").length === 3 && data.split("_")[0] === "muslim") {
        SingleMuslim(ctx);
        return;
      }
      if (data.split("_").length === 3 && data.split("_")[0] === "photopro") {
        PhotoProHandler(ctx);
        return;
      }
      if (data.split("_").length === 3 && data.split("_")[0] === "kreativ") {
        PhotoKreativHandler(ctx);
        return;
      }
      if (data.split("_").length === 3 && data.split("_")[0] === "meaning") {
        MeaningNameImgHandler(ctx);
        return;
      }
      if (data.split("_").length === 3 && data.split("_")[0] === "mart") {
        MartImgHandler(ctx);
        return;
      }

      Subscribe(ctx, next);
      // DbCheck(ctx,next)
    },
    (ctx, next) => {
      DbCheck(ctx, next);
    },
    (ctx) => {
      const data = ctx.update.callback_query.data;
      if (data.substring(0, 6) === "muslim") {
        MuslimFn(ctx);
        return;
      }
      if (data.substring(0, 8) === "photopro") {
        PhotoProFn(ctx);
        return;
      }
      if (data.substring(0, 7) === "kreativ") {
        KreativPhotoFn(ctx);
        return;
      }
      if (data.substring(0, 7) === "meaning") {
        MeaningPhotoFn(ctx);
        return;
      }
      if (data.substring(0, 4) === "mart") {
        MartPhotoFn(ctx);
        return;
      }
      if (data === "status") {
        PhotoStatusHandler(ctx);
        return;
      }
      if (data === "subscribe_result") {
        Subcription(ctx, bot);
        return;
      }
    }
  );

  // inline querylarni handle qilish
  bot.on("inline_query", (ctx) => {
    const query = ctx.inlineQuery.query;
    if (query === "havola") {
      ShareReferal(ctx);
      return;
    }
  });

  // boshqa messagelarga
  bot.on(
    "message",
    (ctx, next) => {
      Subscribe(ctx, next);
    },
    (ctx, next) => {
      DbCheck(ctx, next);
    },
    (ctx) => {
      if (ctx.message.text === "🦧 Ball to'plash") {
        BallFn(ctx);
        return;
      }
      if (ctx.message.text === "Ismingizga rasmlar 🦑") {
        SelectCategory(ctx);
        return;
      }
      if (ctx.message.text === "🎋Psixologik test🍀") {
        Psixologic(ctx);
        return;
      }
      if (ctx.message.text === "🌺Ismingiz ma'nosi🐾") {
        MeaningName(ctx);
        return;
      }
      if (ctx.message.text === "🦅Telegram fon🎇") {
        TelegramFon(ctx);
        return;
      }
      if (ctx.message.text === "🎻 Ismizga gudok 🥁") {
        SearchGudokFn(ctx);
        return;
      }
      if (!ctx?.message?.via_bot) {
        StartFn(ctx);
      }
    }
  );
};

module.exports = Controllers;
