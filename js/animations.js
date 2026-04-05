import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

//*******************
// exports
//*******************

export const codeLinks = gsap.utils.toArray(".code-link");
export const linksDesktop = gsap.utils.toArray(".link-animation");
export const myProjectsAnimation = gsap.utils.toArray(".my-projects-animation");

//*******************
// functions
//*******************

export function scaleAnimationEnter(event) {
  const target = event.currentTarget;
  const sibling = target.nextElementSibling;
  gsap.to(target, { scale: 1.2, duration: 0.5 });
  gsap.to(sibling, { scale: 1.2, duration: 0.5 });
}

export function scaleAnimationLeave(event) {
  const target = event.currentTarget;
  const sibling = target.nextElementSibling;
  gsap.to(target, { overwrite: true, scale: 1, duration: 0.3 });
  gsap.to(sibling, { overwrite: true, scale: 1, duration: 0.3 });
}

export function imgScale(img) {
  img.addEventListener("mouseenter", scaleAnimationEnter);
  img.addEventListener("mouseleave", scaleAnimationLeave);
}

export function paddingAnimationEnter(event) {
  const target = event.currentTarget;
  gsap.to(target, { paddingTop: 10, duration: 0.3 });
}

export function paddingAnimationLeave(event) {
  const target = event.currentTarget;
  gsap.to(target, { paddingTop: 1, duration: 0.3 });
}

export function codeLinkAnimation(codeLink) {
  codeLink.addEventListener("mouseenter", paddingAnimationEnter);
  codeLink.addEventListener("mouseleave", paddingAnimationLeave);
}

export function linkAnimationEnter(event) {
  const target = event.currentTarget;
  gsap.to(target, {
    boxShadow: "5px 5px 1px var(--muted-color)",
    duration: 0.5,
    ease: "power2.out",
    x: -3,
    y: -3,
  });
}

export function linkAnimationLeave(event) {
  const target = event.currentTarget;
  gsap.to(target, {
    boxShadow: "1px 2px 2px var(--muted-color)",
    duration: 0.5,
    ease: "power2.out",
    x: 0,
    y: 0,
  });
}

export function linkAnimationDesktop(link) {
  link.addEventListener("mouseenter", linkAnimationEnter);
  link.addEventListener("mouseleave", linkAnimationLeave);
}

export function animations() {
  //*******************
  // main program
  //*******************

  gsap.registerPlugin(ScrollTrigger);

  const paragraphs = gsap.utils.toArray(".textAnimation");
  const aboutMeAnimation = gsap.utils.toArray(".about-me-animation");

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
}
