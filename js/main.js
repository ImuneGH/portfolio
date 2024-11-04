window.onscroll = function() {
    let trackedElement = document.getElementById("positionPoint");
    let rect = trackedElement.getBoundingClientRect(); // Získáme pozici elementu vzhledem k viewportu
    let header = document.getElementById("MS");
    let navBar = document.getElementById("desktopNav");

    // Kontrola, zda je element v horní části okna (nebo pod určitým bodem)
    if (rect.top <= 60) {
        navBar.classList.add("fixed"); // Přidání třídy pro fixování
        header.classList.add("navMargin"); // přidání marginu, který vyplní místo navbaru
        navBar.classList.add("animate__animated", "animate__pulse");
    } else if(rect.top > 60){
        navBar.classList.remove("fixed"); // Odebrání třídy při skrolování zpět nahoru
        header.classList.remove("navMargin"); // Odebrání třídy při skrolování zpět nahoru
        navBar.classList.remove("animate__animated", "animate__pulse");
        // navBar.classList.add("animate__animated", "animate__flipOutX");
    }

    // Pro ukázku můžeme do konzole vypisovat pozici elementu
    console.log("Top:", rect.top, "Bottom:", rect.bottom);
};