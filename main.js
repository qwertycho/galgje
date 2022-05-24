// todo
// knop maken om het ingevoerde woord te hiden
// check maken zodat alleen geldige letters worden ingevoerd

const game = {
    aantalSpelers: 0,
    beurt: 0,
    spelers: [],
}

class Speler {
  constructor(naam, woord) {
    this.naam = naam;
    this.woord = woord;
    this.foutLetter = [];
    this.fouten = 0;
  }
}

function setup() {
  let spelersPrompt = document.createElement("input");
  spelersPrompt.className = "spelersPrompt";
  spelersPrompt.type = "number";
  spelersPrompt.placeholder = "Hoeveel spelers zijn er? Max 2";
  spelersPrompt.max = "2";
  spelersPrompt.value = "1";

  let submit = document.createElement("button");
  submit.className = "submit";
  submit.innerHTML = "Submit";

  submit.addEventListener("click", function () {
    game.aantalSpelers = spelersPrompt.value;
    document.body.removeChild(spelersPrompt);
    document.body.removeChild(submit);
    spelerSetup()
  });
  document.body.appendChild(spelersPrompt);
  document.body.appendChild(submit);

}
 
// functie voor het krijgen speler data
function spelerSetup() {
  let aantalSpelers = game.aantalSpelers;
  let aantalSetup = 1;
// het aanmaken van spelernaam input
    const spelerNaamInput = document.createElement("input");
    spelerNaamInput.className = "spelerNaam";
    spelerNaamInput.type = "text";
    spelerNaamInput.placeholder = "Naam speler 1";
    spelerNaamInput.value = "Speler 1";

    const spelerWoordInput = document.createElement("input");
    spelerWoordInput.className = "spelerWoord";
    spelerWoordInput.type = "text";
    spelerWoordInput.placeholder = "Woord speler 1";
    spelerWoordInput.value = "woord1";

    const submitButton = document.createElement("button");
    submitButton.className = "submit";
    submitButton.innerHTML = "Submit";

    // listener voor het krijgen van de speler data
    submitButton.addEventListener("click", function () {
      if(aantalSetup < aantalSpelers){
        // de data opslaan in een niewe speler
        let spelerNaam = document.querySelector(".spelerNaam").value;
        let spelerWoord = document.querySelector(".spelerWoord").value;
        game.spelers.push(new Speler(spelerNaam, spelerWoord));

        // de input velden leegmaken
        aantalSetup++;
        document.querySelector(".spelerNaam").placeholder = `Naam speler ${aantalSetup}`;
        document.querySelector(".spelerNaam").value = null;
        document.querySelector(".spelerWoord").placeholder = `Woord speler ${aantalSetup}`;
        document.querySelector(".spelerWoord").value = null;
      } else{
        let spelerNaam = document.querySelector(".spelerNaam").value;
        let spelerWoord = document.querySelector(".spelerWoord").value;
        game.spelers.push(new Speler(spelerNaam, spelerWoord));

        document.body.removeChild(spelerNaamInput);
        document.body.removeChild(spelerWoordInput);
        document.body.removeChild(submitButton);
        startGame();
      }

    });
    document.body.appendChild(spelerNaamInput);
    document.body.appendChild(spelerWoordInput);
    document.body.appendChild(submitButton);
}

  

  // functie voor het starten van het spel
  // dit zet de gegokte letters op het scherm en het woord
function startGame(){

  if(game.beurt == 0){
    let titel = document.createElement("h2");
    titel.innerHTML = `${game.spelers[game.beurt].naam} mag raden wat het woord is`;
    titel.className = "titel";
    titel.id = "titel";
    document.body.appendChild(titel);

    let woordDisplay = document.createElement("div");
    woordDisplay.className = "woordDisplay";
    woordDisplay.id = "woordDisplay";

    for(let i = 0; i < game.spelers[game.beurt].woord.length; i++){
        woordDisplay.innerHTML += "_";
    }
    document.body.appendChild(woordDisplay);

    let input = document.createElement("h5");
    input.className = "input";
    input.innerHTML = "Typ hier je letter";
    input.id = "input";
    document.body.appendChild(input);
    raden();
  } else {
    document.getElementById("titel").innerHTML = `${game.spelers[game.beurt].naam} mag raden wat het woord is`;
    document.getElementById("woordDisplay").innerHTML = "";
    for(let i = 0; i < game.spelers[game.beurt].woord.length; i++){
        document.getElementById("woordDisplay").innerHTML += "_";
    }
  }
}

// functie voor het krijgen van user input en controle
function raden() {
  document.addEventListener("keydown", function (event) {
  let letter = event.key;
  // controleren of de speler niet af is
    if(game.spelers[game.beurt].fouten < 5){
      // controleren of de letter goed is
      if (game.spelers[game.beurt].woord.indexOf(letter) > -1) {
        let letterDisplay = document.querySelectorAll(".woordDisplay")[0];
        goed(letter, letterDisplay);
      } else {
        fout(letter)
      }
    }else{
      gameOver();
    }
  });
}

function goed(letter, letterDisplay) {
  // loopt door het woord en plaatst de letter op de juiste plek
  for (let i = 0; i < game.spelers[game.beurt].woord.length; i++) {
    if (letter == game.spelers[game.beurt].woord[i]) {
      let letterArray = letterDisplay.innerHTML.split("");
      letterArray[i] = letter;
      letterDisplay.innerHTML = letterArray.join("");
    }
    if(letterDisplay.innerHTML == game.spelers[game.beurt].woord){
      win();
    }
  }
}

function fout(letter) {
  // controle of de letter al opgelsagen is
  if (game.spelers[game.beurt].foutLetter.indexOf(letter) == -1) {
    game.spelers[game.beurt].foutLetter.push(letter);
    document.getElementById("foutLetters").innerHTML = game.spelers[game.beurt].foutLetter;
    game.spelers[game.beurt].fouten++;
  } else {
    document.getElementById("foutLetters").innerHTML = game.spelers[game.beurt].foutLetter;
  }
    document.getElementById("fouten").innerHTML = `Fouten: ${game.spelers[game.beurt].fouten} / 5`;
}

function win(){
    let win = document.createElement("h2");
    win.innerHTML = `${game.spelers[game.beurt].naam} heeft gewonnen! Het woord was ${game.spelers[game.beurt].woord}`;
    let winButton = document.createElement("button");
    winButton.innerHTML = "Nieuw spel";
    document.body.appendChild(win);
    document.body.appendChild(winButton);
    if(game.beurt == 1){
    winButton.addEventListener("click", function () {
        document.body.removeChild(win);
        document.body.removeChild(winButton);
        volgendeSpeler();
    });
  } else{
    winButton.addEventListener("click", function () {
        document.body.removeChild(win);
        document.body.removeChild(winButton);
        volgendeSpeler();
    });
  }
}

function gameOver() {
  alert("Game Over");
}
function volgendeSpeler(){
  game.beurt++;

  if(game.beurt < game.aantalSpelers){
    console.log("startgame");
    startGame();

  }else{
    console.log("game over");
    resetGame() 
  }
}

function resetGame(){
  // alles leegmaken zodat setupgame kan werken
  // de spelernamen moeten wel onthouden worden

  game.spelers = [];
  game.beurt = 0;
  game.aantalSpelers = 0;
  document.body.removeChild(document.getElementById("titel"));
  document.body.removeChild(document.getElementById("woordDisplay"));
  document.getElementById("foutLetters").innerHTML = "";
  document.getElementById("fouten").innerHTML = "";
  document.body.removeChild(document.getElementById("input"));

  setup();

}

setup()