/***********************************************
menu.js : game menus
***********************************************/

// start menu
// launched when loading is done
Crafty.scene('startMenu', function() {
	
	// mobile version setup
	if(Game.mobile) Game.mobileVersion();
	
	// title and subtitles
	var mainTitle = Crafty.e('CustomText').setTitle()
	.text('TEMPLE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EXPLORATION').place(0, 130);
	var firstSubTitle = Crafty.e('CustomText').setSubtitle()
	.text('ENTER&nbsp;&nbsp;&nbsp;&nbsp;THE&nbsp;&nbsp;&nbsp;&nbsp;TEMPLE').place(0, 185);
	var secondSubTitle = Crafty.e('CustomText').setSubtitle()
	.text('SELECT&nbsp;&nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;&nbsp;ROOM').place(0, 215);
	var thirdSubTitle = Crafty.e('CustomText').setSubtitle()
	.text('TIME&nbsp;&nbsp;&nbsp;&nbsp;ATTACK').place(0, 245);
	
	// door
	var door = Crafty.e('Door').place(Game.width/2-15, Game.height-66).appear();
	
	// handling actions
	var handler = Crafty.e('Delay');
	
	// the title fades in
	handler.delay(function(){
		mainTitle.appear();
	},500);
	
	// the subtitles fade in
	handler.delay(function(){
		firstSubTitle.appear();
		secondSubTitle.appear();
		thirdSubTitle.appear();
		// choose between the subtitles
		var subtitles = [firstSubTitle, secondSubTitle, thirdSubTitle];
		var chosenIndex = 0;
		firstSubTitle.choose().bind('KeyUp', function(e) {
			if(!Crafty.isPaused()) {
				if(e.key == Player.keys.keyUp) {
					subtitles[chosenIndex].unchoose();
					chosenIndex = (chosenIndex == 0 ? subtitles.length-1 : chosenIndex-1);
					subtitles[chosenIndex].choose();
				} else if(e.key == Player.keys.keyDown) {
					subtitles[chosenIndex].unchoose();
					chosenIndex = (chosenIndex == subtitles.length-1 ? 0 : chosenIndex+1);
					subtitles[chosenIndex].choose();
				}
			}
			// if player presses keyAction
			if(!Crafty.isPaused() && Player.keys.keyAction.indexOf(e.key) != -1 && !door.isOpen) {
				if(firstSubTitle.isChosen){
					// open the door
					door.open();
					// start first room not in time attack
					handler.delay(function(){
						Crafty.scene(Game.startRoom);
					},1100);
				} else if(thirdSubTitle.isChosen){
					// open the door
					door.open();
					// start first room in time attack
					Game.mode = 'timeAttack';
					handler.delay(function(){
						Crafty.scene(Game.startRoom);
					},1100);
				} else if(secondSubTitle.isChosen){
					// or select a room
					mainTitle.text('SELECT&nbsp;&nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ROOM').place(0, 80);
					firstSubTitle.destroy();
					secondSubTitle.destroy();
					thirdSubTitle.destroy();
					// creation of all existing rooms
					// if you create a room you'll have to add it here
					var rooms = Game.rooms;
					var chosenRoom = 1;
					var x = 100; var y = 150;
					for(var i = 0; i < rooms.length; i++){
						// selectable room
						var room = Crafty.e('CustomText, Room').setRoom().text(rooms[i]).place(x, y);
						// first selected by default
						if(i == 0) room.choose();
						// the rooms are separated horizontally
						x += 50;
						// every 8 rooms, start a new line
						if((i+1) % 8 == 0){
							x = 100;
							y += 50;
						}
					}
					// keep all the generated rooms
					rooms = Crafty('Room');
					// navigate from a room to another
					// pressing the action key will start selected room
					mainTitle.bind('KeyUp', function(e) {
						if(!Crafty.isPaused()){
							// to the right
							if(e.key == Player.keys.keyRight){
								Crafty(rooms[chosenRoom-1]).unchoose();
								if(chosenRoom == rooms.length){
									chosenRoom = 0;
								}
								chosenRoom++;
								Crafty(rooms[chosenRoom-1]).choose();
							}
							// to the left
							if(e.key == Player.keys.keyLeft){
								Crafty(rooms[chosenRoom-1]).unchoose();
								if(chosenRoom == 1){
									chosenRoom = rooms.length+1;
								}
								chosenRoom--;
								Crafty(rooms[chosenRoom-1]).choose();
							}
							// to the bottom
							if(e.key == Player.keys.keyDown){
								Crafty(rooms[chosenRoom-1]).unchoose();
								if(chosenRoom+8 > rooms.length){
									var row = Math.floor(chosenRoom/8);
									if(chosenRoom%8 == 0) row -= 1;
									chosenRoom = chosenRoom - row * 8;
								} else {
									chosenRoom += 8;
								}
								Crafty(rooms[chosenRoom-1]).choose();
							}
							// to the top
							if(e.key == Player.keys.keyUp){
								Crafty(rooms[chosenRoom-1]).unchoose();
								if(chosenRoom-8 < 1){
									var maxRow = Math.floor(rooms.length/8);
									chosenRoom = chosenRoom + maxRow * 8;
									if(chosenRoom > rooms.length) chosenRoom -= 8;
								} else {
									chosenRoom -= 8;
								}
								Crafty(rooms[chosenRoom-1]).choose();
							}
							// room selection : starts the associated room
							if(Player.keys.keyAction.indexOf(e.key) != -1 && !door.isOpen){
								// open the door
								door.open();
								handler.delay(function(){
									Crafty.scene('room-'+chosenRoom);
								},1100);
							}
						} 
					});
				}
			}
		});
	},1500);	
	
});