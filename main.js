const {
  app,
  BrowserWindow,
  ipcMain,
  globalShortcut,
  screen,
} = require("electron");
const path = require("path");
const fs = require("fs");
const onCopy = require("./utils/onCopy");

let screenWidth;
let screenHeight;

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
};

const textWindow = require("./windows/textWindow/textWindow");

app.whenReady().then(() => {
  onCopy();

  //get screen size
  const primaryDisplay = screen.getPrimaryDisplay();

  screenWidth = primaryDisplay.size.width;
  screenHeight = primaryDisplay.size.height;
  //

  createWindow();

  ipcMain.on("screenshotdataurl", (event, value) => {
    convertToPngAndSve(value);
    closeScreenshotWindow();
  });

  ipcMain.on("open-text", (event, value) => {
    textWindow(value);
  });

  const {
    takeScreenshot,
    closeScreenshotWindow,
  } = require("./windows/screenshotWindow/screenshotWindow");
  // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register("Shift+PrintScreen", async () => {
    takeScreenshot(screenWidth, screenHeight);
  });

  if (!ret) {
    console.log("registration failed");
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered("Shift+PrintScreen"));

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

async function convertToPngAndSve(dataUrl) {
  const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
  fs.writeFile("out.png", base64Data, "base64", function (err) {
    extreactText();
    console.log(err);
  });
}

const { getTextFromImage } = require("./utils/recognizeImage");
const translateText = require("./utils/TranslateText");

async function extreactText() {
  getTextFromImage("C:\\Users\\mert\\Desktop\\copytranslate\\out.png")
    .then((text) => {
      console.log(text);
      translateText(text);
    })
    .catch((err) => {
      console.log(err);
    });
}

app.on("will-quit", () => {
  // Unregister a shortcut.
  globalShortcut.unregister("Shift+PrintScreen");

  // Unregister all shortcuts.
  globalShortcut.unregisterAll();

  //close the app
  app.quit();
});
