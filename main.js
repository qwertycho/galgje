const gamer = {
    aantalSpelers: 0,
    beurt: 1,
    spelers: [],
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
  let aantalSetup = 0;
// het aanmaken van spelernaam input
  for(let i = 0; i < aantalSpelers; i++){
    let spelerNaam = document.createElement("input");
    spelerNaam.className = "spelerNaam";
    spelerNaam.type = "text";
    spelerNaam.placeholder = "Naam speler " + (i+1);
    spelerNaam.id = "spelerNaam" + (i+1);
    document.body.appendChild(spelerNaam);
// het aanmaken van speler woord input
    let spelerWoord = document.createElement("input");
    spelerWoord.className = "spelerWoord";
    spelerWoord.type = "text";
    spelerWoord.placeholder = "Woord speler " + (i+1);
    spelerWoord.id = "spelerWoord" + (i+1);
    document.body.appendChild(spelerWoord);
// het aanmaken van de submit knop
    let submit = document.createElement("button");
    submit.className = "submit";
    submit.innerHTML = "Submit";
    submit.id = "submit" + (i+1);
// eventlistener die de data uitleest en opslaat
    submit.addEventListener("click", function () {
      if(aantalSetup < aantalSpelers){
        let naam = document.getElementById("spelerNaam" + (aantalSetup+1));
        let woord = document.getElementById("spelerWoord" + (aantalSetup+1));
        // de data die word opgeslagen in de gamer object
        let speler = {
          naam: naam.value,
          woord: woord.value,
          score: 0,
          fouten: 0,
          foutLetter: [],
        }

        // de inputvelden verwisselen
        naam.style.display = "none";
        woord.style.display = "none";
        document.getElementById("submit" + (aantalSetup+1)).style.display = "none";

        gamer.spelers.push(speler);
        aantalSetup++;

        document.getElementById("spelerNaam" + (aantalSetup+1)).style.display = "block";
        document.getElementById("spelerWoord" + (aantalSetup+1)).style.display = "block";

      } else{
        startGame();
      }
    });
    document.body.appendChild(submit);
  }

  }

  // functie voor het starten van het spel
  // dit zet de gegokte letters op het scherm en het woord
function startGame(){
    document.body.removeChild(document.querySelector(".prompt"));

    let titel = document.createElement("h2");
    titel.innerHTML = `${game.spelerA.naam} mag raden wat het woord is`;
    document.body.appendChild(titel);

    let woordDisplay = document.createElement("div");
    woordDisplay.className = "woordDisplay";
    woordDisplay.id = "woordDisplay";

    for(let i = 0; i < game.spelerA.woord.length; i++){
        woordDisplay.innerHTML += "_";
    }
    document.body.appendChild(woordDisplay);

    let input = document.createElement("h5");
    input.className = "input";
    input.innerHTML = "Typ hier je letter";
    document.body.appendChild(input);
    raden();
}

// functie voor het krijgen van user input en controle
function raden() {
  document.addEventListener("keydown", function (event) {
  console.log(event.key);
  let letter = event.key;
  // controleren of de speler niet af is
    if(game.spelerA.fouten < 5){
      // controleren of de letter goed is
      if (game.spelerA.woord.indexOf(letter) > -1) {
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
  for (let i = 0; i < game.spelerA.woord.length; i++) {
    if (letter == game.spelerA.woord[i]) {
      let letterArray = letterDisplay.innerHTML.split("");
      console.log(letterArray);
      letterArray[i] = letter;
      console.log(letterArray);
      letterDisplay.innerHTML = letterArray.join("");
    }
    if(letterDisplay.innerHTML == game.spelerA.woord){
      win();
    }
  }
}

function fout(letter) {
  // controle of de letter al opgelsagen is
  if (game.spelerA.foutLetter.indexOf(letter) == -1) {
    game.spelerA.foutLetter.push(letter);
    document.getElementById("foutLetters").innerHTML = game.spelerA.foutLetter;
    game.spelerA.fouten++;
  } else {
    document.getElementById("foutLetters").innerHTML = game.spelerA.foutLetter;
  }
    document.getElementById("fouten").innerHTML = `Fouten: ${game.spelerA.fouten} / 5`;
}

function win(){
    let win = document.createElement("h2");
    win.innerHTML = `${game.spelerA.naam} heeft gewonnen! Het woord was ${game.spelerA.woord}`;
    let winButton = document.createElement("button");
    winButton.innerHTML = "Nieuw spel";
    document.body.appendChild(win);
    document.body.appendChild(winButton);
    if(game.beurt == 1){
    winButton.addEventListener("click", function () {
        document.body.removeChild(win);
        document.body.removeChild(winButton);
        game.beurt =+ 1;
    });
  } else{
    winButton.addEventListener("click", function () {
        document.body.removeChild(win);
        document.body.removeChild(winButton);
        prompt();
        game.beurt = 1;
    });
  }
}

function gameOver() {
  alert("Game Over");
}

setup()