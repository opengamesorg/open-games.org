/***********************************************
menu.js : game menus
***********************************************/

// start menu
// launched when loading is done
Crafty.scene('startMenu', function() {
	
	// mobile version setup
	if(Game.mobile) Game.mobileVersion();
	
	// menu actions
	Crafty.e('Delay').delay(function(){
	
		// title animation
		// first half coming from left side
		// second half coming from right side
		var firstTitle = Crafty.e('CustomText').setMenuTitle().text('GHOST').place(-150, 120);
		var secondTitle = Crafty.e('CustomText').setMenuTitle().text('ESCAPE').place(Game.width,160);
		firstTitle.tween({x: (Game.mobile ? (iOS ? 135 : 150) : 133), y: firstTitle.y}, 1500);
		secondTitle.tween({x: (Game.mobile ? (iOS ? 120 : 135) : 116), y: secondTitle.y}, 1500);
		
		// wall animation
		// four walls coming from various places outside the screen
		var leftWall = Crafty.e('Wall, Tween').place(50, -300).size(20, 300);
		var rightWall = Crafty.e('Wall, Tween').place(330, Game.height).size(20, 300);
		var topWall = Crafty.e('Wall, Tween').place(-300, 50).size(300, 20);
		var bottomWall = Crafty.e('Wall, Tween').place(Game.width, 330).size(300, 20);
		this.delay(function(){
			leftWall.tween({x: 50, y: 50}, 1500);
			rightWall.tween({x: 330, y: 50}, 1500);
			topWall.tween({x: 50, y: 50}, 1500);
			bottomWall.tween({x: 50, y: 330}, 1500);
		}, 700);
		
		// subtitle animation : blinking 
		this.delay(function(){
			var mainSubTitle = Crafty.e('CustomText').setSubtitle().place(0, 250).blink();
			// if the player presses his action key
			mainSubTitle.bind('KeyUp', function(e){
				if(!Crafty.isPaused()){
					if(Player.keys.keyAction.indexOf(e.key) != -1) {
						// the level choosing is launched, destroying the menu scene
						Crafty.scene('levelChoosing');
					}
				}
			});
			if(Game.mobile){
				// if the player taps anywhere on the screen
				mainSubTitle.bind('CustomTouch', function(e){
					if(!Crafty.isPaused()){
						// the level choosing is launched, destroying the menu scene
						Crafty.scene('levelChoosing');
					}
				});
			}
		}, 3000);
		
	}, 500);
	
});