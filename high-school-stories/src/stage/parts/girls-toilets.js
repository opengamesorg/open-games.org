/***********************************************
girls-toilets.js
***********************************************/

// setup the stage part
function setupGirlsToilets(){
	
	// obstacles
	Crafty.e('Obstacle').size(14,144).place(0,530); 	// left wall
	Crafty.e('Obstacle').size(14,48).place(320,530); 	// right wall 
	Crafty.e('Obstacle').size(14,32).place(320,626); 	// right wall
	Crafty.e('Obstacle').size(334,16).place(0,530); 	// top wall
	Crafty.e('Obstacle').size(334,16).place(0,658); 	// bottom wall
	Crafty.e('Obstacle').size(238,16).place(0,562);  	// toilets and trash can
	Crafty.e('Obstacle').size(18,16).place(302,562);  	// top right corner
	Crafty.e('Obstacle').size(18,16).place(302,626);  	// bottom right corner
	
	// decor placed "above" the characters
	Crafty.e('Decor').place(14,640).setFolder('girls-toilets').above(1); 	// bottom wall
	 
}