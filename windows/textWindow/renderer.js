const actualText = document.getElementById("actualText");
const shadowText = document.getElementById("shadowText");

let timeoutId;

window.version.handleCopy((event, value) => {
  console.log("handleCounter", value);
  if (value == "") {
    actualText.innerText = "Clipboard is empty";
    shadowText.innerText = "Clipboard is empty";
  } else {
    actualText.classList.remove("hidden");
    shadowText.classList.remove("hidden");

    actualText.innerText = value;
    shadowText.innerText = value;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      actualText.classList.add("hidden");
      shadowText.classList.add("hidden");
    }, 6500);
  }
});
