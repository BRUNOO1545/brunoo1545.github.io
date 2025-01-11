const mainPath = '../';

// #region startup

let pageStarted = false;

function pageStartup() {
    let loadingDiv = document.getElementById("loadingScreen");

    pageStarted = true;
    //navHamburgerInstantCollapse();
    previewProjectClose();
    scanProjects();
    loadingDiv.style.animation = 'loadingFadeOut 1s forwards';
}

// #endregion

//#region list project data

const jsonfile = '../pagedata.json'; // "https://brunoo1545.github.io/pagedata.json"

function scanProjects() {
    const listFooter = document.getElementById('list-footer');
    const listProject = document.getElementById('list-project');
    const listLanguages = document.getElementById('list-languages');
    const projectTechnologies = document.getElementById('list-technologies');
    const listSoftware = document.getElementById('list-software');
    
    fetch(jsonfile)
        .then(res => res.json())
        .then(data => {
            
            // fetch footer
            data.metadata.footer.forEach(element => {
                listFooter.insertAdjacentHTML('beforeend', 
                    `<li class="footer-card-data" alt="${element.name}">
                        <a href="${element.url}" target="_blank"><img src="${mainPath}/assets/socialmedia/${element.logo}" class="svg-color" alt="${element.name}" title="${element.name}"></a>
                    </li>`);
            });
            
            // fetch projects
            data.projects.forEach( (element, projectIndex) => {

                var _type, _status, _caption, _description, _screenshots;
                _description = (element.description === "") ? "No hay decripción." : element.description;
                _caption = (element.caption === "") ? "Sin información." : element.caption;

                switch (element.type) {
                    case 0: _type = "Software"; break;
                    case 1: _type = "Videojuego"; break;
                    case 2: _type = "Página web"; break;
                    case 3: _type = "Otro"; break;
                    default: _type = "Desconocido"; break;
                }

                switch (element.status) {
                    case 0: _status = "Concepto"; break;
                    case 1: _status = "En desarollo"; break;
                    case 2: _status = "Terminado"; break;
                    case 3: _status = "Cancelado"; break;
                    default: _status = "Desconocido"; break;
                }

                for (var _i = 0; _i < element.screenshots; _i++) {
                    _screenshots += `<img src="${mainPath}/assets/projects/${element.id}/screenshot_${[_i]}.png" alt="Screenshot ${_i}" class="project-card-preview-screenshot">`;
                }

                listProject.insertAdjacentHTML('beforeend', 
                    `<li class="project-card" alt="${element.title}">
                        <div style="width: 100%">
                            <div class="project-card-metadata" style="background-image: linear-gradient(to top, black, transparent), url('${mainPath}/assets/projects/${element.id}/card.png');">
                                <img src="${mainPath}/assets/projects/${element.id}/icon.png" alt="icon" onerror="this.src='/assets/ui/image_fail.svg';">
                                
                                <p>${element.title}</p>
                            </div>

                            <p>${_caption}</p>
                        </div>

                        <div style="width: 100%; display: flex; flex-wrap: nowrap; flex-direction: row; justify-content: space-between;">
                            <div style="display: flex; flex-wrap: wrap; flex-direction: column; align-content: flex-start; align-items: flex-start; margin-bottom: 14px;">
                                <div class="project-card-preview-data">
                                    <img src="${mainPath}/assets/ui/card_date.svg" class="svg-color" alt="Card date">
                                    <p>${element.date}</p>
                                </div>
                                <div class="project-card-preview-data">
                                    <img src="${mainPath}/assets/ui/card_type.svg" class="svg-color" alt="Card type">
                                    <p>${_type}</p>
                                </div>
                                <div class="project-card-preview-data">
                                    <img src="${mainPath}/assets/ui/card_status.svg" class="svg-color" alt="Card status">
                                    <p>${_status}</p>
                                </div>
                            </div>
                            
                            <a onclick="previewProjectOpen('${projectIndex}')">Ver más</a>
                        </div>
                    </li>`);
            });
            
            // fetch languages
            data.languages.forEach(element => {
                listLanguages.insertAdjacentHTML('beforeend', 
                    `<li class="general-card" alt="${element.alt}">
                        <img src="${mainPath}/assets/lang/${element.logo}" width="64px" alt="${element.alt}">
                        <p>${element.name}</p>
                        <progress value="${element.percent}" max="100" style="--value: ${element.percent}; --max: 100;"></progress>
                    </li>`);
            });
            
            // fetch technologies
            data.technologies.forEach(element => {
                projectTechnologies.insertAdjacentHTML('beforeend', 
                    `<li class="general-card" alt="${element.alt} project">
                        <img src="${mainPath}/assets/logo/${element.logo}" width="64px" alt="${element.alt}">
                        <p>${element.name}</p>
                        <progress value="${element.percent}" max="100" style="--value: ${element.percent}; --max: 100;"></progress>
                    </li>`);
            });
            
            // fetch software
            data.software.forEach(element => {
                listSoftware.insertAdjacentHTML('beforeend', 
                    `<li class="general-card" alt="${element.alt}">
                        <img src="${mainPath}/assets/logo/${element.logo}" width="64px" alt="${element.alt}">
                        <p>${element.name}</p>
                        <progress value="${element.percent}" max="100" style="--value: ${element.percent}; --max: 100;"></progress>
                    </li>`);
            });

            //apply color scheme
            navApplyColorScheme(colorSchemeData.load());
        });
}

//#endregion

// #region page interactions

let previewOpen = false;
let previewDiv = document.getElementById("previewProject");
    
function previewProjectOpen(projectId) {
    if (previewOpen === false) {
        fetch(jsonfile)
            .then(res => res.json())
            .then(data => {
                let project = data.projects[projectId];

                // apply data
                let projectNav = document.getElementById("previewProjectNav");
                projectNav.style.backgroundImage = `linear-gradient(to top, black, transparent), url('${mainPath}/assets/projects/${project.id}/card.png')`;

                let projectTitle = document.getElementById("previewProjectTitle");
                projectTitle.textContent = project.title;
                
                let projectIcon = document.getElementById("previewProjectIcon");
                projectIcon.src = `${mainPath}/assets/projects/${project.id}/icon.png`;

                let projectCaption = document.getElementById("previewProjectCaption");
                projectCaption.textContent = (project.caption === "") ? "" : `"${project.caption}"`;

                let projectDescription = document.getElementById("previewProjectDescription");
                projectDescription.textContent = (project.description === "") ? "Sin decripción." : project.description;
                
                let projectHistory = document.getElementById("previewProjectHistory");
                projectHistory.textContent = (project.history === "") ? "Sin historia." : project.history;

                let projectLanguages = document.getElementById("listProjectLanguages");
                projectLanguages.innerHTML = "";
                project.languages.forEach(element => {
                    projectLanguages.insertAdjacentHTML('beforeend', 
                        `<li alt="${element}">
                            <p>${element}</p>
                        </li>`);
                });

                let projectTechnologies = document.getElementById("listProjectTechnologies");
                projectTechnologies.innerHTML = "";

                project.technologies.forEach(element => {
                    projectTechnologies.insertAdjacentHTML('beforeend', 
                        `<li alt="${element.name}">
                            <a href="${element.source}" target="_blank">${element.name}</a>
                        </li>`);
                });

                // show preview
                previewDiv.style.animation = 'previewShow 0.3s forwards';
        });
        
        previewOpen = true;
        console.log("open [" + projectId + "]");
    }
}

function previewProjectClose() {
    previewOpen = false;
    //previewDiv.style.visibility = 'hidden';
    previewDiv.style.animation = 'previewHide 0.3s forwards ease-in-out';
    console.log("close");
}

// #endregion

//#region Nav and Hamburger

// Vars
const colorSchemeData = {
    save: function(scheme) {
        localStorage.setItem("colorScheme", parseInt(scheme));
    },
    load: function() {
        let val = localStorage.getItem("colorScheme");
        
        return (val === null) ? 0 : parseInt(val);
    }
}

let navHamburgerOpen = false;
let navColorSchemeOption = colorSchemeData.load();

// Check close
function navHamburgerInteract() {
    let navMobile = document.getElementById("navMobileOptions");
    let navHamburgerIcon = document.getElementById("navHamburgerIcon");
    
    if (navHamburgerOpen === false) {
        navHamburgerOpen = true;
        navMobile.style.animation = "nav-options-mobile-hide 0.3s forwards";
        navHamburgerIcon.src = `${mainPath}/assets/ui/hamburger.svg`;
    } else {
        navHamburgerOpen = false;
        navMobile.style.animation = "nav-options-mobile-show 0.3s forwards";
        navHamburgerIcon.src = `${mainPath}/assets/ui/hamburger_close.svg`;
    }
}

// Instant collapse
function navHamburgerInstantCollapse() {
    let navMobile = document.getElementById("navMobileOptions");
    let navHamburgerIcon = document.getElementById("navHamburgerIcon");
    
    navHamburgerOpen = true;
    navMobile.style.animation = "nav-options-mobile-hide 0s forwards";
    navHamburgerIcon.src = `${mainPath}/assets/page/hamburger.svg`;
}

// Force close
function navHamburgerCollapse() {
    navHamburgerOpen = false;
    navHamburgerInteract();
}

// Auto close nav
let viewWidth = window.matchMedia("(max-width: 780px)");

viewWidth.addEventListener("change", function() {
    navHamburgerCollapse();
});

// Apply color scheme
function navApplyColorScheme(scheme) {
    let navColorSchemeChanger = document.getElementById("navColorSchemeChanger");
    let svgClass = document.getElementsByClassName("svg-color");
    let root = document.documentElement;

    Array.from(svgClass).forEach(e => {

        switch(scheme) {
            // Dark theme
            case 0:
                navColorSchemeChanger.src = `${mainPath}/assets/ui/mode_dark.svg`;
                root.style = "color-scheme: dark;"
                e.style = "filter: invert(0%);";
            break;

            // Light theme
            case 1:
                navColorSchemeChanger.src = `${mainPath}/assets/ui/mode_light.svg`;
                root.style = "color-scheme: light;"
                e.style = "filter: invert(100%);";
            break;
        }
    });
}

// Change color scheme
function navChangeColorScheme() {
    if (navColorSchemeOption < 1) {
        navColorSchemeOption += 1;
    } else {
        navColorSchemeOption = 0;
    }

    colorSchemeData.save(navColorSchemeOption);
    navApplyColorScheme(navColorSchemeOption);
}

//#endregion