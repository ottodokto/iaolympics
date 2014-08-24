$(function() {
	// ...

	var Scoreboard = function(scores) {
		this.scores = scores;
		this.highestScore = this.max(scores);
	}

	Scoreboard.prototype.max = function(arr) {
		var highest = -Infinity;
		for(var i = 0; i < arr.length; i++) {
			if(arr[i] > highest) {
				highest = arr[i];
			}
		}
		return highest;
	}

	Scoreboard.prototype.createSlidebar = function(jqElement, score) {
		// takes a div and stretches it (with animation) to the appropriate score width
		var relativeWidth = (score*1.0)/this.highestScore;
		var percentageString = (relativeWidth*100).toString().slice(0, 4) + "%";
		jqElement.animate({'width': percentageString}, 1000);
	}

	var divs = ["senior-score", "junior-score", "sophomore-score", "freshman-score"];
	var scores = [];

	for(var i = 0; i < divs.length; i++) {
		var jqDiv = $("#"+divs[i]);
		/* set its width to 0, 
			grab its score,
			and add it to the scores list */
		jqDiv.css('width', '0%');
		var score = parseInt(jqDiv.attr('data-score'));
		scores.push(score);
	}

	var scoreboard = new Scoreboard(scores);

	for(var i = 0; i < divs.length; i++) {
		scoreboard.createSlidebar($("#"+divs[i]), scores[i]);
	}
});