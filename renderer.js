const information = document.getElementById("info");

window.version.handleCopy((event, value) => {
  console.log("handleCounter", value);
  if (value == "") {
    //pc ilk açıldığında clipboard boş olduğu için undefined döndürüyor
    information.innerText = "Clipboard is empty";
  } else {
    information.innerText = value;
  }
});
