import 'animate.css';
import { gsap } from "gsap";

//*******************
// functions
//*******************

function removeNavBar() {
    if(responsiveMenu)  {
        responsiveMenu.remove();
        menuIcon.forEach((icon, index) =>    {
            index += 1;
            icon.classList.remove(`menubar${index}`);
            icon.classList.remove(`menubar${index}`);
            icon.classList.remove(`menubar${index}`);
            clicked = false;
        });
        menuIconContainer.style.border = "2px solid var(--font-30)";
    }
}

async function langFetch(langChoice) {
    const response = await fetch(`./lang/${langChoice}.json`);
    const data = await response.json();
    return data;
}

//*******************
// main program
//*******************

// navbar width: 750px +

addEventListener("scroll", () => {
    if(window.innerWidth > 750)    {
        const trackedElement = document.getElementById("positionPoint");
        let rect = trackedElement.getBoundingClientRect();
        let header = document.getElementById("MS");
        let navBar = document.getElementById("desktopNav");

        if (rect.top <= 60) {
            navBar.classList.add("fixed");
            header.classList.add("navMargin");
            navBar.classList.add("animate__animated", "animate__fadeInDown", "animate__fast");
        } else if(rect.top > 60){
            navBar.classList.remove("fixed");
            header.classList.remove("navMargin");
            navBar.classList.remove("animate__animated", "animate__fadeInDown", "animate__fast");
        }
    }
});

// navbar up to width: 750px

const header = document.querySelector("header");
const menuIconContainer = document.querySelector(".menuIconContainer");
const menuIcon = document.querySelectorAll(".menuIcon");
let clicked = false;
let responsiveMenu;

// remove navBar if clicked anywhere else than a link from menu + remove miniGame if miniGame is active

document.addEventListener("click", event => {
    const targetClass = event.target.classList.value;
    if(clicked && targetClass !== "link")    {
        removeNavBar();
    }
    if(active && targetClass !== "miniGameButton") {
        // form.remove();
        // active = false;
        console.log(active);
    }
});

// changing navBar icon to red cross and back + generating a menu items

menuIconContainer.addEventListener("click", () => {
    if(clicked) {
        menuIcon.forEach((icon, index) =>    {
            index += 1;
            icon.classList.remove(`menubar${index}`);
            icon.classList.remove(`menubar${index}`);
            icon.classList.remove(`menubar${index}`);
            clicked = false;
        });
        menuIconContainer.style.border = "2px solid var(--font-30)";
        responsiveMenu.classList.add("animate__animated", "animate__backOutRight", "animate__fast");
    }
    else    {
        if(responsiveMenu)  {
            responsiveMenu.remove();
        }
        menuIcon.forEach((icon, index) =>    {
            index += 1;
            icon.classList.add(`menubar${index}`);
            icon.classList.add(`menubar${index}`);
            icon.classList.add(`menubar${index}`);
        });
        setTimeout(() => {
            clicked = true;
        }, 0);
        menuIconContainer.style.border = "2px solid var(--nav-line10)";
        responsiveMenu = document.createElement("ul");
        responsiveMenu.innerHTML = `<li class="menuItem"><a href="#AboutMe" class="link">O mně</a></li>
                                    <li class="menuItem"><a href="#MyProjects" class="link">Moje projekty</a></li>
                                    <li class="menuItem"><a href="#Links" class="link">Odkazy</a></li>
                                    <li class="menuItem"><a href="#Contacts" class="link">Kontakt</a></li>`;
        responsiveMenu.classList.add("responsiveMenu");
        responsiveMenu.classList.add("animate__animated", "animate__backInRight", "animate__fast");
        header.appendChild(responsiveMenu);
    }
});

// checking resize to prevent menu duplication

addEventListener("resize", () => {
    if(window.innerWidth > 750) {
        removeNavBar();
    }
});

// scaling while hover images in MyProjects

const projectImages = document.querySelectorAll(".hoverScale");

projectImages.forEach(projectImg =>    {
    projectImg.addEventListener("mouseenter", event => {
        gsap.to(event.target, {scale: 1.2, duration: .5});
        gsap.to(event.target.nextElementSibling, {scale: 1.2, duration: .5});
    });
    projectImg.addEventListener("mouseout", event => {
        gsap.to(event.target, {overwrite: true, scale: 1, duration: .3});
        gsap.to(event.target.nextElementSibling, {overwrite: true, scale: 1, duration: .3});
    });
});

// changing languages

const langElement = document.querySelector(".language");
const csData = await langFetch("CS");
const enData = await langFetch("EN");
const navigation = document.querySelectorAll(".nav a");
const aboutMeTitle = document.querySelector(".AboutMe h1");
const aboutMeContent = document.querySelectorAll(".AboutMe article p");
const myProjectsTitle = document.querySelector(".MyProjects h1");
const myProjectsName = document.querySelectorAll(".MyProjects article h2");
const myProjectsContent = document.querySelectorAll(".MyProjects article p");
const linksTitle = document.querySelector(".Links h1");
const contacts = document.querySelector(".Contacts h1");
const contactsName = document.querySelector(".Contacts ul li");

langElement.addEventListener("click", () => {
    if(langElement.textContent === "CS")    {
        langElement.classList.remove("animate__animated", "animate__pulse");
        langElement.textContent = "EN";
        navigation.forEach((navItem, index) => {
            navItem.textContent = enData.navBar[index];
        });
        aboutMeTitle.textContent = enData.aboutMe.title;
        aboutMeContent.forEach((paragraph, index) => {
            paragraph.textContent = enData.aboutMe.paragraphs[index];
        });
        myProjectsTitle.textContent = enData.myProjects.title;
        myProjectsName.forEach((projectName, index) => {
            projectName.textContent = enData.myProjects.projects[index].title;
        });
        myProjectsContent.forEach((projectContent, index) => {
            projectContent.textContent = enData.myProjects.projects[index].description;
        });
        linksTitle.textContent = enData.links.title;
        contacts.textContent = enData.contacts.title;
        contactsName.textContent = enData.contacts.name;
    }
    else    {
        langElement.classList.remove("animate__animated", "animate__pulse");
        langElement.textContent = "CS";
        navigation.forEach((navItem, index) => {
            navItem.textContent = csData.navBar[index];
        });
        aboutMeTitle.textContent = csData.aboutMe.title;
        aboutMeContent.forEach((paragraph, index) => {
            paragraph.textContent = csData.aboutMe.paragraphs[index];
        });
        myProjectsTitle.textContent = csData.myProjects.title;
        myProjectsName.forEach((projectName, index) => {
            projectName.textContent = csData.myProjects.projects[index].title;
        });
        myProjectsContent.forEach((projectContent, index) => {
            projectContent.textContent = csData.myProjects.projects[index].description;
        });
        linksTitle.textContent = csData.links.title;
        contacts.textContent = csData.contacts.title;
        contactsName.textContent = csData.contacts.name;
    }
    setTimeout(() => {
        langElement.classList.add("animate__animated", "animate__pulse", "animate__faster");
    }, 0);
});

// minigame start

const body = document.querySelector("body");
const miniGame = document.querySelector(".miniGame");
let active = false;
const form = document.createElement("form");

miniGame.addEventListener("click", () => {
    if(!active)  {
        form.innerHTML = `<h1>Catch the DOT game</h1>
            
                          <div class="container">
                
                            <input class="miniGameButton" type="radio" name="difficulty" id="easy" checked><label for="easy">easy</label>
                            <input class="miniGameButton" type="radio" name="difficulty" id="medium"><label for="medium">medium</label>
                            <input class="miniGameButton" type="radio" name="difficulty" id="hard"><label for="hard">hard</label>
                
                          </div>
                
                          <button class="button">START</button>`;
        form.classList.add("box");
        body.appendChild(form);
        active = true;
    }

});

document