const MyFn = require("../TryCatch");
const {generateRek} = require("../../utils")

const Fn = async (ctx) => {
  await ctx.reply(
    `*Telegramda o'rnatmoqchi bo'lgan foningiz ustiga bosingπ \n\n${generateRek()}*`,
    {
      parse_mode: "markdown",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "π€  Telegram fon (1)",
              url: "https://t.me/bg/C1peJlascElRAAAA_gl3s407Nb4",
            },
          ],
          [
            {
              text: "π€  Telegram fon (2)",
              url: "https://t.me/bg/wtsScjOF-FEBAAAAS0QwhEvmk64",
            },
          ],
          [
            {
              text: "π€  Telegram fon (3)",
              url: "https://t.me/bg/Br6nNA9WAVIBAAAAe6AHvL7eOMM",
            },
          ],
          [
            {
              text: "π€  Telegram fon (4)",
              url: "https://t.me/bg/sp-xMi7A-VEBAAAABRn6rGsUKFs",
            },
          ],
          [
            {
              text: "π€  Telegram fon (5)",
              url: "https://t.me/bg/MiE64ER4AFIBAAAAHQZRZyDCfu0",
            },
          ],
          [
            {
              text: "π€  Telegram fon (6)",
              url: "https://t.me/bg/QYRXjvmNAFIBAAAAeuJm6ng1wZo",
            },
          ],
          [
            {
              text: "π€  Telegram fon (7)",
              url: "https://t.me/bg/5LkIrHKWAFIBAAAAM0Fy4n1W65E",
            },
          ],
          [
            {
              text: "π€  Telegram fon (8)",
              url: "https://t.me/bg/ExhVI_Uj-FEBAAAA9CC2f4neVfc",
            },
          ],
        ],
      },
      disable_web_page_preview:true
    }
  );
};

const TelegramFon = (ctx) => {
  MyFn(ctx, Fn,true);
};

module.exports = TelegramFon;
