/***********************************************
room-18.js
***********************************************/

// room 18
Crafty.scene('room-18', function() {
	
	// init room
	// see _shared.js
	initRoom(18);
	
	// player creation at init position
	var initX = 30;
	var initY = 83;
	var player = Crafty.e('Player').place(initX, initY);
	
	// closing door
	Crafty.e('Door').place(16, 63).close();
	
	// top ground
	Crafty.e('Platform').place(0, 113).size(Game.width-87, 20);
	// middle ground
	Crafty.e('Platform').place(96, 237).size(Game.width-184, 20);
	// bottom ground
	Crafty.e('Platform').place(0, Game.height-36).size(Game.width, 20);
	
	// left small platform
	Crafty.e('Platform').place(16, 302).size(54, 20);
	
	// right small platform
	var rightPlatform = Crafty.e('Platform').place(Game.width-80, 237).size(64, 20).setImage('platform');
	
	// killing traps
	var firstTrap = Crafty.e('Killing, Trap').place(-20, 16).size(18, 97).setImage('killing-wall-left');
	var secondTrap = Crafty.e('Killing, Trap').place(-20, 133).size(18, 104).setImage('killing-wall-left');
	var thirdTrap = Crafty.e('Killing, Trap').place(-20, 257).size(18, 107).setImage('killing-wall-left');
	var fourthTrap = Crafty.e('Killing, Trap').place(Game.width+2, 257).size(18, 107).setImage('killing-wall-right');
	
	// action box : when hit, performs action
	Crafty.e('ActionBox').place(288, 88).action(function(){
		// first trap tries to kill you
		firstTrap.doMove({x: Game.width+10, y: firstTrap.y}, 1850);
		// action box : when hit, performs action
		Crafty.e('ActionBox').place(288, 212).action(function(){
			// second trap tries to kill you
			secondTrap.doMove({x: Game.width+10, y: secondTrap.y}, 2000);
			// right platform moves
			rightPlatform.doMove({x: Game.width+10, y: rightPlatform.y}, 1000);
			// key to door 18 : when hit, performs action
			Crafty.e('Key').setNumber(18).place(288, Game.height-62).action(function(){
				// third and fourth traps surround the key
				thirdTrap.doMove({x: 200, y: thirdTrap.y}, 750);
				fourthTrap.doMove({x: 400, y: fourthTrap.y}, 750);
				// they stop moving, then they move to the left
				Crafty.e('Delay').delay(function(){
					thirdTrap.doMove({x: -20, y: thirdTrap.y}, 1500);
					fourthTrap.doMove({x: -20, y: fourthTrap.y}, 2500);
				},1500);
			});
		});
	});
	
	// door 18
	Crafty.e('Door').setNumber(18).place(Game.width-48, Game.height-86);
	
});