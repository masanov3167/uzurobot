const { sendError } = require("../../../../utils");

const GenerateButton = (order, arg) => {
  const arr = [];

  if (!order) {
    for (let i = 0; i < 4; i += 2) {
      arr.push([
        {
          text: `${i + 1})-still ${arg === "boy" ? "🫀" : "🫶"}`,
          callback_data: `muslim_${arg}_${i + 1}`,
        },
        {
          text: `${i + 2})-still ${arg === "boy" ? "🫀" : "🫶"}`,
          callback_data: `muslim_${arg}_${i + 2}`,
        },
      ]);
    }
    arr.push([{ text: "Orqaga 🫡", callback_data: "muslim" }]);
    return arr;
  }

  arr.push([
    {
      text: "1) Bolalar uchun 🔥",
      callback_data: `muslim_boy`,
    },
    {
      text: "2) Qizlar uchun 🎭",
      callback_data: `muslim_qiz`,
    },
  ]);
  return arr;
};

const MuslimFn = async (ctx) => {
  try {
    ctx.scene.leave("photomuslimscene");
    const data = ctx.update.callback_query.data;
    ctx.telegram.editMessageText(
      ctx.chat.id,
      ctx.update.callback_query.message.message_id,
      null,
      "Quyidagilar ichidan tanlang: 👇 \n\n*Botni do'stlaringizga ulashishni unutmang!*",
      {
        parse_mode: "markdown",
        reply_markup: {
          inline_keyboard: GenerateButton(
            data === "muslim",
            data.split("_")[1]
          ),
        },
      }
    );
  } catch (e) {
    sendError(e, ctx);
  }
};

module.exports = MuslimFn;