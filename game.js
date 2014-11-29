
function GAME() {
    //this.colors = {RED:0, BLUE:1, GREEN:2, YELLOW:3};
    //this.fingers = {THUMB:0, POINTER:1, MIDDLE:2, RING:3, PINKIE:4};
    this.colorReqs = {}; // finger -> color
    this.movingFinger = null; 
    this.movingColor = null; 
    this.timer = null; 
    this.initPositions = {'q':4,'w':3,'e':2,'r':1,'c':0,'u':1,'i':2,'o':3,'p':4,'m':0}; 
    this.pressedKeys = {}; 
}

GAME.prototype.startGame = function () {
    
    window.addEventListener("keydown", initKeyDown);
    window.addEventListener("keyup", initKeyUp);

}

GAME.prototype.continueGame = function() {
    // remove initial setup event listeners
    window.removeEventListener("keydown", initKeyDown);
    window.removeEventListener("keyup", initKeyUp);

    // TODO initialize timer
    this.hands = new Hands(colorMap, initPositions);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}

GAME.prototype.equalKeys = function(pos1, pos2) {
    var x;
    for (x in pos1) {
        if (!(x in pos2)) {
            return false
        }
    }

    for (x in pos2) {
        if (!(x in pos1)) {
            return false
        }
    }
}

GAME.prototype.initKeyDown = function(event) {
    var key = getChar(event.which);
    this.pressedKeys[key] = 0;
    if this.equalKeys(initPositions, pressedKeys) {
        this.continueGame(); 
    }
}

GAME.prototype.initKeyUp = function(event) {
    var key = getChar(event.which); 
    delete this.pressedKeys[key];
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

    var oldColor = this.colorReqs[this.movingFinger];
    if (this.movingColor == oldColor) {
        oldColor = (oldColor + 1) % 4; 
    }

    this.colorReqs[this.movingFinger] = movingColor;
    this.hands.setInMotion(this.movingFinger, this.movingColor, oldColor);
    // TODO start new timer
}

GAME.prototype.onKeyDown = function (event) {
    // TODO combine with gui code
    var key = getChar(event.which); 
    var status = this.hands.fingerPressed(key);
    if (!status) {
        this.gameOver();
    }
}

GAME.prototype.onKeyUp = function (event) {
    var key = getChar(event.which); 
    var status = this.hands.fingerReleased(key);
    if (!status) {
        this.gameOver();
    }
}

GAME.prototype.gameOver = function() {
    // some action to end game and potentially restart?
    // do something in the gui
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
 
}

