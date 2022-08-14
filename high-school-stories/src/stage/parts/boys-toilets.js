/***********************************************
boys-toilets.js
***********************************************/

// setup the stage part
function setupBoysToilets(){
	
	// obstacles
	Crafty.e('Obstacle').size(14,144).place(782,530); 	// right wall
	Crafty.e('Obstacle').size(14,48).place(462,530); 	// left wall 
	Crafty.e('Obstacle').size(14,32).place(462,626); 	// left wall
	Crafty.e('Obstacle').size(334,16).place(462,530); 	// top wall
	Crafty.e('Obstacle').size(334,16).place(462,658); 	// bottom wall
	Crafty.e('Obstacle').size(238,16).place(558,562);  	// toilets and trash can
	Crafty.e('Obstacle').size(18,16).place(476,562);  	// top left corner
	Crafty.e('Obstacle').size(18,16).place(476,626);  	// bottom left corner
	
	// decor placed "above" the characters
	Crafty.e('Decor').place(494,640).setFolder('boys-toilets').above(1); 	// bottom wall
	 
}