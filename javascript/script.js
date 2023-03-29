var challenges = ["dog", "wizard", "chest"];
var encounter = document.querySelector(".encounter");
var text = document.querySelector("#text");
var buttonText = document.querySelector("#refresh");

// checking the array
var counter = 0;
challenge = challenges[counter];
console.log (challenge);

// all the buttons and cards
var buttonElementNext = document.querySelector("#next");
var buttonElementRefresh = document.querySelector("#refresh");

var buttonElementAxe = document.querySelector("#axe");
var buttonElementRation = document.querySelector("#ration");
var buttonElementKey = document.querySelector("#key");
var buttonElementSkull = document.querySelector("#skull");
var buttonElementSpell = document.querySelector("#spell");

// This is used so I could check what was clicked while in the whatHappened
var axeState = false;
var rationState = false;
var keyState = false;
var skullState = false;
var spellState = false;

function statesFalse(){
    axeState = false;
    rationState = false;
    keyState = false;
    skullState = false;
    spellState = false; 
}

buttonElementNext.classList.add("deactivated");
buttonElementRefresh.classList.add("deactivated");

// als deze knop word geklikt, ga de challenge veranderen
buttonElementNext.addEventListener("click", nextpt2);

buttonElementRefresh.addEventListener("click", again);


// making the cards interactable
buttonElementAxe.addEventListener("dragstart",axeStartDrag);
buttonElementRation.addEventListener("dragstart",rationStartDrag);
buttonElementKey.addEventListener("dragstart",keyStartDrag);
buttonElementSkull.addEventListener("dragstart",skullStartDrag);
buttonElementSpell.addEventListener("dragstart",spellStartDrag);


// funcies zorger ervoor dat de kaart op de encounter gedropt kan worden
function allowwut(event){
    event.preventDefault();
}

function wut(event){
    event.preventDefault();
    console.log ("something got dropped");
    whatHappened();
}

// functies starten als je de kaart begint met slepen
function axeStartDrag (event){
    axeState = true;
    console.log (axeState);
    console.log ("axe started dragging");
}

function rationStartDrag (event){
    rationState = true;
    console.log (rationState);
}

function keyStartDrag (event){
    keyState = true;
    console.log (keyState);
}

function skullStartDrag (event){
    skullState = true;
    console.log (skullState);
}

function spellStartDrag (event){
    spellState = true;
    console.log (spellState);
}


// functie om alle buttons gelijktijdig uit te zetten
function disableButtons(){
    buttonElementAxe.removeEventListener("dragstart",axeStartDrag);
    buttonElementRation.removeEventListener("dragstart",rationStartDrag);
    buttonElementKey.removeEventListener("dragstart",keyStartDrag);
    buttonElementSkull.removeEventListener("dragstart",skullStartDrag);
    buttonElementSpell.removeEventListener("dragstart",spellStartDrag);
}


// deze funtie is een tussen stap om de gebruiker de tijd te geven om te lezen wat er gebeurd
function nextpt1 (){
    // nextbutton visable
    buttonElementNext.classList.remove("deactivated");
    // rest disabled
    disableButtons();
}

// functie word gestart als op de continue knop word gedrukt
function nextpt2 (){
    // next encounter from the array
    console.log(counter);
    counter = counter +1;
    console.log(counter);
    challenge = challenges [counter];
    console.log (challenge);
    // remove nextbutton
    buttonElementNext.classList.add("deactivated");
    // re-eneble rest
    buttonElementAxe.addEventListener("dragstart",axeStartDrag);
    buttonElementRation.addEventListener("dragstart",rationStartDrag);
    buttonElementKey.addEventListener("dragstart",keyStartDrag);
    buttonElementSkull.addEventListener("dragstart",skullStartDrag);
    buttonElementSpell.addEventListener("dragstart",spellStartDrag);
    console.log ("nextpt2check");
    // check welke challenge het is en veranderd het plaatje
    if (challenge == "dog"){
        encounter.src = "./assets/images/dog-angry.png";
    } 
    else if (challenge == "wizard"){
        encounter.src = "./assets/images/wizard.png";
        text.textContent=("You walk further and you see that an old wizard is blocking your way to the exit.")
    }
    else if (challenge == "chest"){
        encounter.src = "./assets/images/chest-closed.png";
        text.textContent=("While making your way to the exit, you come across a closed chest")
    }
}

// this funtion checks what happened and what changes, runs multiple times in a game
function whatHappened (){
    if (challenge == "dog"){
        if (axeState === true){
            // verander het plaatje
            encounter.src = "./assets/images/dog-dead.png";
            // verander de tekst
            text.textContent=("You kill the dog with your axe and take its skull.");
            // zorg dat de kaarten beter werken
            statesFalse();
            // test of het uitstaat
            console.log (axeState);
            // voeg nieuwe actie toe
            buttonElementSkull.classList.remove("deactivated");
            // naar de volgende
            nextpt1();
            // verwijder de gebruikte knop
            buttonElementAxe.classList.add("deactivated");
            // test
            console.log ("axe dropped/ draggded? clicked?");
        } else if (rationState === true) {
            encounter.src = "./assets/images/dog-cute.png";
            text.textContent=("You give the dog your food. The dog walks away and returns a moment later with a key.")
            statesFalse();
            console.log (rationState);
            buttonElementKey.classList.remove("deactivated");
            nextpt1();
            buttonElementRation.classList.add("deactivated")
            console.log ("ration clicked")
        }
    }
    else if (challenge == "wizard"){
        if (axeState == true){
            encounter.src = "./assets/images/wizard-angry.png";
            text.textContent=("You try to kill the wizard with your axe, but he quicker. He fires a spell at you and you meet your end.");
            statesFalse();
            console.log (axeState);
            youDied ();
            buttonElementAxe.classList.add("deactivated");
            console.log ("axe dropped");
        } else if (rationState == true){
            text.textContent=("The wizard says to you: 'Thank you, at least i wont die anytime soon. You may go through'");
            statesFalse();
            console.log (rationState);
            nextpt1();
            buttonElementRation.classList.add("deactivated")
            console.log ("ration clicked")
        } else if (keyState == true){
            encounter.src = "./assets/images/wizard-blush.png";
            text.textContent=("The wizard says: 'Ah thank you, I can finally get out now! I can teach you this spell if you want?'");
            statesFalse();
            console.log (keyState);
            buttonElementSpell.classList.remove("deactivated");
            nextpt1();
            buttonElementKey.classList.add("deactivated")
            console.log ("key clicked")
        } else if (skullState == true){
            encounter.src = "./assets/images/wizard-blush.png";
            text.textContent=("The wizard says: 'Ah, that beuteful skull perfectly fits in my collection. Ill give you this key as a thank you'");
            statesFalse();
            console.log (skullState);
            buttonElementKey.classList.remove("deactivated");
            nextpt1();
            buttonElementSkull.classList.add("deactivated")
            console.log ("skull clicked")
        }
    } else if (challenge == "chest"){
        if (axeState == true){
            encounter.src = "./assets/images/chest-broken.png";
            text.textContent=("You destroy the chest with the axe, in the rubble you find the key to the exit! yay!");
            statesFalse();
            console.log (axeState);
            youWon();
            buttonElementAxe.classList.add("deactivated");
            console.log ("axe dropped");
        } else if (rationState == true){
            text.textContent=("You smash the food against the chest. What did you whink was going to happen?");
            statesFalse();
            console.log (rationState);
            stuck();
            buttonElementRation.classList.add("deactivated")
            console.log ("ration clicked")
        } else if (keyState == true){
            encounter.src = "./assets/images/chest-open.png";
            text.textContent=("You open the chest with the key. In it you find the treasure! You leave the dungeon rich.");
            statesFalse();
            console.log (keyState);
            youWon();
            buttonElementKey.classList.add("deactivated")
            console.log ("key clicked")
        } else if (skullState == true){
            text.textContent=("You trow the skull against the chest. What did you whink was going to happen?");
            statesFalse();
            console.log (skullState);
            stuck();
            buttonElementSkull.classList.add("deactivated")
            console.log ("skull clicked")
        } else if (spellState == true){
            encounter.src = "./assets/images/chest-alive.png";
            text.textContent=("You cast the spell on the chest, and now it is alive! You try to move past it but you get to close and it eats you.");
            statesFalse();
            console.log (spellState);
            youDied ();
            buttonElementSpell.classList.add("deactivated")
            console.log ("spell clicked")
        }
    }
}

// this function  reloads the page to restart the game
function again(){
    window.location.reload();
    console.log("reloaded");
}

// functions that decide the ending of the game and sends you back to the beginning
function youDied(){
    // disable all buttons
    disableButtons();
    // test
    console.log ("lol you died");
    // retry button activeren met veranderde tekst
    buttonElementRefresh.classList.remove("deactivated");
    buttonText.textContent=("you died, try again?");
}

function youWon (){
    // disable all buttons
    disableButtons();
    // test
    console.log ("yay you won!");
    // retry button activeren met veranderde tekst
    buttonElementRefresh.classList.remove("deactivated");
    buttonText.textContent=("yay, you won! do you want to try to get a different ending?");
}

function stuck(){
    // disable all buttons
    disableButtons();
    // test
    console.log ("you are stuck forever in this stupid dungeon");
    // retry button activeren met veranderde tekst
    buttonElementRefresh.classList.remove("deactivated");
    buttonText.textContent=("you are stuck in the dungeon forever. Do you want to try again?");
}

