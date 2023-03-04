const {  session,Scenes:{Stage} } = require("telegraf");
const stage = new Stage()
const MyScene = require("./AddScene");
const AddChannelLink = require("./admin/ChannelLink");
const CheckRef = require("./referal");
const PhotoProScene = require("./user/PhotoProScene");
const MeaningName = require("./user/MeaningName");
const PhotoKreativScene = require("./user/PhotoKreativScene");
const PhotoStatusScene = require("./user/PhotoStatusNameScene");
const PhotoStatusFileScene = require("./user/PhotoStatusFileScene");
const MeaningNameImg = require("./user/MeaningNameImg");
const MartImgScene = require("./user/MartImgScene");
const MuslimImgScene = require("./user/MuslimImgScene");
const SearchGudokScene = require("./user/SearchGudokScene");
const SendRekScene = require("./admin/SendRekScene");
const MyScenes = async bot =>{
    stage.register(MyScene)
    stage.register(AddChannelLink)
    stage.register(CheckRef)
    stage.register(MeaningName)
    stage.register(PhotoProScene)
    stage.register(PhotoKreativScene)
    stage.register(PhotoStatusScene)
    stage.register(PhotoStatusFileScene)
    stage.register(MeaningNameImg)
    stage.register(MartImgScene)
    stage.register(MuslimImgScene)
    stage.register(SearchGudokScene)
    stage.register(SendRekScene);
    bot.use(session())
    bot.use(stage.middleware())
}

module.exports = MyScenes;

