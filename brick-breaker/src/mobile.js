/***********************************************
mobile.js : game behaviour on mobile device
***********************************************/

// special behaviour if mobile device
// properties are also changed in other files
// called once in init.js
Game.setupMobile = function(){
	// used anywhere to know if the device is mobile
	// Crafty.mobile is used once in init.js, then it's Game.mobile that is used
	Game.mobile = true;
	// change game scale (smaller)
	Game.mobileScale = 0.9;
	Game.stageWidth *= Game.mobileScale; 
	Game.stageHeight *= Game.mobileScale;
	// mobile version setup, called in every scene
	Game.mobileVersion = function(){
		// enable touch events handling
		Crafty.multitouch(true);
		// change game scale on mobile (smaller)
		Crafty.viewport.scale(Game.mobileScale);
	};
	// too much latency with sounds on mobile
	// they are removed, but we keep the music
	for(var audio in assetsObj.audio){
		if(assetsObj.audio[audio][0].indexOf('sounds') != -1){
			delete assetsObj.audio[audio];
		}
	}
	// remove the "void audio hack" buggy on mobile
	delete assetsObj.audio['void'];
	// audio makes game buggy on mobile iOS
	// remove audio from assets before loading
	if(iOS){
		delete assetsObj.audio;
	}
};

// custom touch layer for mobile version
// called once in loading.js
Game.setupTouchLayers = function(){
	// static layer on top of everything
	// handles touch events, but only inside the game screen
	Crafty.createLayer('CustomTouchLayer', 'Canvas', {scaleResponse: 1, xResponse: 0, yResponse: 0, z: 999});
	// custom touch handling inside the game screen 
	// tells if player taps on the left or right side of the screen
	Crafty.e('CustomTouchControl, Persist').halfScreen('left').bind('TouchStart', function(){
		Crafty.trigger('CustomTouch');
		Crafty.trigger('CustomTouchLeft');
	}).bind('TouchEnd', function(){
		Crafty.trigger('CustomTouchStop');
	});
	Crafty.e('CustomTouchControl, Persist').halfScreen('right').bind('TouchStart', function(){
		Crafty.trigger('CustomTouch');
		Crafty.trigger('CustomTouchRight');
	}).bind('TouchEnd', function(){
		Crafty.trigger('CustomTouchStop');
	});
	// custom touch handling outside the game screen
	// tells if player taps on the left or right side of the screen
	var deviceWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	window.addEventListener('touchstart', function(e){
		if(!Crafty.isPaused()){
			var evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
			var touch = evt.touches[0] || evt.changedTouches[0];
			Crafty.trigger('CustomTouch');
			if(touch.pageX < deviceWidth/2){
				Crafty.trigger('CustomTouchLeft');
			} else Crafty.trigger('CustomTouchRight');
		}
	});
	window.addEventListener('touchend', function(){
		Crafty.trigger('CustomTouchStop');
	});
};