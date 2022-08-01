/***********************************************
init.js : game initialization
***********************************************/

// initialization and loading when the page is ready
window.onload = function() {
	
	// game stage dimensions
	Game.stageWidth = Game.width;
	Game.stageHeight = Game.height;
	
	// special behaviour if mobile device
	if(Crafty.mobile){
		Game.setupMobile();
	}
	
	// centered wrapper containing the game div
	// dimensioned to fit game width and height
	var generalContainer = document.getElementById('general-container');
	generalContainer.style.width = Game.stageWidth + 'px';
	generalContainer.style.height = Game.stageHeight  + 'px';
	
	// game initialization with stage setup
	Crafty.init(Game.stageWidth, Game.stageHeight, Game.container);
	
	// game UI functions : pause, restart, mute...
	// bound to the top page buttons and keyboard shortcuts
	Game.setupUI();
	
	// launch the game loading scene
	Crafty.scene('loading');
	
};