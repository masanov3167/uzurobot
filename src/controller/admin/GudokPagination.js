const MyFn = require("../TryCatch");
const config = require("../../../config");
const { Gudok, Kino } = require("../../models");
const { generateButton, readDb } = require("../../utils");

const Fn = async (ctx) => {
  const msgId = ctx.update.callback_query.message.message_id;
 const num = ctx.update.callback_query.data.split("_")[2];
 const type = ctx.update.callback_query.data.split("_")[1];
 let arr = []
  if(type ==="/gudok"){
    const gudok = await Gudok.find();
    arr = gudok
  }
  if(type === "/kanal"){
    const channel = readDb("channels");
    arr= channel
  }
  if(type === "/rek"){
    const rek = readDb("settings",true);
    arr= rek.rek
  }
  if(txt === "/kino"){
    const cinemas = await Kino.find();
    arr = cinemas;
  }
  if (ctx.from.id === config.dev) {
    ctx.telegram.editMessageText(
      ctx.chat.id,
      msgId,
      null,
      `Quyidagilar ichidan tanlang: 👇\n\n*${num}-sahifa* \n\n*Bazadan butunlay o'chirib yuborish uchun o'chirish tugmasini bosin aks holda bu habarni e'tiborsiz qoldiring*`,
      {
        parse_mode: "markdown",
        reply_markup: {
          inline_keyboard: generateButton(arr, false, false, type, num),
        },
      }
    );
  }
};

const GudokPaginationFn = (ctx) => {
  MyFn(ctx, Fn, true);
};

module.exports = GudokPaginationFn;
