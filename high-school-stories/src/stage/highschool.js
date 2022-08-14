/***********************************************
highschool.js : highschool stage
***********************************************/

Crafty.scene('highschool', function() {

	if(!iOS){
		// start main audio
		Game.audio.playing = Crafty.audio.play('main', -1, 0.65);
	}
	
	// black background color
	Crafty.background('#000');
	
	/**********************
	  highschool
	 **********************/
	 
	// highschool background image
	// used as an entity instead of Crafty.background because
	// otherwise it doesn't move when viewport follows the player
	Crafty.e('2D, DOM, Image').image('assets/images/background/highschool.png');
	 
	// setup the different parts of the highschool 
	// with decor and obstacles
	setupClassroom1();
	setupClassroom2();
	setupPrincipalsOffice();
	setupHallway();
	setupGirlsToilets();
	setupBoysToilets();
	setupInfirmary();
	
	/**********************
	  dialogues
	 **********************/
	
	// above everything except CustomText
	Crafty.createLayer('DialogueLayer', 'DOM', {scaleResponse: 0, xResponse: 0, yResponse: 0, z: 999});
	Game.mainDialogBox = Crafty.e('DialogBox');
	
	/**********************
	  days
	 **********************/
	
	// the game takes place during a entire school week
	// monday to friday, day 1 to 5
	// debugMode prevent the first day from happening
	if(!Game.debugMode){

		// see "src/days" folder 
		startDay(Game.startDayNumber);
		
	} else {

		// debug
	
		// var player = Crafty.e('Player');
		// player.place(462, 450);
		
	}

});