/***********************************************
menu.js : game menus
***********************************************/

// start menu
// launched when loading is done
Crafty.scene('startMenu', function() {
	
	// mobile version setup
	if(Game.mobile) Game.mobileVersion();

	if(!iOS){
		// start menu audio
		Game.audio.playing = Crafty.audio.play('menu', -1, 0.9);
	}

	// black background color
	Crafty.background('#000');
	
	// menu background image
	Crafty.e('2D, DOM, Image')
	.image('assets/images/menu/background.png');

	// css used by several white containers
	var whiteContainerCss = {
		'backgroundColor': 'rgba(255,255,255, 0.5)',
		'backgroundPosition': 'center',
		'margin': '50px 0',
	};

	// menu title image
	var title = Crafty.e('2D, DOM, Image, Tween')
	.image('assets/images/menu/title.png')
	.attr({w: Game.width, z: 2, alpha: 0})
	.css(whiteContainerCss);

	// margin is only used by title
	delete whiteContainerCss.margin;

	// left block
	var leftBlock = Crafty.e('2D, DOM, Image, Tween')
	.attr({x: 50, y: 255, w: 175, h: 160, z: 2, alpha: 0})
	.css(whiteContainerCss);

	// right block
	var rightBlock = Crafty.e('2D, DOM, Image, Tween')
	.attr({x: 275, y: 255, w: 175, h: 160, z: 2, alpha: 0})
	.css(whiteContainerCss);

	// left block title
	var leftBlockTitle = Crafty.e('CustomText, Tween').setSubtitle()
	.text('').size(120, 30).place(80, 270);
	
	// right block title
	var rightBlockTitle = Crafty.e('CustomText, Tween').setSubtitle()
	.text('').size(120, 30).place(305, 270);

	// arrow letting you choose between left and right block
	var choiceArrowLeftX = 123;
	var choiceArrowRightX = 348;
	var choiceArrowY = 375;
	var choiceArrow = Crafty.e('2D, DOM, Image, Tween, Delay, Motion')
	.image('assets/images/menu/choice-arrow.png')
	.attr({w: 28, h: 20, x: choiceArrowLeftX, y: choiceArrowY, z: 2, alpha: 0});
	choiceArrow.velocity = choiceArrow.velocity();
	choiceArrow.velocity.y = 7;

	// subtitle
	var subtitle = Crafty.e('CustomText, Tween')
	.setSubtitle()
	.text('PRESS&nbsp;&nbsp;&nbsp;&nbsp;ENTER')
	.attr({alpha: 0});

	// black veil covering everything, fading out to show the content
	var blackVeil = Crafty.e('Veil').fade(0.25, 1500);

	// when the black veil is done fading in
	Crafty.e('Delay').delay(function(){

		// the elements appear
		// HIGH SCHOOL STORIES and PRESS ENTER
		var msAppear = 200;
		title.tween({alpha: 1}, msAppear);
		subtitle.tween({alpha: 1}, msAppear);
		this.delay(function(){
			subtitle.blink();
		}, msAppear);
		
		// if the player presses his action key
		subtitle.bind('KeyUp', function(e) {
			if(!Crafty.isPaused()){
				if(Player.keys.keyAction.indexOf(e.key) != -1) {
					
					// the elements change
					// CHOOSE A LANGUAGE
					subtitle.destroy();
					subtitle = Crafty.e('CustomText').setSubtitle()
					.text('CHOOSE&nbsp;&nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;&nbsp;LANGUAGE').place(0,200);

					leftBlockTitle.text('ENGLISH');
					rightBlockTitle.text('FRENCH');

					leftBlock.tween({alpha: 1}, msAppear).image('assets/images/menu/flag-en.png');
					rightBlock.tween({alpha: 1}, msAppear).image('assets/images/menu/flag-fr.png');
					
					choiceArrow.y = choiceArrowY;
					choiceArrow.tween({alpha: 1}, msAppear).delay(function(){
						this.velocity.y = -this.velocity.y;
					}, 500, -1);

					// default language
					var chosenLanguage = 'en';

					// if the player presses left, right or action key
					subtitle.bind('KeyUp', function(e) {
						if(!Crafty.isPaused()){
							if(Player.keys.keyLeft == e.key) {
								chosenLanguage = 'en';
								choiceArrow.x = choiceArrowLeftX;
							} else if(Player.keys.keyRight == e.key) {
								chosenLanguage = 'fr';
								choiceArrow.x = choiceArrowRightX;
							} else if(Player.keys.keyAction.indexOf(e.key) != -1) {

								// save chosen language
								Game.language = chosenLanguage;

								// the elements change
								// CHOOSE A CHARACTER
								subtitle.destroy();
								subtitle = Crafty.e('CustomText, Tween').setSubtitle()
								.text('CHOOSE&nbsp;&nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;&nbsp;CHARACTER').place(0,200);

								leftBlockTitle.text('BRANDON');
								rightBlockTitle.text('BRENDA');

								leftBlock.image('assets/images/menu/brandon.png');
								rightBlock.image('assets/images/menu/brenda.png');

								choiceArrow.x = choiceArrowLeftX;

								// default character
								var chosenCharacter = 'brandon';

								// if the player presses left, right or action key
								subtitle.bind('KeyUp', function(e) {
									if(!Crafty.isPaused()){
										if(Player.keys.keyLeft == e.key) {
											chosenCharacter = 'brandon';
											choiceArrow.x = choiceArrowLeftX;
										} else if(Player.keys.keyRight == e.key) {
											chosenCharacter = 'brenda';
											choiceArrow.x = choiceArrowRightX;
										} else if(Player.keys.keyAction.indexOf(e.key) != -1) {

											// save chosen character
											Game.character = chosenCharacter;

											// update some dialogs if Brenda
											if(Game.character == 'brenda'){
												Dialogues[9].branches[0].content[2].text.fr = "Vous n'avez pas l'air très intelligente, vous serez sans doute affectée à la classe B.";
												Dialogues[11].branches[0].content[0].choices[0].text.en = "Brenda.";
												Dialogues[11].branches[0].content[0].choices[0].text.fr = "Brenda.";
											}

											// everything disappears
											title.tween({alpha: 0}, msAppear)
											subtitle.destroy();
											leftBlock.tween({alpha: 0}, msAppear)
											rightBlock.tween({alpha: 0}, msAppear)
											leftBlockTitle.destroy();
											rightBlockTitle.destroy();
											choiceArrow.destroy();
											
											// black veil fading in, covering everything
											blackVeil.fade(1, 1000);

											if(!iOS){
												// fade out menu audio
												Game.audio.fadeOut(Game.audio.playing, 100, null);
											}

											// launch the game
											Crafty.e('Delay').delay(function(){
												Crafty.scene('highschool');
											}, 1500);
										}
									}
								});
							}
						}
					});

				}
			}
		});

	}, 2000);
	
	
});