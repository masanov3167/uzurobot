const { sendError } = require("../../../../utils");

const MartImgHandler = async (ctx) => {
  const type = ctx.update.callback_query.data.split("_");
  try {
    ctx.session.MartImgScene = { type: type[1], key: type[2] };
    ctx.scene.enter("photomartscene");
    ctx.reply("*Ismingizni kiriting!*",
      {
        parse_mode: "markdown",
        reply_markup: {
          inline_keyboard: [[{ text: "Ortga <=", callback_data: "mart" }]],
        },
      }
    );
  } catch (e) {
    sendError(e, ctx);
  }
};

module.exports = MartImgHandler;
