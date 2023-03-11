const {User} = require("../models");
const { sendError, getUserBall} = require("../utils");
const config = require("../../config")

const CheckBall = async (ctx, next) => {
  try {
    if(ctx?.chat?.type === "private" && config.dev !== ctx.from.id){
        const ball = await getUserBall(ctx.from.id);
    //   const user = await User.findOne({cid: ctx.from.id});
    //   if (!user) {
    //     const value = {cid: ctx.from.id,ball: 5,lang: ctx.from.language_code};
    //     const Saved = new User(value);
    //     await Saved.save();
    //   }
    }
    next();
  } catch (e) {
    console.log(e);
      sendError(e,ctx);
  }
};

module.exports = CheckBall;
