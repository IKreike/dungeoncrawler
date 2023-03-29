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

function allowwut(event){
    event.preventDefault();
}

// deze funcies zijn voor de aparte kaarten, en starten de algemene functie
function wut(event){
    event.preventDefault();
    console.log ("something got dropped");
    whatHappened();
}

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



// deze funcies zijn voor de aparte kaarten, en starten de algemene functie
// function cardAxe(event){
//     event.preventDefault();
//     buttonElementAxe.classList.add("deactivated");
//     console.log ("axe dropped/ draggded? clicked?");
//     // whatHappened ();
// };

// function cardRation(){
//     buttonElementRation.classList.add("deactivated")
//     console.log ("ration clicked")
//     whatHappened ();
//     rationState = true;
//     console.log (rationState);
// };

// function cardKey (){
//     buttonElementKey.classList.add("deactivated")
//     console.log ("key clicked")
//     keyState = true;
//     console.log (keyState);
//     whatHappened ();
// };

// function cardSkull (){
//     buttonElementSkull.classList.add("deactivated")
//     console.log ("skull clicked")
//     skullState = true;
//     console.log (skullState);
//     whatHappened ();
// };

// function cardSpell (){
//     buttonElementSpell.classList.add("deactivated")
//     console.log ("spell clicked")
//     spellState = true;
//     console.log (spellState);
//     whatHappened ();
// };



// deze funtie is een tussen stap om de gebruiker de tijd te geven om te lezen wat er gebeurd
function nextpt1 (){
    // nextbutton visable
    buttonElementNext.classList.remove("deactivated");
    // rest disabled
    disableButtons();
}

// functie word gestart als op de continue knop word gedrukt
function nextpt2 (){
    // next en counter from the array
    // challenge = challenge +1;
    console.log(counter);
    counter = counter +1;
    console.log(counter);
    challenge = challenges [counter];
    console.log (challenge);
    // remove nextbutton
    // buttonElementKey.classList.add("deactivated");
    buttonElementNext.classList.add("deactivated");
    // re-eneble rest
    buttonElementAxe.addEventListener("dragstart",axeStartDrag);
    buttonElementRation.addEventListener("dragstart",rationStartDrag);
    buttonElementKey.addEventListener("dragstart",keyStartDrag);
    buttonElementSkull.addEventListener("dragstart",skullStartDrag);
    buttonElementSpell.addEventListener("dragstart",spellStartDrag);
    console.log ("nextpt2check");
    if (challenge == "dog"){
        encounter.src = "./assets/images/dog-angry.png";
    } 
    else if (challenge == "wizard"){
        encounter.src = "./assets/images/wizard.png";
        text.textContent=("there is a wizard blocking your way")
    }
    else if (challenge == "chest"){
        encounter.src = "./assets/images/chest-closed.png";
        text.textContent=("While making your way to the exit, you encounter a closed chest")
    }
}

// this funtion checks what happened and what changes, runs multiple times in a game
function whatHappened (){
    if (challenge == "dog"){
        if (axeState === true){
            encounter.src = "./assets/images/dog-dead.png";
            text.textContent=("You kill the dog and take its skull")
            axeState = false;
            console.log (axeState);
            buttonElementSkull.classList.remove("deactivated");
            nextpt1();
            buttonElementAxe.classList.add("deactivated");
            console.log ("axe dropped/ draggded? clicked?");
        } else if (rationState === true) {
            encounter.src = "./assets/images/dog-cute.png";
            text.textContent=("You give the dog your food. The dog walks away and returns a moment later with a key")
            rationState = false;
            console.log (rationState);
            // sleutel geven
            // buttonElementKey.setAttribute (class,"active");
            // buttonElementKey.classList.add("active");
            buttonElementKey.classList.remove("deactivated");
            // function next?
            nextpt1();
            buttonElementRation.classList.add("deactivated")
            console.log ("ration clicked")
        }
    }
    else if (challenge == "wizard"){
        if (axeState == true){
            encounter.src = "./assets/images/wizard-angry.png";
            text.textContent=("You try to kill the wizard with your axe, but he fires a spell at you and you die");
            axeState = false;
            console.log (axeState);
            // no extra card
            youDied ();
            buttonElementAxe.classList.add("deactivated");
            console.log ("axe dropped");
        } else if (rationState == true){
            // no encounter picture change
            text.textContent=("Thank you, at least i wont die anytime soon. you mag go through");
            rationState = false;
            console.log (rationState);
            // no extra card
            nextpt1();
            buttonElementRation.classList.add("deactivated")
            console.log ("ration clicked")
        } else if (keyState == true){
            encounter.src = "./assets/images/wizard-blush.png";
            text.textContent=("Ah thank you, I can finally get out now! I can teach you this spell if you want?");
            keyState = false;
            console.log (keyState);
            buttonElementSpell.classList.remove("deactivated");
            nextpt1();
            buttonElementKey.classList.add("deactivated")
            console.log ("key clicked")
        } else if (skullState == true){
            encounter.src = "./assets/images/wizard-blush.png";
            text.textContent=("Ah, that perfectly fits my collection. Ill give you this key as a thanks");
            skullState = false;
            console.log (skullState);
            buttonElementKey.classList.remove("deactivated");
            nextpt1();
            buttonElementSkull.classList.add("deactivated")
            console.log ("skull clicked")
        }
    } else if (challenge == "chest"){
        if (axeState == true){
            encounter.src = "./assets/images/chest-broken.png";
            text.textContent=("you smash the chest with the axe, you get the key to the exit! yay!");
            axeState = false;
            console.log (axeState);
            // buttonElementAxe.classList.remove("deactivated");
            youWon();
            buttonElementAxe.classList.add("deactivated");
            console.log ("axe dropped");
        } else if (rationState == true){
            // encounter.src = "/assets/images/wizard.png";
            text.textContent=("you smash the food against the chest, what did you whink was going to happen?");
            rationState = false;
            console.log (rationState);
            // buttonElementRation.classList.remove("deactivated");
            stuck();
            buttonElementRation.classList.add("deactivated")
            console.log ("ration clicked")
        } else if (keyState == true){
            encounter.src = "./assets/images/chest-open.png";
            text.textContent=("You open the chest with the key, you get money!!!! yay!!");
            keyState = false;
            console.log (keyState);
            // buttonElementSpell.classList.remove("deactivated");
            youWon();
            buttonElementKey.classList.add("deactivated")
            console.log ("key clicked")
        } else if (skullState == true){
            // encounter.src = "/assets/images/wizard.png";
            text.textContent=("you smash the skull against the chest, what did you whink was going to happen?");
            skullState = false;
            console.log (skullState);
            // buttonElementKey.classList.remove("deactivated");
            stuck();
            buttonElementSkull.classList.add("deactivated")
            console.log ("skull clicked")
        } else if (spellState == true){
            encounter.src = "./assets/images/chest-alive.png";
            text.textContent=("you cast the spell on the chest, and it is alive! You try to approach it but it eats you.");
            spellState = false;
            console.log (spellState);
            // buttonElementRefresh.classList.remove("deactivated");
            // nextpt1();
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
    // visual effect?
    console.log ("lol you died");
    // retry button
    buttonElementRefresh.classList.remove("deactivated");
    buttonText.textContent=("you died, try again?");
}

function youWon (){
    // disable all buttons
    disableButtons();
    // visual effect?
    console.log ("yay you won!");
    // retry button
    buttonElementRefresh.classList.remove("deactivated");
    buttonText.textContent=("yay, you won! do you want to try to get a different ending?");
}

function stuck(){
    // disable all buttons
    disableButtons();
    // visual effect?
    console.log ("you are stuck forever in this stupid dungeon");
    // retry button
    buttonElementRefresh.classList.remove("deactivated");
    buttonText.textContent=("you are stuck in the dungeon forever. Do you want to try again?");
}

