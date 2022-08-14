/***********************************************
room-8.js
***********************************************/

// room 8
Crafty.scene('room-8', function() {
	
	// init room
	// see _shared.js
	initRoom(8);
	
	// player creation at init position
	var initX = 30;
	var initY = 96;
	var player = Crafty.e('Player').place(initX, initY);
	
	// closing door with its platform
	Crafty.e('Door').place(16, 77).close();
	
	// top ground
	Crafty.e('Platform').place(16, 127).size(Game.width-172, 20);
	// middle ground
	Crafty.e('Platform').place(156, 241).size(Game.width-172, 20);
	// bottom ground
	Crafty.e('Platform').place(0, Game.height-36).size(Game.width, 16);
	
	// projectile shooters
	Crafty.e('Trap').place(145, 16).size(16, 16).setImage('projectile-shooter-down').startShooting('down', 1250, 250);
	Crafty.e('Trap').place(250, 16).size(16, 16).setImage('projectile-shooter-down').startShooting('down', 1300, 500);
	Crafty.e('Trap').place(355, 16).size(16, 16).setImage('projectile-shooter-down').startShooting('down', 1150, 1000);
	Crafty.e('Trap').place(460, 16).size(16, 16).setImage('projectile-shooter-down').startShooting('down', 1500, 1700);
	
	// killing ceiling
	var killingCeiling = Crafty.e('Killing, Trap').place(12, -20).size(Game.width-24, 19).setImage('killing-ceiling');
	
	// action box : when hit, performs action
	Crafty.e('ActionBox').place(300, 100).action(function(){
		
		// killing ceiling moves down
		killingCeiling.doMove({x: killingCeiling.x, y: Game.height},18000);
		
		// key to door 8 appears
		// when hit, performs action
		Crafty.e('Key').setNumber(8).place(250, 215).action(function(){
			// killing ceiling moves down faster
			// stop previous movement first
			killingCeiling.stopMoving();
			killingCeiling.doMove({x: killingCeiling.x, y: Game.height},6000);
		});
	
	});
	
	// door 8 with its platform
	Crafty.e('Door').setNumber(8).place(Game.width-48, Game.height-86);
	
});