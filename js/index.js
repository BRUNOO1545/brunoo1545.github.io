//page data
pageStarted = false;
debugMode = false;

//#region startup

function pageStartup() {
    let pageStartupDiv = document.getElementById("pageStartupDiv");

    pageStarted = true;
    navHamburguerMenuForceClose();
    pageStartupDiv.style.visibility = "hidden";
}

//#endregion

//#region Hamburguer

let navHamburguer = document.getElementById("navHamburguer");
let navOpen = false;

function navHamburguerMenuShow() {
    let navMenuDisplay = document.getElementById("navMenuDisplay");
    let navMenuContent = document.getElementById("navMenuContent");
    let navHamburguerMenuIcon = document.getElementById("navHamburguerMenuIcon");

    if (navOpen === true) {
        navOpen = false;
        navMenuDisplay.style.visibility = "hidden";
        navMenuContent.style.height = 0;
        navHamburguerMenuIcon.src = "./assets/img/ui/menu_hamburguer.png";
    } else {
        navOpen = true;
        navMenuDisplay.style.visibility = "visible";
        navMenuContent.style.height = "auto";
        navHamburguerMenuIcon.src = "./assets/img/ui/menu_hamburguer_close.png";
    }
    
    if (debugMode === true) {
        console.log("navOpen: " + navOpen);
    }
}

function navHamburguerMenuForceClose() {
    let navMenuDisplay = document.getElementById("navMenuDisplay");
    let navMenuContent = document.getElementById("navMenuContent");
    let navHamburguerMenuIcon = document.getElementById("navHamburguerMenuIcon");

    navMenuDisplay.style.visibility = "hidden";
    navMenuContent.style.height = 0;
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
