const config = require("../../../config");
const MyFn = require("../TryCatch");

const Fn = ctx =>{
    const keyboard = {
        inline_keyboard: [
          [
            { text: 'Botga kirish 🔥', url: `t.me/${config.boturl}?start=${ctx.inlineQuery.from.id}` },
          ]
        ]
      };
    
      ctx.answerInlineQuery([{
        type:"article",
        id:"12",
        thumb_url:"https://picsum.photos/50/50",
        title:"Do'stlaringizni taklif qiling..",
        description:`Har bir do'stingiz uchun ${config.ball}dan beriladi!`,
        reply_markup: keyboard,
        input_message_content:{
          message_text:`<b>Ismingizga mos videolar 🎭, tabrik fotolar ❤️ va gudok 🤯 yasashni istaysizmi ?  \nUnda tez botimizga <a href="https://t.me/${config.boturl}?start=${ctx.inlineQuery.from.id}">tashrif buyuring 🐳</a> </b>`,
          parse_mode:"HTML",
          disable_web_page_preview: true
        }
      }],{
        cache_time: 0,
        is_personal: true,
        switch_pm_text: "Botga o'tish",
        switch_pm_parameter: 'query',
      })
}

const ShareReferal = ctx =>{
    MyFn(ctx,Fn,true);
}
module.exports = ShareReferal;