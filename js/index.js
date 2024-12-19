// page data
let pageStarted = false;

// #region startup

function pageStartup() {
    let pageStartupDiv = document.getElementById("pageStartupDiv");

    pageStarted = true;
    navHamburguerMenuForceClose();
    pageStartupDiv.classList = "pageStartup useUnselect pageStartupLoaded";

    scanProjects();
}

// #endregion

// #region Hamburguer

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
}

function navHamburguerMenuForceClose() {
    let navMenuDisplay = document.getElementById("navMenuDisplay");
    let navMenuContent = document.getElementById("navMenuContent");
    let navHamburguerMenuIcon = document.getElementById("navHamburguerMenuIcon");

    navMenuDisplay.style.visibility = "hidden";
    navMenuContent.style.height = 0;
    navHamburguerMenuIcon.src = "./assets/img/ui/menu_hamburguer.png";
    navOpen = false;
}

// Auto close nav
let viewWidth = window.matchMedia("(max-width: 800px)");

viewWidth.addEventListener("change", function() {
    navHamburguerMenuForceClose();
});

// #endregion

//#region list project data

function scanProjects() {
    const mainPath = '../';
    const file = mainPath + 'pagedata.json'; // "https://brunoo1545.github.io/pagedata.json"

    const listProject = document.getElementById('list-project');
    const listLanguages = document.getElementById('list-languages');
    const projectTechnologies = document.getElementById('list-technologies');
    const listSoftware = document.getElementById('list-software');
    
    fetch(file)
        .then(res => res.json())
        .then(data => {
            
            // fetch projects
            data.projects.forEach(element => {
                
                var _type, _status, _screenshots;

                switch (element.type) {
                    case 0: _type = "Software"; break;
                    case 1: _type = "Videojuego"; break;
                    case 2: _type = "Página web"; break;
                    case 3: _type = "Otro"; break;
                    default: _type = "Desconocido"; break;
                }

                switch (element.status) {
                    case 0: _status = "En concepto"; break;
                    case 1: _status = "En desarollo"; break;
                    case 2: _status = "Terminado"; break;
                    case 3: _status = "Cancelado"; break;
                    default: _status = "Desconocido"; break;
                }

                for (var _i = 0; _i < element.screenshots; _i++) {
                    _screenshots += `<img src="${mainPath}/assets/img/projects/${element.id}/screenshot_${[_i]}.png" alt="Screenshot ${_i}" class="project-card-preview-screenshot">`;
                }

                listProject.insertAdjacentHTML('beforeend', 
                    `<li alt="${element.title}" class="project-card">
                        <div>
                            <div class="project-card-metadata" style="background-image: linear-gradient(to top, black, transparent), url('${mainPath}/assets/img/projects/${element.id}/card.png');">
                                <div class="project-card-title">
                                    <img src="${mainPath}/assets/img/projects/${element.id}/icon.png" alt="${element.title} icon">
                                    
                                    <p>${element.title}</p>
                                </div>
                                
                                <div class="project-card-status">
                                    <p class="project-card-status-type">${_type}</p>
                                    <p>•</p>
                                    <p class="project-card-status-status">${_status}</p>
                                </div>
                            </div>

                            <p>${element.caption}</p>
                        </div>
                        
                        <a onclick="previewProjectOpen('${element.id}')">Ver más</a>
                    </li>`);
            });
            
            // fetch languages
            data.languages.forEach(element => {
                listLanguages.insertAdjacentHTML('beforeend', 
                    `<li alt="${element.alt}" class="general-card">
                        <img src="${mainPath}/assets/img/lang/${element.logo}" width="64px">
                        <p>${element.name}</p>
                        <progress value="${element.percent}" max="100" style="--value: ${element.percent}; --max: 100;"></progress>
                    </li>`);
            });
            
            // fetch technologies
            data.technologies.forEach(element => {
                projectTechnologies.insertAdjacentHTML('beforeend', 
                    `<li alt="${element.alt} project" class="general-card">
                        <img src="${mainPath}/assets/img/logo/${element.logo}" width="64px">
                        <p>${element.name}</p>
                        <progress value="${element.percent}" max="100" style="--value: ${element.percent}; --max: 100;"></progress>
                    </li>`);
            });
            
            // fetch software
            data.software.forEach(element => {
                listSoftware.insertAdjacentHTML('beforeend', 
                    `<li alt="${element.alt}" class="general-card">
                        <img src="${mainPath}/assets/img/logo/${element.logo}" width="64px">
                        <p>${element.name}</p>
                        <progress value="${element.percent}" max="100" style="--value: ${element.percent}; --max: 100;"></progress>
                    </li>`);
            });
        });
}

//#endregion


// #region page interactions

let previewOpen = false;
    
function previewProjectOpen(id) {
    previewOpen = true;
    console.log("open [" + id + "]");
}

function previewProjectClose() {
    previewOpen = false;
    console.log("close");
}

// #endregion