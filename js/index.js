//page data
debugMode = true;

//Hamburguer
let navHamburguer = document.getElementById("navHamburguer");
let navOpen = true;

function navHamburguerMenuShow() {
    let navMenuDisplay = document.getElementById("navMenuDisplay");

    if (navOpen === true) {
        navOpen = false;
        navMenuDisplay.style.visibility = "hidden";
    } else {
        navOpen = true;
        navMenuDisplay.style.visibility = "visible";
    }
    
    if (debugMode === true) {
        console.log("navOpen: " + navOpen);
    }
}

function navHamburguerMenuForceClose() {
    let navMenuDisplay = document.getElementById("navMenuDisplay");
    navMenuDisplay.style.visibility = "hidden";
    navOpen = false;
    
    if (debugMode === true) {
        console.log("navOpen forced to false.");
    }
}


var viewWidth = window.matchMedia("(max-width: 800px)")

viewWidth.addEventListener("change", function() {
    navHamburguerMenuForceClose();
});