const { OcrEngine } = require("@nodert-win10-19h1/windows.media.ocr");
const { Language } = require("@nodert-win10-19h1/windows.globalization");
const Graphic = require("@nodert-win10-19h1/windows.graphics.imaging");
const Storage = require("@nodert-win10-19h1/windows.storage");

var ocrEngine = OcrEngine.tryCreateFromLanguage(new Language("en-US"));

//this function takes a file path and returns the text from the image
async function getTextFromImage(FilePath) {
  var text = "";

  return new Promise(async (resolve, reject) => {
    var file = await Storage.StorageFile.getFileFromPathAsync(
      FilePath,
      async function (err, file) {
        var fileis = file;
        var stream = await file.openAsync(
          Storage.FileAccessMode.read,
          async function (err, stream) {
            var decoder = await Graphic.BitmapDecoder.createAsync(
              stream,
              async function (err, decoder) {
                var bitmap = await decoder.getSoftwareBitmapAsync(
                  async function (err, bitmap) {
                    var result = await ocrEngine.recognizeAsync(
                      bitmap,
                      async function (err, result) {
                        for (var i = 0; i < result.lines.length; i++) {
                          text += result.lines[i].text + " ";
                        }
                        resolve(text);
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  });
}

module.exports = {
  getTextFromImage,
};
