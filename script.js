const playGround = document.querySelector("#playGround");
const blockSize = 50;
const rows = Math.max(1, Math.floor(playGround.clientHeight / blockSize));
const cols = Math.max(1, Math.floor(playGround.clientWidth / blockSize));
const score = document.querySelector("#score");
const time = document.querySelector("#time");
const blocks = [];

playGround.style.width = `${cols * blockSize}px`;
playGround.style.height = `${rows * blockSize}px`;
playGround.style.gridTemplateColumns = `repeat(${cols}, ${blockSize}px)`;
playGround.style.gridAutoRows = `${blockSize}px`;
playGround.innerHTML = "";

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const block = document.createElement("div");
    block.classList.add("block");
    playGround.appendChild(block);
    blocks[`${i}-${j}`] = block;
  }
}

let snake = [{ x: 1, y: 2 }];
let direction = "right";
let currentScore = 0;
let seconds = 0;
let minutes = 0;
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};

function render() {
  let head = null;

  blocks[`${food.x}-${food.y}`].classList.add("food");

  if (direction == "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction == "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction == "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  } else if (direction == "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  }

  if (head.x < 0 || head.y < 0 || head.x >= rows || head.y >= cols) {
    seconds = 0;
    minutes = 0;
    currentScore = 0;
    clearInterval(interval);
    clearInterval(timer);
    alert("Game is Over. Reload for Another Try...!");
    return;
  }

  if (head.x == food.x && head.y == food.y) {
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    snake.forEach(function (elem) {
      if (food.x == elem.x && food.y == elem.y) {
        food = {
          x: Math.floor(Math.random() * rows),
          y: Math.floor(Math.random() * cols),
        };
      }
    });

    blocks[`${food.x}-${food.y}`].classList.add("food");
    snake.unshift(head);

    currentScore++;

    score.innerText = currentScore;
  }

  snake.forEach(function (elem) {
    blocks[`${elem.x}-${elem.y}`].classList.remove("fill");
  });

  snake.unshift(head);
  snake.pop();

  snake.forEach(function (elem) {
    blocks[`${elem.x}-${elem.y}`].classList.add("fill");
  });
}

let timer = setInterval(() => {
  seconds++;
  if (seconds > 59) {
    minutes++;
    seconds = 0;
  }
  time.innerHTML = `${minutes} MIN : ${seconds} SEC`;
}, 1000);

let interval = setInterval(() => {
  render();
}, 500);

addEventListener("keydown", function (params) {
  if (params.key == "ArrowRight") {
    direction = "right";
  } else if (params.key == "ArrowLeft") {
    direction = "left";
  } else if (params.key == "ArrowUp") {
    direction = "up";
  }
  if (params.key == "ArrowDown") {
    direction = "down";
  }
});
