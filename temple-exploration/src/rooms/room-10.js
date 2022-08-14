/***********************************************
room-10.js
***********************************************/

// room 10
Crafty.scene('room-10', function() {
	
	// init room
	// see _shared.js
	initRoom(10);
	
	// player creation at init position
	var initX = 30;
	var initY = Game.height-66;
	var player = Crafty.e('Player').place(initX, initY);
	
	// closing door
	Crafty.e('Door').place(16, Game.height-86).close();
	
	// bottom ground
	Crafty.e('Platform').place(0, Game.height-36).size(Game.width, 20);
	// top ground
	Crafty.e('Platform').place(0, 127).size(Game.width, 20);
	
	// platforms
	Crafty.e('Platform').place(268, 282).size(82, 20);
	Crafty.e('Platform').place(268, 202).size(82, 20);
	Crafty.e('Protection, Platform').place(300, 65).size(54, 20);
	
	// killing wall right
	Crafty.e('Killing, Trap').place(340, 145).size(16, 220);
	// killing wall left
	var killingWall = Crafty.e('Killing, Trap').place(-20, 145).size(16, 220).setImage('killing-wall-left');
	// killing ceiling
	// each part will fall when player takes the key
	for(var i = 0; i < 63; i++){
		Crafty.e('Killing, Gravity, Trap, Delay').place(16.5+9*i, 16).size(9, 20).setImage('killing-ceiling');
	}
	
	// action box : when hit, performs action
	Crafty.e('ActionBox').place(140, Game.height-67).action(function(){
		// killing wall moves from left to right
		killingWall.doMove({x: Game.width+10, y: killingWall.y},5000);
	});
	
	// key to door 10 : when hit, performs action
	Crafty.e('Key').setNumber(10).place(60, 100).action(function(){
		// all the killing ceiling parts are falling gradually
		var ms = 0;
		Crafty('Gravity Trap').each(function(){
			ms += 31;
			this.delay(function(){
				// they are stopped by protection
				this.gravity('Protection');
			}, ms);
		});
	});
	
	// door 10
	Crafty.e('Door').setNumber(10).place(Game.width-48, 77);
	
});