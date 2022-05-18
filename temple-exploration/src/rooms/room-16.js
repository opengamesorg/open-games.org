/***********************************************
room-16.js
***********************************************/

// room 16
Crafty.scene('room-16', function() {
	
	// init room
	// see _shared.js
	initRoom(16);
	
	// player creation at init position
	var initX = 30;
	var initY = 84;
	var player = Crafty.e('Player').place(initX, initY);
	
	// closing door
	Crafty.e('Door').place(16, 63).close();
	
	// ground
	Crafty.e('Platform').place(16, Game.height-36).size(Game.width-32, 20);
	
	// double platforms
	Crafty.e('Platform').place(16, 114).size(54, 20);
	Crafty.e('Platform').place(Game.width-70, 120).size(54, 20);
	
	// small platforms
	Crafty.e('Platform').place(Game.width-40, 280).size(24, 20);
	Crafty.e('Platform').place(Game.width-40, 205).size(24, 20);
	
	// middle big platform
	Crafty.e('Platform').place(170, 190).size(275, 20);
	
	// killing cage
	var cageBottom = Crafty.e('Killing, Trap').place(210, Game.height-15).size(200, 18).setImage('killing-ground');
	var cageTop = Crafty.e('Killing, Trap').place(210, -4).size(200, 18).setImage('killing-ceiling');
	var cageRight = Crafty.e('Killing, Trap').place(Game.width-15, 120).size(18, 170).setImage('killing-wall-right');
	var cageLeft = Crafty.e('Killing, Trap').place(-4, 120).size(18, 170).setImage('killing-wall-left');
	
	// killing cage moving speed
	var cageMoveSpeed = 1200;
	
	// killing cage moving function
	var cageMove = function(direction){
		if(direction == 'center'){
			// killing cage parts move to center
			cageBottom.doMove({x: cageBottom.x, y: 275}, cageMoveSpeed);
			cageTop.doMove({x: cageTop.x, y: 115}, cageMoveSpeed);
			cageRight.doMove({x: 400, y: cageRight.y}, cageMoveSpeed);
			cageLeft.doMove({x: 200, y: cageLeft.y}, cageMoveSpeed);
		} else {
			// killing cage parts move to the edges
			cageBottom.doMove({x: cageBottom.x, y: Game.height-15}, cageMoveSpeed);
			cageTop.doMove({x: cageTop.x, y: -4}, cageMoveSpeed);
			cageRight.doMove({x: Game.width-15, y: cageRight.y}, cageMoveSpeed);
			cageLeft.doMove({x: -4, y: cageLeft.y}, cageMoveSpeed);
		}
	};
	
	// action box : when hit, performs action
	Crafty.e('ActionBox').place(299, 163).action(function(){
		// killing cage parts move to center
		cageMove('center');
		// action box : when hit, performs action
		Crafty.e('ActionBox').place(Game.width-65, 85).action(function(){
			// killing cage parts move to the edges
			cageMove('edge');
			// key to door 16 appears : when hit, performs action
			Crafty.e('Key').setNumber(16).place(299, 163).action(function(){
				// killing cage parts move to center
				cageMove('center');
			});
		});
	});
	
	// door 16
	Crafty.e('Door').setNumber(16).place(Game.width-48, Game.height-86);
	
});