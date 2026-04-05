import {
  myProjectsAnimation,
  imgScale,
  codeLinks,
  codeLinkAnimation,
  linksDesktop,
  linkAnimationEnter,
  linkAnimationLeave,
  scaleAnimationEnter,
  scaleAnimationLeave,
  linkAnimationDesktop,
  paddingAnimationEnter,
  paddingAnimationLeave,
} from "./animations.js";
import { langElement, csData, enData } from "./languages.js";

//*******************
// functions
//*******************

export function navbar() {
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

  function removeLinkAnimation() {
    linksDesktop.forEach((link) => {
      link.removeEventListener("mouseenter", linkAnimationEnter);
      link.removeEventListener("mouseenter", linkAnimationLeave);
    });
  }

  function removeScale() {
    myProjectsAnimation.forEach((img) => {
      img.removeEventListener("mouseenter", scaleAnimationEnter);
      img.removeEventListener("mouseleave", scaleAnimationLeave);
    });
  }

  function removeRespLinkAnimation() {
    codeLinks.forEach((codeLink) => {
      codeLink.removeEventListener("mouseenter", paddingAnimationEnter);
      codeLink.removeEventListener("mouseleave", paddingAnimationLeave);
    });
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

  // links handle

  window.addEventListener("resize", handleLinks);
  handleLinks();
}
