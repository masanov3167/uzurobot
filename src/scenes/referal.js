const {
    Scenes: { BaseScene },
  } = require("telegraf");
  
  const Fn = (ctx) => {
    const ref = ctx.session.refid;
    console.log(ref);
    ctx.reply("scenga kirdi !")
  };
  
  class CheckRef extends BaseScene {
    constructor() {
      super("checkref");
      this.on("message", (ctx) => {
        MyFn(ctx,Fn,true)
      });
    }
  }
  module.exports = new CheckRef();