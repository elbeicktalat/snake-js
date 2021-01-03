const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");


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
    if (event.keyCode == 37 && dir != "RIGHT") {
        dir = "LEFT";
    } else if (event.keyCode == 38 && dir != "DOWN") {
        dir = "UP";
    } else if (event.keyCode == 39 && dir != "LEFT") {
        dir = "RIGHT";
    } else if (event.keyCode == 40 && dir != "UP") {
        dir = "DOWN";
    }
}


//draw all in canvas

function draw() {
    ctx.drawImage(background, 0, 0);
    for (let i = 0; i < snake.length; i++) {
        //check if the first index give "green" else "white"
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "blue";
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

    snake.unshift(newHead);

    //score
    ctx.fillStyle = "white";
    ctx.font = "4rem sans-serif";
    ctx.fillText(score, 80, 60);
}

//call draw evry 100 ms
let game = setInterval(draw, 100);