/***********************************************
classroom-2.js
***********************************************/

// setup the stage part
function setupClassroom2(){
	
	// obstacles
	Crafty.e('Obstacle').size(14,212).place(416,192); 		// left wall 
	Crafty.e('Obstacle').size(14,212).place(654,192); 		// right wall 
	Crafty.e('Obstacle').size(252,14).place(416,180);  		// top wall
	Crafty.e('Obstacle').size(46,16).place(416,402);  		// bottom wall
	Crafty.e('Obstacle').size(174,16).place(494,402);  		// bottom wall
	Crafty.e('Obstacle').size(128,16).place(430,242); 		// student desks
	Crafty.e('Obstacle').size(128,16).place(430,306); 		// student desks
	Crafty.e('Obstacle').size(32,48).place(590,274); 		// teacher desks
	Crafty.e('Obstacle').size(32,12).place(622,274); 		// teacher desks
	
	// decor placed "above" the characters
	Crafty.e('Decor').place(430,233).setFolder('classroom-2').above(1); 	// student desks
	Crafty.e('Decor').place(430,297).setFolder('classroom-2').above(2); 	// student desks
	Crafty.e('Decor').place(590,240).setFolder('classroom-2').above(3); 	// teacher desk
}