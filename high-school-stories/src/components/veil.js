/***********************************************
veil.js : Veil component
***********************************************/

// Veil is just a big black rectangle, taking
// 100% of the game container size. It is used
// to make transitions by fading in/out. 

// Veil component definition
Crafty.c('Veil', {
	
	// required components automatically included
	required: '2D, DOM, Color, Tween',

	// executed once at creation
    init: function() {
		this.attr({
            x: 0, y: 0, z: 1, alpha: 1,
            h: Game.height, w: Game.width,
        });
        this.color('black');
    },

    // modifiy opacity over time
    fade: function(alpha, delay) {
        this.tween({alpha: alpha}, delay);
        return this;
    },
	
});