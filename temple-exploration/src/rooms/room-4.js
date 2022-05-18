/***********************************************
room-4.js
***********************************************/

// room 4
Crafty.scene('room-4', function() {
	
	// init room
	// see _shared.js
	initRoom(4);
	
	// player creation at init position
	var initX = 30;
	var initY = Game.height-66;
	var player = Crafty.e('Player').place(initX, initY);
	
	// ground
	Crafty.e('Platform').place(0, Game.height-36).size(Game.width, 20);
	
	// closing door
	Crafty.e('Door').place(16, Game.height-86).close();
	
	// left platform
	// protection : will stop the killing parts in their fall
	Crafty.e('Platform, Protection').place(167, 282).size(40, 20);
	// right platform
	Crafty.e('Platform, Protection').place(384, 282).size(40, 20);
	
	// killing ceiling
	// each part will fall when player takes the key
	for(var i = 0; i < 63; i++){
		Crafty.e('Killing, Gravity, Trap').place(16.5+9*i, 16).size(9, 20).setImage('killing-ceiling');
	}
	
	// key to door 4
	Crafty.e('Key').setNumber(4).place(280, 190).action(function(){
		// all the killing parts are falling
		Crafty('Trap').each(function(){
			// they are stopped by protection
			this.gravity('Protection');
		});
	});
	
	// door 4
	Crafty.e('Door').setNumber(4).place(Game.width-48, Game.height-86);
	
});