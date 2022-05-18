/***********************************************
room-7.js
***********************************************/

// room 7
Crafty.scene('room-7', function() {
	
	// init room
	// see _shared.js
	initRoom(7);
	
	// player creation at init position
	var initX = 30;
	var initY = 96;
	var player = Crafty.e('Player').place(initX, initY);
	
	// closing door with its platform
	Crafty.e('Door').place(16, 77).close();
	Crafty.e('Platform').place(16, 127).size(54, 20);
	
	// killing ground
	var killingGround = Crafty.e('Killing, Trap').place(12, 240).size(Game.width-24, 20).setImage('killing-ground');
	// killing ceiling
	var killingCeiling = Crafty.e('Killing, Trap').place(12, 16).size(Game.width-24, 20).setImage('killing-ceiling');
	
	// small platforms
	Crafty.e('Platform').place(122, 162).size(5, 5);
	Crafty.e('Platform').place(217, 220).size(5, 5);
	Crafty.e('Platform').place(339, 173).size(5, 5);
	Crafty.e('Platform').place(451, 134).size(5, 5);
	Crafty.e('Platform').place(510, 197).size(5, 5);
	
	// key to door 7
	Crafty.e('Key').setNumber(7).place(280, 128).action(function(){
		// the killing platforms are moving in up and down
		killingGround.doMove({x: 12, y: 0}, 26000);
		killingCeiling.doMove({x: 12, y: 200}, 26000);
	});
	
	// door 7 with its platform
	Crafty.e('Door').setNumber(7).place(Game.width-48, 77);
	Crafty.e('Platform').place(Game.width-70, 127).size(54, 20);
	
});