/***********************************************
menu.js : game menus
***********************************************/

// start menu
// launched when loading is done
Crafty.scene('startMenu', function() {
	
	// mobile version setup
	if(Game.mobile) Game.mobileVersion();
	
	// variable that lets you skip the intro
	// is set to true before the end of the intro
	var canStart = false;
	
	// intro cutscene : the title SPACE SHOOTER is created progressively
	var mainTitle = Crafty.e('CustomText').setTitle();
	var mainSubTitle = Crafty.e('CustomText').setSubtitle();
	var handler = Crafty.e('Delay');
	var msBase = 1000; var msAdd = 200;
	handler.delay(function(){ mainTitle.text('S'); canStart = true; }, msBase + msAdd * 1);
	handler.delay(function(){ mainTitle.text('SP'); }, msBase + msAdd * 2);
	handler.delay(function(){ mainTitle.text('SPA'); }, msBase + msAdd * 3);
	handler.delay(function(){ mainTitle.text('SPAC'); }, msBase + msAdd * 4);
	handler.delay(function(){ mainTitle.text('SPACE'); }, msBase + msAdd * 5);
	handler.delay(function(){ mainTitle.text('SPACE&nbsp;&nbsp;&nbsp;S'); }, msBase + msAdd * 6);
	handler.delay(function(){ mainTitle.text('SPACE&nbsp;&nbsp;&nbsp;SH'); }, msBase + msAdd * 7);
	handler.delay(function(){ mainTitle.text('SPACE&nbsp;&nbsp;&nbsp;SHO'); }, msBase + msAdd * 8);
	handler.delay(function(){ mainTitle.text('SPACE&nbsp;&nbsp;&nbsp;SHOO'); }, msBase + msAdd * 9);
	handler.delay(function(){ mainTitle.text('SPACE&nbsp;&nbsp;&nbsp;SHOOT'); }, msBase + msAdd * 10);
	handler.delay(function(){ mainTitle.text('SPACE&nbsp;&nbsp;&nbsp;SHOOTE'); }, msBase + msAdd * 11);
	handler.delay(function(){ mainTitle.text('SPACE&nbsp;&nbsp;&nbsp;SHOOTER'); }, msBase + msAdd * 12);
	
	// the subtitle is added just after
	handler.delay(function(){ mainSubTitle.text('PRESS [ENTER] &nbsp;OR&nbsp; [SPACE] &nbsp;TO &nbsp;&nbsp;START'); }, msBase + msAdd * 18);
	
	// if the player presses his action key, the intro is destroyed
	// and the epilepsy warning is shown
	mainSubTitle.bind('KeyUp', function(e) {
		
		if(canStart && !Crafty.isPaused()){
			if(Player.keys.keyAction.indexOf(e.key) != -1) {
				handler.pauseDelays();
				mainTitle.destroy();
				mainSubTitle.destroy();
				
				// epilepsy warning message
				var warningTitle = Crafty.e('CustomText').setTitle();
				var warningSubtitle = Crafty.e('CustomText').setSubtitle();
				warningTitle.text('WARNING');
				warningSubtitle.text('THIS&nbsp;&nbsp;GAME&nbsp;&nbsp;MAY&nbsp;&nbsp;POTENTIALLY\nTRIGGER&nbsp;&nbsp;SEIZURES&nbsp;&nbsp;FOR&nbsp;&nbsp;PEOPLE&nbsp;&nbsp;WITH\nPHOTOSENSITIVE&nbsp;&nbsp;EPILEPSY');
				
				// if the player presses his action key, the epilepsy warning is destroyed
				// and the difficulty menu is shown
				warningTitle.bind('KeyUp', function(e) {
					
					if(canStart && !Crafty.isPaused()){
						if(Player.keys.keyAction.indexOf(e.key) != -1) {
							warningTitle.destroy();
							warningSubtitle.destroy();
							
							Crafty.e('CustomText').setTitle().text('DIFFICULTY');
							
							// standard difficulty is chosen by default
							var standardSubtitle = Crafty.e('CustomText').setSubtitle().setDifficultyChoice().text('STANDARD').choose();
							var hardcoreSubtitle = Crafty.e('CustomText').setSubtitle().setDifficultyChoice().text('HARDCORE');
							hardcoreSubtitle.y += 25;
							
							// if the player presses his menu up&down keys,
							// the difficulty choice is changed
							// if the player presses his action key,
							// the start level is launched
							standardSubtitle.bind('KeyUp', function(e) {
								if(!Crafty.isPaused() && (e.key == Player.keys.keyUp || e.key == Player.keys.keyDown)) {
									if(Game.difficulty == 'hardcore'){
										Game.difficulty = 'standard';
										standardSubtitle.choose();
										hardcoreSubtitle.unchoose();
									} else {
										Game.difficulty = 'hardcore';
										standardSubtitle.unchoose();
										hardcoreSubtitle.choose();
									}
								}
								
								if(!Crafty.isPaused() && Player.keys.keyAction.indexOf(e.key) != -1) {
									// the start level is launched, destroying the menu scene
									Crafty.scene(Game.startLevel);
								}
							});
						}
					}
				});
			}
		}
	});
	
});