/***********************************************
room-6.js
***********************************************/

// room 6
Crafty.scene('room-6', function() {
	
	// init room
	// see _shared.js
	initRoom(6);
	
	// player creation at init position
	var initX = 30;
	var initY = 195;
	var player = Crafty.e('Player').place(initX, initY);
	
	// closing door
	Crafty.e('Door').place(16, 175).close();
	
	// center left ground
	Crafty.e('Platform').place(0, 225).size(255, 20);
	// center right ground
	Crafty.e('Platform').place(345, 225).size(255, 20);
	// exit platform
	var exitPlatform = Crafty.e('Platform').place(265, 225).size(70, 32).setImage('exit-platform');
	
	// platform to the left
	Crafty.e('Platform').place(170, 140).size(42, 20);
	// platform to the right
	Crafty.e('Platform').place(335, 75).size(42, 20);
	
	// killing ground
	Crafty.e('Killing, Trap').place(0, Game.height-20).size(Game.width, 16);
	
	// left killing wall
	var leftKillingWall = Crafty.e('Killing, Trap').place(-30, 0).size(20, 225).setImage('killing-wall-left');
	// right killing wall
	var rightKillingWall = Crafty.e('Killing, Trap').place(Game.width+10, 0).size(20, 225).setImage('killing-wall-right');
	
	// key to door 6 : performs action when hit
	Crafty.e('Key').setNumber(6).place(281, 200).action(function(){
		// both walls move to opposite direction
		leftKillingWall.doMove({x: Game.width+10, y: 0}, 5000);
		rightKillingWall.doMove({x: -30, y: 0}, 5000);
		// left action box creation
		Crafty.e('ActionBox').place(184, 110).action(function(){
			// stops the left wall from moving
			leftKillingWall.stopMoving();
		});
		// right action box creation
		Crafty.e('ActionBox').place(349, 45).action(function(){
			// stops the right wall from moving
			// opens the exit
			rightKillingWall.stopMoving();
			exitPlatform.doMove({x: 265, y: Game.height-47}, 500);
		});
	});
	
	// door 6 with its platform
	Crafty.e('Door').setNumber(6).place(Game.width-48, Game.height-86);
	Crafty.e('Platform').place(Game.width-104, Game.height-36).size(86, 20);
	
});