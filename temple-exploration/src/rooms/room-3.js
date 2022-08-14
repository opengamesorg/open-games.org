/***********************************************
room-3.js
***********************************************/

// room 3
Crafty.scene('room-3', function() {
	
	// init room
	// see _shared.js
	initRoom(3);
	
	// player creation at init position
	var initX = 30;
	var initY = 96;
	var player = Crafty.e('Player').place(initX, initY);
	
	// closing door with its platform
	Crafty.e('Door').place(16, 77).close();
	Crafty.e('Platform').place(16, 127).size(54, 20);
	
	// killing ground
	Crafty.e('Killing, Trap').place(0, Game.height-32).size(Game.width-80, 16).setImage('killing-ground');
	
	// platforms
	Crafty.e('Platform').place(130, 170).size(76, 20);
	Crafty.e('Platform').place(270, 223).size(76, 20);
	Crafty.e('Platform').place(410, 276).size(76, 20);
	
	// projectile shooters
	Crafty.e('Trap').place(145, 16).size(16, 16).setImage('projectile-shooter-down').startShooting('down', 1000, 250);
	Crafty.e('Trap').place(250, 16).size(16, 16).setImage('projectile-shooter-down').startShooting('down', 1150, 500);
	Crafty.e('Trap').place(355, 16).size(16, 16).setImage('projectile-shooter-down').startShooting('down', 950, 1000);
	Crafty.e('Trap').place(460, 16).size(16, 16).setImage('projectile-shooter-down').startShooting('down', 900, 1700);
	
	// key to door 3
	Crafty.e('Key').setNumber(3).place(289, 195);
	
	// door 3 with its platform
	Crafty.e('Door').setNumber(3).place(Game.width-48, Game.height-86);
	Crafty.e('Platform').place(Game.width-70, Game.height-36).size(54, 20);
	
});