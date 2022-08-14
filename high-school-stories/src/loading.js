/***********************************************
loading.js : game loading
***********************************************/

// game loading scene
Crafty.scene('loading', function() {
	
	var loadError = false;
	
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
					
					// alert : Mobile version not available.
					if(Game.mobile){
						Crafty.e('2D, DOM, Text, Persist').attr({x: 0, y: 20, z: 9999999, w: Game.width, h: 30})
						.text('Mobile version not available.').textAlign('center')
						.textColor('red').textFont({family: 'Open Sans Regular', size: '30px'});
					}
					
					// launch the game
					if(Game.startWithMenu){
						Crafty.scene('startMenu');
					} else {
						Crafty.scene('highschool');
					}
				};
			
			},1000);
		}
		
	}, function(loadingProperties){ // when loading
		
		// show loading percentage
		customLoadingMessage.text(loadingText + '&nbsp;&nbsp;&nbsp;' + Math.round(loadingProperties.percent) + '%');
		
	}, function(){ // when loading fails
		
		// show loading error message
		customLoadingMessage.text('LOADING &nbsp;&nbsp;ERROR, &nbsp;PLEASE &nbsp;&nbsp;REFRESH');
		loadError = true;
		
	});
	  
});