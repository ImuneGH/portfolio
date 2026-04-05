//*******************
// exports
//*******************

export const langElement = document.querySelectorAll(".language");
export const csData = await langFetch("cs");
export const enData = await langFetch("en");

//*******************
// functions
//*******************

async function langFetch(langChoice) {
  const response = await fetch(`./lang/${langChoice}.json`);
  return await response.json();
}

export function languages() {
  //*******************
  // main program
  //*******************

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
}
