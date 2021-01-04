const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

const shadow = document.getElementById("shadow");
shadow.innerHTML = `<h1>Start Game</h1>`;

const box = 32;


//load images

const background = new Image();
background.src = "./assets/images/background.png"

const foodImage = new Image();
foodImage.src = "./assets/images/food.png"

//create a snake
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

//create food object
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
}

//score var
let score = 0;

//control snake event listener
let dir;
document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if ((key == 37 || key == 65) && dir != "RIGHT") {
        dir = "LEFT";
        shadow.style.display = "none";
    } else if ((key == 38 || key == 87) && dir != "DOWN") {
        dir = "UP";
        shadow.style.display = "none";
    } else if ((key == 39 || key == 68) && dir != "LEFT") {
        dir = "RIGHT";
        shadow.style.display = "none";
    } else if ((key == 40 || key == 83) && dir != "UP") {
        dir = "DOWN";
        shadow.style.display = "none";
    } else if (key == 32) {
        restart();
    }
}

//cheack collision
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

//draw all in canvas

function draw() {
    ctx.drawImage(background, 0, 0);
    for (let i = 0; i < snake.length; i++) {
        //check if the first index give "green" else "white"
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = (i == 0) ? "white" : "green";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.drawImage(foodImage, food.x, food.y);

    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //increment snake size when eats food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box,
        }
    } else {
        //remove tail last index
        snake.pop();
    }


    //which direction go
    if (dir == "LEFT") snakeX -= box;
    if (dir == "UP") snakeY -= box;
    if (dir == "RIGHT") snakeX += box;
    if (dir == "DOWN") snakeY += box;

    //new head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // game over
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
        clearInterval(game);
        shadow.style.display = "flex";
        shadow.innerHTML = `
        <h1>Game Over!</h1>
        <h2>Click Me or space key to restart</h2>`;
    }
    snake.unshift(newHead);

    //score
    ctx.fillStyle = "white";
    ctx.font = "4rem sans-serif";
    ctx.fillText(score, 80, 60);
}

// call draw every 125 ms
let game = setInterval(draw, 125);

//reatart the game
function restart() {
    location.reload();
}