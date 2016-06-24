(function($) {
	window.machineGun = (function() {
		var soundLoading = false,
			pointsArray,
			$bullets,
			$container,
			currentIndexPosition = 0,
			letterIndent = 0,
			spacing = 0,
			animationTimeoutId = 0,
			soundLoadingTimeoutId = 0,
			positionVariation = 3,
			shotSounds = [],
			muted = false,
			volume = 1,
			text = "",
			delay = 50,
			delayVariation = 15,
			positionVariationFactor = 0.1,
			maxSpacing = 50,
			maxBulletSize = 40,
			positionsOfSpaces = [],
			positionsOfChars = [],
			soundAvailable = false,
			spacingSilenceUsed = true,
			letterMatrix = {
				"A": {
					"points": [[0,6],[0,5],[0,4],[0,3],[1,2],[2,1],[3,0],[4,1],[5,2],[6,3],[6,4],[6,5],[6,6],[1,4],[2,4],[3,4],[4,4],[5,4]],
					"width": 7
				},
				"B": {
					"points": [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,1],[6,2],[5,3],[4,3],[3,3],[2,3],[1,3],[0,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,5],[0,4],[0,2],[0,1]],
					"width": 7
				},
				"C": {
					"points": [[6,1],[5,0],[4,0],[3,0],[2,0],[1,0],[0,1],[0,2],[0,3],[0,4],[0,5],[1,6],[2,6],[3,6],[4,6],[5,6],[6,5]],
					"width": 7
				},
				"D": {
					"points": [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,5],[0,4],[0,3],[0,2],[0,1]],
					"width": 7
				},
				"E": {
					"points": [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[1,3],[2,3],[3,3],[4,3],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]],
					"width": 7
				},
				"F": {
					"points": [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[1,3],[2,3],[3,3],[4,3]],
					"width": 7
				},
				"G": {
					"points": [[6,1],[5,0],[4,0],[3,0],[2,0],[1,0],[0,1],[0,2],[0,3],[0,4],[0,5],[1,6],[2,6],[3,6],[4,6],[5,6],[6,5],[6,4],[6,3],[5,3],[4,3],[3,3]],
					"width": 7
				},
				"H": {
					"points": [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,3],[2,3],[3,3],[4,3],[5,3],[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6]],
					"width": 7
				},
				"I": {
					"points": [[0,0],[1,0],[2,0],[1,1],[1,2],[1,3],[1,4],[1,5],[0,6],[1,6],[2,6]],
					"width": 3
				},
				"J": {
					"points": [[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,5],[0,4]],
					"width": 7
				},
				"K": {
					"points": [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[5,0],[4,1],[3,2],[2,3],[1,3],[3,4],[4,5],[5,6]],
					"width": 6
				},
				"L": {
					"points": [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]],
					"width": 7
				},
				"M": {
					"points": [[0,6],[0,5],[0,4],[0,3],[0,2],[0,1],[0,0],[1,1],[2,2],[3,3],[4,2],[5,1],[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6]],
					"width": 7
				},
				"N": {
					"points": [[0,6],[0,5],[0,4],[0,3],[0,2],[0,1],[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[6,5],[6,4],[6,3],[6,2],[6,1],[6,0]],
					"width": 7
				},
				"O": {
					"points": [[1,0],[0,1],[0,2],[0,3],[0,4],[0,5],[1,6],[2,6],[3,6],[4,6],[5,6],[6,5],[6,4],[6,3],[6,2],[6,1],[5,0],[4,0],[3,0],[2,0]],
					"width": 7
				},
				"P": {
					"points": [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,1],[6,2],[5,3],[4,3],[3,3],[2,3],[1,3],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6]],
					"width": 7
				},
				"Q": {
					"points": [[1,0],[0,1],[0,2],[0,3],[0,4],[0,5],[1,6],[2,6],[3,6],[4,6],[6,4],[6,3],[6,2],[6,1],[5,0],[4,0],[3,0],[2,0],[4,4],[5,5],[6,6]],
					"width": 7
				},
				"R": {
					"points": [[0,6],[0,5],[0,4],[0,3],[0,2],[0,1],[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,1],[6,2],[5,3],[4,3],[3,3],[2,3],[1,3],[4,4],[5,5],[6,6]],
					"width": 7
				},
				"S": {
					"points": [[6,1],[5,0],[4,0],[3,0],[2,0],[1,0],[0,1],[0,2],[1,3],[2,3],[3,3],[4,3],[5,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,5]],
					"width": 7
				},
				"T": {
					"points": [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6]],
					"width": 7
				},
				"U": {
					"points": [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[1,6],[2,6],[3,6],[4,6],[5,6],[6,5],[6,4],[6,3],[6,2],[6,1],[6,0]],
					"width": 7
				},
				"V": {
					"points": [[0,0],[0,1],[0,2],[0,3],[1,4],[2,5],[3,6],[4,5],[5,4],[6,3],[6,2],[6,1],[6,0]],
					"width": 7
				},
				"W": {
					"points": [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[1,6],[2,6],[3,5],[3,4],[3,3],[3,2],[3,1],[4,6],[5,6],[6,5],[6,4],[6,3],[6,2],[6,1],[6,0]],
					"width": 7
				},
				"X": {
					"points": [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[6,0],[5,1],[4,2],[2,4],[1,5],[0,6]],
					"width": 7
				},
				"Y": {
					"points": [[0,0],[1,1],[2,2],[3,3],[4,2],[5,1],[6,0],[3,4],[3,5],[3,6]],
					"width": 7
				},
				"Z": {
					"points": [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[5,1],[4,2],[3,3],[2,4],[1,5],[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]],
					"width": 7
				},
				",": {
					"points": [[0,4],[0,5],[1,5],[1,4],[2,4],[2,5],[1,6],[0,7]],
					"width": 3
				},
				".": {
					"points": [[1,5],[2,5],[2,6],[1,6],[0,6],[0,5],[0,4],[1,4],[2,4]],
					"width": 3
				},
				"_": {
					"points": [[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]],
					"width": 7
				},
				"+": {
					"points": [[2,1],[2,2],[2,3],[2,4],[2,5],[0,3],[1,3],[3,3],[4,3]],
					"width": 5
				},
				"-": {
					"points": [[0,3],[1,3],[2,3],[3,3],[4,3]],
					"width": 5
				},
				"!": {
					"points": [[0,0],[0,1],[0,2],[1,2],[1,1],[1,0],[2,0],[2,1],[2,2],[1,3],[0,5],[0,6],[1,6],[1,5],[2,5],[2,6]],
					"width": 3
				},
				"?": {
					"points": [[0,1],[1,0],[2,0],[3,0],[4,0],[5,0],[6,1],[6,2],[5,3],[4,3],[3,3],[3,4],[3,6]],
					"width": 7
				},
				"@": {
					"points": [[3,3],[4,3],[4,2],[3,2],[2,2],[2,3],[2,4],[3,4],[4,4],[5,4],[6,3],[6,2],[6,1],[5,0],[4,0],[3,0],[2,0],[1,0],[0,1],[0,2],[0,3],[0,4],[0,5],[1,6],[2,6],[3,6],[4,6],[5,6]],
					"width": 7
				},
				"#": {
					"points": [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[0,2],[1,2],[3,2],[5,2],[6,2],[0,4],[1,4],[3,4],[5,4],[6,4]],
					"width": 7
				},
				":": {
					"points": [[1,1],[1,0],[0,1],[1,2],[2,1],[1,5],[1,4],[0,5],[1,6],[2,5]],
					"width": 3
				},
				"space": {
					"points": [],
					"width": 4
				},
				"'": {
					"points": [[1,1],[0,1],[0,0],[1,0],[2,0],[2,1],[1,2],[0,3]],
					"width": 4
				},
				"/": {
					"points": [[6,0],[5,1],[4,2],[3,3],[2,4],[1,5],[0,6]],
					"width": 7
				},
				"*": {
					"points": [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[4,1],[3,2],[1,3],[0,4],[0,1],[1,2],[3,3],[4,4]],
					"width": 5
				},
				"=": {
					"points": [[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4]],
					"width": 7
				},
				"~": {
					"points": [[0,3],[1,2],[2,3],[3,4],[4,3]],
					"width": 5
				},
				"(": {
					"points": [[2,0],[1,1],[0,2],[0,3],[0,4],[1,5],[2,6]],
					"width": 3
				},
				")": {
					"points": [[0,6],[1,5],[2,4],[2,3],[2,2],[1,1],[0,0]],
					"width": 3
				},
				"<": {
					"points": [[0,3],[1,2],[2,1],[1,4],[2,5],[3,6],[3,0]],
					"width": 4
				},
				">": {
					"points": [[0,6],[1,5],[2,4],[3,3],[2,2],[1,1],[0,0]],
					"width": 4
				},
				"\\": {
					"points": [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6]],
					"width": 7
				},
				"|": {
					"points": [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6]],
					"width": 1
				},
				"[": {
					"points": [[2,0],[1,0],[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,6],[2,6]],
					"width": 3
				},
				"]": {
					"points": [[0,0],[1,0],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[1,6],[0,6]],
					"width": 3
				},
				"&": {
					"points": [[6,6],[5,5],[4,4],[3,3],[2,2],[1,1],[2,0],[3,1],[1,3],[0,4],[0,5],[1,6],[2,6],[3,5],[5,3]],
					"width": 7
				},
				"\"": {
					"points": [[1,1],[0,1],[0,0],[1,0],[2,0],[2,1],[1,2],[0,3],[5,1],[4,1],[4,0],[5,0],[6,0],[6,1],[5,2],[4,3]],
					"width": 7
				},
				"^": {
					"points": [[0,2],[1,1],[2,0],[3,1],[4,2]],
					"width": 5
				},
				"%": {
					"points": [[0,6],[1,5],[2,4],[3,3],[4,2],[5,1],[6,0],[0,1],[1,0],[2,1],[1,2],[4,5],[5,4],[6,5],[5,6]],
					"width": 7 
				},
				"$": {
					"points": [[6,1],[5,1],[4,1],[3,1],[2,1],[1,1],[0,2],[1,3],[2,3],[3,3],[4,3],[5,3],[6,4],[5,5],[4,5],[3,5],[2,5],[1,5],[0,5],[3,0],[3,2],[3,4],[3,6]],
					"width": 7
				},
				"1": {
					"points": [[0,2],[1,1],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[0,6],[1,6],[2,6],[3,6],[4,6]],
					"width": 5
				},
				"2": {
					"points": [[0,1],[1,0],[2,0],[3,0],[4,0],[5,0],[6,1],[6,2],[5,3],[4,3],[3,3],[2,3],[1,3],[0,4],[0,5],[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]],
					"width": 7
				},
				"3": {
					"points": [[0,1],[1,0],[2,0],[3,0],[4,0],[5,0],[6,1],[6,2],[5,3],[4,3],[3,3],[2,3],[1,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,5]],
					"width": 7
				},
				"4": {
					"points": [[0,0],[0,1],[0,2],[0,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[5,1],[5,2],[5,3],[5,5],[5,6]],
					"width": 7
				},
				"5": {
					"points": [[0,0],[0,1],[0,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,5],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0]],
					"width": 7
				},
				"6": {
					"points": [[6,1],[5,0],[4,0],[3,0],[2,0],[1,0],[0,1],[0,2],[0,3],[0,4],[0,5],[1,6],[2,6],[3,6],[4,6],[5,6],[6,5],[6,4],[5,3],[4,3],[3,3],[2,3],[1,3]],
					"width": 7
				},
				"7": {
					"points": [[0,1],[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[5,1],[4,2],[3,3],[2,4],[2,5],[2,6]],
					"width": 7
				},
				"8": {
					"points": [[0,2],[0,1],[1,0],[2,0],[3,0],[4,0],[5,0],[6,1],[6,2],[5,3],[4,3],[3,3],[2,3],[1,3],[0,4],[0,5],[1,6],[2,6],[3,6],[4,6],[5,6],[6,5],[6,4]],
					"width": 7
				},
				"9": {
					"points": [[5,0],[4,0],[3,0],[2,0],[1,0],[0,1],[0,2],[1,3],[2,3],[3,3],[4,3],[5,3],[6,2],[6,1],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,5]],
					"width": 7
				},
				"0": {
					"points": [[3,0],[2,0],[1,1],[0,2],[0,3],[0,4],[1,5],[2,6],[3,6],[4,6],[5,5],[6,4],[6,3],[6,2],[5,1],[4,0]],
					"width": 7
				},
			};

		init();

		return {
			fire: function(t, containerID) {
				this.clear();

				// Render to body if container not set
				if(containerID)
					$container = $('#'+containerID);
				if(!$container || $container.length == 0)
					$container = $('body');

				// Wait for sound load before starting
				if(soundLoading) {
					soundLoadingTimeoutId = setTimeout(this.fire.bind(this), 100);
					return;
				}

				shotSounds = [];
				text = t ? t.toUpperCase() : text;
				pointsArray = createPointsArray();
				maxSpacing = Math.floor($container.height() / 7);
				spacing = Math.min(maxSpacing, $container.width() / (letterIndent - 1));
				positionVariation = spacing * positionVariationFactor;
				
				var appendString = "";
				for(var i = pointsArray.length; i--; ) {
					appendString += '<div class="bullet"></div>'
				}
				if(appendString) {
					$container.append(appendString);
				}
				$bullets = $('.bullet');
				if($bullets.length > 0) {
					$bullets.width(Math.min(Math.round(spacing / 1.5), maxBulletSize));
					$bullets.height(Math.min(Math.round(spacing / 1.5), maxBulletSize));
					drawBullet();
				}
				return this;
			},

			stop: function() {
				clearTimeout(soundLoadingTimeoutId);
				clearTimeout(animationTimeoutId);
				return this;
			},

			clear: function() {
				letterIndent = 0;
				currentIndexPosition = 0;
				positionsOfSpaces = [];
				positionsOfChars = []
				this.stop();
				if($container)
					$container.empty();
				return this;
			},

			mute: function() {
				muted = true;
				for(var i = shotSounds.length; i--; ) {
					shotSounds[i].volume = 0;
				}
				return this;
			},

			unmute: function() {
				muted = false;
				for(var i = shotSounds.length; i--; ) {
					shotSounds[i].volume = volume;
				}
				return this;
			},

			setVolume: function(v) {
				if(v >= 0 && v<=1) {
					volume = v;
					this.unmute();
				}
				return this;
			},

			getVolume: function() {
				return volume;
			},

			setDelay: function(d) {
				if(isInt(d)) {
					delay = parseInt(d);
				}
				return this;
			},

			getDelay: function() {
				return delay;
			},

			setDelayVariation: function(d) {
				if(isInt(d)) {
					delayVariation = parseInt(d);
				}
				return this;
			},

			getDelayVariation: function() {
				return delayVariation;
			},

			setMaxSpacing: function(d) {
				if(isInt(d)) {
					maxSpacing = parseInt(d);
				}
				return this;
			},
			
			getMaxSpacing: function() {
				return maxSpacing;
			},

			setMaxBulletSize: function(d) {
				if(isInt(d)) {
					maxBulletSize = parseInt(d);
				}
				return this;
			},
			
			getMaxBulletSize: function() {
				return maxBulletSize;
			},

			setPositionVariationFactor: function(v) {
				if(v >= 0 && v<=1) {
					positionVariationFactor = v;
				}
				return this;
			},

			getPositionVariationFactor: function() {
				return positionVariationFactor;
			},

			useSpacingSilence: function(b) {
				spacingSilenceUsed = b;
				return this;
			},

			isMuted: function() {
				return muted;
			}
		};

		// private functions
		function init() {
			// audio handler and initializer
			if (!createjs.Sound.initializeDefaultPlugins()) {
				return;
			}
			var audioPath = "audio/";
			var sounds = [
				{id: "Shot", src: "gunshot.ogg"}
			];
			soundLoading = true;
			createjs.Sound.alternateExtensions = ["mp3"];
			createjs.Sound.addEventListener("fileload", handleLoad);
			createjs.Sound.addEventListener("fileerror", handleLoad);
			createjs.Sound.registerSounds(sounds, audioPath);
			
			function handleLoad(event) {
				soundLoading = false;
				if(event.type === "fileload") {
					soundAvailable = true;
				}
				else {
					soundAvailable = false;
				}
			}
		}

		// Creates the array for the points where the bullet holes should be placed based on the text passed to the fire() function
		function createPointsArray() {
			var arr = [];
			for(var i = 0; i < text.length; i++) {
				var letterObj,
					letterPoints;
				// Test whether we can draw it, supported chars
				if(/[-A-Z0-9?!.,_+*/=@#:'~\\\"~()<>|[\]&^%$]/.test(text[i])) {
					letterObj = letterMatrix[text[i]];
					// Add the index to the special array to so we can check when a new letter is reached
					positionsOfChars.push(arr.length);
				}
				else {
					letterObj = letterMatrix.space;
					// Add the index to the special array to so we can check when a space is reached
					positionsOfSpaces.push(arr.length);
				}
				letterPoints = letterObj.points;
				
				var newLetterPoints = [];
				for(var j = 0; j < letterPoints.length; j++) {
					var point = [];
					point[0] = letterPoints[j][0] + letterIndent;
					point[1] = letterPoints[j][1];
					newLetterPoints.push(point);
				}
				arr = arr.concat(newLetterPoints);
				letterIndent += letterObj.width + 1;
			}
			return arr;
		}

		// Modifies the bullet-containing div and draws the bullet
		function drawBullet() {
			// If there is nothing more to draw, return
			if(currentIndexPosition >= pointsArray.length) {
				return;
			}
			var rotation = Math.floor(Math.random() * 70);
			$bullet = $($bullets[currentIndexPosition]);
			$bullet.css({
				'display': 'block',
				'left': pointsArray[currentIndexPosition][0] * spacing + (-positionVariation + Math.floor(Math.random() * positionVariation * 2)),
				'top': pointsArray[currentIndexPosition][1] * spacing + (-positionVariation + Math.floor(Math.random() * positionVariation * 2)),
				'-webkit-transform': 'rotate(' + rotation + 'deg)',
				'-moz-transform': 'rotate(' + rotation + 'deg)',
				'-ms-transform': 'rotate(' + rotation + 'deg)',
				'-o-transform': 'rotate(' + rotation + 'deg)',
				'-transform': 'rotate(' + rotation + 'deg)'
			});
			// Play the gunshot sound
			if(soundAvailable) {
				var sound = createjs.Sound.play("Shot");
				sound.volume = muted ? 0 : volume;
				// Keep a maximum of 5 sounds in the array (this is probably not necessary, it sounds the same...)
				if(shotSounds.length == 5) {
					shotSounds[0].stop();
					shotSounds.shift();
				}
				shotSounds.push(sound);
			}
			currentIndexPosition++;
			// Next point is a point after a space, we will add some delay
			if(spacingSilenceUsed && positionsOfSpaces.indexOf(currentIndexPosition) > -1) {
				animationTimeoutId = setTimeout(drawBullet, randomIntFromInterval((delay - delayVariation) * 6, (delay + delayVariation) * 6));	
			}
			// Or if it is the next letter
			else if(spacingSilenceUsed && positionsOfChars.indexOf(currentIndexPosition) > -1) {
				animationTimeoutId = setTimeout(drawBullet, randomIntFromInterval((delay - delayVariation) * 3, (delay + delayVariation) * 3));	
			}
			// No space
			else {
				animationTimeoutId = setTimeout(drawBullet, randomIntFromInterval(delay - delayVariation, delay + delayVariation));
			}
			
		}

		function randomIntFromInterval(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}

		function isInt(a) {
			//let's accept strings too
			return parseInt(a) == a ? true : false;
		}
	})();

	(function(sr){
		// debouncing function from John Hann
		// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
		var debounce = function (func, threshold, execAsap) {
			var timeout;

			return function debounced () {
				var obj = this, args = arguments;
				function delayed () {
					if (!execAsap)
						func.apply(obj, args);
					timeout = null;
				};

				if (timeout)
					clearTimeout(timeout);
				else if (execAsap)
					func.apply(obj, args);

				timeout = setTimeout(delayed, threshold || 700);
			};
		}
		// smartresize 
		jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : trigger(sr); };

	})('smartresize');

	// Resize window - redraw
	$(window).smartresize(function(){
		window.machineGun.clear();
		window.machineGun.fire();
	});

})(jQuery);