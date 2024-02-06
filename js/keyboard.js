const keys = document.querySelectorAll(".key");

for (i = 0; i < keys.length; i++) {
  keys[i].addEventListener("click", function() {
    let key = this.getAttribute("data-key");
    let input = document.getElementById("number_input");
    
    if (key == "DEL") {
      input.value = input.value.slice(0, -1);
    } else if (key == "OK") {
      return;
    } else {
      input.value += key;
    }
  })
}