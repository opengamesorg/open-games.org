/***********************************************
init.js : game initialization
***********************************************/

// game properties
// can be accessed from anywhere
var Game = {
	container: document.getElementById('game-container'),
	height: 550,
	width: 400,
	mobile: false,
	mobileScale: 0.8,
	mobileGap: 0,
	started: false,
	startLevel: 'level-1',
	difficulty: 'standard'
};

// player properties
// can be accessed from anywhere
// see : http://craftyjs.com/api/Crafty-keys.html
var Player = {
	keys: {
		keyUp: Crafty.keys.UP_ARROW, // for the menu
		keyDown: Crafty.keys.DOWN_ARROW, // for the menu
		keyAction: [Crafty.keys.ENTER, Crafty.keys.SPACE], // for shooting
		multiway: {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180} // for moving
	},
	deathCount: 0
};

// assets object 
// contains all the assets needed for the game : images/sprites/sounds... 
// they will be loaded later in this file with Crafty.load()
// see : http://craftyjs.com/api/Crafty-loader.html
var assetsObj = {
	'images': [
		'assets/images/ui/play.png',
	
		'assets/images/background/background.png',
		
		'assets/images/menu/arrow.png',
		'assets/images/menu/no-arrow.png',
		'assets/images/menu/crown.png',
		
		'assets/images/projectile/playerProjectile-1.png',
		'assets/images/projectile/playerProjectile-2.png',
		'assets/images/projectile/playerProjectile-3.png',
		'assets/images/projectile/playerProjectile-4.png',
		'assets/images/projectile/playerProjectile-5.png',
		'assets/images/projectile/playerProjectile-6.png',
		
		'assets/images/projectile/enemyProjectile-1.png',
		'assets/images/projectile/enemyProjectile-2.png',
		'assets/images/projectile/enemyProjectile-3.png',
		'assets/images/projectile/enemyProjectile-4.png',
		'assets/images/projectile/enemyProjectile-5.png',
		'assets/images/projectile/enemyProjectile-6.png',
		'assets/images/projectile/enemyProjectile-7.png',
		'assets/images/projectile/enemyProjectile-8.png',
		'assets/images/projectile/enemyProjectile-9.png',
		'assets/images/projectile/enemyProjectile-10.png',
		
		'assets/images/asteroid/medium.png',
		'assets/images/asteroid/big.png',
		
		'assets/images/warning/warningTop.png',
		'assets/images/warning/warningTopLeft.png',
		'assets/images/warning/warningTopRight.png',
		
		'assets/images/bonus/upgradeProjectileBonus.png',
		'assets/images/bonus/speedUpBonus.png',
		
		'assets/images/jewel/jewel-1.png',
		'assets/images/jewel/jewel-2.png',
		'assets/images/jewel/jewelContainer-1.png',
		'assets/images/jewel/jewelContainer-2.png',
		
		'assets/images/electricFence/electricFence-open-middle.png',
		'assets/images/electricFence/electricFence-open-left.png',
		'assets/images/electricFence/electricFence-open-right.png',
		'assets/images/electricFence/electricFence-closed.png'
	],
	'sprites': {
		'assets/images/player/player.png': { tile: 30, tileh: 30, map: { SpritePlayer: [0, 0] } },

		'assets/images/enemy/enemy-1.png': { tile: 20, tileh: 20, map: { SpriteEnemy1: [0, 0] } },
		'assets/images/enemy/enemy-2.png': { tile: 20, tileh: 20, map: { SpriteEnemy2: [0, 0] } },
		'assets/images/enemy/enemy-3.png': { tile: 20, tileh: 20, map: { SpriteEnemy3: [0, 0] } },
		'assets/images/enemy/enemy-4.png': { tile: 40, tileh: 40, map: { SpriteEnemy4: [0, 0] } },
		'assets/images/enemy/enemy-5.png': { tile: 20, tileh: 20, map: { SpriteEnemy5: [0, 0] } },
		'assets/images/enemy/enemy-6.png': { tile: 20, tileh: 20, map: { SpriteEnemy6: [0, 0] } },
		'assets/images/enemy/enemy-7.png': { tile: 40, tileh: 40, map: { SpriteEnemy7: [0, 0] } },
		'assets/images/enemy/enemy-8.png': { tile: 20, tileh: 20, map: { SpriteEnemy8: [0, 0] } },
		'assets/images/enemy/enemy-9.png': { tile: 80, tileh: 50, map: { SpriteEnemy9: [0, 0] } },
		'assets/images/enemy/enemy-10.png': { tile: 20, tileh: 20, map: { SpriteEnemy10: [0, 0] } },
		'assets/images/enemy/enemy-11.png': { tile: 20, tileh: 20, map: { SpriteEnemy11: [0, 0] } },
		'assets/images/enemy/enemy-12.png': { tile: 40, tileh: 40, map: { SpriteEnemy12: [0, 0] } },
		'assets/images/enemy/enemy-13.png': { tile: 80, tileh: 50, map: { SpriteEnemy13: [0, 0] } },
		
		'assets/images/boss/boss-1.png': { tile: 150, tileh: 100, map: { SpriteBoss1: [0, 0] } },
		'assets/images/boss/boss-2.png': { tile: 200, tileh: 100, map: { SpriteBoss2: [0, 0] } },
		'assets/images/boss/boss-3.png': { tile: 300, tileh: 125, map: { SpriteBoss3: [0, 0] } }
	},
	'audio': {
        'main': ['assets/audio/main.m4a', 'assets/audio/main.ogg'],
        'boss': ['assets/audio/boss.m4a', 'assets/audio/boss.ogg']
    }
};

// initialization and loading when the page is ready
window.onload = function() {
	
	var loadError = false;
	Game.stageWidth = Game.width;
	Game.stageHeight = Game.height;
	
	// special behaviour if mobile device
	// properties are also changed in other files
	if(Crafty.mobile){
		Game.mobile = true;
		Game.stageWidth *= Game.mobileScale; 
		Game.stageHeight *= Game.mobileScale;
		// gap added by mobile version
		// used for reajusting some entities position
		Game.mobileGap = -40;
		// mobile version setup, called in every scene
		Game.mobileVersion = function(){
			// enable touch events handling
			Crafty.multitouch(true);
			// change game scale on mobile (smaller)
			Crafty.viewport.scale(Game.mobileScale);
		};
		// audio makes game buggy on mobile iOS
		// remove audio from assets before loading
		if(iOS){
			delete assetsObj.audio;
		}
	}
	
	// centered wrapper containing the game div
	// dimensioned to fit game width and height
	var generalContainer = document.getElementById('general-container');
	generalContainer.style.width = Game.stageWidth + 'px';
	generalContainer.style.height = Game.stageHeight  + 'px';
	
	// game initialization with stage setup
	Crafty.init(Game.stageWidth, Game.stageHeight, Game.container);
	
	// game UI functions : pause, restart, mute...
	// bound to the top page buttons onclick and ontouch
	var buttonRestart = document.querySelector('.ui-button.restart');
	var buttonMute = document.querySelector('.ui-button.mute');
	var buttonUnmute = document.querySelector('.ui-button.unmute');
	var buttonPause = document.querySelector('.ui-button.pause');
	var buttonUnpause = document.querySelector('.ui-button.unpause');
	
	// restart the game : reload the page
	function restart(){
		location.reload();
	}
	
	// mute audio
	function mute(){
		buttonMute.classList.add('hidden');
		buttonUnmute.classList.remove('hidden');
		if(!iOS){
			Crafty.audio.mute();
		}
	}
	
	// unmute audio
	function unmute(){
		buttonUnmute.classList.add('hidden');
		buttonMute.classList.remove('hidden');
		if(!iOS){
			Crafty.audio.unmute();
		}
	}
	
	// pause game and audio
	function pause(){
		buttonPause.classList.add('hidden');
		buttonUnpause.classList.remove('hidden');
		Game.container.classList.add('pause');
		Crafty.pause();
		if(!iOS){
			for(var audio in assetsObj.audio){
				Crafty.audio.pause(audio);
			}
		}
	}
	
	// unpause game and audio
	function unpause(){
		buttonUnpause.classList.add('hidden');
		buttonPause.classList.remove('hidden');
		Game.container.classList.remove('pause');
		Crafty.pause();
		if(!iOS){
			for(var audio in assetsObj.audio){
				Crafty.audio.unpause(audio);
			}
		}
	}

	buttonRestart.onclick = restart;
	buttonMute.onclick = mute;
	buttonUnmute.onclick = unmute;
	buttonPause.onclick = pause;
	buttonUnpause.onclick = unpause;

	// keyboard shortcuts
	Crafty.bind('KeyUp', function(e) {
		// refresh page with F5
		if(e.key == Crafty.keys.F5){
			restart();
		}
		// pause game with P
		if(e.key == Crafty.keys.P){
			if(Crafty.isPaused()){
				unpause();
			} else {
				pause();
			}
		}
	});
	
	// game loading scene
	Crafty.scene('loading', function() {
		
		// show loading message
		var customLoadingMessage = Crafty.e('CustomText').setLoading();
		var loadingText = customLoadingMessage.text();
		
		// load all the assets for the game
		Crafty.load(assetsObj, function() { // when loaded
		
			if(!loadError){
				
				Crafty.e('Delay').delay(function(){
					
					// delete loading message
					customLoadingMessage.destroy();
					
					// show play button
					var playButton = Crafty.e('2D, DOM, Mouse').attr({w: 75, h: 75})
					.css({
						'background':'url(assets/images/ui/play.png) no-repeat center #131313',
						'border-radius':'5px'
					})
					.bind('MouseOver', function(e){ 
						if(!Crafty.isPaused()){
							this.css({'background-color':'#202020'}); 
						}
					})
					.bind('MouseOut', function(e){ 
						if(!Crafty.isPaused()){
							this.css({'background-color':'#131313'}); 
						}
					});
					
					// place the play button at the center
					playButton.attr({x: Game.stageWidth/2 - playButton.w/2, y: Game.stageHeight/2 - playButton.h/2});
					
					// start the game when pressing enter
					playButton.bind('KeyUp', function(e) {
						if(!Crafty.isPaused()){
							if(Player.keys.keyAction.indexOf(e.key) != -1) {
								play();
							}
						}
					});
					
					// start the game when clicking on play button
					playButton.bind('Click', function() {
						if(!Crafty.isPaused()){
							play();
						}
					});
					
					// start the game
					var play = function(){
						// used to prevent pause before starting the game
						Game.started = true;
						// destroy play button
						playButton.destroy();
						
						if(!iOS){
							// audio properties
							// main audio starts automatically
							Game.audio = {
								// store the audio object playing
								// will be used in fadeOut function
								main: Crafty.audio.play('main', -1, 0.7),
								// fade out the sound from an audio object
								// a callback function can be called when finished
								fadeOut: function(audio, callback){
									Crafty.e('Delay').delay(function(){
										if(audio.volume > 0){
											audio.volume -= 0.1;
										}
									},350, audio.volume*9, function(){
										if(typeof callback == 'function') callback();
										this.destroy();
									});
								}
							};
						}
						
						// alert if mobile device
						// Mobile version not available.
						if(Game.mobile){
							Crafty.e('2D, DOM, Text, Persist').attr({x: 0, y: 20, w: Game.width, h: 30})
							.text('Mobile version not available.').textAlign('center')
							.textColor('red').textFont({family: 'Open Sans Regular', size: '25px'});
						}
						
						// background scrolling 2px every 5ms
						gameBackgroundScrolling(2, 5);
						
						// launch the start menu scene
						Crafty.scene('startMenu'); 
					};
					
				},1000);
			}
			
		}, function(loadingProperties){ // when loading
			
			// show loading percentage
			customLoadingMessage.text(loadingText + '&nbsp;&nbsp;&nbsp;' + Math.round(loadingProperties.percent) + '%');
			
		}, function(){ // when loading fails
			
			// show loading error message
			customLoadingMessage.text('LOADING &nbsp;&nbsp;ERROR, &nbsp;PLEASE &nbsp;&nbsp;REFRESH')
			.css({'background-color': 'black'});
			loadError = true;
			
		});
		  
	});
	
	// launch the game loading scene
	Crafty.scene('loading');
	
};

// background scrolling function
var gameBackgroundScrolling = function(px, ms){
	
	var scrollValue = 0;
	
	// infinite movement
	Crafty.e('Delay').delay(function() {
		scrollValue += px;
		Crafty.background('url(assets/images/background/background.png) black 0px ' + scrollValue + 'px'); 
	}, ms, -1);
	
};

// get user browser
// will be used to adjust a few displays
// see : https://stackoverflow.com/a/9851769
var userBrowser = {
	// Opera 8.0+
	isOpera: (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
	// Firefox 1.0+
	isFirefox: typeof InstallTrigger !== 'undefined',
	// Safari 3.0+ '[object HTMLElementConstructor]' 
	isSafari: /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === '[object SafariRemoteNotification]'; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)),
	// Internet Explorer 6-11
	isIE: /*@cc_on!@*/false || !!document.documentMode,
	// Edge 20+
	isEdge: !this.isIE && !!window.StyleMedia,
	// Chrome 1 - 79
	isChrome: !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)
};

// know if mobile iOS
var iOS = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);