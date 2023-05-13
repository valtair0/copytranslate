const actualText = document.getElementById("actualText");
const shadowText = document.getElementById("shadowText");
const start = document.getElementById("start");
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

    clearTimeout(timeoutId); // Clear the previous timeout

    timeoutId = setTimeout(() => {
      actualText.classList.add("hidden");
      shadowText.classList.add("hidden");
    }, 10000); // Hide after 10 seconds
  }
});

start.addEventListener("click", () => {
  window.version.openText(screen.width);
});
