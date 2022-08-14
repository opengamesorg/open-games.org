/***********************************************
room-2.js
***********************************************/

// room 2
Crafty.scene('room-2', function() {
	
	// init room
	// see _shared.js
	initRoom(2);
	
	// player creation at init position
	var initX = 30;
	var initY = 80;
	var player = Crafty.e('Player').place(initX, initY);
	
	// closing door with its platform
	Crafty.e('Door').place(16, 60).close();
	Crafty.e('Platform').place(16, 110).size(115, 20);
	
	// platforms
	Crafty.e('Platform').place(16, 226).size(115, 20);
	Crafty.e('Platform').place(326, 164).size(76, 20);
	Crafty.e('Platform').place(469, 110).size(115, 20);
	
	// moving platform
	Crafty.e('Platform, Delay').place(138, 226).size(64, 20)
	.setImage('platform').doMove({x: 230, y: 226}, 1000).delay(function(){
		this.doMove({x: (this.x == 138 ? 230 : 138), y: this.y}, 1000);
	},1000,-1);
	
	// killing ground
	Crafty.e('Killing, Trap').place(0, Game.height-30).size(Game.width, 15);
	
	// key to door 2
	Crafty.e('Key').setNumber(2).place(28, 201);
	
	// door 2
	Crafty.e('Door').setNumber(2).place(Game.width-48, 60);
	
});