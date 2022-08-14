/***********************************************
room-5.js
***********************************************/

// room 5
Crafty.scene('room-5', function() {
	
	// init room
	// see _shared.js
	initRoom(5);
	
	// player creation at init position
	var initX = 30;
	var initY = Game.height-66;
	var player = Crafty.e('Player').place(initX, initY);
	
	// closing door
	Crafty.e('Door').place(16, Game.height-86).close();
	
	// ground
	Crafty.e('Platform').place(0, Game.height-36).size(Game.width, 20);
	
	// platforms
	Crafty.e('Platform').place(190, 287).size(76, 20);
	Crafty.e('Platform').place(324, 222).size(76, 20);
	Crafty.e('Platform').place(190, 152).size(76, 20);
	Crafty.e('Platform').place(324, 87).size(76, 20);
	
	// projectile shooters
	Crafty.e('Trap').place(16, 255).size(16, 16).setImage('projectile-shooter-right').startShooting('right', 2500, 250);
	Crafty.e('Trap').place(16, 120).size(16, 16).setImage('projectile-shooter-right').startShooting('right', 2000, 700);
	Crafty.e('Trap').place(Game.width-32, 55).size(16, 16).setImage('projectile-shooter-left').startShooting('left', 2250, 1600);
	Crafty.e('Trap').place(Game.width-32, 190).size(16, 16).setImage('projectile-shooter-left').startShooting('left', 2400, 2000);
	
	// key to door 5
	Crafty.e('Key').setNumber(5).place(343, 60);

	// door 5 with its platform
	Crafty.e('Door').setNumber(5).place(Game.width-48, Game.height-86);
	
});