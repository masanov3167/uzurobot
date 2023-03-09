const MyFn = require("../../TryCatch");

const Fn = async ctx => await ctx.reply("Ismingizni yozing: ");

const Navruz = ctx => MyFn(ctx, Fn,true);

module.exports = Navruz;