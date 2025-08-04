import "animate.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as focusTrap from "focus-trap";

//*******************
// functions
//*******************

function removeNavBar() {
  if (responsiveMenu) {
    responsiveMenu.remove();
    menuIcon.forEach((icon, index) => {
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

function imgScale(img) {
  img.addEventListener("mouseenter", (event) => {
    const target = event.currentTarget;
    const sibling = target.nextElementSibling;
    gsap.to(target, { scale: 1.2, duration: 0.5 });
    gsap.to(sibling, { scale: 1.2, duration: 0.5 });
  });
  img.addEventListener("mouseout", (event) => {
    const target = event.currentTarget;
    const sibling = target.nextElementSibling;
    gsap.to(target, { overwrite: true, scale: 1, duration: 0.3 });
    gsap.to(sibling, { overwrite: true, scale: 1, duration: 0.3 });
  });
}

// minigame

function gameMenu() {
  createGame.innerHTML = `<form action="" class="box">

                                <h1>Catch the SQUARE game</h1>

                                <div class="container">

                                    <input class="miniGameButton" type="radio" name="difficulty" id="easy" checked><label for="easy">easy</label>
                                    <input class="miniGameButton" type="radio" name="difficulty" id="medium"><label for="medium">medium</label>
                                    <input class="miniGameButton" type="radio" name="difficulty" id="hard"><label for="hard">hard</label>

                                </div>

                                <button class="button" id="start">START</button>
                                <button class="button" id="exit">EXIT</button>

                            </form>`;
  createGame.style.width = "320px";
  createGame.style.height = "0";
  createGame.style.margin = "-160px";
  createGame.classList.add("cover");
  body.appendChild(createGame);
  activeMiniGame = true;
  const startButton = document.getElementById("start");
  const exittButton = document.getElementById("exit");
  startWindow = document.querySelector(".box");
  startButton.addEventListener("click", (event) => {
    event.preventDefault();
    start();
  });
  exittButton.addEventListener("click", (event) => {
    event.preventDefault();
    exit();
  });
}

function responsiveGameWindow() {
  if (window.innerWidth > 750) {
    gameBox.style.width = "600px";
    gameBox.style.height = "600px";
    createGame.style.width = "600px";
    createGame.style.height = "600px";
    createGame.style.margin = "-300px";
    positionX = 580;
    positionY = 550;
  } else if (window.innerWidth <= 750 && window.innerWidth > 500) {
    gameBox.style.width = "450px";
    gameBox.style.height = "450px";
    createGame.style.width = "450px";
    createGame.style.height = "450px";
    createGame.style.margin = "-225px";
    positionX = 428;
    positionY = 400;
  } else {
    gameBox.style.width = "300px";
    gameBox.style.height = "300px";
    createGame.style.width = "300px";
    createGame.style.height = "300px";
    createGame.style.margin = "-150px";
    positionX = 280;
    positionY = 250;
  }
}

function start() {
  const difficulty = document.querySelector('input[name="difficulty"]:checked');
  startWindow.remove();
  difficultyChoice(difficulty.id);
  createNewGame();
  createNewSquare();
}

function difficultyChoice(difficulty) {
  switch (difficulty) {
    case "easy":
      difficultySpeed = 15;
      break;
    case "medium":
      difficultySpeed = 10;
      break;
    case "hard":
      difficultySpeed = 5;
      break;
  }
}

function createNewGame() {
  scoreBoard.textContent = `Your Score is: ${score}`;
  responsiveGameWindow();
  createGame.appendChild(gameBox);
  gameBox.appendChild(scoreBoard);
  trap.activate();
}

function createNewSquare() {
  if (gameBox.contains(dot)) {
    gameBox.removeChild(dot);
  }
  score++;
  scoreBoard.textContent = `Your Score is: ${score}`;
  setTimeout(() => {
    let topPosition = Math.floor(Math.random() * positionY);
    let leftPosition = Math.floor(Math.random() * positionX);
    dot.style.top = `${topPosition}px`;
    dot.style.left = `${leftPosition}px`;
    gameBox.appendChild(dot);
    dotFall(topPosition);
  }, 1000);
}

function dotFall(topPosition) {
  if (gameBox.contains(dot)) {
    if (topPosition <= positionY + 30) {
      setTimeout(() => {
        topPosition += 0.5;
        dot.style.top = `${topPosition}px`;
        dotFall(topPosition);
      }, difficultySpeed);
    } else {
      gameOver();
    }
  }
}

function gameOver() {
  if (gameBox.contains(dot)) {
    gameBox.removeChild(dot);
  }
  trap.deactivate();

  gameBox.appendChild(gameOverForm);
  const gameOverButtons = document.querySelectorAll(".gameOverButton");
  gameOverButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      if (button.textContent === "RESET") {
        gameOverForm.remove();
        score = -1;
        createGame.classList.remove(
          "animate__animated",
          "animate__zoomIn",
          "animate__faster"
        );
        gameMenu();
      } else {
        exit();
      }
    });
  });
}
function exit() {
  if (gameBox.contains(dot)) {
    gameBox.removeChild(dot);
  }
  gameOverForm.remove();
  createGame.remove();
  activeMiniGame = false;
  score = -1;
}

//*******************
// main program
//*******************

// navbar width: 850px +

addEventListener("scroll", () => {
  if (window.innerWidth > 850) {
    const trackedElement = document.getElementById("positionPoint");
    let rect = trackedElement.getBoundingClientRect();
    let header = document.getElementById("MS");
    let navBar = document.getElementById("desktopNav");
    const navBarLogo = document.querySelector(".navBarLogo");
    const navBarLang = document.querySelector(".navBarLanguages");

    if (rect.top <= 60) {
      navBar.classList.add("fixed");
      navBarLang.classList.remove("hide");
      navBarLogo.classList.remove("hide");
      header.classList.add("navMargin");
      navBar.classList.add(
        "animate__animated",
        "animate__fadeInDown",
        "animate__fast"
      );
    } else if (rect.top > 60) {
      navBar.classList.remove("fixed");
      navBarLang.classList.add("hide");
      navBarLogo.classList.add("hide");
      header.classList.remove("navMargin");
      navBar.classList.remove(
        "animate__animated",
        "animate__fadeInDown",
        "animate__fast"
      );
    }
  }
});

// navbar up to width: 850px

const header = document.querySelector("header");
const menuIconContainer = document.querySelector(".menuIconContainer");
const menuIcon = document.querySelectorAll(".menuIcon");
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
      icon.classList.remove(`menubar${index}`);
      icon.classList.remove(`menubar${index}`);
      clicked = false;
    });
    menuIconContainer.style.border = "2px solid var(--font-30)";
    responsiveMenu.classList.add(
      "animate__animated",
      "animate__backOutRight",
      "animate__fast"
    );
  } else {
    if (responsiveMenu) {
      responsiveMenu.remove();
    }
    menuIcon.forEach((icon, index) => {
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
    if (langElement[0].textContent === "CS") {
      responsiveMenu.innerHTML = `<li class="menuItem"><a href="#AboutMe" class="link">${csData.navBar[0]}</a></li>
                                        <li class="menuItem"><a href="#MyProjects" class="link">${csData.navBar[1]}</a></li>
                                        <li class="menuItem"><a href="#Links" class="link">${csData.navBar[2]}</a></li>
                                        <li class="menuItem"><a href="#Contacts" class="link">${csData.navBar[3]}</a></li>`;
    } else if (langElement[0].textContent === "EN") {
      responsiveMenu.innerHTML = `<li class="menuItem menuItemEn"><a href="#AboutMe" class="link">${enData.navBar[0]}</a></li>
                                        <li class="menuItem menuItemEn"><a href="#MyProjects" class="link">${enData.navBar[1]}</a></li>
                                        <li class="menuItem menuItemEn"><a href="#Links" class="link">${enData.navBar[2]}</a></li>
                                        <li class="menuItem menuItemEn"><a href="#Contacts" class="link">${enData.navBar[3]}</a></li>`;
    }
    responsiveMenu.classList.add("responsiveMenu");
    responsiveMenu.classList.add(
      "animate__animated",
      "animate__backInRight",
      "animate__fast"
    );
    header.appendChild(responsiveMenu);
  }
});

// checking resize to prevent menu duplication

addEventListener("resize", () => {
  if (window.innerWidth > 850) {
    removeNavBar();
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
const aboutMeTitle = document.querySelector(".AboutMe h2");
const aboutMeContent = document.querySelectorAll(".AboutMe article p");
const myProjectsTitle = document.querySelector(".MyProjects h2");
const myProjectsName = document.querySelectorAll(".MyProjects article h3");
const myProjectsContent = document.querySelectorAll(
  ".MyProjects article p:first-of-type"
);
const linksTitle = document.querySelector(".Links h2");
const contacts = document.querySelector(".Contacts h2");
const contactsName = document.querySelector(".Contacts ul li");

langElement.forEach((langButton) => {
  langButton.addEventListener("click", () => {
    if (langButton.textContent === "CS") {
      langButton.classList.remove("animate__animated", "animate__pulse");
      langElement.forEach((langButton) => {
        langButton.textContent = "EN";
      });
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
        projectContent.textContent =
          enData.myProjects.projects[index].description;
      });
      linksTitle.textContent = enData.links.title;
      contacts.textContent = enData.contacts.title;
      contactsName.textContent = enData.contacts.name;
    } else {
      langButton.classList.remove("animate__animated", "animate__pulse");
      langElement.forEach((langButton) => {
        langButton.textContent = "CS";
      });
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
        projectContent.textContent =
          csData.myProjects.projects[index].description;
      });
      linksTitle.textContent = csData.links.title;
      contacts.textContent = csData.contacts.title;
      contactsName.textContent = csData.contacts.name;
    }
    setTimeout(() => {
      langButton.classList.add(
        "animate__animated",
        "animate__pulse",
        "animate__faster"
      );
    }, 0);
  });
});

// minigame start

const gameOverForm = document.createElement("form");
const body = document.querySelector("body");
const miniGame = document.querySelector(".miniGame");
let activeMiniGame = false;
const createGame = document.createElement("div");
const gameBox = document.createElement("div");
let score = -1;
let scoreBoard = document.createElement("p");
let dot = document.createElement("img");
let difficultySpeed;
let startWindow;
let positionX;
let positionY;
let timeoutCloseWindow;
const trap = focusTrap.createFocusTrap(createGame, {
  onPostActivate: () =>
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        exit();
      }
    }),
});

gameBox.classList.add("newGame");
gameBox.setAttribute("tabindex", "0");
dot.src = "./img/dot.jpg";
dot.classList.add("dot");
gameOverForm.innerHTML = `<button class="gameOverButton">RESET</button>
                          <button class="gameOverButton">EXIT</button>`;
gameOverForm.classList.add("gameOverForm");

miniGame.addEventListener("click", () => {
  if (!activeMiniGame) {
    createGame.remove();
    clearTimeout(timeoutCloseWindow);
    gameMenu();
    createGame.classList.remove(
      "animate__animated",
      "animate__zoomOut",
      "animate__faster"
    );
    createGame.classList.add(
      "animate__animated",
      "animate__zoomIn",
      "animate__faster"
    );
  } else {
    if (activeMiniGame) {
      createGame.classList.remove(
        "animate__animated",
        "animate__zoomIn",
        "animate__faster"
      );
      createGame.classList.add(
        "animate__animated",
        "animate__zoomOut",
        "animate__faster"
      );
      timeoutCloseWindow = setTimeout(() => {
        createGame.remove();
      }, 300);
      activeMiniGame = false;
    }
  }
});

dot.addEventListener("click", createNewSquare);

// some gsap animations

gsap.registerPlugin(ScrollTrigger);

const paragraphs = gsap.utils.toArray(".textAnimation");
const boxes = gsap.utils.toArray(".boxAnimation");
const myProjectsAnimation = gsap.utils.toArray(".myProjectsAnimation");
const aboutMeAnimation = gsap.utils.toArray(".aboutMeAnimation");

paragraphs.forEach((paragraph) => {
  gsap.from(paragraph, {
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: paragraph,
      toggleActions: "play none none none",
    },
  });
});

boxes.forEach((box) => {
  gsap.from(box, {
    y: -50,
    duration: 1,
    scrollTrigger: {
      trigger: box,
      toggleActions: "play none none none",
    },
  });
});

if (window.innerWidth <= 850) {
  aboutMeAnimation.forEach((img) => {
    gsap.from(img, {
      x: 300,
      duration: 1.5,
      scrollTrigger: {
        trigger: img,
        toggleActions: "play none none none",
      },
    });
  });
  myProjectsAnimation.forEach((img) => {
    gsap.from(img, {
      x: 300,
      duration: 1.5,
      scrollTrigger: {
        trigger: img,
        toggleActions: "play none none none",
      },
      onComplete: () => imgScale(img),
    });
  });
} else if (window.innerWidth > 850) {
  aboutMeAnimation.forEach((img) => {
    gsap.from(img, {
      x: 300,
      duration: 1.5,
      scrollTrigger: {
        trigger: img,
        toggleActions: "play none none none",
      },
    });
  });
  myProjectsAnimation.forEach((img) => {
    gsap.from(img, {
      x: -300,
      duration: 1.5,
      scrollTrigger: {
        trigger: img,
        toggleActions: "play none none none",
      },
      onComplete: () => imgScale(img),
    });
  });
}
