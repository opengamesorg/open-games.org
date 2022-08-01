/***********************************************
properties.js : game properties
***********************************************/

// game properties
// can be accessed from anywhere
var Game = {
	container: document.getElementById('game-container'),
	height: 500,
	width: 500,
	started: false,
	startWithMenu: true,
	startDayNumber: 1,
	debugMode: false,
	language: 'en',
	character: 'brandon',
};

// player properties
// can be accessed from anywhere
// see : https://craftyjs.com/api/Crafty-keys.html
var Player = {
	keys: {
		keyAction: 	[Crafty.keys.ENTER, Crafty.keys.SPACE, Crafty.keys.A, Crafty.keys.SHIFT],
		keyLeft: 	Crafty.keys.LEFT_ARROW,
		keyRight: 	Crafty.keys.RIGHT_ARROW,
		keyUp: 		Crafty.keys.UP_ARROW,
		keyDown: 	Crafty.keys.DOWN_ARROW,
	},
};

// assets object 
// contains all the assets needed for the game : images/sprites/sounds... 
// they will be loaded later in loading.js with Crafty.load()
// see : https://craftyjs.com/api/Crafty-loader.html
var assetsObj = {
	'images': [
		'assets/images/ui/play.png',
		'assets/images/background/highschool.png',
		'assets/images/decor/boys-toilets/above/1.png',
		'assets/images/decor/classroom-1/above/1.png',
		'assets/images/decor/classroom-1/above/2.png',
		'assets/images/decor/classroom-1/above/3.png',
		'assets/images/decor/classroom-1/above/4.png',
		'assets/images/decor/classroom-1/above/5.png',
		'assets/images/decor/classroom-1/above/6.png',
		'assets/images/decor/classroom-1/above/7.png',
		'assets/images/decor/classroom-1/above/8.png',
		'assets/images/decor/classroom-2/above/1.png',
		'assets/images/decor/classroom-2/above/2.png',
		'assets/images/decor/classroom-2/above/3.png',
		'assets/images/decor/girls-toilets/above/1.png',
		'assets/images/decor/hallway/above/1.png',
		'assets/images/decor/hallway/above/2.png',
		'assets/images/decor/hallway/above/3.png',
		'assets/images/decor/infirmary/above/1.png',
		'assets/images/decor/principals-office/above/1.png',
		'assets/images/dialogue/choice-arrow.png',
		'assets/images/dialogue/choice-box.png',
		'assets/images/dialogue/content-box.png',
		'assets/images/dialogue/next-arrow.png',
		'assets/images/menu/background.png',
		'assets/images/menu/brandon.png',
		'assets/images/menu/brenda.png',
		'assets/images/menu/choice-arrow.png',
		'assets/images/menu/flag-en.png',
		'assets/images/menu/flag-fr.png',
		'assets/images/menu/title.png',
	],
	'sprites': {
		'assets/images/characters/student-1.png': { tile: 32, tileh: 48, map: { SpriteStudent1: [0, 0] } },
		'assets/images/characters/student-2.png': { tile: 32, tileh: 48, map: { SpriteStudent2: [0, 0] } },
		'assets/images/characters/student-6.png': { tile: 32, tileh: 48, map: { SpriteStudent6: [0, 0] } },
		'assets/images/characters/student-12.png': { tile: 32, tileh: 48, map: { SpriteStudent12: [0, 0] } },
		'assets/images/characters/student-14.png': { tile: 32, tileh: 48, map: { SpriteStudent14: [0, 0] } },
		'assets/images/characters/professor-1.png': { tile: 32, tileh: 48, map: { SpriteProfessor1: [0, 0] } },
		'assets/images/characters/professor-2.png': { tile: 32, tileh: 48, map: { SpriteProfessor2: [0, 0] } },
		'assets/images/characters/principal.png': { tile: 32, tileh: 48, map: { SpritePrincipal: [0, 0] } },
	},
	'audio': {
		'menu': ['assets/audio/menu.m4a', 'assets/audio/menu.ogg'],
		'main': ['assets/audio/main.m4a', 'assets/audio/main.ogg'],
	},
};

// audio properties
Game.audio = {
	// track playing right now
	playing: null,
	// fade out the sound from an audio object
	// a callback function can be called when finished
	fadeOut: function(audio, duration, callback){
		Crafty.e('Delay').delay(function(){
			if(audio.volume > 0){
				audio.volume -= 0.1;
			}
		},duration, audio.volume*9, function(){
			if(typeof callback == 'function') callback();
			this.destroy();
		});
	}
};

// get user browser
// can be used to adjust a few displays
// see : https://stackoverflow.com/a/9851769
var userBrowser = {
	// Opera 8.0+
	isOpera: (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
	// Firefox 1.0+
	isFirefox: typeof InstallTrigger !== 'undefined',
	// Safari 3.0+ "[object HTMLElementConstructor]" 
	isSafari: /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification)),
	// Internet Explorer 6-11
	isIE: /*@cc_on!@*/false || !!document.documentMode,
	// Edge 20+
	isEdge: !this.isIE && !!window.StyleMedia,
	// Chrome 1 - 79
	isChrome: !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime),
	// Edge (based on chromium) detection
	isEdgeChromium: this.isChrome && (navigator.userAgent.indexOf("Edg") != -1),
	// Blink engine detection
	isBlink: (this.isChrome || this.isOpera) && !!window.CSS
};

// know if mobile iOS
// will be used to prevent audio bugs
// see : https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
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
  
// "The maximum number of sounds that can be played simultaneously. The default value is 7".
// see : https://craftyjs.com/api/Crafty-audio.html#Crafty-audio-setChannels
if(!iOS){
	Crafty.audio.setChannels(20);
}