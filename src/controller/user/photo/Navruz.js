const MyFn = require("../../TryCatch");

const Fn = async ctx => await ctx.reply("Ismingizni yozing: ");

const Navruz = ctx => MyFn(ctx, Fn(ctx),true);

module.exports = Navruz;