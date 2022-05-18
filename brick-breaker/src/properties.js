/***********************************************
properties.js : game properties
***********************************************/

// game properties
// can be accessed from anywhere
var Game = {
	container: document.getElementById('game-container'),
	height: 500,
	width: 350,
	backgroundColor: '#000046',
	started: false,
	startWithMenu: true,
	startLevel: 'level-1',
	currentLevel: '',
	mode: 'slow'
};

// player properties
// can be accessed from anywhere
// see : http://craftyjs.com/api/Crafty-keys.html
var Player = {
	keys: {
		keyUp: Crafty.keys.UP_ARROW, // for the menu
		keyDown: Crafty.keys.DOWN_ARROW, // for the menu
		keyAction: [Crafty.keys.ENTER, Crafty.keys.SPACE, Crafty.keys.A, Crafty.keys.SHIFT]
	}
};

// assets object 
// contains all the assets needed for the game : images/sprites/sounds... 
// they will be loaded later in loading.js with Crafty.load()
// see : http://craftyjs.com/api/Crafty-loader.html
var assetsObj = {
	'images': [
		'assets/images/ui/play.png',
		'assets/images/ui/mobile-tap.png',	
		'assets/images/menu/arrow.png',
		'assets/images/menu/no-arrow.png',
	],
	'sprites': {
		'assets/images/enemy/enemy.png': { tile: 22, tileh: 22, map: { SpriteEnemy: [0, 0] } },
	},
	'audio': {
       'main': ['assets/audio/music/main.m4a', 'assets/audio/music/main.ogg'],
       'boss': ['assets/audio/music/boss.m4a', 'assets/audio/music/boss.ogg'],
       'level-start': ['assets/audio/music/level-start.m4a', 'assets/audio/music/level-start.ogg'],
       'level-end': ['assets/audio/music/level-end.m4a', 'assets/audio/music/level-end.ogg'],
       'game-over': ['assets/audio/music/game-over.m4a', 'assets/audio/music/game-over.ogg'],
       'void': ['assets/audio/music/void.m4a', 'assets/audio/music/void.ogg'],
       'ball-hits-brick': ['assets/audio/sounds/ball-hits-brick.m4a', 'assets/audio/sounds/ball-hits-brick.ogg'],
       'ball-hits-player': ['assets/audio/sounds/ball-hits-player.m4a', 'assets/audio/sounds/ball-hits-player.ogg'],
       'drop-hits-player': ['assets/audio/sounds/drop-hits-player.m4a', 'assets/audio/sounds/drop-hits-player.ogg'],
       'player-gets-killed': ['assets/audio/sounds/player-gets-killed.m4a', 'assets/audio/sounds/player-gets-killed.ogg'],
       'player-shoots-lasers': ['assets/audio/sounds/player-shoots-lasers.m4a', 'assets/audio/sounds/player-shoots-lasers.ogg'],
	   'enemy-gets-hit': ['assets/audio/sounds/enemy-gets-hit.m4a', 'assets/audio/sounds/enemy-gets-hit.ogg'],
	   'enemy-gets-killed': ['assets/audio/sounds/enemy-gets-killed.m4a', 'assets/audio/sounds/enemy-gets-killed.ogg'],
	   'enemy-shoots-lasers': ['assets/audio/sounds/enemy-shoots-lasers.m4a', 'assets/audio/sounds/enemy-shoots-lasers.ogg'],
    }
};

// get user browser
// will be used to adjust a few displays
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
  
 // https://craftyjs.com/api/Crafty-audio.html#Crafty-audio-setChannels
// The maximum number of sounds that can be played simultaneously. The default value is 7.
if(!iOS){
	Crafty.audio.setChannels(20);
}