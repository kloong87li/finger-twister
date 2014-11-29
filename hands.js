function Hands(colorMap, pressedKeys) {
	this.colorMap = colorMap; //key -> color
    this.pressedKeys = pressedKeys; // key -> finger

    this.inProgress = false;
    this.freeFingers = 0;

    this.movingFinger = null;
    this.movingColor = null; 
    this.oldColor = null; 
}

Hands.prototype.setInMotion = function(movingFinger, movingColor, oldColor) {

    this.movingFinger = movingFinger; 
    this.movingColor = movingColor;
    this.oldColor = oldColor;

}

Hands.prototype.fingerPressed = function(key) {
	this.freeFingers--; 

	if (this.freeFingers < 0) {
		return false;
	}

	if (!this.inProgress) {
		return false;
		//someone pressed a key when it was not time to move
	}

	if (key in colorMap) {
		var newColor = colorMap[key];
		if (newColor != this.movingColor) {
			return false; 
			//they pressed a key that was the wrong color
		}
		this.pressedKeys[key] = this.movingFinger;

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

Hands.prototype.fingerReleased = function(key) {
	this.freeFingers++;

	if (this.freeFingers > 2) {
		return false; // there are more than two lifted fingers at once
	}

	if (!this.inProgress) {
		return false; //someone released a key when it was not time to move
	}

	if (this.pressedKeys[key] != this.movingFinger) {
		return false; //someone released a key of a finger that is not supposed to move
	} 

	if (this.colorMap[key] != this.oldColor) {
		return false; //someone released a key that wasn't the original color
		// ie. the case when someone pressed a new key but then lifted again
	}

	delete this.pressedKeys[key];
	//delete the released key from the map

	return true; 
}

Hands.prototype.verify = function(colorReqs) {

	if (this.freeFingers != 0) {
		return false; 
		//there are not enough keys pressed
	}

	for (var key in this.pressedKeys) {
		var finger = this.pressedKeys[key]; 
		var fingerColor = colorMap[key];
		if (fingerColor != colorReqs[finger]) {
			return false;  
			// one of the fingers doesn't meet the color requirements
		}
	}

	return true; 
}