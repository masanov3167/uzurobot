const { sendError } = require("../../../../utils");

const PhotoProHandler = async (ctx) => {
  const type = ctx.update.callback_query.data.split("_");
  try {
    ctx.session.PhotoProScene = { type: type[1], key: type[2] };
    ctx.scene.enter("photoproscene");
    ctx.telegram.editMessageText(
      ctx.chat.id,
      ctx.update.callback_query.message.message_id,
      null,
      "*Ismingizni kiriting!*",
      {
        parse_mode: "markdown",
        reply_markup: {
          inline_keyboard: [[{ text: "Ortga <=", callback_data: "photopro" }]],
        },
      }
    );
  } catch (e) {
    sendError(e, ctx);
  }
};

module.exports = PhotoProHandler;
