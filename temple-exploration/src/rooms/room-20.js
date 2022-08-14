/***********************************************
room-20.js
***********************************************/

// room 20
Crafty.scene('room-20', function() {
	
	// init room
	// see _shared.js
	initRoom(20);
	
	// player creation at init position
	var initX = 30;
	var initY = 96;
	var player = Crafty.e('Player').place(initX, initY);
	
	// stop time attack mode because last level
	// first room starts the mode
	if(Game.mode == 'timeAttack'){
		Game.timeAttack.stop();
	}
	
	// closing door with its platform
	Crafty.e('Door').place(16, 77).close();
	Crafty.e('Platform').place(16, 127).size(54, 20);
	
	// ground
	Crafty.e('Platform').place(0, Game.height-16).size(Game.width, 16);
	
	// message : TO BE CONTINUED
	Crafty.e('CustomText').text('TO&nbsp;&nbsp;&nbsp;BE&nbsp;&nbsp;&nbsp;CONTINUED')
	.place(-50, 170).textFont({size: '20px'}).textColor('#355157');
	
	// message : THANKS FOR PLAYING
	Crafty.e('CustomText').text('THANKS&nbsp;&nbsp;&nbsp;FOR&nbsp;&nbsp;&nbsp;PLAYING')
	.place(50, 225).textFont({size: '20px'}).textColor('#355157');
	
});