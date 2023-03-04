const MyFn = require("../TryCatch");
const config = require("../../../config");
const { User } = require("../../models");

const Fn = async (ctx) => {
    if (ctx.from.id === config.dev) {
        const user = await User.find();
        ctx.reply(`*Jami userlar: ${user.length}ta*`, {
          parse_mode: "markdown",
          reply_markup:{
            inline_keyboard:[
              [{text:"Reklama yuborish", callback_data:"sendrek"}]
            ]
          }
        });
        return
      }
};

const StatFn = ctx => {
  MyFn(ctx, Fn(ctx),true);
};

module.exports = StatFn;