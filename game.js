
function GAME() {
    //this.colors = {RED:0, BLUE:1, GREEN:2, YELLOW:3};
    //this.fingers = {THUMB:0, POINTER:1, MIDDLE:2, RING:3, PINKIE:4};
    this.colorReqs = {}; // finger -> color
    this.movingFinger = null; 
    this.movingColor = null; 
    this.timer = null; 

}

GAME.prototype.startGame = function () {
    this.hands = new Hands(colorMap, pressedKeys);

    // TODO add new game phase listeners

    // TODO initialize this stuff after new game phase
    this.timer = window.setTimeout(timerFired, 5000);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}

GAME.prototype.timerFired = function() {
    var status = this.hands.verify(colorReqs);
    if (status) {
        this.newRound();
    } else {
        this.gameOver();
    }
}

GAME.prototype.newRound = function () {
    this.movingFinger = Math.floor(Math.random() * 5);
    this.movingColor = Math.floor(Math.random() * 4);

    // TODO make sure new finger is not the same color
    // TODO start new timer

    var oldColor = this.colorReqs[movingFinger];
    this.colorReqs[movingFinger] = movingColor;
    this.hands.setInMotion(this.movingFinger, this.movingColor, oldColor);
}

GAME.prototype.onKeyPress = function (event) {
    // TODO combine with gui code
    var keyCode = event.keyCode;
    var status = Hands.fingerPressed(keyCode);
    if (!status) {
        this.gameOver();
    }
}

GAME.prototype.onKeyRelease = function (event) {
    var keyCode = event.keyCode; 
    var status = Hands.fingerReleased(keyCode);
    if (!status) {
        this.gameOver();
    }
}

GAME.prototype.gameOver = function() {
    // some action to end game and potentially restart?
    // do something in the gui
    window.removeEventListener("keydown", onKeyPress);
    window.removeEventListener("keyup", onKeyRelease);
 
}

