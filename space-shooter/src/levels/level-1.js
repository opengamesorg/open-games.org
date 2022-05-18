/***********************************************
level-1.js : first level, launched after the menu
***********************************************/

// first level
Crafty.scene("level-1", function() {
	
	// handler : will handle all the actions
	var handler = Crafty.e("Delay");
	// title creation
	var title = Crafty.e("CustomText").setTitle().text("LEVEL&nbsp;&nbsp;1");
	// title destruction
	// help subtitle creation
	handler.delay(function(){ 
		title.destroy(); 
		var subtitle = Crafty.e("CustomText").setSubtitle();
		subtitle.text("PRESS [ENTER] &nbsp;OR&nbsp; [SPACE] &nbsp;TO &nbsp;&nbsp;SHOOT");
		subtitle.y += 60;
		handler.delay(function(){ 
			// help subtitle destruction
			subtitle.destroy();
		}, 3000);
	}, 1500);
	
	// player creation
	var player = Crafty.e("Player");
	
	// level steps are phases where stuff is happening
	var levelStep = 0;
	// change step when changeStep is triggered
	// happens in enemyWave() and asteroidWave()
	var nextStep = true;
	Crafty.bind("changeStep", function(){
		nextStep = true;
	});
	// continuously verify if the level step has to be changed
	// only if there is no enemy left
	handler.delay(function(){
		if(nextStep){
			if(Crafty("Enemy").length == 0){
				// start with the first step : 1
				launchStep(++levelStep);
			}
		}
	}, 500, -1);
	
	// needed in end level
	var bossExplosionAnimTime = 0;
	
	// launch step : where all the enemies, asteroids, bonuses... are created for the level
	// for each step, different things happen
	var launchStep = function(step){
		// stay at the desired step
		nextStep = false;
		
		if(step == 1){
			
			/**************
				STEP 1
			**************/
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 3, enemyType: 1,
					xFrom: -30, yFrom: -10,
					xTo: 200, 	yTo: 100,
					xGap: -40,	yGap: -20,
					waveSpeed: 400,
					tweenSpeed: 1500,
					activitySpeed: 1500
				});
			}, 3000);
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 3, enemyType: 1,
					xFrom: Game.width+10, yFrom: -10,
					xTo: 200, 	yTo: 100,
					xGap: 40,	yGap: -20,
					waveSpeed: 400,
					tweenSpeed: 1500,
					activitySpeed: 1500,
					changeStep: true
				});
			}, 5000);
			
		}
		
		if(step == 2){
			
			/**************
				STEP 2
			**************/
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 3, enemyType: 2,
					xFrom: -30, yFrom: -10,
					xTo: 180, 	yTo: 45,
					xGap: -40,	yGap: -20,
					ySpecialGap: true,
					setDrop: "upgradeProjectileBonus",
					waveSpeed: 400,
					tweenSpeed: 1000,
					activitySpeed: 1000
				});
			}, 1500);
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 3, enemyType: 2,
					xFrom: Game.width+10, yFrom: -10,
					xTo: 180, 	yTo: 45,
					xGap: 40,	yGap: -20,
					ySpecialGap: true,
					waveSpeed: 400,
					tweenSpeed: 1000,
					activitySpeed: 1000,
					changeStep: true
				});
			}, 3000);
			
		}
		
		if(step == 3){
			
			/**************
				STEP 3
			**************/
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 2, enemyType: 3,
					xFrom: -30, yFrom: -10,
					xTo: 200, 	yTo: 60,
					xGap: -40,	yGap: 20,
					waveSpeed: 400,
					tweenSpeed: 1500,
					activitySpeed: 1500
				});
			}, 1500);
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 2, enemyType: 3,
					xFrom: Game.width+10, yFrom: -10,
					xTo: 200, 	yTo: 60,
					xGap: 40,	yGap: 20,
					tweenSpeed: 1500,
					activitySpeed: 1500,
					waveSpeed: 400,
					changeStep: true
				});
			}, 1500);
			
		}
		
		if(step == 4){
			
			/**************
				STEP 4
			**************/
		
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 1, enemyType: 4,
					xFrom: -50, yFrom: -10,
					xTo: 160, 	yTo: 80,
					xGap: 0,	yGap: 0,
					setDrop: "speedUpBonus",
					waveSpeed: 0,
					tweenSpeed: 2000,
					activitySpeed: 2000
				});
			}, 2000);
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 1, enemyType: 4,
					xFrom: Game.width+10, yFrom: -10,
					xTo: 240, 	yTo: 80,
					xGap: 0,	yGap: 0,
					waveSpeed: 0,
					tweenSpeed: 2000,
					activitySpeed: 2000,
					changeStep: true
				});
			}, 4000);
			
		}
		
		if(step == 5){
			
			/**************
				STEP 5
			**************/
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 2, enemyType: 2,
					xFrom: -30, yFrom: -10,
					xTo: 200, 	yTo: 100,
					xGap: -60,	yGap: -20,
					ySpecialGap: true,
					waveSpeed: 400,
					tweenSpeed: 1000,
					activitySpeed: 1000
				});
			}, 2000);
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 2, enemyType: 2,
					xFrom: Game.width+10, yFrom: -10,
					xTo: 200, 	yTo: 100,
					xGap: 60,	yGap: -20,
					ySpecialGap: true,
					waveSpeed: 400,
					tweenSpeed: 1000,
					activitySpeed: 1000
				});
			}, 3000);
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 2, enemyType: 3,
					xFrom: -30, yFrom: -10,
					xTo: 200, 	yTo: 80,
					xGap: -60,	yGap: -20,
					ySpecialGap: true,
					waveSpeed: 400,
					tweenSpeed: 1500,
					activitySpeed: 1500
				});
			}, 5000);
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 2, enemyType: 3,
					xFrom: Game.width+10, yFrom: -10,
					xTo: 200, 	yTo: 80,
					xGap: 60,	yGap: -20,
					ySpecialGap: true,
					waveSpeed: 400,
					tweenSpeed: 1500,
					activitySpeed: 1500
				});
			}, 6500);
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 2, enemyType: 1,
					xFrom: -30, yFrom: -10,
					xTo: 200, 	yTo: 70,
					xGap: -60,	yGap: -20,
					ySpecialGap: true,
					setDrop: "upgradeProjectileBonus",
					waveSpeed: 400,
					tweenSpeed: 1000,
					activitySpeed: 1000
				});
			}, 8500);
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 2, enemyType: 1,
					xFrom: Game.width+10, yFrom: -10,
					xTo: 200, 	yTo: 70,
					xGap: 60,	yGap: -20,
					ySpecialGap: true,
					waveSpeed: 400,
					tweenSpeed: 1000,
					activitySpeed: 1000,
					changeStep: true
				});
			}, 10000);
			
		}
		
		if(step == 6){
			
			/**************
				STEP 6
			**************/
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 1, enemyType: 4,
					xFrom: Game.width+10, yFrom: -40,
					xTo: 180, 	yTo: 100,
					xGap: 0,	yGap: 0,
					waveSpeed: 0,
					tweenSpeed: 2500,
					activitySpeed: 2500
				});
			}, 2000);
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 2, enemyType: 2,
					xFrom: -30, yFrom: -10,
					xTo: 200, 	yTo: 100,
					xGap: -60,	yGap: -20,
					ySpecialGap: true,
					waveSpeed: 400,
					tweenSpeed: 1000,
					activitySpeed: 1000
				});
			}, 3000);
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 2, enemyType: 2,
					xFrom: Game.width+10, yFrom: -10,
					xTo: 180, 	yTo: 100,
					xGap: 60,	yGap: -20,
					ySpecialGap: true,
					waveSpeed: 400,
					tweenSpeed: 1000,
					activitySpeed: 1000
				});
			}, 4000);
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 2, enemyType: 3,
					xFrom: -30, yFrom: -10,
					xTo: 200, 	yTo: 80,
					xGap: -60,	yGap: -20,
					ySpecialGap: true,
					waveSpeed: 400,
					tweenSpeed: 1500,
					activitySpeed: 1500
				});
			}, 6000);
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 2, enemyType: 3,
					xFrom: Game.width+10, yFrom: -10,
					xTo: 180, 	yTo: 80,
					xGap: 60,	yGap: -20,
					ySpecialGap: true,
					waveSpeed: 400,
					tweenSpeed: 1500,
					activitySpeed: 1500
				});
			}, 7000);
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 1, enemyType: 4,
					xFrom: 180, yFrom: -40,
					xTo: 180, 	yTo: 50,
					xGap: 0,	yGap: 0,
					waveSpeed: 0,
					tweenSpeed: 1500,
					activitySpeed: 1500
				});
			}, 9500);
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 1, enemyType: 1,
					xFrom: -30, yFrom: -10,
					xTo: 180, 	yTo: 50,
					xGap: -60,	yGap: -20,
					waveSpeed: 0,
					tweenSpeed: 1500,
					activitySpeed: 1500
				});
			}, 11000);
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 1, enemyType: 1,
					xFrom: Game.width+10, yFrom: -10,
					xTo: 260, 	yTo: 50,
					xGap: 0,	yGap: 0,
					waveSpeed: 0,
					tweenSpeed: 1500,
					activitySpeed: 1500,
					changeStep: true
				});
			}, 12000);
			
		}
		
		if(step == 7){
			
			/**************
				STEP 7
			**************/
			
			// stop main audio
			// play boss audio instead
			Game.audio.fadeOut(Game.audio.main, function(){
				Crafty.audio.stop("main");
				Game.audio.boss = Crafty.audio.play("boss", -1);
			});
		
			// boss
			handler.delay(function(){ 
				// arrival position
				var x = 125; var y = 50;
				// boss creation
				var boss = Crafty.e("Boss");
				// boss arrives and starts activity
				boss.setBossOne().place(125,-100).tween({x: x, y: y}, 2000).doBossActivity(2000);
				bossExplosionAnimTime = boss.explosionAnimTime;
				// by default, only the first two projectiles are enabled
				// after four seconds, enable another projectile 
				handler.delay(function(){ 
					boss.projectiles[2].enabled = true;
				}, 4000);
				// after ten seconds, enable other projectiles
				handler.delay(function(){ 
					boss.projectiles[3].enabled = true;
					boss.projectiles[4].enabled = true;
				}, 10000);
			}, 5000, 0, function(){
				nextStep = true;
			});
			
		}
		
		if(step == 8){
			
			/**************
				STEP 8
			**************/
			
			// stop boss audio
			// play main audio instead
			Game.audio.fadeOut(Game.audio.boss, function(){
				Crafty.audio.stop("boss");
				Game.audio.main = Crafty.audio.play("main", -1, 0.7);
			});
			
			// end level
			terminateLevel(1, handler, bossExplosionAnimTime);
		}
		
	};
	
});