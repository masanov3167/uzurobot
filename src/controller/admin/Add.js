const MyFn = require("../TryCatch");
const config = require("../../../config");

const Fn = async (ctx) => {
  if (ctx.from.id === config.dev) {
    const data = ctx.update.callback_query.data;
    ctx.session.addType = data;
    ctx.scene.enter("add");
    await ctx.reply(
      data === "addkanal"
        ? "*Kanal qo'shish uchun kanalizdan bironta postni forward qiling!\n\nDiqqat, kanalga avval botni admin qilgan bo'lishingiz kerak 👁*"
        : data === "addrek"
        ? "*Mini reklama qo'shish uchun reklamani tekst holda yuboring harflar soni 100tadan oshib ketmasin*"
        : "*Gudok qo'shish gudokni menga yuboring, gudokga ismni captionda yozing*",
      { parse_mode: "markdown" }
    );
    return;
  }
};

const AddFn = (ctx) => {
  MyFn(ctx, Fn, true);
};

module.exports = AddFn;
