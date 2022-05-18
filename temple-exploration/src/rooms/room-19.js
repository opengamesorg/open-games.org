/***********************************************
room-19.js
***********************************************/

// room 19
Crafty.scene('room-19', function() {
	
	// init room
	// see _shared.js
	initRoom(19);
	
	// player creation at init position
	var initX = 30;
	var initY = Game.height-66;
	var player = Crafty.e('Player').place(initX, initY);
	
	// closing door with its platform
	Crafty.e('Door').place(16, Game.height-86).close();
	Crafty.e('Platform').place(16, Game.height-36).size(146, 20);
	
	// static platforms
	Crafty.e('Platform').place(118, 286).size(78, 20);
	Crafty.e('Platform').place(16, 234).size(24, 20);
	Crafty.e('Platform').place(118, 183).size(78, 20);
	Crafty.e('Platform').place(16, 132).size(24, 20);
	Crafty.e('Platform').place(118, 79).size(78, 20);
	Crafty.e('Platform').place(Game.width-40, 79).size(24, 20);
	Crafty.e('Platform').place(Game.width-40, 183).size(24, 20);
	Crafty.e('Platform').place(Game.width-40, 286).size(24, 20);
	
	// first moving platform
	Crafty.e('Platform, Delay').place(202, 79).size(32, 20).setImage('platform')
	.doMove({x: Game.width-76, y: 79}, 3000).delay(function(){
		this.doMove({x: (this.x == 202 ? Game.width-76 : 202), y: this.y}, 3000);
	},3000,-1);
	
	// killing ground
	Crafty.e('Killing, Trap').place(170, Game.height-25).size(350, 16);
	
	// killing walls
	Crafty.e('Killing, Trap').place(148, 100).size(16, 270);
	Crafty.e('Killing, Trap').place(318, 142).size(16, 105);
	Crafty.e('Killing, Trap').place(421, 142).size(16, 105);
	
	// projectile shooter
	Crafty.e('Trap').place(75, 16).size(16, 16).setImage('projectile-shooter-down').startShooting('down', 850, 250);
	
	// action box : when hit, performs action
	Crafty.e('ActionBox').place(Game.width-41, 55).action(function(){
		// second moving platform
		Crafty.e('Platform, Delay').place(202, 183).size(32, 20).setImage('platform')
		.doMove({x: Game.width-76, y: 183}, 4000).delay(function(){
			this.doMove({x: (this.x == 202 ? Game.width-76 : 202), y: this.y}, 4000);
		},4000,-1);
		// action box : when hit, performs action
		Crafty.e('ActionBox').place(369, 159).action(function(){
			// key to door 19 : when hit, performs action
			Crafty.e('Key').setNumber(19).place(170, 260).action(function(){
				// third moving platform
				Crafty.e('Platform, Delay').place(202, 286).size(32, 20).setImage('platform')
				.doMove({x: Game.width-76, y: 286}, 2500).delay(function(){
					this.doMove({x: (this.x == 202 ? Game.width-76 : 202), y: this.y}, 2500);
				},2500,-1);
			});
		});
	});
	
	// door 19 with its platform
	Crafty.e('Door').setNumber(19).place(Game.width-48, Game.height-86);
	Crafty.e('Platform').place(Game.width-70, Game.height-36).size(54, 20);
	
});