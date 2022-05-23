const game = {
    aantalSpelers: 0,
    spelerA: {
        naam: "",
        woord: "",
        score: 0,
        fouten: 0,
    },
    spelerB: {
        naam: "",
        woord: "",
        score: 0,
        fouten: 0,
    }
}

function prompt() {
  let prompt = document.createElement("div");
  prompt.className = "prompt";

  let spelersPrompt = document.createElement("input");
  spelersPrompt.className = "spelersPrompt";
  spelersPrompt.type = "number";
  spelersPrompt.placeholder = "Hoeveel spelers zijn er? Max 2";
  spelersPrompt.max = "2";

  let submit = document.createElement("button");
  submit.className = "submit";
  submit.innerHTML = "Submit";

  submit.addEventListener("click", function () {
    game.aantalSpelers = spelersPrompt.value;
    spelerA();
  });

  prompt.appendChild(spelersPrompt);
  prompt.appendChild(submit);
  document.body.appendChild(prompt);

  function spelerA(){
    let spelerA = document.createElement("div");
    spelerA.className = "spelerA";

    let naamPrompt = document.createElement("input");
    naamPrompt.className = "naamPrompt";
    naamPrompt.type = "text";
    naamPrompt.placeholder = "Naam speler A";

    let woordPrompt = document.createElement("input");
    woordPrompt.className = "woordPrompt";
    woordPrompt.type = "text";
    woordPrompt.placeholder = "Woord speler A";

    let submit = document.createElement("button");
    submit.className = "submit";
    submit.innerHTML = "Submit";

    submit.addEventListener("click", function () {
      game.spelerA.naam = naamPrompt.value;
      game.spelerA.woord = woordPrompt.value;
      if (game.aantalSpelers == 2) {
          document.body.removeChild(spelerA);
        spelerB();
      }else{
        document.body.removeChild(spelerA);
        startGame();
      }
    });

    spelerA.appendChild(naamPrompt);
    spelerA.appendChild(woordPrompt);
    spelerA.appendChild(submit);
    document.body.appendChild(spelerA);
  }

    function spelerB(){
        let spelerB = document.createElement("div");
        spelerB.className = "spelerB";
    
        let naamPrompt = document.createElement("input");
        naamPrompt.className = "naamPrompt";
        naamPrompt.type = "text";
        naamPrompt.placeholder = "Naam speler B";
    
        let woordPrompt = document.createElement("input");
        woordPrompt.className = "woordPrompt";
        woordPrompt.type = "text";
        woordPrompt.placeholder = "Woord speler B";
    
        let submit = document.createElement("button");
        submit.className = "submit";
        submit.innerHTML = "Submit";
    
        submit.addEventListener("click", function () {
          game.spelerB.naam = naamPrompt.value;
          game.spelerB.woord = woordPrompt.value;
          document.body.removeChild(spelerB);
            startGame();
        });
        spelerB.appendChild(naamPrompt);
        spelerB.appendChild(woordPrompt);
        spelerB.appendChild(submit);
        document.body.appendChild(spelerB);
    }


}

prompt();

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


function raden() {
  document.addEventListener("keydown", function (event) {
    console.log(event.key);
    let letter = event.key;
    if (game.spelerA.woord.indexOf(letter) > -1) {
      let letterDisplay = document.querySelectorAll(".woordDisplay")[0];
      if (game.spelerA.fouten < 5) {
        for (let i = 0; i < game.spelerA.woord.length; i++) {
          if (letter == game.spelerA.woord[i]) {
            let letterArray = letterDisplay.innerHTML.split("");
            console.log(letterArray);
            letterArray[i] = letter;
            console.log(letterArray);
            letterDisplay.innerHTML = letterArray.join("");
          } else {
          }
        }
      } else {
        gameOver();
      }
    } else {
      game.spelerA.fouten++;
    }
  });
}

function gameOver() {
  alert("Game Over");
}