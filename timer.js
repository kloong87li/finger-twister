function Timer() {
	this.timeout = null;
	this.intervalCallback = null;
	this.timerCallback = null;
	this.resolution = 100;

	this.count = 0;
	this.goal = 0;
}


// resolution must be multiple of 100, defaults to 100 i.e .1 second
Timer.prototype.setIntervalCallback = function(callback, resolution) {
	this.intervalCallback = callback;
	this.resolution = resolution || this.resolution;
}


Timer.prototype.startTimer = function(ms, callback) {
	if (this.timeout != null) {
		console.error("Starting timer when one is already in progress!\n");
		return;
	}

	this.count = 0;
	this.goal = ms;

	this.timerCallback = callback;

	this.timeout = window.setInterval((function() {
		this.count += 100;

		if (this.count % this.resolution == 0) {
			this.intervalCallback();
		}

		if (this.count >= this.goal) {
			this.timerCallback();
			this.stopTimer();
		}

	}).bind(this), 100);
}


Timer.prototype.stopTimer = function () {
	this.clearTimeout(this.timeout);
	this.timerCallback = null;
	this.count = 0;
	this.goal = 0;
}



