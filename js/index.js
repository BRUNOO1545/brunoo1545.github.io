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

let navbarHamburgerOpen = false;
let navbarColorSchemeOption = colorSchemeData.load();

const mainPath = '../';
let root = document.documentElement;

// #region startup

let pageStarted = false;

function pageStartup() {
    //navbarHamburgerInstantCollapse();
    previewProjectClose();
    scanProjects();
}

function loadingScreenHide() {

    if (pageStarted) return;
    
    // onstart load
    let loadingDiv = document.getElementById("loadingScreen");
    let pageThemeIcon = document.getElementById("navbarColorSchemeChanger");

    loadingDiv.style.animation = 'loadingFadeOut 1s forwards';
    pageThemeIcon.style.animation = "navbarThemeOnLoad 0.8s forwards ease";

    pageStarted = true;
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

            // apply page icon
            let pageIcon = document.getElementById('navbarPageIcon');
            pageIcon.src = data.metadata.icon;
            
            // fetch footer
            data.metadata.footer.forEach(element => {
                listFooter.insertAdjacentHTML('beforeend', 
                    `<li class="footer-card-data" alt="${element.name}">
                        <a href="${element.url}" target="_blank"><img src="${mainPath}/assets/socialmedia/${element.logo}" class="svg-color" alt="${element.name}" title="${element.name}"></a>
                    </li>`);
            });
            
            // fetch projects
            data.projects.forEach( (element, projectIndex) => {
                
                if (element.hide) return;

                let _type, _status, _caption, _date, _description, _screenshots;
                _date = (element.date === "") ? "TBD" : element.date;
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
                                    <p>${_date}</p>
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
                            
                            <button onclick="previewProjectOpen('${projectIndex}')">Ver más</button>
                        </div>
                    </li>`);
            });
            
            // fetch languages
            data.languages.forEach(element => {
                listLanguages.insertAdjacentHTML('beforeend', 
                    `<li class="general-card" alt="${element.alt}">
                        <img src="${mainPath}/assets/lang/${element.logo}" width="64px" alt="${element.alt} logo">
                        <p>${element.name}</p>
                        <progress value="${element.percent}" max="100" style="--value: ${element.percent}; --max: 100;"></progress>
                    </li>`);
            });
            
            // fetch technologies
            data.technologies.forEach(element => {
                projectTechnologies.insertAdjacentHTML('beforeend', 
                    `<li class="general-card" alt="${element.alt} project">
                        <img src="${mainPath}/assets/logo/${element.logo}" width="64px" alt="${element.alt} logo">
                        <p>${element.name}</p>
                        <progress value="${element.percent}" max="100" style="--value: ${element.percent}; --max: 100;"></progress>
                    </li>`);
            });
            
            // fetch software
            data.software.forEach(element => {
                listSoftware.insertAdjacentHTML('beforeend', 
                    `<li class="general-card" alt="${element.alt}">
                        <img src="${mainPath}/assets/logo/${element.logo}" width="64px" alt="${element.alt} logo">
                        <p>${element.name}</p>
                        <progress value="${element.percent}" max="100" style="--value: ${element.percent}; --max: 100;"></progress>
                    </li>`);
            });

            //apply color scheme
            navbarApplyColorScheme(colorSchemeData.load());
        });
}

//#endregion

// #region preview

let previewOpen = false;
let previewDiv = document.getElementById("previewProject");
    
function previewProjectOpen(projectId) {

    if (previewOpen) return;

    // scroll to top
    document.getElementById('previewContent').scrollTop = 0;

    // apply data
    fetch(jsonfile)
        .then(res => res.json())
        .then(data => {
            let project = data.projects[projectId];

            let projectnavbar = document.getElementById("previewProjectNav");
            projectnavbar.style.backgroundImage = `linear-gradient(to top, black, transparent), url('${mainPath}/assets/projects/${project.id}/card.png')`;

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

            let previewProjectURL = document.getElementById("previewProjectURL");
            previewProjectURL.innerHTML = "";

            project.url.forEach(element => {
                if (element.url === "") return;

                let _name;

                switch (project.type) {
                    case 0: _name = `Descargar (${element.name})`; break;
                    case 1: _name = `Descargar (${element.name})`; break;
                    case 2: _name = "Visitar página web"; break;
                    case 3: _name = "Visitar página oficial"; break;
                    default: _name = (element.name === "") ? "Visitar página" : element.name; break;
                }
                
                previewProjectURL.insertAdjacentHTML('beforeend', 
                    `<li alt="${element.name}">
                        <a href="${element.url}" target="_blank">${_name}</a>
                    </li>`);
            });

            // show preview
            previewDiv.style.animation = 'previewShow 0.3s forwards';
    });
    
    previewOpen = true;
    root.style.overflow = 'hidden';
}

function previewProjectClose() {
    previewOpen = false;
    root.style.overflow = 'visible';
    previewDiv.style.animation = 'previewHide 0.3s forwards ease-in-out';
}

// #endregion

//#region navbar and Hamburger

// Check close
function navbarHamburgerInteract() {
    let navbarMobile = document.getElementById("navbarMobileOptions");
    let navbarHamburgerIcon = document.getElementById("navbarHamburgerIcon");
    
    if (navbarHamburgerOpen === false) {
        navbarHamburgerOpen = true;
        navbarMobile.style.animation = "navbar-options-mobile-hide 0.3s forwards";
        navbarHamburgerIcon.src = `${mainPath}/assets/ui/hamburger.svg`;
    } else {
        navbarHamburgerOpen = false;
        navbarMobile.style.animation = "navbar-options-mobile-show 0.3s forwards";
        navbarHamburgerIcon.src = `${mainPath}/assets/ui/hamburger_close.svg`;
    }
}

// Instant collapse
function navbarHamburgerInstantCollapse() {
    let navbarMobile = document.getElementById("navbarMobileOptions");
    let navbarHamburgerIcon = document.getElementById("navbarHamburgerIcon");
    
    navbarHamburgerOpen = true;
    navbarMobile.style.animation = "navbar-options-mobile-hide 0s forwards";
    navbarHamburgerIcon.src = `${mainPath}/assets/page/hamburger.svg`;
}

// Force close
function navbarHamburgerCollapse() {
    navbarHamburgerOpen = false;
    navbarHamburgerInteract();
}

// Auto close navbar
let viewWidth = window.matchMedia("(max-width: 780px)");

viewWidth.addEventListener("change", function() {
    //navbarHamburgerCollapse();
});

// Apply color scheme
function navbarApplyColorScheme(scheme) {
    let navbarColorSchemeChanger = document.getElementById("navbarColorSchemeChanger");
    let svgClass = document.getElementsByClassName("svg-color");

    Array.from(svgClass).forEach(e => {

        switch(scheme) {
            // Dark theme
            case 0:
                navbarColorSchemeChanger.src = `${mainPath}/assets/ui/mode_dark.svg`;
                root.style = "color-scheme: dark;"
                root.style.setProperty('--color-contrast', '#FA0092');
                e.style = "filter: invert(0%);";
            break;

            // Light theme
            case 1:
                navbarColorSchemeChanger.src = `${mainPath}/assets/ui/mode_light.svg`;
                root.style = "color-scheme: light;"
                root.style.setProperty('--color-contrast', '#7000ff');
                e.style = "filter: invert(100%);";
            break;
        }
    });

    // onload
    loadingScreenHide();
}


// Change color scheme
function navbarChangeColorScheme() {
    if (navbarColorSchemeOption < 1) {
        navbarColorSchemeOption += 1;
    } else {
        navbarColorSchemeOption = 0;
    }

    colorSchemeData.save(navbarColorSchemeOption);
    navbarApplyColorScheme(navbarColorSchemeOption);
}

//#endregion