/***********************************************
shared.js : shared functions for the levels
***********************************************/

// setup a level according to its number
function levelSetup(levelNumber){
	// mobile version setup
	if(Game.mobile){
		Game.mobileVersion();
	}
	
	// play music
	if(!iOS){
		Crafty.audio.play('level-start');
	}
	
	Game.currentLevel = 'level-'+levelNumber;
	
	// title creation and destruction
	var title = Crafty.e("CustomText").setTitle().text("LEVEL&nbsp;&nbsp;"+levelNumber);
	if(!Game.mobile){
		var subtitle = Crafty.e('CustomText').setSubtitle();
	}
	Crafty.e("Delay").delay(function(){ 
		title.destroy(); 
		if(!Game.mobile){
			subtitle.destroy(); 
		}
	}, 2000, 0, function(){
		if(Game.mobile){
			// mobile instructions
			// will be destroyed when start
			if(levelNumber == 1){
				Crafty.e('CustomText, MobileInstruction').setMobileInstruction().place((iOS ? 25 : 30), Game.height-100).text('MOVE&nbsp;&nbsp;&nbsp;&nbsp;LEFT');
				Crafty.e('2D, DOM, Image, MobileInstruction').image('assets/images/ui/mobile-tap.png').attr({x: 60, y: Game.height-130});
				Crafty.e('CustomText, MobileInstruction').setMobileInstruction().place((iOS ? Game.width-125 : Game.width-115), Game.height-100).text('MOVE&nbsp;&nbsp;&nbsp;&nbsp;RIGHT');
				Crafty.e('2D, DOM, Image, MobileInstruction').image('assets/images/ui/mobile-tap.png').attr({x: Game.width-80, y: Game.height-130});
			}
			var subtitle = Crafty.e('CustomText, MobileInstruction').setSubtitle();
			subtitle.text("TAP&nbsp;&nbsp;&nbsp;&nbsp;HERE&nbsp;&nbsp;&nbsp;&nbsp;TO&nbsp;&nbsp;&nbsp;&nbsp;START");
			subtitle.y -= 35;
			// touch detector in the middle to start level
			Crafty.e('CustomTouchControl, MobileInstruction').place(-35, Game.height/2-50).size(Game.width, 50).bind('TouchStart', function(){ 
				if(!Crafty.isPaused()){
					Crafty('MobileInstruction').each(function(){
						this.destroy();
					});
					player.canDoAction = true;
					Crafty.trigger('CustomTouch');
					// play music
					if(!iOS){
						Crafty.audio.play('main', -1, 0.65);
					}
				}
			});
		}
	});
	
	// player creation
	var player = Crafty.e("Player");
	
	// player mobile behaviour
	if(Game.mobile){ 
		player.setMobileBehaviour();
	}
	
	// ball creation
	Crafty.e("Ball").placeOnPlayer().attachToPlayer();
}

// assign random drops from a drop list to the level bricks
// each drop in the list is only assigned once
function assignRandomDrops(dropList){
	var limit = dropList.length;
	var bricks = Crafty('Brick').get().filter(function(brick){
		return brick.has('Breakable');
	});
	
	if(bricks.length < limit){
		limit = bricks.length;
	}
	
	while(limit != 0){
		var brick = Crafty.math.randomElementOfArray(bricks);
		if(!brick.hasDrop){
			brick.setDrop(dropList[limit-1]);
			limit--;
		}
	}
}