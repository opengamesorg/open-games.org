/***********************************************
classroom-1.js
***********************************************/

// setup the stage part
function setupClassroom1(){
	
	// obstacles
	Crafty.e('Obstacle').size(14,398).place(0,20); 		// left wall 
	Crafty.e('Obstacle').size(14,398).place(366,20); 	// right wall
	Crafty.e('Obstacle').size(380,14).place(0,20);  	// top wall
	Crafty.e('Obstacle').size(46,16).place(0,402); 		// bottom wall
	Crafty.e('Obstacle').size(302,16).place(78,402); 	// bottom wall
	Crafty.e('Obstacle').size(110,32).place(0,34); 		// top left bookshelf
	Crafty.e('Obstacle').size(32,34).place(334,32); 	// top right chair
	Crafty.e('Obstacle').size(96,16).place(174,114); 	// teacher desk
	Crafty.e('Obstacle').size(64,16).place(110,178); 	// student desk 1 (from left to right and top to bottom)
	Crafty.e('Obstacle').size(64,16).place(238,178); 	// student desk 2
	Crafty.e('Obstacle').size(64,16).place(110,242); 	// student desk 3
	Crafty.e('Obstacle').size(64,16).place(238,242); 	// student desk 4
	Crafty.e('Obstacle').size(64,16).place(110,306); 	// student desk 5
	Crafty.e('Obstacle').size(64,16).place(238,306); 	// student desk 6
	Crafty.e('Obstacle').size(32,48).place(14,242); 	// left empty desks
	
	// decor placed "above" the characters
	Crafty.e('Decor').place(174,101).setFolder('classroom-1').above(1); 	// teacher's desk
	Crafty.e('Decor').place(110,159).setFolder('classroom-1').above(2); 	// student desk 1
	Crafty.e('Decor').place(238,159).setFolder('classroom-1').above(3); 	// student desk 2
	Crafty.e('Decor').place(110,219).setFolder('classroom-1').above(4); 	// student desk 3
	Crafty.e('Decor').place(238,223).setFolder('classroom-1').above(5); 	// student desk 4
	Crafty.e('Decor').place(110,287).setFolder('classroom-1').above(6); 	// student desk 5
	Crafty.e('Decor').place(238,287).setFolder('classroom-1').above(7); 	// student desk 6
	Crafty.e('Decor').place(14,223).setFolder('classroom-1').above(8); 		// left empty desks
	
}