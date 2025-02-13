// Vars
const colorScheme = {
    set: function(scheme) {
        localStorage.setItem("colorScheme", parseInt(scheme));
    },
    get: function() {
        let val = localStorage.getItem("colorScheme");
        
        return (val === null) ? 0 : parseInt(val);
    }
}

let navbarHamburgerOpen = false;
let navbarColorSchemeOption = colorScheme.get();

const mainPath = '../';
let root = document.documentElement;

//#region startup

let pageStarted = false;

function pageStartup() {
    navbarHamburgerInstantCollapse();
    previewProjectClose();
    scanData();
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

const pagedata = '../pagedata.json'; // "https://brunoo1545.github.io/pagedata.json"

function displayMetadata(project) {
    var _data = {
        type: "",
        status: "",
        date: ""
    }

    switch (project.type) {
        case 0: _data.type = "Software"; break;
        case 1: _data.type = "Videojuego"; break;
        case 2: _data.type = "Página web"; break;
        case 3: _data.type = "Otro"; break;
        default: _data.type = "Desconocido"; break;
    }

    switch (project.status) {
        case 0: _data.status = "Concepto"; break;
        case 1: _data.status = "En desarollo"; break;
        case 2: _data.status = "Terminado"; break;
        case 3: _data.status = "Cancelado"; break;
        default: _data.status = "Desconocido"; break;
    }

    _data.date = (project.date === "") ? "TBD" : project.date;

    return _data;
}

async function scanData() {
    const listNavbar = document.getElementById('list-navbar-options');
    const listNavbarMobile = document.getElementById('list-navbar-options-mobile');
    const listFooter = document.getElementById('list-footer');
    const listProject = document.getElementById('list-project');
    const listLanguages = document.getElementById('list-languages');
    const projectTechnologies = document.getElementById('list-technologies');
    const listSoftware = document.getElementById('list-software');
    
    fetch(pagedata)
        .then(res => res.json())
        .then(data => {

            // apply page icon
            document.getElementById('navbarPageIcon').src = data.metadata.icon;
            
            // fetch navbar options
            data.metadata.navbar.forEach(element => {
                listNavbar.insertAdjacentHTML('beforeend', 
                    `<li alt="${element.name}">
                        <a href="${element.url}">${element.name}</a>
                    </li>`);
                
                listNavbarMobile.insertAdjacentHTML('beforeend', 
                    `<li alt="${element.name}" onclick="navbarHamburgerInteract();">
                        <a href="${element.url}">${element.name}</a>
                    </li>`);
            });
            
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

                let _metadata, _caption, _description, _screenshots;
                _metadata = displayMetadata(element);
                _description = (element.description === "") ? "No hay decripción." : element.description;
                _caption = (element.caption === "") ? "Sin información." : element.caption;
                
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
                                    <p>${_metadata.date}</p>
                                </div>
                                <div class="project-card-preview-data">
                                    <img src="${mainPath}/assets/ui/card_type.svg" class="svg-color" alt="Card type">
                                    <p>${_metadata.type}</p>
                                </div>
                                <div class="project-card-preview-data">
                                    <img src="${mainPath}/assets/ui/card_status.svg" class="svg-color" alt="Card status">
                                    <p>${_metadata.status}</p>
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
            navbarApplyColorScheme(colorScheme.get());
        });
}

//#endregion

//#region preview

let previewOpen = false;
let previewDiv = document.getElementById("previewProject");
    
function previewProjectOpen(projectId) {

    // scroll to top
    document.getElementById('previewContent').scrollTop = 0;

    if (previewOpen) return;

    // apply data
    fetch(pagedata)
        .then(res => res.json())
        .then(data => {
            let project = data.projects[projectId];

            // metadata
            let projectMetadataDate = document.getElementById("previewProjectMetadataDate");
            let projectMetadataType = document.getElementById("previewProjectMetadataType");
            let projectMetadataStatus = document.getElementById("previewProjectMetadataStatus");
            let metadata = displayMetadata(project);

            projectMetadataDate.textContent = metadata.date;
            projectMetadataType.textContent = metadata.type;
            projectMetadataStatus.textContent = metadata.status;

            let projectnavbar, projectTitle, projectIcon, projectCaption, projectDescription, projectHistory, projectLanguages, projectTechnologies, previewProjectURL;

            projectnavbar = document.getElementById("previewProjectNav");
            projectnavbar.style.backgroundImage = `linear-gradient(to top, black, transparent), url('${mainPath}/assets/projects/${project.id}/card.png')`;

            projectTitle = document.getElementById("previewProjectTitle");
            projectTitle.textContent = project.title;
            
            projectIcon = document.getElementById("previewProjectIcon");
            projectIcon.src = `${mainPath}/assets/projects/${project.id}/icon.png`;

            projectCaption = document.getElementById("previewProjectCaption");
            projectCaption.textContent = (project.caption === "") ? "" : `"${project.caption}"`;

            projectDescription = document.getElementById("previewProjectDescription");
            projectDescription.textContent = (project.description === "") ? "Sin decripción." : project.description;
            
            projectHistory = document.getElementById("previewProjectHistory");
            projectHistory.textContent = (project.history === "") ? "Sin historia." : project.history;

            projectLanguages = document.getElementById("listProjectLanguages");
            projectLanguages.innerHTML = "";
            project.languages.forEach(element => {
                projectLanguages.insertAdjacentHTML('beforeend', 
                    `<li alt="${element}">
                        <p>${element}</p>
                    </li>`);
            });

            projectTechnologies = document.getElementById("listProjectTechnologies");
            projectTechnologies.innerHTML = "";

            project.technologies.forEach(element => {
                projectTechnologies.insertAdjacentHTML('beforeend', 
                    `<li alt="${element.name}">
                        <a href="${element.source}" target="_blank">${element.name}</a>
                    </li>`);
            });

            previewProjectURL = document.getElementById("previewProjectURL");
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

let navbarMobile = document.getElementById("navHamburgerMenu");
let navbarHamburgerIcon = document.getElementById("navbarHamburgerTrigger");

// Check close
function navbarHamburgerInteract() {
    if (navbarHamburgerOpen === false) {
        navbarHamburgerOpen = true;
        navbarMobile.style.animation = "hamburgerMenuTrayOpen 0.3s forwards";
        navbarHamburgerIcon.src = `${mainPath}/assets/ui/hamburger_close.svg`;
    } else {
        navbarHamburgerOpen = false;
        navbarMobile.style.animation = "hamburgerMenuTrayClose 0.3s forwards";
        navbarHamburgerIcon.src = `${mainPath}/assets/ui/hamburger.svg`;
    }
}

// Instant collapse
function navbarHamburgerInstantCollapse() {
    navbarHamburgerOpen = false;
    navbarMobile.style.animation = "hamburgerMenuTrayClose 0s forwards";
    navbarHamburgerIcon.src = `${mainPath}/assets/ui/hamburger.svg`;
}

// Auto close navbar
window.matchMedia("(max-width: 950px)").addEventListener("change", function() {
    navbarHamburgerInstantCollapse();
});

//#endregion

//#region color scheme

// Apply color scheme
function navbarApplyColorScheme(scheme) {
    let navbarColorSchemeChanger = document.getElementById("navbarColorSchemeChanger");
    let svgClass = document.getElementsByClassName("svg-color");

    Array.from(svgClass).forEach(icons => {

        switch(scheme) {
            // Dark theme
            case 0:
                navbarColorSchemeChanger.src = `${mainPath}/assets/ui/mode_dark.svg`;
                root.style = "color-scheme: dark;"
                root.style.setProperty('--color-contrast', '#FA0092');
                icons.style = "filter: invert(0%);";
            break;

            // Light theme
            case 1:
                navbarColorSchemeChanger.src = `${mainPath}/assets/ui/mode_light.svg`;
                root.style = "color-scheme: light;"
                root.style.setProperty('--color-contrast', '#7000ff');
                icons.style = "filter: invert(100%);";
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

    colorScheme.set(navbarColorSchemeOption);
    navbarApplyColorScheme(navbarColorSchemeOption);
}

//#endregion    