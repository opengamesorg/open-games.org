/***********************************************
room-12.js
***********************************************/

// room 12
Crafty.scene('room-12', function() {
	
	// init room
	// see _shared.js
	initRoom(12);
	
	// player creation at init position
	var initX = 30;
	var initY = 96;
	var player = Crafty.e('Player').place(initX, initY);
	
	// closing door with its platform
	Crafty.e('Door').place(16, 77).close();
	Crafty.e('Platform').place(16, 127).size(54, 20);
	
	// killing ground
	Crafty.e('Killing, Trap').place(0, Game.height-17).size(Game.width, 16);
	
	// platforms
	Crafty.e('Platform').place(180, 127).size(14, 20);
	Crafty.e('Platform').place(255, 155).size(14, 20);
	Crafty.e('Platform').place(350, 80).size(14, 20);
	Crafty.e('Platform').place(425, 108).size(14, 20);
	Crafty.e('Platform').place(500, 150).size(14, 20);
	Crafty.e('Platform').place(450, 210).size(14, 20);
	Crafty.e('Platform').place(400, 260).size(14, 20);
	Crafty.e('Platform').place(305, 200).size(14, 20);
	Crafty.e('Platform').place(240, 240).size(14, 20);
	Crafty.e('Platform').place(190, 286).size(14, 20);
	Crafty.e('Platform').place(260, 350).size(14, 20);
	Crafty.e('Platform').place(350, 310).size(14, 20);
	Crafty.e('Platform').place(420, 340).size(14, 20);
	
	// action box : when hit, performs action
	Crafty.e('ActionBox').place(180, 94).action(function(){
		
		// killing box
		var boxPart1 = Crafty.e('Killing, Trap, Renderable').place(95, 16).size(16, 170).setImage('killing-wall-left').attr({alpha: 0});
		var boxPart2 = Crafty.e('Killing, Trap, Renderable').place(265, 16).size(16, 170).setImage('killing-wall-right').attr({alpha: 0});
		var boxPart3 = Crafty.e('Killing, Trap, Renderable').place(97, 16).size(184, 16).setImage('killing-ceiling').attr({alpha: 0});
		var boxPart4 = Crafty.e('Killing, Trap, Renderable').place(97, 170).size(184, 16).setImage('killing-ground').attr({alpha: 0});
		
		// invisible small box inside the killing box
		// when moving, will make the kill box move accordingly
		var movingBox = Crafty.e('Trap').place(172, 87).size(32, 32).attach(boxPart1, boxPart2, boxPart3, boxPart4)
		
		// the killing box appears
		Crafty.e('Delay').delay(function(){
			boxPart1.alpha += 0.1;
			boxPart2.alpha += 0.1;
			boxPart3.alpha += 0.1;
			boxPart4.alpha += 0.1;
		},25,10)
		// it moves following the path
		.delay(function(){ // move right
			movingBox.doMove({x: 448, y: movingBox.y}, 3500);
		},1000)
		.delay(function(){ // move down
			movingBox.doMove({x: movingBox.x, y: 183}, 1500);
		},4500)
		.delay(function(){ // move left
			movingBox.doMove({x: 172, y: movingBox.y}, 3500);
		},6000)
		.delay(function(){ // move down
			movingBox.doMove({x: movingBox.x, y: 279}, 1500);
		},9500)
		.delay(function(){ // move right
			movingBox.doMove({x: 448, y: movingBox.y}, 3500);
		},11000) 
		.delay(function(){ // at the end of the entire movement
			// the box disappears
			this.delay(function(){
				boxPart1.alpha -= 0.1;
				boxPart2.alpha -= 0.1;
				boxPart3.alpha -= 0.1;
				boxPart4.alpha -= 0.1;
			},25,10,function(){
				boxPart1.destroy();
				boxPart2.destroy();
				boxPart3.destroy();
				boxPart4.destroy();
			});
		},14500);
		
		// key to door 12
		Crafty.e('Key').setNumber(12).place(409, 315);
		
	});
	
	// door 12 with its platform
	Crafty.e('Door').setNumber(12).place(Game.width-48, Game.height-78);
	Crafty.e('Platform').place(Game.width-70, Game.height-28).size(54, 20);
	
});