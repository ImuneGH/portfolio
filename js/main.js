import "animate.css";

//*******************
// functions
//*******************

function removeNavBar() {
  if (responsiveMenu) {
    responsiveMenu.remove();
    menuIcon.forEach((icon, index) => {
      index += 1;
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

function handleLinks() {
  const toggleHref = document.querySelectorAll(".removeForDesktop");

  if (window.innerWidth > 850) {
    toggleHref.forEach((element) => {
      if (!element.dataset.originalHref) {
        element.dataset.originalHref = element.href;
      }
      element.href = "#";
      element.onclick = (e) => e.preventDefault();
    });
  } else {
    toggleHref.forEach((element) => {
      if (element.getAttribute("href") === "#") {
        element.href = element.dataset.originalHref;
        element.onclick = null;
      }
    });
  }
}

//*******************
// main program
//*******************

// navbar width: 850px +

addEventListener("scroll", () => {
  if (window.innerWidth > 850) {
    const trackedElement = document.getElementById("position-point");
    let rect = trackedElement.getBoundingClientRect();
    let header = document.getElementById("MS");
    let navBar = document.getElementById("desktop-nav");
    const navBarLogo = document.querySelector(".nav-bar-logo");
    const navBarButtons = document.querySelector(
      ".desktop-nav .button-container",
    );

    if (rect.top <= 60) {
      navBar.classList.add("fixed");
      navBarButtons.classList.remove("hide");
      navBarLogo.classList.remove("hide");
      header.classList.add("nav-margin");
      navBar.classList.add(
        "animate__animated",
        "animate__fadeInDown",
        "animate__fast",
      );
    } else if (rect.top > 60) {
      navBar.classList.remove("fixed");
      navBarButtons.classList.add("hide");
      navBarLogo.classList.add("hide");
      header.classList.remove("nav-margin");
      navBar.classList.remove(
        "animate__animated",
        "animate__fadeInDown",
        "animate__fast",
      );
    }
  }
});

// navbar up to width: 850px

const header = document.querySelector("header");
const menuIconContainer = document.querySelector(".menu-icon-container");
const menuIcon = document.querySelectorAll(".menu-icon");
let clicked = false;
let responsiveMenu;

// remove navBar if clicked anywhere else than a link from menu + remove miniGame if miniGame is active

document.addEventListener("click", (event) => {
  const targetClass = event.target.classList.value;
  if (clicked && targetClass !== "link") {
    removeNavBar();
  }
});

// changing navBar icon to red cross and back + generating a menu items

menuIconContainer.addEventListener("click", () => {
  if (clicked) {
    menuIcon.forEach((icon, index) => {
      index += 1;
      icon.classList.remove(`menubar${index}`);
      clicked = false;
    });
    menuIconContainer.style.border = "2px solid var(--font-30)";
    responsiveMenu.classList.add(
      "animate__animated",
      "animate__backOutRight",
      "animate__fast",
    );
  } else {
    if (responsiveMenu) {
      responsiveMenu.remove();
    }
    menuIcon.forEach((icon, index) => {
      index += 1;
      icon.classList.add(`menubar${index}`);
    });
    setTimeout(() => {
      clicked = true;
    }, 0);
    menuIconContainer.style.border = "2px solid var(--nav-line10)";
    responsiveMenu = document.createElement("ul");
    if (langElement[0].textContent === "EN") {
      responsiveMenu.innerHTML = `<li class="menu-item"><a href="#about-me" class="link">${csData.navBar[0]}</a></li>
                                        <li class="menu-item"><a href="#my-projects" class="link">${csData.navBar[1]}</a></li>
                                        <li class="menu-item"><a href="#links" class="link">${csData.navBar[2]}</a></li>
                                        <li class="menu-item"><a href="#contacts" class="link">${csData.navBar[3]}</a></li>`;
    } else if (langElement[0].textContent === "CZ") {
      responsiveMenu.innerHTML = `<li class="menu-item menu-item-en"><a href="#about-me" class="link">${enData.navBar[0]}</a></li>
                                        <li class="menu-item menu-item-en"><a href="#my-projects" class="link">${enData.navBar[1]}</a></li>
                                        <li class="menu-item menu-item-en"><a href="#links" class="link">${enData.navBar[2]}</a></li>
                                        <li class="menu-item menu-item-en"><a href="#contacts" class="link">${enData.navBar[3]}</a></li>`;
    }
    responsiveMenu.classList.add("responsive-menu");
    responsiveMenu.classList.add(
      "animate__animated",
      "animate__backInRight",
      "animate__fast",
    );
    header.appendChild(responsiveMenu);
  }
});

// checking resize to prevent menu duplication and broken gsap animation

addEventListener("resize", () => {
  if (window.innerWidth > 850) {
    removeNavBar();
    removeScale();
    linksDesktop.forEach((link) => {
      linkAnimationDesktop(link);
    });
    removeRespLinkAnimation();
  } else {
    myProjectsAnimation.forEach((img) => {
      imgScale(img);
    });
    codeLinks.forEach((codeLink) => {
      codeLinkAnimation(codeLink);
    });
    removeLinkAnimation();
  }
});

// changing languages

let csData;
let enData;
(async function () {
  csData = await langFetch("cs");
  enData = await langFetch("en");
})();
const langElement = document.querySelectorAll(".language");
const navigation = document.querySelectorAll(".nav a");
const aboutMeTitle = document.querySelector(".about-me h1");
const aboutMeContent = document.querySelectorAll(".about-me article p");
const myProjectsTitle = document.querySelector(".my-projects h2");
const myProjectsName = document.querySelectorAll(".my-projects article h3");
const myProjectsContent = document.querySelectorAll(
  ".my-projects article p:first-of-type",
);
const myProjectsPlayButton = document.querySelectorAll(".action-button p");
const myProjectsCodeButton = document.querySelectorAll(".code-link p");
const myProjectsPlayButtonResp = document.querySelectorAll(
  ".action-button-mobile",
);
const linksTitle = document.querySelector(".links h2");
const contacts = document.querySelector(".contacts h2");
const contactsName = document.querySelector(".contacts ul li");

langElement.forEach((langButton) => {
  langButton.addEventListener("click", () => {
    if (langButton.textContent === "EN") {
      langButton.classList.remove("animate__animated", "animate__pulse");
      langElement.forEach((langButton) => {
        langButton.textContent = "CZ";
      });
      navigation.forEach((navItem, index) => {
        navItem.textContent = enData.navBar[index];
      });
      aboutMeTitle.textContent = enData.aboutMe.title;
      aboutMeContent.forEach((paragraph, index) => {
        paragraph.innerHTML = enData.aboutMe.paragraphs[index];
      });
      myProjectsTitle.textContent = enData.myProjects.title;
      myProjectsName.forEach((projectName, index) => {
        projectName.textContent = enData.myProjects.projects[index].title;
      });
      myProjectsContent.forEach((projectContent, index) => {
        projectContent.textContent =
          enData.myProjects.projects[index].description;
      });
      myProjectsPlayButton.forEach((button, index) => {
        button.textContent = enData.myProjects.projects[index].playButton;
      });
      myProjectsCodeButton.forEach((button, index) => {
        button.textContent = enData.myProjects.projects[index].codeButton;
      });
      myProjectsPlayButtonResp.forEach((button, index) => {
        button.textContent = enData.myProjects.projects[index].playButton;
      });
      linksTitle.textContent = enData.links.title;
      contacts.textContent = enData.contacts.title;
      contactsName.textContent = enData.contacts.name;
    } else {
      langButton.classList.remove("animate__animated", "animate__pulse");
      langElement.forEach((langButton) => {
        langButton.textContent = "EN";
      });
      navigation.forEach((navItem, index) => {
        navItem.textContent = csData.navBar[index];
      });
      aboutMeTitle.textContent = csData.aboutMe.title;
      aboutMeContent.forEach((paragraph, index) => {
        paragraph.innerHTML = csData.aboutMe.paragraphs[index];
      });
      myProjectsTitle.textContent = csData.myProjects.title;
      myProjectsName.forEach((projectName, index) => {
        projectName.textContent = csData.myProjects.projects[index].title;
      });
      myProjectsContent.forEach((projectContent, index) => {
        projectContent.textContent =
          csData.myProjects.projects[index].description;
      });
      myProjectsPlayButton.forEach((button, index) => {
        button.textContent = csData.myProjects.projects[index].playButton;
      });
      myProjectsCodeButton.forEach((button, index) => {
        button.textContent = csData.myProjects.projects[index].codeButton;
      });
      myProjectsPlayButtonResp.forEach((button, index) => {
        button.textContent = csData.myProjects.projects[index].playButton;
      });
      linksTitle.textContent = csData.links.title;
      contacts.textContent = csData.contacts.title;
      contactsName.textContent = csData.contacts.name;
    }
    setTimeout(() => {
      langButton.classList.add(
        "animate__animated",
        "animate__pulse",
        "animate__faster",
      );
    }, 0);
  });
});

// links handle

window.addEventListener("resize", handleLinks);
handleLinks();

// light/dark mode toggle

function themeSwitch(checkboxes, isChecked) {
  checkboxes.forEach((checkbox) => {
    checkbox.checked = isChecked;
  });
}

const storedColorTheme = localStorage.getItem("colorTheme");
const systemColorIsDark = window.matchMedia(
  "(prefers-color-scheme: dark)",
).matches;
const actualTime = new Date().getHours();
const colorThemeSwitches = document.querySelectorAll(".checkbox");
const bodyElement = document.body;

if (storedColorTheme) {
  storedColorTheme === "dark" && bodyElement.classList.add("dark");
} else if (systemColorIsDark) {
  bodyElement.classList.add("dark");
} else if (actualTime <= 6 || actualTime > 22) {
  bodyElement.classList.add("dark");
}

if (bodyElement.classList.contains("dark")) {
  themeSwitch(colorThemeSwitches, true);
}

colorThemeSwitches.forEach((colorSwitch) => {
  colorSwitch.addEventListener("change", () => {
    if (bodyElement.classList.contains("dark")) {
      localStorage.setItem("colorTheme", "light");
      bodyElement.classList.remove("dark");
      themeSwitch(colorThemeSwitches, false);
    } else {
      localStorage.setItem("colorTheme", "dark");
      bodyElement.classList.add("dark");
      themeSwitch(colorThemeSwitches, true);
    }
  });
});
