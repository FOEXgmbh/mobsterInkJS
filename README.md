# mobsterInkJS
Writes out a string using bulletholes

## Usage
- Include the css and the js files in your html document (jquery and soundjs are required)
```
<link rel="stylesheet" type="text/css" href="css/mobster-ink.css">
<script src="js/jquery-3.0.0.min.js" type="text/javascript"></script>
<script src="js/soundjs-0.6.2.min.js" type="text/javascript"></script>
<script src="js/mobster-ink.js" type="text/javascript"></script>
```
- You can use the machineGun object sitting on the window
```
window.machineGun.fire("FOEX", "bullet-container");
```

## Methods
#### fire(text, containerID)
*string text - the string to be printed out (default: "")*

*string containerID - the container that should hold the bullets (default: body || previously_passed_containerID)*

Prints out the passed string to the specified container.

#### stop()

Stops the drawing.

#### clear()

Stops the drawing and clears the bulletholes.

#### mute()

Mutes all sounds.

#### unmute()

Unmutes all sounds and restores the previous volume.

#### setVolume(v)
*float v - volume level from 0 to 1 (default: 1)*

Sets the volume of the gunshot.

#### getVolume()

Returns the currently set volume.

#### setDelay(d)
*int d - delay in milliseconds (default: 50)*

Sets the delay in milliseconds between the gunshots.

#### getDelay()

Returns the delay between the gunshots.
				
#### setDelayVariation(d)
*int d - delay variation in milliseconds (default: 15)*

Sets the variation in the gunshots.

#### getDelayVariation()

Returns the delay variation.

#### setMaxSpacing(d)
*int d - distance in pixels (default: 50)*

Sets the maximum spacing between the bulletholes' vertical and horizontal positions.
			
#### getMaxSpacing()

Returns the maximum spacing.

#### setMaxBulletSize(d)
*int d - size in pixels (default: 40)*

Sets the maximum bullethole size.
			
#### getMaxBulletSize()

Returns the maximum bullethole size.


#### setPositionVariationFactor(v)
*float v - variation factor from 0 to 1 (default: 0.1)*

Sets the variation in the position of the bulletholes. 0 - no variation, 1 - very random
			
#### getPositionVariationFactor()

Returns the current variation factor.

#### useSpacingSilence(b)
*boolean b - whether to use silence*

Enables or disables the short silence between letters and when skipping spaces in the drawn string.

#### isMuted()

Returns whether the instance is muted.

## Example
```
$(window).on("load", function() {
	machineGun.mute();
	machineGun.fire("FOEX", "bullet-container");
	//...
	// you can also chain the methods which are not returning a set value
	//...
	machineGun.fire().setVolume(.1).unmute();
});
```

## Required libraries
1. [jQuery](https://jquery.com)
2. [SoundJS](http://www.createjs.com/soundjs)

## Authors & Contributors
1. František Nagy
2. Peter Raganitsch