const MyFn = require("../../../TryCatch");

const Fn = async (ctx) => {
    ctx.scene.enter("statusfile");
    ctx.reply("*Status yozish uchun rasm yuboring! \n\nEslatma ⚠️ statusga mos tushadigan obyektlari kamroq va eni va bo'yi bir xilroq rasm yuboring :)*",{parse_mode: "markdown"});
};

const PhotoStatusHandler = async ctx =>{
    MyFn(ctx,Fn(ctx),ctx?.chat?.type !=="private")
}

module.exports = PhotoStatusHandler;
