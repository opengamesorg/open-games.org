/***********************************************
room-13.js
***********************************************/

// room 13
Crafty.scene('room-13', function() {
	
	// init room
	// see _shared.js
	initRoom(13);
	
	// player creation at init position
	var initX = 30;
	var initY = 96;
	var player = Crafty.e('Player').place(initX, initY);
	
	// ground
	Crafty.e('Platform').place(0, 250).size(Game.width, 20);
	
	// closing door with its platform
	Crafty.e('Door').place(16, 77).close();
	Crafty.e('Platform').place(16, 127).size(54, 20);
	
	// small platforms
	Crafty.e('Platform').place(155, 179).size(16, 20);
	Crafty.e('Platform').place(428, 179).size(16, 20);
	
	// right killing wall first part
	var firstKillingWall = Crafty.e('Killing, Trap').place(Game.width+10, 0).size(20, 100).setImage('killing-wall-right').attr({z: 2});
	// right killing wall second part
	var secondKillingWall = Crafty.e('Killing, Trap').place(Game.width+10, 100).size(20, 160).setImage('killing-wall-right').attr({z: 2});
	// left killing wall
	var thirdKillingWall = Crafty.e('Killing, Trap').place(-30, 0).size(20, 260).setImage('killing-wall-left').attr({z: 2});
	
	// key to door 13
	Crafty.e('Key').setNumber(13).place(280, 128).action(function(){
		// both walls move to opposite direction
		firstKillingWall.doMove({x: -30, y: 0}, 4500);
		secondKillingWall.doMove({x: -30, y: 100}, 4500);
		// left action box
		Crafty.e('ActionBox').place(50, 220).action(function(){
			// killing wall first part stops moving
			firstKillingWall.stopMoving();
			Crafty.e('Delay').delay(function(){
				// after a short time, resume movement
				firstKillingWall.resumeMoving();
				Crafty.e('Delay').delay(function(){
					// after a short time, third killing wall moves from left
					thirdKillingWall.doMove({x: Game.width+10, y: 0}, 3000);
				},500);
			},1500);
		});
	});
	
	// door 13 with its platform
	Crafty.e('Door').setNumber(13).place(Game.width-48, 77);
	Crafty.e('Platform').place(Game.width-70, 127).size(54, 20);
	
});