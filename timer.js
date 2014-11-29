function Timer() {
	this.timeout = null;
	this.intervalCallback = null;
	this.timerCallback = null;

	this.count = 0;
	this.goal = 0;
}


Timer.prototype.setIntervalCallback = function(callback) {
	this.intervalCallback = callback;
}


Timer.prototype.startTimer = function(seconds, callback) {
	if (this.timeout != null) {
		console.error("Starting timer when one is already in progress!\n");
		returnl
	}

	this.count = 0;
	this.goal = seconds;

	this.timerCallback = callback;

	this.timeout = window.setInterval((function() {
		this.count++;
		this.intervalCallback();

		if (this.count == this.goal) {
			this.timerCallback();
			this.stopTimer();
		}
	}).bind(this), 1000);
}


Timer.prototype.stopTimer = function () {
	this.clearTimeout(this.timeout);
	this.timerCallback = null;
	this.count = 0;
	this.goal = 0;
}



