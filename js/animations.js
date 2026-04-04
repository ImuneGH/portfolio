import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

//*******************
// functions
//*******************

function scaleAnimationEnter(event) {
  const target = event.currentTarget;
  const sibling = target.nextElementSibling;
  gsap.to(target, { scale: 1.2, duration: 0.5 });
  gsap.to(sibling, { scale: 1.2, duration: 0.5 });
}

function scaleAnimationLeave(event) {
  const target = event.currentTarget;
  const sibling = target.nextElementSibling;
  gsap.to(target, { overwrite: true, scale: 1, duration: 0.3 });
  gsap.to(sibling, { overwrite: true, scale: 1, duration: 0.3 });
}

function imgScale(img) {
  img.addEventListener("mouseenter", scaleAnimationEnter);
  img.addEventListener("mouseleave", scaleAnimationLeave);
}

function removeScale() {
  myProjectsAnimation.forEach((img) => {
    img.removeEventListener("mouseenter", scaleAnimationEnter);
    img.removeEventListener("mouseleave", scaleAnimationLeave);
  });
}

function paddingAnimationEnter(event) {
  const target = event.currentTarget;
  gsap.to(target, { paddingTop: 10, duration: 0.3 });
}

function paddingAnimationLeave(event) {
  const target = event.currentTarget;
  gsap.to(target, { paddingTop: 1, duration: 0.3 });
}

function codeLinkAnimation(codeLink) {
  codeLink.addEventListener("mouseenter", paddingAnimationEnter);
  codeLink.addEventListener("mouseleave", paddingAnimationLeave);
}

function removeRespLinkAnimation() {
  codeLinks.forEach((codeLink) => {
    codeLink.removeEventListener("mouseenter", paddingAnimationEnter);
    codeLink.removeEventListener("mouseleave", paddingAnimationLeave);
  });
}

function linkAnimationEnter(event) {
  const target = event.currentTarget;
  gsap.to(target, {
    boxShadow: "5px 5px 1px var(--muted-color)",
    duration: 0.5,
    ease: "power2.out",
    x: -3,
    y: -3,
  });
}

function linkAnimationLeave(event) {
  const target = event.currentTarget;
  gsap.to(target, {
    boxShadow: "1px 2px 2px var(--muted-color)",
    duration: 0.5,
    ease: "power2.out",
    x: 0,
    y: 0,
  });
}

function linkAnimationDesktop(link) {
  link.addEventListener("mouseenter", linkAnimationEnter);
  link.addEventListener("mouseleave", linkAnimationLeave);
}

function removeLinkAnimation() {
  linksDesktop.forEach((link) => {
    link.removeEventListener("mouseenter", linkAnimationEnter);
    link.removeEventListener("mouseenter", linkAnimationLeave);
  });
}

//*******************
// main program
//*******************

gsap.registerPlugin(ScrollTrigger);

const paragraphs = gsap.utils.toArray(".textAnimation");
const myProjectsAnimation = gsap.utils.toArray(".my-projects-animation");
const aboutMeAnimation = gsap.utils.toArray(".about-me-animation");
const codeLinks = gsap.utils.toArray(".code-link");
const linksDesktop = gsap.utils.toArray(".link-animation");

paragraphs.forEach((paragraph) => {
  gsap.from(paragraph, {
    y: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: paragraph,
      toggleActions: "play none none none",
    },
  });
});

if (window.innerWidth <= 850) {
  aboutMeAnimation.forEach((img) => {
    gsap.from(img, {
      x: 300,
      opacity: 0,
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
      opacity: 0,
      duration: 1.5,
      scrollTrigger: {
        trigger: img,
        toggleActions: "play none none none",
      },
      onComplete: () => imgScale(img),
    });
  });
  codeLinks.forEach((codeLink) => {
    gsap.from(codeLink, {
      x: -500,
      opacity: 0,
      duration: 1.5,
      scrollTrigger: {
        trigger: codeLink,
        toggleActions: "play none none none",
      },
      onComplete: () => codeLinkAnimation(codeLink),
    });
  });
} else if (window.innerWidth > 850) {
  aboutMeAnimation.forEach((img) => {
    gsap.from(img, {
      x: 300,
      opacity: 0,
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
      opacity: 0,
      duration: 1.5,
      scrollTrigger: {
        trigger: img,
        toggleActions: "play none none none",
      },
    });
  });
  linksDesktop.forEach((link) => {
    gsap.from(link, {
      x: 300,
      opacity: 0,
      duration: 1.2,
      scrollTrigger: {
        trigger: link,
        toggleActions: "play none none none",
      },
      onComplete: linkAnimationDesktop(link),
    });
  });
}
