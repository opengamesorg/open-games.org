/***********************************************
infirmary.js
***********************************************/

// setup the stage part
function setupInfirmary(){
	
	// obstacles
	Crafty.e('Obstacle').size(14,144).place(1070,530); 	// right wall
	Crafty.e('Obstacle').size(32,144).place(782,530); 	// left wall
	Crafty.e('Obstacle').size(96,16).place(782,530); 	// top wall
	Crafty.e('Obstacle').size(32,16).place(878,530); 	// top door
	Crafty.e('Obstacle').size(160,16).place(910,530); 	// top wall
	Crafty.e('Obstacle').size(300,16).place(782,658); 	// bottom wall
	Crafty.e('Obstacle').size(32,64).place(814,594);  	// bottom left table
	Crafty.e('Obstacle').size(128,32).place(942,546);  	// top right furniture
	Crafty.e('Obstacle').size(32,46).place(1038,564);  	// right furniture
	
	// decor placed "above" the characters
	Crafty.e('Decor').place(794,640).setFolder('infirmary').above(1); 	// bottom wall
	 
}