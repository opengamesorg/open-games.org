/***********************************************
room-1.js
***********************************************/

// room 1 : launched after the menu
Crafty.scene('room-1', function() {
	
	// init room
	// see _shared.js
	initRoom(1);
	
	// player creation at init position
	var initX = 25;
	var initY = Game.height-46;
	var player = Crafty.e('Player').place(initX, initY);
	
	// start time attack mode if chosen
	// last room stops the mode
	if(Game.mode == 'timeAttack'){
		Game.timeAttack.start(player);
	}

	// bottom ground
	Crafty.e('Platform').place(0, Game.height-16).size(Game.width, 16);
	
	// closing door
	Crafty.e('Door').place(16, Game.height-66).close();

	// platforms
	Crafty.e('Platform').place(270, 301).size(102, 20);
	Crafty.e('Platform').place(75, 224).size(105, 20);
	Crafty.e('Platform').place(278, 149).size(42, 20);
	Crafty.e('Platform').place(469, 110).size(115, 20);

	// door 1 with its key
	Crafty.e('Key').setNumber(1).place(282, 124);
	Crafty.e('Door').setNumber(1).place(Game.width-48, 60);
	
});