const { clipboard } = require("electron");
const translateText = require("./TranslateText");

//this function checks the clipboard every second
function CheckLastCopy() {
  //this variable holds the last copied text
  let currentCopiedText = clipboard.readText();
  setInterval(() => {
    //if the current copied text is different from the last copied text
    if (currentCopiedText !== clipboard.readText()) {
      //set the last copied text to the current copied text
      currentCopiedText = clipboard.readText();
      //translate the text
      translateText(currentCopiedText);
      //log the current copied text
      console.log(currentCopiedText);
    }
  }, 1000); //
}

module.exports = CheckLastCopy;
