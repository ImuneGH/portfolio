// funkce

function removeStartWindow()    {
    let difficulty = document.querySelector('input[name="difficulty"]:checked');    // uloží se do proměnné difficulty zaškrtnutý radio button s obtížností
    document.body.removeChild(startWindow);                                         // odstraní okno s výběrem obtížností
    difficultyChoice(difficulty.id);                                                // spustí funkci a vloží do ní ID proměnné difficulty
    createNewGame();                                                                // spustí funkci
    createNewDot();                                                                 // spustí funkci
}

function difficultyChoice(difficulty) {
    switch (difficulty) {                                   // zjišťuje text ID z radio buttonů při výběru obtížnosti
        case "easy": 
            difficultySpeed = 15;                          // přidá do proměnné difficultySpeed hodnotu 800
            break;
        case "medium": 
            difficultySpeed = 10;                          // přidá do proměnné difficultySpeed hodnotu 500
            break;
        case "hard": 
            difficultySpeed = 5;                          // přidá do proměnné difficultySpeed hodnotu 300
            break;
    }
}

function createNewGame()   {
    scoreBoard.textContent = `Your Score is: ${score}`;       // Přidá text do scoreBoardu
    document.body.appendChild(createGame);                    // přidá element do DOMu ("UI" :D)
    createGame.appendChild(scoreBoard);                       // přidá element do DOMu (tabulka skóré)
}

function createNewDot() {   
    if(createGame.contains(dot))    {                   // podmínka, která zjišťuje zda je v DOMu element dot
        createGame.removeChild(dot);                    // pokud je podmínka splněna, odstraní element dot
    }
    score++;                                                        // zvýší skóré
    scoreBoard.textContent = `Your Score is: ${score}`;             // přepíše skóré
    setTimeout(() => {                                              // prodleva zajistí, že se po kliknutí na kostku stihne přerušit dotFall funkce
        let topPosition = Math.floor(Math.random() * 650);          // vytvoří náhodné číslo 6-650
        let leftPosition = Math.floor(Math.random() * 650);         // vytvoří náhodné číslo 6-650
        dot.style.top = `${topPosition}px`;                         // vytvořené číslo přidá do pozice TOP (určuje pozici elementu)
        dot.style.left = `${leftPosition}px`;                       // vytvořené číslo přidá do pozice LEFT (určuje pozici elementu)
        createGame.appendChild(dot);                                // přidá element, který chytáme do DOMu
        dotFall(topPosition);                                       // spustí funkci padání elementu
    }, 1000);

}

function dotFall(topPosition)  {
    if(createGame.contains(dot))    {                       // podmínka kontroluje jestli se díky kliknutí na kostku kostka nesmazala (to by přerušilo funkci)
        if(topPosition <= 680)    {                         // podmínka zjišťuje, jestli už je pozice kostky na konci dráhy
            setTimeout(() => {                              // zajišťuje prodlevu mezi klesáním dolů (podle obtížnosti)
                topPosition += 0.5;                          // přičte k pozici 15
                dot.style.top = `${topPosition}px`;         // posune kostku o 15px
                console.log(topPosition);                   // kontrola pozice v logu
                dotFall(topPosition);                       // opakuje funkci s aktuální pozicí kostky
            }, difficultySpeed);                            // prodleva mezi posuny je dlouhá v závislosti na zvolené obtížnosti (kterou jsme uložili do proměnné dificultySpeed)
        }
        else    {
            gameOver();                                     // pokud je kostka na konci dráhy a nechytíme ji myší, spustí se fce gameOver
        }
    }
    console.log(difficultySpeed);
}

function gameOver() {
    window.alert(`Hra je u konce! Tvoje skóré je: ${score} bodů`);      // vyhodí text a vypíše počet finálních bodů
}

// program

let score = -1;
let startWindow = document.querySelector(".box");
let startButton = document.querySelector(".box .button");
let scoreBoard = document.createElement("p");
let createGame = document.createElement("div");
let dot = document.createElement("img");
let difficultySpeed;

createGame.classList.add("newGame");
dot.src = "./img/dot.jpg";
dot.classList.add("dot");

if(startButton) {
    startButton.addEventListener("click", event => {
        event.preventDefault();
        removeStartWindow();
    });
}
       // po kliknutí na START se spustí removeStartWindow funkce

dot.addEventListener("click", createNewDot);                    // po kliknutí na kostku se pustí funkce createNewDot