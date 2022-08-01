/***********************************************
principals-office.js
***********************************************/

// setup the stage part
function setupPrincipalsOffice(){
	
	// obstacles
	Crafty.e('Obstacle').size(14,212).place(704,192); 		// left wall 
	Crafty.e('Obstacle').size(14,212).place(942,192); 		// right wall 
	Crafty.e('Obstacle').size(252,14).place(704,180);  		// top wall
	Crafty.e('Obstacle').size(174,16).place(704,402);		// bottom wall
	Crafty.e('Obstacle').size(32,16).place(878,402);		// bottom door
	Crafty.e('Obstacle').size(32,16).place(910,402);		// bottom wall
	Crafty.e('Obstacle').size(142,16).place(704,274); 		// desk
	Crafty.e('Obstacle').size(64,16).place(782,306); 		// chairs
	
	// decor placed "above" the characters
	Crafty.e('Decor').place(729,256).setFolder('principals-office').above(1); 	// desk
	
}