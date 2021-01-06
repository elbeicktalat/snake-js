//control snake event listener
export let dir;
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
//reatart the game
function restart() {
    location.reload();
}