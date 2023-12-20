const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("version", {
  handleImage: (callback) => ipcRenderer.on("imageurl", callback),
  screenshotdataurl: (text) => ipcRenderer.send("screenshotdataurl", text),
});
