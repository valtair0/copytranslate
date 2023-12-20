const { BrowserWindow } = require("electron");
const path = require("path");

const textWindow = (value) => {
  const win = new BrowserWindow({
    width: 400,
    height: 250,
    x: value - 420,
    y: 10,
    frame: false,
    transparent: true,

    webPreferences: {
      nodeIntegrationInWorker: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  //not focusable
  win.setFocusable(false);

  win.loadFile("./windows/textWindow/text.html");

  win.setMenu(null);

  win.setAlwaysOnTop(true, "screen");
  win.setIgnoreMouseEvents(true);
};

module.exports = textWindow;
