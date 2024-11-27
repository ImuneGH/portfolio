import 'animate.css';

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
    
        // Pro ukázku můžeme do konzole vypisovat pozici elementu
        // console.log("Top:", rect.top, "Bottom:", rect.bottom);
    }

});

// navbar up to width: 750px

const header = document.querySelector("header");
const menuIconContainer = document.querySelector(".menuIconContainer");
const menuIcon = document.querySelectorAll(".menuIcon");
let clicked = false;

// menuIconContainer.addEventListener("mouseover", () => {
//     if(clicked === false) {
//         menuIcon.forEach(icon =>    {
//             icon.style.background = "hsl(200, 60%, 20%)";
//         });
//     }   
// });

// menuIconContainer.addEventListener("mouseleave", () => {
//     if(clicked === false) {
//         menuIcon.forEach(icon =>    {
//             icon.style.background = "var(--font-30)";
//         });
//     }
// });

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
        
    }
    else    {
        menuIcon.forEach((icon, index) =>    {
            index += 1;
            icon.classList.add(`menubar${index}`);
            icon.classList.add(`menubar${index}`);
            icon.classList.add(`menubar${index}`);
            clicked = true;
        });
        menuIconContainer.style.border = "2px solid var(--nav-line10)";
        let responsiveMenu = document.createElement("ul");
        responsiveMenu.innerHTML = `<li class="menuItem"><a href="#AboutMe">O mně</a></li>
                                    <li class="menuItem"><a href="#MyProjects">Moje projekty</a></li>
                                    <li class="menuItem"><a href="#Links">Odkazy</a></li>
                                    <li class="menuItem"><a href="#Contacts">Kontakt</a></li>`;
        responsiveMenu.classList.add("responsiveMenu");
        header.appendChild(responsiveMenu);
    }
});