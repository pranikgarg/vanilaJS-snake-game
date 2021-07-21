// Game Constants
let inputDir = { x: 0, y: 0 };
const moveSound = new Audio("../assets/move.wav");
const gameOverSound = new Audio("../assets/gameover.wav");
const musicSound = new Audio("../assets/bg.wav");
const foodSound = new Audio("../assets/food.wav");

let speed = 15;
let lastPaintTime = 0;

let snakeArr = [{ x: 13, y: 15 }];

let food = { x: 6, y: 7 };

let score = 0;

// Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(sArr) {
  // If you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (sArr[i].x === sArr[0].x && sArr[i].y === sArr[0].y) {
      return true;
    }
  }

  // If you bump into the wall
  if (sArr[0].x >= 18 || sArr[0].x <= 0 || sArr[0].y >= 18 || sArr[0].y <= 0) {
    return true;
  }
}

function gameEngine() {
  // Part1: Updating the snake & food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game over!! Press any key to start over.");
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
    scoreBox.innerHTML = "Score: " + score;
    musicSound.play();
  }

  // if you have eaten the food, increment the score and regenerate the food
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    foodSound.play();
    score += 1;
    if (score > highScoreVal) {
      highScoreVal = score;
      localStorage.setItem("highScore", JSON.stringify(score));
      highScoreBox.innerHTML = "High Score: " + highScoreVal;
    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    const a = 2;
    const b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Part2: Display the snake & food
  board.innerHTML = "";

  // Display snake
  snakeArr.forEach((elm, index) => {
    const snakeElm = document.createElement("div");
    snakeElm.style.gridRowStart = elm.y;
    snakeElm.style.gridColumnStart = elm.x;
    if (index === 0) {
      snakeElm.classList.add("head");
    } else {
      snakeElm.classList.add("tail");
    }
    board.appendChild(snakeElm);
  });
  // Display food
  const foodElm = document.createElement("div");
  foodElm.style.gridRowStart = food.y;
  foodElm.style.gridColumnStart = food.x;
  foodElm.classList.add("food");
  board.appendChild(foodElm);
}

// Game Starts Here
musicSound.play();
const highScore = localStorage.getItem("highScore");
if (highScore) {
  highScoreVal = highScore;
  highScoreBox.innerHTML = "High Score: " + highScoreVal;
} else {
  highScoreVal = 0;
  localStorage.setItem("highScore", JSON.stringify(highScoreVal));
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (event) => {
  inputDir = { x: 0, y: 1 };
  moveSound.play();
  musicSound.play();
  switch (event.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});
