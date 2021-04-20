// Get the modal
let popupGuide = document.getElementById("guideBox");

// Get the button that opens the modal
let btn = document.getElementById("guideBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  popupGuide.style.display = "block";
}

/* When the user uses the website for the first time, the modal opens */  
if (localStorage.getItem("firstVisit") == 1) {
    popupGuide.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  popupGuide.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == popupGuide) {
    popupGuide.style.display = "none";
  }
}