// todo
// knop maken om het ingevoerde woord te hiden
// check maken zodat alleen geldige letters worden ingevoerd
// alles alementen die worden verwijderd dezelfde class geven om alles netter te maken
// verlies en win in een functie zetten

import wordlist from './wordlist.js';

const game = {
    aantalSpelers: 0,
    beurt: 0,
    spelers: [],
    spelerSetup: 0,
}

class Speler {
  constructor(naam, woord) {
    this.naam = naam;
    this.woord = woord;
    this.foutLetter = [];
    this.fouten = 0;
    this.geraden = [];
  }
}

function aantalSpelers(){

  // aantal speler knop aanmaken
  const aantalSpelersInput = document.createElement('input');
  aantalSpelersInput.setAttribute('type', 'number');
  aantalSpelersInput.setAttribute('id', 'aantalSpelers');
  aantalSpelersInput.setAttribute('placeholder', 'aantal spelers');
  aantalSpelersInput.setAttribute('min', '1');
  aantalSpelersInput.setAttribute('max', '10');
  aantalSpelersInput.setAttribute('value', '1');

  document.body.appendChild(aantalSpelersInput);

  // submit knop aanmaken
  const aantalSpelersButton = document.createElement('button');
  aantalSpelersButton.setAttribute('id', 'aantalSpelersButton');

  // eventlistener voor het aantal spelers
  aantalSpelersButton.addEventListener('click', function(){
    game.aantalSpelers = parseInt(document.getElementById('aantalSpelers').value);
    document.getElementById('aantalSpelers').remove();
    document.getElementById('aantalSpelersButton').remove();
    if(game.aantalSpelers > 1){
    spelerData();
    } else {
      singlePlayer();
    }
  });

  aantalSpelersButton.innerHTML = 'Submit';

  document.body.appendChild(aantalSpelersButton);
}

// het krijgen van de data van de spelers
function spelerData(){
    // elementen voor de user input aanmaken

    // speler naam element
  const spelerNaamInput = document.createElement('input');
  spelerNaamInput.setAttribute('type', 'text');
  spelerNaamInput.setAttribute('placeholder', `speler ${game.spelerSetup + 1}`);
  spelerNaamInput.setAttribute('id', 'spelerNaamInput');
// speler woord element
  const spelerWoordInput = document.createElement('input');
  spelerWoordInput.setAttribute('type', 'text');
  spelerWoordInput.setAttribute('placeholder', `woord van speler ${game.spelerSetup + 1}`);	
  spelerWoordInput.setAttribute('id', 'spelerWoordInput');
  document.body.appendChild(spelerWoordInput);

// speler submit knop
  const spelerButton = document.createElement('button');
  spelerButton.setAttribute('id', 'spelerButton');
  spelerButton.innerHTML = 'Submit';

  // submit eventlistener
  spelerButton.addEventListener('click', function(){
    // input validatie
    if(spelerNaamInput.value !== '' && spelerWoordInput.value !== ''){
      let speler = new Speler(spelerNaamInput.value, spelerWoordInput.value);
      game.spelers.push(speler);
      spelerNaamInput.remove();
      spelerWoordInput.remove();
      spelerButton.remove();
      game.spelerSetup++;
      // als er niet meer spelers zijn dan gaat het spel starten
     
        if(game.spelerSetup < game.aantalSpelers){
          spelerData();
        } else {
          startGame();
        }
      

    }
  });
  document.body.appendChild(spelerNaamInput);
  document.body.appendChild(spelerButton);

}

function startGame(){
  let woordDisplay = document.createElement('div');
  woordDisplay.setAttribute('id', 'woordDisplay');
  // woord display vullen met placeholder
  for(let i = 0; i < game.spelers[game.beurt].woord.length; i++){
    game.spelers[game.beurt].geraden.push(' _ ');
  };
  woordDisplay.innerHTML = game.spelers[game.beurt].geraden;
  document.body.appendChild(woordDisplay);
  
  // titel aanpassen
  document.getElementById('titel').innerHTML = `${game.spelers[game.beurt].naam}'s beurt`;

  // event listener voor het invoeren van de letter
  document.addEventListener('keydown', letterInvoer);
}

function letterInvoer(e){
  let letter = e.key;
  // controleren of de letter al is geraden
  if(game.spelers[game.beurt].geraden.includes(letter)){
    // doe niks
  }
  // controler of de letter in het woord zit
  else if(game.spelers[game.beurt].woord.includes(letter)){
    // letter in het woord zetten
    for(let i = 0; i < game.spelers[game.beurt].woord.length; i++){
      if(game.spelers[game.beurt].woord[i] === letter){
       game.spelers[game.beurt].geraden[i] = letter;
       document.getElementById('woordDisplay').innerHTML = game.spelers[game.beurt].geraden;
      }
    }
    // woord display updaten
    document.getElementById('woordDisplay').innerHTML = game.spelers[game.beurt].geraden;
    // controleren of het woord geraden is
    let geradenWoord = "";
    for(let i = 0; i < game.spelers[game.beurt].geraden.length; i++){
      geradenWoord += game.spelers[game.beurt].geraden[i];
    }
    if(geradenWoord == game.spelers[game.beurt].woord){
      win();
    }

  } else {
   if(game.spelers[game.beurt].foutLetter.includes(letter)){
    // doe niks
   } else {
    game.spelers[game.beurt].foutLetter.push(letter);
    game.spelers[game.beurt].fouten++;
    // fouten display updaten
    document.getElementById('foutLetters').innerHTML = game.spelers[game.beurt].foutLetter;
    document.getElementById('fouten').innerHTML = ` ${game.spelers[game.beurt].fouten} / 5 fouten`;
    // controleren of het woord geraden is
    if(game.spelers[game.beurt].fouten < 5){
      // doe niks
    } else {
      verlies();
    }
   }
  }
}

function endGame(status){
  switch (status) {
    case "win":
      document.getElementById('titel').innerHTML = `${game.spelers[game.beurt].naam} heeft gewonnen!`;
      if(game.spelerSetup < game.aantalSpelers){
        document.getElementById('titel').innerHTML = `${game.spelers[game.beurt].naam} heeft gewonnen!`;
        document.getElementById('woordDisplay').innerHTML = `${game.spelers[game.beurt].woord}`;
      }0

      break;

    case "verlies":
      document.getElementById('titel').innerHTML = `${game.spelers[game.beurt].naam} heeft verloren! Het woord was ${game.spelers[game.beurt].woord}`;

      break;
  
    default:
      break;
  }
}

function singlePlayer() {
  const spelerNaamInput = document.createElement("input");
  spelerNaamInput.setAttribute("type", "text");
  spelerNaamInput.setAttribute("placeholder", `speler ${game.spelerSetup + 1}`);
  spelerNaamInput.setAttribute("id", "spelerNaamInput");

  // speler submit knop
  const spelerButton = document.createElement("button");
  spelerButton.setAttribute("id", "spelerButton");
  spelerButton.innerHTML = "Submit";

    // submit eventlistener
    spelerButton.addEventListener('click', function(){
      // input validatie
      if(spelerNaamInput.value !== ''){
        let speler = new Speler(spelerNaamInput.value, "bergkip");
        game.spelers.push(speler);
        spelerNaamInput.remove();
        spelerButton.remove();
        randomWord();
      }
    });
    document.body.appendChild(spelerNaamInput);
    document.body.appendChild(spelerButton);
  
}

function randomWord(){
  let random = Math.floor(Math.random() * wordlist.length);
  game.spelers[0].woord = wordlist[random];
  console.log(wordlist);
  startGame();
}

aantalSpelers();