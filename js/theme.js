//*******************
// functions
//*******************

function themeSwitch(checkboxes, isChecked) {
  checkboxes.forEach((checkbox) => {
    checkbox.checked = isChecked;
  });
}

//*******************
// main program
//*******************

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
