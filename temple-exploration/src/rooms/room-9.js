/***********************************************
room-9.js
***********************************************/

// room 9
Crafty.scene('room-9', function() {
	
	// init room
	// see _shared.js
	initRoom(9);
	
	// player creation at init position
	var initX = 30;
	var initY = 96;
	var player = Crafty.e('Player').place(initX, initY);

	// door 9
	Crafty.e('Door').place(16, 77).close();
	
	// ground
	Crafty.e('Platform').place(16, 127).size(116, 20);
	Crafty.e('Platform').place(220, 127).size(364, 20);
	
	// exit platform
	var exitPlatform = Crafty.e('Platform, Gravity').place(141, 127).size(70, 32).setImage('exit-platform');
	
	// killing ground
	Crafty.e('Killing, Platform').place(0, Game.height-32).size(Game.width, 16);
	// killing wall
	Crafty.e('Killing, Platform').place(296, 16).size(12, 112);
	
	// moving platform
	var movingPlatform = Crafty.e('Platform, Delay').place(Game.width-80, 280).size(64, 20).setImage('platform')
	.doMove({x: 290, y: 280}, 1400).delay(function(){
		this.doMove({x: (this.x == Game.width-80 ? 290 : Game.width-80), y: this.y}, 1400);
	}, 1400, -1);
	
	// key to door 9 : performs action when hit
	Crafty.e('Key').setNumber(9).place(155, 102).action(function(){
		exitPlatform.gravity('Protection');
	});
	
	// right platform
	Crafty.e('Platform').place(Game.width-130, 199).size(44, 20);
	
	// door 9
	Crafty.e('Door').setNumber(9).place(Game.width-48, 77);
	
});