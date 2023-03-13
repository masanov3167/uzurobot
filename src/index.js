const { User } = require("./models");
const config = require("../config")

require("./core");

process.on('unhandledRejection',async (err, promise) => {
  if(String(err).includes("bot was blocked by the user") || String(err).includes("chat not found")){
    const chatid = err?.on?.payload?.chat_id;
    if(chatid){
    await  User.findOneAndRemove({cid: chatid})
    } 
  }
    console.log('Unhandled Rejection at:', promise, 'reason:', err)
})