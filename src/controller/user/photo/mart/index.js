const { sendError } = require("../../../../utils");

const GenerateButton = (order, arg) => {
  const arr = [];

  if (!order) {
    for (let i = 0; i < 4; i += 2) {
      arr.push([
        {
          text: `${i + 1})-still ${arg === "mart" ? "💐" : arg === "nav" ? "🌺" :  "🕋"}`,
          callback_data: `mart_${arg}_${i + 1}`,
        },
        {
          text: `${i + 2})-still ${arg === "mart" ? "💐" : arg === "nav" ? "🌺" :  "🕋"}`,
          callback_data: `mart_${arg}_${i + 2}`,
        },
      ]);
    }
    arr.push([{ text: "Orqaga 🫡", callback_data: "mart" }]);
    return arr;
  }

  arr.push([
    {
      text: "💐 8-mart 🫶",
      callback_data: `mart_mart`,
    },
    {
      text: "🪹 Navro'z 🌺",
      callback_data: `mart_nav`,
    },
  ]);
  arr.push([{text:"🌼 Ramazon🕋", callback_data: `mart_ram`}])
  return arr;
};

const MartPhotoFn = async (ctx) => {
  try {
    ctx.scene.leave("photomartscene");
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
            data === "mart",
            data.split("_")[1]
          ),
        },
      }
    );
  } catch (e) {
    sendError(e, ctx);
  }
};

module.exports = MartPhotoFn;