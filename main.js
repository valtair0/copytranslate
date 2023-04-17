const { app, BrowserWindow, webContents } = require("electron");
const path = require("path");
const electronReload = require("electron-reload");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 350,
    webPreferences: {
      nodeIntegrationInWorker: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.webContents.on("did-finish-load", () => {
    win.webContents.send("copy", clipboard.readText());
  });

  win.loadFile("index.html");

  win.setMenu(null);

  win.setAlwaysOnTop(true, "screen");
  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "node_modules", ".bin", "electron"),
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

const { clipboard } = require("electron");

let last = "";
function setFirstCopy() {
  last = clipboard.readText();

  //send copy to renderer
}

setFirstCopy();

function checkLastCopy() {
  if (last !== clipboard.readText()) {
    last = clipboard.readText();
    BrowserWindow.getAllWindows()[0].webContents.send("copy", last);
    console.log("changed last:", last);
  }
  setTimeout(() => {
    checkLastCopy();
  }, 1);
}

checkLastCopy();
