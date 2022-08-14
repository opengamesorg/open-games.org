/***********************************************
hallway.js
***********************************************/

// setup the stage part
function setupHallway(){

	/***************************
	 top horizontal part
	***************************/
	
	// obstacles
	Crafty.e('Obstacle').size(14,144).place(0,402); 	// left wall 
	Crafty.e('Obstacle').size(14,144).place(1134,402); 	// right wall 
	Crafty.e('Obstacle').size(46,16).place(0,402); 		// top wall
	Crafty.e('Obstacle').size(384,16).place(78,402); 	// top wall
	Crafty.e('Obstacle').size(384,16).place(494,402); 	// top wall
	Crafty.e('Obstacle').size(224,16).place(910,402); 	// top wall
	Crafty.e('Obstacle').size(334,16).place(0,530); 	// bottom wall
	Crafty.e('Obstacle').size(674,16).place(462,530); 	// bottom wall
	Crafty.e('Obstacle').size(32,32).place(14,418); 	// top left plant
	
	// decor placed "above" the characters
	Crafty.e('Decor').place(14,384).setFolder('hallway').above(1); 	// top walls
	Crafty.e('Decor').place(14,512).setFolder('hallway').above(2); 	// bottom walls
	
	// interactive elements
	Crafty.e('Interactive').size(10,10).place(1046,412).setInteractiveId(1).attr({direction: 'up'}); 	// highschool sign
	Crafty.e('Interactive').size(10,10).place(856,500).setInteractiveId(2).attr({direction: 'down'}); 	// infirmary sign
	Crafty.e('Interactive').size(10,10).place(856,412).setInteractiveId(3).attr({direction: 'up'});		// principal's office sign
	Crafty.e('Interactive').size(10,10).place(696,412).setInteractiveId(4).attr({direction: 'up'});		// medal panel
	Crafty.e('Interactive').size(10,10).place(506,412).setInteractiveId(5).attr({direction: 'up'});		// classroom-2 sign
	Crafty.e('Interactive').size(40,10).place(250,412).setInteractiveId(6).attr({direction: 'up'});		// information panel
	Crafty.e('Interactive').size(10,10).place(90,412).setInteractiveId(7).attr({direction: 'up'});		// classroom-1 sign
	
	/***************************
	 middle vertical part
	***************************/
	
	// obstacles
	Crafty.e('Obstacle').size(14,48).place(320,530); 	// left wall 
	Crafty.e('Obstacle').size(14,78).place(320,626); 	// left wall 
	Crafty.e('Obstacle').size(14,48).place(462,530); 	// right wall 
	Crafty.e('Obstacle').size(14,78).place(462,626); 	// right wall 
	Crafty.e('Obstacle').size(128,14).place(334,690); 	// bottom wall : work in progress

	// decor placed "above" the characters
	Crafty.e('Decor').place(334,670).setFolder('hallway').above(3); 	// bottom wall : work in progress
	
}