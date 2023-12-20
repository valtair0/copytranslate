const imageElement = document.getElementById("screenshotimage");

window.version.handleImage((event, value) => {
  imageElement.src = value;
});

function saveDataUrlAsFile(dataUrl) {
  window.version.screenshotdataurl(dataUrl);
}
