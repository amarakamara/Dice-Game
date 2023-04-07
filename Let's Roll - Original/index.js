const promptContainer = document.querySelector(".prompt-container");
const buttons = document.querySelectorAll("button");
const button1 = buttons[0];
const button2 = buttons[3];
const resetBtn = buttons[1];
const cancelPrompt = buttons[2];
const diceSound = new Audio("Sound/dice-sound.mp3");
const winner = document.querySelector("h1");

const scoreTracker = document.querySelectorAll("h3");
const p1ScoreTracker = scoreTracker[0];
const p2ScoreTracker = scoreTracker[1];
let p1Score = 0;
let p2Score = 0;

let button1Active = true;
let button2Active = false;

//loads the prompt
window.addEventListener("load", () => {
  promptContainer.style.display = "flex";
});

//Cancels the prompt
cancelPrompt.addEventListener("click", () => {
  promptContainer.style.display = "none";
  winner.innerHTML = "Player One Roll";
});



//Initializing the game
player1Turn();

//Set of task to execute when it is player one's turn
function player1Turn() {
  let randomNumber1 = Math.floor(Math.random() * 6) + 1;
  button1.disabled = false;
  button1.classList.remove("bg-color");
  button1.classList.add("turn-indicator");

  const clickHandler = () => {
    if (!button1Active) {
      return;
    }
    diceSound.play();
    randomImageSource1 = "images/dice" + randomNumber1 + ".png";
    document.querySelectorAll("img")[0].setAttribute("src", randomImageSource1);
    button1.classList.add("bg-color");
    button1.classList.remove("turn-indicator");
    button1.disabled = true;
    button1Active = false;
    button2Active = true;
    button1.removeEventListener("click", clickHandler); // remove the click listener
    player2Turn(randomNumber1);
  };

  button1.addEventListener("click", clickHandler);
}

//Set of task to execute when it is player two's turn
function player2Turn(random1) {
  let randomNumber2 = Math.floor(Math.random() * 6) + 1;
  button2.disabled = false;
  button2.classList.remove("bg-color");
  button2.classList.add("turn-indicator");
  setTimeout(() => {
    winner.innerHTML = "Player Two Roll";
  }, 1000);

  const clickHandler = () => {
    diceSound.play();
    randomImageSource2 = "images/dice" + randomNumber2 + ".png";
    document.querySelectorAll("img")[1].setAttribute("src", randomImageSource2);
    button2.classList.add("bg-color");
    button2.classList.remove("turn-indicator");
    button2.disabled = true;
    button2Active = false;
    button1Active = true;
    button2.removeEventListener("click", clickHandler); // remove the click listener
    checkWinner(random1, randomNumber2);
    player1Turn();
  };

  button2.addEventListener("click", clickHandler);
}

//checks the winner after both players has tossed the die
function checkWinner(rand1, rand2) {
  if (rand1 > rand2) {
    winner.innerHTML = "Player One Wins.🎉";
    p1Score = p1Score + 1;
    p1ScoreTracker.innerHTML = p1Score;
    setTimeout(() => {
      winner.innerHTML = "Player One Roll";
    }, 1000);
  } else if (rand2 > rand1) {
    winner.innerHTML = "🎉Player Two Wins.";
    p2Score = p2Score + 1;
    p2ScoreTracker.innerHTML = p2Score;
    setTimeout(() => {
      winner.innerHTML = "Player One Roll";
    }, 1000);
  } else {
    winner.innerHTML = "Draw😒";
    setTimeout(() => {
      winner.innerHTML = "Player One Roll";
    }, 1000);
  }
}
//Resets the players scores
resetBtn.addEventListener("click", () => {
  p1Score = 0;
  p1ScoreTracker.innerHTML = p1Score;
  p2Score = 0;
  p2ScoreTracker.innerHTML = p2Score;
});
