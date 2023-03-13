const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
  cid: Number,
  lang: {
    type: String,
    default: "uz"
  },
  ball: {
    type: Number,
    default: 0
  },
  refid: Number,
  last_upd: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: Number,
    required: true,
    default: 2,
  }, // 1-pending, 2-active, 3-block
});

const User = mongoose.model("bot_users", UserSchema);

const ChannelSchema = new mongoose.Schema({
  cid: !String,
  link: !String,
  text: !String,
});

const Channel = mongoose.model("bot_channels", ChannelSchema);

const GudokSchema = new mongoose.Schema({
  file_id: !String,
  text: !String,
});

const Gudok = mongoose.model("bot_gudoks", GudokSchema);


const KinoSchema = new mongoose.Schema({
  link: !String,
  text: !String,
});

const Kino = mongoose.model("bot_cinemas", KinoSchema);

module.exports = {
  User,
  Channel,
  Gudok,
  Kino
};
