console.log("ahoj");

window.onscroll = function() {
    let trackedElement = document.getElementById("desktopNav");
    let rect = trackedElement.getBoundingClientRect(); // Získáme pozici elementu vzhledem k viewportu
    let header = document.getElementById("MS");

    // Kontrola, zda je element v horní části okna (nebo pod určitým bodem)
    if (rect.top <= 0) {
        trackedElement.classList.add("fixed"); // Přidání třídy pro fixování
        header.classList.add("navMargin"); // přidání marginu, který vyplní místo navbaru
    } else {
        trackedElement.classList.remove("fixed"); // Odebrání třídy při skrolování zpět nahoru
    }

    // Pro ukázku můžeme do konzole vypisovat pozici elementu
    console.log("Top:", rect.top, "Bottom:", rect.bottom);
};