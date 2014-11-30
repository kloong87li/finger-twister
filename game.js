
function GAME() {
    //this.colors = {RED:0, BLUE:1, GREEN:2, YELLOW:3};
    //this.fingers = {THUMB:0, POINTER:1, MIDDLE:2, RING:3, PINKIE:4};
    this.colorReqs = {}; // finger -> color
    this.movingFinger = null; 
    this.movingColor = null; 
    this.timer = null; 
    this.timer = new Timer();

    this.initKeyDownListener = debounceCharDown(this.initKeyDown.bind(this));
    this.initKeyUpListener = debounceCharUp(this.initKeyUp.bind(this));
    this.keyDownListener = debounceCharDown(this.onKeyDown.bind(this));
    this.keyUpListener = debounceCharUp(this.onKeyUp.bind(this));

}


GAME.prototype.startGame = function () {
    // these are hardcoded... -.-
    if (FINGERS == 5) {
        // TODO fix these...
        this.initPositions = {'Q':4,'W':3,'E':2,'R':1,'C':0,'U':1,'I':2,'O':3,'O':4,'M':0};
        this.colorReqs = {}
        this.gui = new GUI([0, 1, 2, 3, 0]);
        this.gui.showText("To start the game, place fingers on QWERC / UIOPM");
    } else {
        this.initPositions = {'Q':1,'W':0, 'K':0,'O':1};
        this.colorReqs = {0: 3, 1: 2};
        this.gui = new GUI([3, 2]);
        this.gui.showText("To start the game, place fingers on QW/ KO");
    }

    this.pressedKeys = {}; 

    window.addEventListener("keydown", this.initKeyDownListener);
    window.addEventListener("keyup", this.initKeyUpListener);
}


GAME.prototype.continueGame = function() {
    // remove initial setup event listeners
    window.removeEventListener("keydown", this.initKeyDownListener);
    window.removeEventListener("keyup", this.initKeyUpListener);

    this.hands = new Hands(this.initPositions);
    window.addEventListener("keydown", this.keyDownListener);
    window.addEventListener("keyup", this.keyUpListener);
    this.newRound();
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
    return true;
}

GAME.prototype.initKeyDown = function(event) {
    var key = getChar(event.which);
    if (!(key in this.pressedKeys)) {
        this.gui.setKey(key, true);

        this.pressedKeys[key] = 0;
        if (this.equalKeys(this.initPositions, this.pressedKeys)) {
            this.continueGame(); 
        }
    }
}

GAME.prototype.initKeyUp = function(event) {
    var key = getChar(event.which); 
    this.gui.setKey(key, false);

    delete this.pressedKeys[key]; 
}


GAME.prototype.timerFired = function() {
    var status = this.hands.verify(this.colorReqs);
    if (status) {
        console.log(this.hands.pressedKeys);
        this.gui.playCorrectNoise();
        window.setTimeout((function() {
            this.newRound();
        }).bind(this), 0);
    } else {
        this.gui.playWrongNoise();

        this.gameOver();
    }
}

GAME.prototype.newRound = function () {
    this.movingFinger = Math.floor(Math.random() * FINGERS);
    this.movingColor = Math.floor(Math.random() * COLORS);

    var oldColor = this.colorReqs[this.movingFinger];
    if (this.movingColor == oldColor) {
        this.movingColor = (oldColor + 1) % COLORS; 
    }

    this.colorReqs[this.movingFinger] = this.movingColor;
    this.hands.setInMotion(this.movingFinger, this.movingColor);

    // gui stuff
    this.gui.newInstruction(this.movingFinger, this.movingColor);
    this.timer.setIntervalCallback(this.updateTimer.bind(this));

    this.timer.startTimer(10000, this.timerFired.bind(this));
}

GAME.prototype.onKeyDown = function (event) {
    var key = getChar(event.which);
    if (!this.hands.isKeyPressed(key)) {
        this.gui.setKey(key, true);

        var status = this.hands.fingerPressed(key);
        if (!status) {
            this.gui.playWrongNoise();

            this.gameOver();
        }
    }
}

GAME.prototype.onKeyUp = function (event) {
    var key = getChar(event.which); 
    if (this.hands.isKeyPressed(key)) {
        this.gui.setKey(key, false);

        var status = this.hands.fingerReleased(key);
        if (!status) {
            this.gui.playWrongNoise();

            this.gameOver();
        }
    } else {
    }
}


GAME.prototype.updateTimer = function(time) {
    var rounded = Math.round(time/1000 * 10) / 10;
    this.gui.setTimer(rounded);
}


GAME.prototype.gameOver = function() {
    // some action to end game and potentially restart?
    // do something in the gui
    this.timer.stopTimer();

    window.removeEventListener("keydown", this.keyDownListener);
    window.removeEventListener("keyup", this.keyUpListener);

    this.gui.showGameOver();
    this.startGame();
}

