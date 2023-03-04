const { sendError } = require("../../../../utils");

const SingleMuslim = async (ctx) => {
  const type = ctx.update.callback_query.data.split("_");
  try {
    ctx.session.muslimScene = { type: type[1], key: type[2] };
    ctx.scene.enter("photomuslimscene");
    ctx.reply("*Ismingizni kiriting!*",
      {
        parse_mode: "markdown",
        reply_markup: {
          inline_keyboard: [[{ text: "Ortga <=", callback_data: "muslim" }]],
        },
      }
    );
  } catch (e) {
    sendError(e, ctx);
  }
};

module.exports = SingleMuslim;
