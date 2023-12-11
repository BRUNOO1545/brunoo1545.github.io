//page data
debugMode = false;

//#region Hamburguer
let navHamburguer = document.getElementById("navHamburguer");
let navOpen = false;

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

//Auto close nav
var viewWidth = window.matchMedia("(max-width: 800px)")

viewWidth.addEventListener("change", function() {
    navHamburguerMenuForceClose();
});

//#endregion