function HANDS(colorMap, pressedKeys) {
	this.colorMap = colorMap; //keyCode -> color
    this.pressedKeys = pressedKeys; // keyCode -> finger

    this.inProgress = false; 
    this.freeFingers = 0; 

    this.movingFinger = null;
    this.movingColor = null; 
    this.oldColor = null; 
}

HANDS.prototype.setInMotion = function(movingFinger, movingColor, oldColor) {

    this.movingFinger = movingFinger; 
    this.movingColor = movingColor;
    this.oldColor = oldColor;

}

HANDS.prototype.fingerPressed = function(keyCode) {
	this.freeFingers--; 

	if (!this.inProgress) {
		return false;
		//someone pressed a key when it was not time to move
	}

	if (keyCode in colorMap) {
		var newColor = colorMap[keyCode];
		if (newColor != this.movingColor) {
			return false; 
			//they pressed a key that was the wrong color
		}
		this.pressedKeys[keyCode] = this.movingFinger;

		if (this.freeFingers == 0) {
			this.inProgress = false; 
			//if both players have finished moving 
		}

		return true; 

	} else {
		return false; 
		//the pressed key is not on the board
	}
}

HANDS.prototype.fingerReleased = function(keyCode) {
	this.freeFingers++;

	if (this.freeFingers > 2) {
		return false; // there are more than two lifted fingers at once
	}

	if (!this.inProgress) {
		return false; //someone released a key when it was not time to move
	}

	if (this.pressedKeys[keyCode] != this.movingFinger) {
		return false; //someone released a key of a finger that is not supposed to move
	} 

	if (this.colorMap[keyCode] != this.oldColor) {
		return false; //someone released a key that wasn't the original color
		// ie. the case when someone pressed a new key but then lifted again
	}

	delete this.pressedKeys[keyCode];
	//delete the released key from the map

	return true; 
}

HANDS.prototype.verify = function(colorReqs) {

	if (length(this.pressedKeys) != 10) {
		return false; 
		//there are not enough keys pressed
	}

	for (var keyCode in this.pressedKeys) {
		var finger = this.pressedKeys[keyCode]; 
		var fingerColor = colorMap[keyCode];
		if (fingerColor != colorReqs[finger]) {
			return false;  
			// one of the fingers doesn't meet the color requirements
		}
	}

	return true; 
}