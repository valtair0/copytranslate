const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("version", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("copy"),
  handleCopy: (callback) => ipcRenderer.on("copy", callback),
  // we can also expose variables, not just functions
});
