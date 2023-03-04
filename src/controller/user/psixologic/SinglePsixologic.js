const MyFn = require("../../TryCatch");

const buttons = type =>{
   const arr = [
    [{'text':'🌄 Bahor', 'callback_data' : "psix_1"},{'text':'🏖️ Yoz','callback_data':"psix_2"}],
    [{'text':'🗻 Kuz', 'callback_data' : "psix_3"},{'text':'🌨️ Qish', 'callback_data' :"psix_4"}]
    ]
    if(type){
        arr.push( [{'text':'Orqaga 💫', 'callback_data' : "psix_5"}])
    }
    return arr;
}

const texts = [
    "*BAHOR 🌸* \n\nBahor oshuftalari juda quvnoq va hayotga chanqoq insonlardir. Xushchaqchaqligi va hazilkashligi sabab dostlarining hamisha ardogida yuradilar. Hayotiy shiorlari: buncha gozal bu olam, bir qara! Jamoaning joni bolish bilan birga, turli hiyla-nayranglarni uyushtirishga ham usta. Bir joyda otirishlari qiyin, sayohat jonu dili. Tez oshiq bolib qoladilar, ammo ayriliqlarni hech qanday gazabu nafratsiz, engil otkazadilar. Ularni sodiq dost sifatida qabul qilmaslik kerak, chunki munosabatlari vaziyat taqozosiga kora ozgarib turadi. Istalgan daqiqada umuman kozdan goyib bolib, sizni unutib yuborishlari mumkin. Birovga boglanib qolish ular uchun qadriyat emas. Vujudida bir vaqtning ozida ehtiros, xudbinlik, romantika, talabchanlik va begamlik josh urgan bu insonlar vada berishga, ayniqsa, uni bajarmaslikka usta. Lekin ular bilan zeikmaysiz.",
    "*YOZ 🌻* \n\nBu faslni yaxshi koradiganlar etakchilik, ilgorlik sifatlariga ega. Ozlari yonib, atrofdagilarni ham yondirib yurishadi. Ular bilan muloqot juda qiziqarli kechadi. Hech qachon tushkunlikka tushmaydilar va hamisha nekbin kayfiyatda yuradilar. Bunday kimsalar har doim yangidan-yangi goyalar oylab topib, amalga oshiradi. Yoz fasli ishtiyoqmandlarining ishdagi osishi ham tez suratda bolib, yuqori martabalarga erishadilar, yaxshi rahbarlik sifatlari bilan ajralib turishadi. Hayotiy shiorlari: qatiyat va mehnat. Ayni paytda etarli darajada murosasoz bolib, zarur orinda yon berishni ham bilishadi. Ularning shaxsiy hayotlari ham havas qilsa arzigulik. Chunki aqlni yoqotar darajada sevish va juftlariga bir umr sodiq qolishni biladilar. Atrofdagilarning kamchiliklariga nisbatan anchayin sabrli va ozlariga nisbatan talabchan bolgan bunday insonlardan yaxshi dost chiqadi. Chunki dostlarini shodlikda ham, gamda ham yolgiz qoldirmaydilar. Birgina kamchiliklari bor: haddan ortiq arazchi bolganlari holda kechimli emas",
    "*KUZ 🍁* \n\nKuzni sevadiganlar tinchlik, yolgizlik va osoyishtalikni xush koradi. Kopchilikni sevmaganlari holda odamlar orasida ozlarini noqulay his etmaydilar ham. Shunchaki jamoaning ular uchun ahamiyati yoq. Hayotiy shiori: meni tinch qoying! Kayfiyatlari juda beqaror: bir qarasangiz, xandon otib yuradi, bir qarasangiz, hech qanday sababsiz xomrayib oladi. Xuddi kuz havosiga oxshab. Begonalarning nekbinligiyu zafarlari kopincha gashlariga tegadi. Biroq kuzni yaxshi koradigan odamlar juda istedodli bolishadi. Tasviriy sanat, sheriyat va nasrda katta muvaffaqiyatlarga erishishlari mumkin. Fikrlashlari ham boshqalardan farq qiladi. Muhabbatda juda vafodor: faqat bir insonni sevib otadilar. Bir bora va butun umrga! Agar muhabbatiga etisha olmasa olguncha azoblanadi va bu azob ularga ilhom manbai bolib qoladi. Ular tabiat va jonzotlar bilan muloqot chogidagina ozlarini topadilar. Biroq muhabbatiga javob berib, sevib ardoqlaydigan insonni uchratsalar, haqiqiy oilaparvarga aylanadi.",
   "*QISH ❄️* \n\n Bu faslni sevadiganlar, odatda, oziga ishongan va mustaqil insonlardir. Hayotiy shiorlari: faqat ozingga ishon! Katta davralarni xush korishmaydi. Dostu tanishlari juda oz. Ammo shu ozgina odamlarga qattiq ishonishadi. Ishonmasa, ularni yaqin yolatmagan bolishardi. Juda qatiyatli bu kimsalar oz rejalarini birovga oshkor qilmay, yolgiz amalga oshirish yoki hayot oqimini maqsadlariga boysundirishni biladilar. Qishni yaxshi koradigan insonlar kamgap bolishadi. Sorasangiz, javob beradilar, ammo ozlari hech qachon birinchi bolib gap qotmaydilar. Pul ishlab topishni bilishadi, qulaylik va farovonlikni qadrlashadi. Ozlariga qadrli insonlar uchun kop narsadan voz kechishlari mumkin. Kamchiliklari: xasislik va pismiqlik. Shuningdek, bunday insonlar kechirishni bilmaydi.",
   "*O'zingiz haqingizda batafsilroq ma'lumot kerakmi unda Qaysi faslda tug'ilgansiz tanlang!👇*"
];

const Fn = async ctx => {
    const data = ctx.update.callback_query.data.split("_")[1];
  ctx.telegram.editMessageText(
    ctx.chat.id,
    ctx.update.callback_query.message.message_id,
    null,
    texts[data-1],
    {
        parse_mode:"markdown",
      reply_markup: {
        inline_keyboard: buttons(data!=5),
      },
    }
  );
};

const SinglePsixologic = ctx =>{
    MyFn(ctx, Fn(ctx),true)
}

module.exports = {
    SinglePsixologic,
    buttons
};
