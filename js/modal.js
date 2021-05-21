let popupGuide = document.getElementById("guideBox"),
    guideBtn = document.getElementById("guideBtn"),
    guideClose = document.getElementById("guideClose");

// When the user clicks the button, open the modal
function showPopup() { 
    popupGuide.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
guideClose.onclick = function() { 
    popupGuide.style.display = "none";
}

// When the user clicks anywhere outside of the modal, it will close
window.onclick = function(event) {
    if (event.target == popupGuide) {
        popupGuide.style.display = "none";
    }
}