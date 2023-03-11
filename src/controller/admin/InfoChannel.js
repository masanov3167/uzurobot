const MyFn = require("../TryCatch");
const config = require("../../../config");
const { readDb } = require("../../utils");
const { Gudok } = require("../../models");

const Fn = async (ctx) => {
  const msgId = ctx.update.callback_query.message.message_id;
  data = ctx.update.callback_query.data;

  if (ctx.from.id === config.dev) {
    const cid = ctx.update.callback_query.data.split("_")[1];
    if (data.substring(0, 6) === "infoch") {
      const channel = readDb("channels").find((item) => item._id === cid);
      if (channel) {
        ctx.reply(
          `Kanal nomi: *${channel.text}* \nKanal idsi: *${channel.cid}*\nKanal linki: *${channel.link}*`,
          {
            disable_web_page_preview: true,
            parse_mode: "markdown",
            reply_to_message_id: msgId,
          }
        );
      } else {
        ctx.answerCbQuery(
          "Afsuski hozir ushbu kanal haqida ma'lumotlarni ko'ra olmaysiz :("
        );
      }
    }
    if (data.substring(0, 5) === "infor") {
      const rek = readDb("settings",true)
      const find = rek?.rek?.find((item) => item._id === Number(cid));
      if (find) {
        ctx.reply(
          `Text: *${find.text}* \nID: *${find._id}*`,
          {
            disable_web_page_preview: true,
            parse_mode: "markdown",
            reply_to_message_id: msgId,
          }
        );
      } else {
        ctx.answerCbQuery(
          "Afsuski hozir ushbu reklama haqida ma'lumotlarni ko'ra olmaysiz :("
        );
      }
    }
    if (data.substring(0, 8) === "infosome") {
      const music = await Gudok.findOne({_id: cid});
      if (music) {
        ctx.replyWithAudio(music.file_id,{
          caption:`*${music.text} - ${config.rek}*`,
          reply_markup:{
            inline_keyboard:[
              [{text:"Bazadan o'chirish",callback_data:`delsome_${music._id}`},{text:"Habarni o'chirish",callback_data:"delmsg"}]
            ]
          },
          parse_mode:"markdown",
          reply_to_message_id: msgId
        });
        
      } else {
        ctx.answerCbQuery(
          "Afsuski hozir ushbu  haqida ma'lumotlarni ko'ra olmaysiz :("
        );
      }
    }
    return;
  }
  ctx.answerCbQuery("Ha qo'ying endi tegmang turursin shu :(");
};

const InfoChannelFn = (ctx) => {
  MyFn(ctx, Fn, true);
};

module.exports = InfoChannelFn;
