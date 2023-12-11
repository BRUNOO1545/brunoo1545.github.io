//page data
debugMode = false;

//#region Hamburguer

let navHamburguer = document.getElementById("navHamburguer");
let navOpen = false;

function navHamburguerMenuShow() {
    let navMenuDisplay = document.getElementById("navMenuDisplay");
    let navHamburguerMenuIcon = document.getElementById("navHamburguerMenuIcon");

    if (navOpen === true) {
        navOpen = false;
        navMenuDisplay.style.visibility = "hidden";
        navHamburguerMenuIcon.src = "./assets/img/ui/menu_hamburguer.png";
    } else {
        navOpen = true;
        navMenuDisplay.style.visibility = "visible";
        navHamburguerMenuIcon.src = "./assets/img/ui/menu_hamburguer_close.png";
    }
    
    if (debugMode === true) {
        console.log("navOpen: " + navOpen);
    }
}

function navHamburguerMenuForceClose() {
    let navMenuDisplay = document.getElementById("navMenuDisplay");
    let navHamburguerMenuIcon = document.getElementById("navHamburguerMenuIcon");

    navMenuDisplay.style.visibility = "hidden";
    navHamburguerMenuIcon.src = "./assets/img/ui/menu_hamburguer.png";
    navOpen = false;
    
    if (debugMode === true) {
        console.log("navOpen forced to false.");
    }
}

//Auto close nav
let viewWidth = window.matchMedia("(max-width: 800px)");

viewWidth.addEventListener("change", function() {
    navHamburguerMenuForceClose();
});

//#endregion