/***********************************************
room-11.js
***********************************************/

// room 11
Crafty.scene('room-11', function() {
	
	// init room
	// see _shared.js
	initRoom(11);
	
	// player creation at init position
	var initX = 30;
	var initY = Game.height-66;
	var player = Crafty.e('Player').place(initX, initY);
	
	// ground
	Crafty.e('Platform').place(0, Game.height-36).size(318, 20);
	
	// closing door
	Crafty.e('Door').place(16, Game.height-86).close();
	
	// platform right
	var platformRight = Crafty.e('Platform').place(385, 282).size(96, 20).setImage('platform');
	// platform left
	Crafty.e('Platform').place(16, 127).size(22, 20);
	
	// small moving platform right
	var rightMovingPlatform = Crafty.e('Platform').place(Game.width-48, 201).size(32, 20).setImage('platform');
	// small moving platform middle
	var middleMovingPlatform = Crafty.e('Platform').place(218, 201).size(32, 20).setImage('platform');
	// small moving platform left
	var leftMovingPlatform = Crafty.e('Platform').place(64, 201).size(32, 20).setImage('platform');
	
	// killing ground right
	Crafty.e('Killing, Trap').place(327, Game.height-25).size(273, 16);
	// killing ground left
	Crafty.e('Killing, Trap').place(16, 230).size(310, 16);
	// killing pole right
	Crafty.e('Killing, Trap').place(302, 165).size(18, 70);
	// killing pole left
	Crafty.e('Killing, Trap').place(147, 165).size(18, 70);
	
	// action box
	Crafty.e('ActionBox').place(425, 250).action(function(){
		// makes them move slowly
		movePlatforms('slow');
	});
	
	// key to door 11
	Crafty.e('Key').setNumber(11).place(15, 100).action(function(){
		// makes them move fast
		movePlatforms('fast');
		// and destroys the platform to the right
		platformRight.destroy();
	});
	
	// second door with its platform
	Crafty.e('Door').setNumber(11).place(Game.width-48, 77);
	Crafty.e('Platform').place(Game.width-70, 127).size(54, 20);
	
	// handle actions
	var handler = Crafty.e('Delay');
	
	// make the moving platforms move fast or slow
	function movePlatforms(speed){
		// move slow or fast
		var ms = (speed == 'slow' ? 1 : 0.5);
		
		// stop previous moving if any
		handler.cancelDelay(rightMovingPlatform.moving);
		handler.cancelDelay(middleMovingPlatform.moving);
		handler.cancelDelay(leftMovingPlatform.moving);
		
		// right platform moves
		rightMovingPlatform.doMove({x: 340, y: rightMovingPlatform.y}, 2000*ms);
		rightMovingPlatform.moving = function(){
			rightMovingPlatform.doMove({x: (rightMovingPlatform.x == 340 ? Game.width-48 : 340), y: rightMovingPlatform.y}, 2000*ms);
		};
		handler.delay(rightMovingPlatform.moving, 2010*ms, -1);
		
		// middle platform moves
		middleMovingPlatform.doMove({x: 250, y: middleMovingPlatform.y}, 1000*ms);
		middleMovingPlatform.moving = function(){
			middleMovingPlatform.doMove({x: (middleMovingPlatform.x == 250 ? 180 : 250), y: middleMovingPlatform.y}, 1000*ms);
		};
		handler.delay(middleMovingPlatform.moving, 1010*ms, -1);
		
		// left platform moves
		leftMovingPlatform.doMove({x: 16, y: leftMovingPlatform.y}, 1300*ms);
		leftMovingPlatform.moving = function(){
			leftMovingPlatform.doMove({x: (leftMovingPlatform.x == 16 ? 100 : 16), y: leftMovingPlatform.y}, 1300*ms);
		}
		handler.delay(leftMovingPlatform.moving, 1310*ms, -1);
	}
	
});