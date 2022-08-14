/***********************************************
room-17.js
***********************************************/

// room 17
Crafty.scene('room-17', function() {
	
	// init room
	// see _shared.js
	initRoom(17);
	
	// player creation at init position
	var initX = 30;
	var initY = 96;
	var player = Crafty.e('Player').place(initX, initY);
	
	// closing door with its platform
	Crafty.e('Door').place(16, 77).close();
	Crafty.e('Platform').place(16, 127).size(54, 20);
	
	// killing ground
	var killingGround = Crafty.e('Killing, Trap').place(12, Game.height-34).size(Game.width-24, 20).setImage('killing-ground');
	
	// small platforms
	// falling when player lands on them
	Crafty.e('Falling, Platform').place(127, 210).size(16, 16).setImage('small-platform');
	Crafty.e('Falling, Platform').place(239, 210).size(16, 16).setImage('small-platform');
	Crafty.e('Falling, Platform').place(349, 210).size(16, 16).setImage('small-platform');
	Crafty.e('Falling, Platform').place(456, 210).size(16, 16).setImage('small-platform');
	
	// projectile shooters
	Crafty.e('Trap').place(185, Game.height-16).size(16, 16).setImage('projectile-shooter-top').startShooting('top', 1000, 250);
	Crafty.e('Trap').place(295, Game.height-16).size(16, 16).setImage('projectile-shooter-top').startShooting('top', 900, 500);
	Crafty.e('Trap').place(405, Game.height-16).size(16, 16).setImage('projectile-shooter-top').startShooting('top', 1150, 1000);
	
	// key to door 17
	Crafty.e('Key').setNumber(17).place(280, 115);
	
	// door 17 with its platform
	Crafty.e('Door').setNumber(17).place(Game.width-48, 77);
	Crafty.e('Platform').place(Game.width-70, 127).size(54, 20);
	
});