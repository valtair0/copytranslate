const { desktopCapturer, BrowserWindow } = require("electron");
const path = require("path");

let screenshotWindow;

function takeScreenshot(screenWidth, screenHeight) {
  desktopCapturer
    .getSources({
      types: ["screen"],
      thumbnailSize: { width: screenWidth, height: screenHeight },
    })
    .then(async (sources) => {
      if (sources.length > 0) {
        const source = sources[0];

        // Create a new BrowserWindow to display the captured screen
        screenshotWindow = new BrowserWindow({
          width: screenWidth, // Set the window width to match the desired width
          height: screenHeight, // Set the window height to match the desired height
          frame: false, // Hide window frame
          transparent: true, // Make the window transparent
          fullscreen: true, // Make the window fullscreen
          resizable: false,
          alwaysOnTop: true,
          webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, "preload.js"),
          },
        });

        screenshotWindow.loadFile("./windows/screenShotWindow/screenshot.html");

        // Don't show the window until it's ready, this prevents any white flickering
        screenshotWindow.once("ready-to-show", () => {
          BrowserWindow.getAllWindows()[0].webContents.send(
            "imageurl",
            source.thumbnail.toDataURL()
          );

          screenshotWindow.show();

          screenshotWindow.focus();

          //if focus is lost close window
          screenshotWindow.on("blur", () => {
            screenshotWindow.close();
          });
        });
      }
    });
}

function closeScreenshotWindow() {
  screenshotWindow.close();
}

module.exports = { screenshotWindow, takeScreenshot, closeScreenshotWindow };
