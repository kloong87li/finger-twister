
function GAME() {
    //this.colors = {RED:0, BLUE:1, GREEN:2, YELLOW:3};
    //this.fingers = {THUMB:0, POINTER:1, MIDDLE:2, RING:3, PINKIE:4};
    this.colorReqs = {}; // finger -> color
    this.movingFinger = null; 
    this.movingColor = null; 
    this.timer = null; 

}

GAME.prototype.startGame = function () {
    window.addEventListener("keydown", onKeyPress);
    window.addEventListener("keyup", onKeyRelease);
    
    Hands = new Hands(colorMap, pressedKeys);

    this.timer = window.setTimeout(timerFired, 5000);
}

GAME.prototype.timerFired = function() {
    var status = Hands.verify(colorReqs);
    if (status) {
        this.nextInstruction(); 	
    } else {
        this.gameOver();
    }
}

GAME.prototype.nextInstruction = function () {
    this.movingFinger = Math.floor(Math.random() * 5);
    this.movingColor = Math.floor(Math.random() * 4);

    this.colorReqs[movingFinger] = movingColor;
    Hands.setInMotion(this.movingFinger, this.movingColor);
}

GAME.prototype.onKeyPress = function (event) {
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
    //some action to end game and potentially restart?
    window.removeEventListener("keydown", onKeyPress);
    window.removeEventListener("keyup", onKeyRelease);
 
}

