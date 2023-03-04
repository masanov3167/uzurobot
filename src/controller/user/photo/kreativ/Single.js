const { sendError } = require("../../../../utils");

const PhotoKreativHandler = async (ctx) => {
  const type = ctx.update.callback_query.data.split("_");
  try {
    ctx.session.PhotoKreativScene = { type: type[1], key: type[2] };
    ctx.scene.enter("photokreativscene");
    ctx.reply("*Ismingizni kiriting!*",
      {
        parse_mode: "markdown",
        reply_markup: {
          inline_keyboard: [[{ text: "Ortga <=", callback_data: "kreativ" }]],
        },
      }
    );
  } catch (e) {
    sendError(e, ctx);
  }
};

module.exports = PhotoKreativHandler;
