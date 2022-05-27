/***********************************************
menu.js : game menus
***********************************************/

// start menu
// launched when loading is done
Crafty.scene('startMenu', function() {
	
	// mobile version setup
	if(Game.mobile) Game.mobileVersion();
	
	// ball creation
	Crafty.e("Ball").place(50,100).attr({xSpeed: 4, canGetOut: false});
	
	// menu actions
	Crafty.e('Delay').delay(function(){
	
		// title
		var firstTitle = Crafty.e('CustomText').setTitle().text('BRICK&nbsp;&nbsp;&nbsp;&nbsp;BREAKER');
		
		// subtitle
		this.delay(function(){
			var mainSubTitle = Crafty.e('CustomText').setSubtitle();
			// if the player presses his action key
			mainSubTitle.bind('KeyUp', function(e){
				if(!Crafty.isPaused()){
					if(Player.keys.keyAction.indexOf(e.key) != -1) {
						// choose mode menu
						showModeMenu();
					}
				}
			});
			if(Game.mobile){
				// if the player taps anywhere on the screen
				mainSubTitle.bind('CustomTouch', function(){
					if(!Crafty.isPaused()){
						// choose mode menu
						showModeMenu();
					}
				});
			}
		}, 1000);
		
	}, 1000);
	
	// "CHOOSE MODE" menu
	function showModeMenu(){
		
		Crafty('CustomText').each(function(){
			this.destroy();
		});
		
		var title = Crafty.e('CustomText').setTitle().text('CHOOSE&nbsp;&nbsp;&nbsp;&nbsp;MODE');
		var slowSubtitle = Crafty.e('CustomText').setSubtitle().text('SLOW');
		var fastSubtitle = Crafty.e('CustomText').setSubtitle().text('FAST');
		var veryFastSubtitle = Crafty.e('CustomText').setSubtitle().text('VERY&nbsp;&nbsp;&nbsp;FAST');
		
		if(!Game.mobile){
			// slow mode is chosen by default
			Game.mode = 'slow';
			slowSubtitle.setModeChoice().choose();
			fastSubtitle.setModeChoice();
			veryFastSubtitle.setModeChoice();
			fastSubtitle.y += 25;
			veryFastSubtitle.y += 50;
			
			// if the player presses his menu up&down keys,
			// the mode choice is changed
			// if the player presses his action key,
			// the start level is launched
			slowSubtitle.bind('KeyUp', function(e) {
				if(!Crafty.isPaused()){
					if(Game.mode == 'slow'){
						if(e.key == Player.keys.keyUp) {
							slowSubtitle.unchoose();
							veryFastSubtitle.choose();
							Game.mode = 'veryfast';
						} else if(e.key == Player.keys.keyDown) {
							slowSubtitle.unchoose();
							fastSubtitle.choose();
							Game.mode = 'fast';
						}
					} else if(Game.mode == 'fast'){
						if(e.key == Player.keys.keyUp) {
							fastSubtitle.unchoose();
							slowSubtitle.choose();
							Game.mode = 'slow';
						} else if(e.key == Player.keys.keyDown) {
							fastSubtitle.unchoose();
							veryFastSubtitle.choose();
							Game.mode = 'veryfast';
						}
					} else if(Game.mode == 'veryfast'){
						if(e.key == Player.keys.keyUp) {
							veryFastSubtitle.unchoose();
							fastSubtitle.choose();
							Game.mode = 'fast';
						} else if(e.key == Player.keys.keyDown) {
							veryFastSubtitle.unchoose();
							slowSubtitle.choose();
							Game.mode = 'slow';
						}
					}
				}
				// when pressing the action key
				if(Player.keys.keyAction.indexOf(e.key) != -1) {
					// the start level is launched
					start();
				}
			});
		
		} else {
			// mobile version : the subtitles look like buttons
			slowSubtitle.setMobileModeChoice();
			fastSubtitle.setMobileModeChoice();
			veryFastSubtitle.setMobileModeChoice();
			title.y -= 120;
			slowSubtitle.y -= 80;
			veryFastSubtitle.y += 80;
			
			// if the player presses any of these buttons,
			// the mode choice is chosen and the start level is launched
			
			// touch detector on each button
			var slowSubtitleTouch = Crafty.e('CustomTouchControl');
			slowSubtitleTouch.place(slowSubtitle.x-20, slowSubtitle.y-27).size(slowSubtitle.w+10, slowSubtitle.h+30);
			slowSubtitleTouch.bind('TouchStart', function(){ 
				Game.mode = 'slow';
				start();
			});
			
			var fastSubtitleTouch = Crafty.e('CustomTouchControl');
			fastSubtitleTouch.place(fastSubtitle.x-20, fastSubtitle.y-27).size(fastSubtitle.w+10, fastSubtitle.h+30);
			fastSubtitleTouch.bind('TouchStart', function(){ 
				Game.mode = 'fast';
				start();
			});
			
			var veryFastSubtitleTouch = Crafty.e('CustomTouchControl');
			veryFastSubtitleTouch.place(veryFastSubtitle.x-20, veryFastSubtitle.y-27).size(veryFastSubtitle.w+10, veryFastSubtitle.h+30);
			veryFastSubtitleTouch.bind('TouchStart', function(){ 
				Game.mode = 'veryfast';
				start();
			});
		}

	}
	
	// launch the start level
	function start(){
		if(!Crafty.isPaused()){
			if(!iOS){
				// stop the main music
				Crafty.audio.stop('main');
			}
			// the start level is launched, destroying the menu scene
			Crafty.scene(Game.startLevel);
		}
	}
	
});