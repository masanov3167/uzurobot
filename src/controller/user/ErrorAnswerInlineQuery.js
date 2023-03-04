const config = require("../../../config")

const ErrorAnswerInlineQuery = (ctx, desc, txt,title, keyboard) => {
    try{
        const obj = {
            type: "article",
            id: "id" + txt.length,
            thumb_url: config.error_img,
            title: title ? title : "Iltimos ismingizni to'gri kiriting",
            description: desc,
            reply_markup:{
              inline_keyboard: keyboard || []
            },
            input_message_content: {
              message_text: txt,
              parse_mode: "HTML",
            },
          };
          ctx.answerInlineQuery([obj], {
            cashe_time: 0,
            is_personal: true,
            switch_pm_text: "Botga o'tish",
            switch_pm_parameter: "query",
          });
          return;
    }
    catch(e){
        console.log(e);
    }
};

module.exports = ErrorAnswerInlineQuery