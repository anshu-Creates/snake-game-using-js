const playGround = document.querySelector("#playGround");
const blockSize = 50;

const rows = Math.max(1, Math.floor(playGround.clientHeight / blockSize));
const cols = Math.max(1, Math.floor(playGround.clientWidth / blockSize));

playGround.style.width = `${cols * blockSize}px`;
playGround.style.height = `${rows * blockSize}px`;
playGround.style.gridTemplateColumns = `repeat(${cols}, ${blockSize}px)`;
playGround.style.gridAutoRows = `${blockSize}px`;
playGround.innerHTML = "";

const blocks = []

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const block = document.createElement("div");
    block.classList.add("block");
    playGround.appendChild(block);
    block.innerText = `${i}-${j}`;
    blocks[`${i}-${j}`] = block;
  }
}
