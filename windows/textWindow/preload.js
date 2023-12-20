const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("version", {
  ping: () => ipcRenderer.invoke("copy"),
  handleCopy: (callback) => ipcRenderer.on("copy", callback),
  openText: (text) => ipcRenderer.send("open-text", text),
  handleImage: (callback) => ipcRenderer.on("imageurl", callback),
  screenshotdataurl: (text) => ipcRenderer.send("screenshotdataurl", text),
});
