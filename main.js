const { app, BrowserWindow, webContents, ipcMain } = require("electron");
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

  win.loadFile("index.html");

  win.setMenu(null);

  win.webContents.openDevTools();
};

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

  win.loadFile("text.html");

  win.setMenu(null);

  win.setAlwaysOnTop(true, "screen");
  win.setIgnoreMouseEvents(true);
};

app.whenReady().then(() => {
  createWindow();

  ipcMain.on("open-text", (event, value) => {
    textWindow(value);
  });

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
const translate = require("@iamtraction/google-translate");

let last = "";
function setFirstCopy() {
  last = clipboard.readText();
  //send copy to renderer
}

setFirstCopy();

let isWorking = false;

async function checkLastCopy() {
  if (last !== clipboard.readText() && isWorking == false) {
    last = clipboard.readText();

    translate(last, { from: "en", to: "tr" })
      .then((res) => {
        BrowserWindow.getAllWindows()[0].webContents.send("copy", res.text);
      })
      .catch((err) => {
        console.error(err);
      });

    isWorking = true;

    setTimeout(() => {
      isWorking = false;
    }, 1000);
  }
  setTimeout(() => {
    checkLastCopy();
  }, 1000);
}

checkLastCopy();
