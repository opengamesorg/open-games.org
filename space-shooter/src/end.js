/***********************************************
end.js : end of the game
***********************************************/

// last scene of the game
Crafty.scene('end', function() {
	
	var handler = Crafty.e('Delay');
	
	// destroy existing player and create a new
	var player = Crafty('Player');
	player.destroy();
	player = Crafty.e('Player');
	player.setEndLevelState();
	
	// move the player forward
	handler.delay(function(){
		player.tween({x: player.x, y: -50},2000);
	},1000);
	
	// show TO BE CONTINUED message
	handler.delay(function(){
		Crafty.e('CustomText').setTitle().text('TO&nbsp;&nbsp;&nbsp;BE&nbsp;&nbsp;&nbsp;CONTINUED');
	},1750);
	
	// show THANKS FOR PLAYING message
	handler.delay(function(){
		Crafty.e('CustomText').setSubtitle().text('THANKS&nbsp;&nbsp;&nbsp;FOR&nbsp;&nbsp;&nbsp;PLAYING');
	},3500);
	
	// press keyAction to restart the game
	handler.delay(function(){
		player.bind('KeyUp', function(e) {
			if(!Crafty.isPaused() && Player.keys.keyAction.indexOf(e.key) != -1) {
				player.destroy();
				Crafty.scene('startMenu');
			}
		});
	},5000);
	
});