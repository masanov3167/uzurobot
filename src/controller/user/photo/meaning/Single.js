const { sendError } = require("../../../../utils");

const MeaningNameImgHandler = async (ctx) => {
  const type = ctx.update.callback_query.data.split("_");
  try {
    ctx.session.MeaningNameImg = { type: type[1], key: type[2] };
    ctx.scene.enter("photomeaningscene");
    ctx.reply("*Ismingizni kiriting!*",
      {
        parse_mode: "markdown",
        reply_markup: {
          inline_keyboard: [[{ text: "Ortga <=", callback_data: "meaning" }]],
        },
      }
    );
  } catch (e) {
    sendError(e, ctx);
  }
};

module.exports = MeaningNameImgHandler;
