/***********************************************
mobile.js : game behaviour on mobile device
***********************************************/

// special behaviour if mobile device
// this setup function is called once in init.js
Game.setupMobile = function(){
	
	// used anywhere to know if the device is mobile
	// Crafty.mobile is used once in init.js, then it's Game.mobile that is used
	Game.mobile = true;
	
	// change game scale (smaller)
	Game.mobileScale = 0.65;
	Game.stageWidth *= Game.mobileScale; 
	Game.stageHeight *= Game.mobileScale;
	
	// mobile version setup, called in every scene
	Game.mobileVersion = function(){
		// enable touch events handling
		Crafty.multitouch(true);
		// change game scale (smaller)
		Crafty.viewport.scale(Game.mobileScale);
	};
	
	// audio makes game buggy on mobile iOS
	// remove audio from assets before loading
	if(iOS){
		delete assetsObj.audio;
	}
	
};