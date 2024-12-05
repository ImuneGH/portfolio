import 'animate.css';
import { gsap } from "gsap";

// functions

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

// navbar width: 750px +

addEventListener("scroll", () => {
    if(window.innerWidth > 750)    {
        let trackedElement = document.getElementById("positionPoint");
        let rect = trackedElement.getBoundingClientRect(); // Získáme pozici elementu vzhledem k viewportu
        let header = document.getElementById("MS");
        let navBar = document.getElementById("desktopNav");
    
        // Kontrola, zda je element v horní části okna (nebo pod určitým bodem)
        if (rect.top <= 60) {
            navBar.classList.add("fixed"); // Přidání třídy pro fixování
            header.classList.add("navMargin"); // přidání marginu, který vyplní místo navbaru
            navBar.classList.add("animate__animated", "animate__fadeInDown", "animate__fast");
        } else if(rect.top > 60){
            navBar.classList.remove("fixed"); // Odebrání třídy při skrolování zpět nahoru
            header.classList.remove("navMargin"); // Odebrání třídy při skrolování zpět nahoru
            navBar.classList.remove("animate__animated", "animate__fadeInDown", "animate__fast");
        }
    }
});

// navbar up to width: 750px

const body = document.querySelector("body");
const header = document.querySelector("header");
const menuIconContainer = document.querySelector(".menuIconContainer");
const menuIcon = document.querySelectorAll(".menuIcon");
let clicked = false;
let responsiveMenu;

// remove navBar if clicked anywhere else than a link from menu

document.addEventListener("click", event => {
    const targetClass = event.target.classList.value;
    if(clicked && targetClass !== "link")    {
        removeNavBar();
    }
});

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
    });
    projectImg.addEventListener("mouseleave", event => {
        gsap.to(event.target, {scale: 1, duration: .3});
    });
});