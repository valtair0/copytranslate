const translate = require("@iamtraction/google-translate");
const { BrowserWindow } = require("electron");

//this function translates the text and sends it to the renderer process
function translateText(text) {
  let ModifiedText = text.replace(/[\r\n]/g, " ");

  translate(ModifiedText, { from: "en", to: "tr" }).then((res) => {
    BrowserWindow.getAllWindows()[0].webContents.send("copy", res.text);
  });
}

module.exports = translateText;
