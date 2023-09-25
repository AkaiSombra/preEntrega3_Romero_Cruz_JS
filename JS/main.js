const playBoard = document.querySelector(".gameBoard")

let foodX;
let foodY;

let snakeX = 3;
let snakeY = 13;

let snakeBody = [];

let velocityX = 0;
let velocityY = 0;

const randomFoodPosition = () => {
    foodX = Math.floor(Math.random() * 29) + 1 ;
    foodY = Math.floor(Math.random() * 29) + 1 ;
}

const changeDirection = (e) => {
    if(e.key === "ArrowUp"){
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown"){
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft"){
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight"){
        velocityX = 1;
        velocityY = 0;
    }
}

const initGame = () => {
    let htmlAdding = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`

    if(snakeX === foodX && snakeY === foodY){
        randomFoodPosition();
        snakeBody.push([foodX, foodY]);
    }

    for(let i= snakeBody.length - 1; i> 0; i--){
        snakeBody[i] = snakeBody[i - 1]
    }

    snakeBody[0] = [snakeX, snakeY]

    snakeX += velocityX;
    snakeY += velocityY;

    for(let i =0; i<snakeBody.length; i++){
        htmlAdding += `<div class="snakeHead" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
    }

    playBoard.innerHTML = htmlAdding;
}

randomFoodPosition();
setInterval(initGame, 125);

document.addEventListener("keydown", changeDirection);