function GUI() {
	this.KEYS = [
		['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
		['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
		['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'],
		['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/']
	];

	this.KEY_COLORS = [
		[1, 2, 3, 4, 1, 2, 3, 4, 1, 2],
		[3, 4, 1, 2, 3, 4, 1, 2, 3, 4],
		[1, 2, 3, 4, 1, 2, 3, 4, 1, 2],
		[3, 4, 1, 2, 3, 4, 1, 2, 3, 4]
	]

	this.key2div = {};

	this.drawKeys($('#keyboard'));
}


GUI.prototype.drawKeys = function (keyboard) {
	for (var i = 0; i < this.KEYS.length; i++) {
		var row = $("<div class='keyboard-row'></div>");
		row.addClass('row-' + i); // add special class per row
		keyboard.append(row);
		for (var j = 0; j < this.KEYS[0].length; j++) {
			var button = $("<div class='keyboard-button'></div>");
			button.text(this.KEYS[i][j]); // set button text
			button.addClass('color-' + this.KEY_COLORS[i][j]) // set class based on color

			row.append(button);
			this.key2div[this.KEYS[i][j]] = button; // update internal map of keys to buttons
		}
	}
}

// state is a boolean
GUI.prototype.setKey = function (key, state) {
	var el = this.key2div[key];

	if (!el) return;
	
	if (state) {
		var cx = el.width()/2;
		var cy = el.height()/2

		// animate
		el.addClass('pressed');
		el.find("svg").remove();
  		el.append('<svg><circle cx="'+cx+'" cy="'+cy+'" r="'+0+'"></circle></svg>');
	  	var c = el.find("circle");
	  	c.animate(
		    {
		      "r" : el.outerWidth()
		    },
		    {
		      easing: "easeInQuad",
		      duration: 300,
		        step : function(val){
		                c.attr("r", val);
		            }
		    }
	    );
	} else {
		el.removeClass('pressed')
		el.find("svg").remove();
	}
}





