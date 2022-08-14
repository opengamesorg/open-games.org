/***********************************************
ui.js : UI functions
***********************************************/

// UI functions : pause, restart, mute...
// this setup function is called once in init.js
Game.setupUI = function(){
	
	// top left page buttons
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

	// link the functions to the buttons
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
	
};