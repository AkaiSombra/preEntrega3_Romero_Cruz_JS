
const playBoard = document.querySelector(".gameBoard")
const getScore = document.querySelector(".score")
const getHighScore = document.querySelector(".highScore")

let gameOver = false;

let foodX;
let foodY;

let snakeX = 3;
let snakeY = 13;

let snakeBody = [];

let velocityX = 0;
let velocityY = 0;

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
getHighScore.innerHTML = `High Score:${highScore}`;

let intervalId;

const randomFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1 ;
    foodY = Math.floor(Math.random() * 30) + 1 ;
}

const handleGameOver = () => {
    let gameOverText = `<div class="gameOverText"> Game Over! Click para volver a jugar </div>`
    clearInterval(intervalId);
    playBoard.innerHTML = gameOverText
    if(gameOver === true){
        document.addEventListener("click", restartGame);
    }
}

const restartGame = () => {
    location.reload();
}

const changeDirection = (e) => {
    if(e.key === "ArrowUp"  && velocityY != 1 || e.key === "w" && velocityY != 1 ){
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1  || e.key === "s" && velocityY != -1 ){
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1  || e.key === "a" && velocityX != 1 ){
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1  || e.key === "d" && velocityX != -1 ){
        velocityX = 1;
        velocityY = 0;
    }
}

const initGame = () => {

    if(gameOver) return handleGameOver();

    let htmlAdding = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`

    if(snakeX === foodX && snakeY === foodY){
        randomFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("highScore", highScore);
        getScore.innerHTML = `Score:${score}`
        getHighScore.innerHTML = `High Score:${highScore}`
    }

    for(let i= snakeBody.length - 1; i> 0; i--){
        snakeBody[i] = snakeBody[i - 1]
    }

    snakeBody[0] = [snakeX, snakeY]

    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true;
    }

    for(let i =0; i<snakeBody.length; i++){
        htmlAdding += `<div class="snakeHead" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }

    playBoard.innerHTML = htmlAdding;
}

randomFoodPosition();
intervalId = setInterval(initGame, 125);


document.addEventListener("keydown", changeDirection);
