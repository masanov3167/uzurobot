const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");
const { User } = require("../models");

const generateButton = (arr, join, private,type,page) => {
  try {
    const array = [];
    if (join) {
      for (let i of arr) {
        array.push([{ text: i.text.substring(0, 30), url: i.link }]);
      }
      if (!private) {
        array.push([
          { text: "➕ Tasdiqlash", callback_data: "subscribe_result" },
        ]);
      }
      return array;
    }
    const activePage = (page-1)*10;

    for (let i of arr.slice(activePage,activePage +10)) {
      array.push([
        { text: i.text.substring(0, 20), callback_data: `info${type === "/kanal" ? "ch" : "some"}_${i._id}` },
        { text: "O'chirish", callback_data: `del${type === "/kanal" ? "ch" : "some"}_${i._id}` },
      ]);
    }
   if(arr.length>10){
    const pagination = [];
    if(page>1){
      pagination.push({text:"<= Oldingi", callback_data:`page_${type}_${page-1}`})
    }
    pagination.push({text:"🚫",callback_data:"delmsg"});
    if(arr.length / 10 > page){
      pagination.push({text:"Keyingi =>", callback_data:`page_${type}_${Number(page)+1}`})
    }
    array.push(pagination);
   }
   array.push([{ text: `➕ ${type.substring(1)} qo'shish`, callback_data: `add${type.substring(1)}` }]);
    return array;
  } catch {
    return [{ text: "Oooops....", url: config.error }];
  }
};

const readDb = (data, obj) => {
  try {
    return JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "..", obj ? ".." : "db", `${data}.json`)
      )
    );
  } catch (e) {
    return obj
      ? {
          token: "1449524034:AAGnZz-btLqJP4Fs6M0OWCpkpdfQbEnF6Io",
          active: true,
          mongoLink: "mongodb://localhost:27017/uzurobot",
          dev: 587517395,
          boturl: "uzurobot",
          ball: 5,
          db_channel: -1001820877016,
          error: "https://t.me/+s4XPzLFbTsAxZDdi",
          error_img:
            "https://www.freeiconspng.com/thumbs/error-icon/error-icon-32.png",
        }
      : [];
  }
};

const writeDb = (data, name) => {
  try {
    const old = readDb(name);
    old.push(data);
    fs.writeFileSync(
      path.join(__dirname, "..", "db", `${name}.json`),
      JSON.stringify(old, null, 2)
    );
    return true;
  } catch {
    return false;
  }
};

const removeDb = (id, value, name) => {
  const getValue = readDb(name).filter((item) => item[id] !== value);
  fs.writeFileSync(
    path.join(__dirname, "..", "db", `${name}.json`),
    JSON.stringify(getValue, null, 2)
  );
};

const updateDb = (key, id, value, name) => {
  const oldData = readDb(name);
  const index = oldData.findIndex((item) => item[key] === id);
  if (index >= 0) {
    oldData[index] = value;
    fs.writeFileSync(
      path.join(__dirname, "..", "db", `${name}.json`),
      JSON.stringify(oldData, null, 2)
    );
  }
};
function sendError(err, ctx) {
  const config = readDb("settings", true);
  if (String(err).includes("message is not modified")) {
    return;
  }
  try {
    ctx.reply(
      `Qandaydur xatolik yuz berdi :( \nBirozdan so'ng harakat qiling yoki Adminlarga xabar bering\n\nXatolik mazmuni: *${String(
        err
      )}*`,
      {
        parse_mode: "markdown",
        reply_markup: {
          inline_keyboard: [[{ text: "Xabar berish 🫣", url: config.error }]],
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
}

const GenerateStatus = async (photo,txt, height, name, folder,file) => {
  try {
    const myFile = folder ? fs.readFileSync(path.join(__dirname, "..", "files", "photos", folder, file)) : photo;
    const canvas = createCanvas(500, 500);
    const context = canvas.getContext("2d");
    const img = await loadImage(myFile);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    context.font = "bold 20px Arial";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.textBaseline = "middle";

    const words = txt.split(" ");
    const lines = [];
    let line = "";

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > canvas.width && n > 0) {
        lines.push(line);
        line = words[n] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line);
    const x = canvas.width / 2;
    const y = canvas.height - (height || 100);
    if(name){
      context.fillText(name,x, y-30);
    }
    context.fillStyle = "white"
    for (let i = 0; i < lines.length; i++) {
      context.fillText(lines[i], x, y + i * 25);
    }

    return canvas.toBuffer();
  } catch {
    return false;
  }
};

const GenerateImg = async (color, folder, name, font, txt, height, width, imageMy) => {
  try {
    const file = fs.readFileSync(
      path.join(__dirname, "..", "files", "photos", folder, name)
    );
    const canvas = createCanvas(imageMy ? 825 : 500,imageMy ? 425 : 500);
    const ctxCanvas = canvas.getContext("2d");
    ctxCanvas.fillStyle = color || "#ffffff";
    ctxCanvas.fillRect(0, 0, canvas.width, canvas.height);
    const image = await loadImage(file);
    ctxCanvas.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctxCanvas.font = font || "bold 30px Arial";
    ctxCanvas.textAlign = "center";
    ctxCanvas.fillText(txt, canvas.width / (width || 2), canvas.height / (height || 1.4));
    const buffer = canvas.toBuffer("image/png");
    return buffer;
  } catch (e) {
    return false;
  }
};
async function fetchHtmlContent(url) {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "text/html",
      },
    });
    const html = await response.text();
    return html;
  } catch (error) {
    return false;
  }
}

const FindNameMeaning = async name =>{
  try{
    const result = await fetchHtmlContent(`https://ismlar.com/search/${name}`);
  const txt = result.split(`<div class="space-y-4">`)[1]?.split("</div>")[0]?.trim();
  if(!txt){
    return false
  }
  return txt;
  }
  catch{
    return false
  }
}

const getUserBall = async userId => {
  try{
    const user = await User.findOne({ cid: userId });
  return user.ball >1 ? user.ball : false;
  }
  catch{
    return false
  }
};

module.exports = {
  sendError,
  generateButton,
  readDb,
  writeDb,
  removeDb,
  updateDb,
  GenerateImg,
  GenerateStatus,
  FindNameMeaning,
  getUserBall
};
