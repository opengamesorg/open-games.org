/***********************************************
level-2.js : second level, launched after the first level
***********************************************/

// second level
Crafty.scene("level-2", function() {
	
	// handler : will handle all the actions
	var handler = Crafty.e("Delay");
	// title creation
	var title = Crafty.e("CustomText").setTitle().text("LEVEL&nbsp;&nbsp;2");
	// title destruction
	handler.delay(function(){ 
		title.destroy(); 
	}, 1500);
	
	// no need to create player because it was already created in previous level
	// it survived the scene change thanks to Persist components
	// set start level state : reactivate everything for the player
	Crafty("Player").each(function(){
		this.setStartLevelState();
	});
	
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
				launchStep(++levelStep);
			}
		}
	}, 500, -1);
	
	// boss steps are boss phases
	var bossStep = 0;
	var bossFinalStep = 5;
	var changeBossStep = false;
	var bossExplosionAnimTime = 0;
	// verify if the boss step has to be changed
	// only if there is no enemy left (except the boss)
	var checkBossStep = function(){
		if(changeBossStep){
			if(Crafty("Enemy").length == 1){
				++bossStep;
			}
		}
		if(bossStep == bossFinalStep){
			changeBossStep = false;
			launchStep(levelStep);
			handler.cancelDelay(checkBossStep);
		}
	};
	// continuously check boss step
	handler.delay(checkBossStep, 500, -1);
	
	// launch step : where all the enemies, asteroids, bonuses... are created for the level
	// for each step, different things happen
	var launchStep = function(step){
		// stay at the desired step
		nextStep = false;
		
		if(step == 1){
			
			/**************
				STEP 1
			**************/
			
			// asteroid wave
			handler.delay(function(){ 
				asteroidWave(handler, "Top", 30, 250);
			}, 2000);
	
		}
		
		if(step == 2){
			
			/**************
				STEP 2
			**************/
			
			// enemy wave
			handler.delay(function(){ 
				enemyWave(handler, {
					enemyNumber: 3, enemyType: 5,
					xFrom: -30, yFrom: -10,
					xTo: 200, 	yTo: 100,
					xGap: -40,	yGap: -20,
					setDrop: "upgradeProjectileBonus",
					waveSpeed: 400,
					tweenSpeed: 1500,
					activitySpeed: 1500
				});
			}, 3000);
			
			// enemy wave
			handler.delay(function(){ 
				enemyWave(handler, {
					enemyNumber: 3, enemyType: 5,
					xFrom: Game.width+10, yFrom: -10,
					xTo: 200, 	yTo: 100,
					xGap: 40,	yGap: -20,
					waveSpeed: 400,
					tweenSpeed: 1500,
					activitySpeed: 1500,
					changeStep: true
				});
			}, 4500);
			
			// enemy wave
			handler.delay(function(){ 
				enemyWave(handler, {
					enemyNumber: 2, enemyType: 5,
					xFrom: -30, yFrom: -10,
					xTo: 200, 	yTo: 60,
					xGap: -40,	yGap: -20,
					ySpecialGap: true,
					waveSpeed: 400,
					tweenSpeed: 1500,
					activitySpeed: 1500
				});
			}, 6000);
			
			// enemy wave
			handler.delay(function(){ 
				enemyWave(handler, {
					enemyNumber: 2, enemyType: 5,
					xFrom: Game.width+10, yFrom: -10,
					xTo: 200, 	yTo: 60,
					xGap: 40,	yGap: -20,
					ySpecialGap: true,
					waveSpeed: 400,
					tweenSpeed: 1500,
					activitySpeed: 1500,
					changeStep: true
				});
			}, 7500);
	
		}
		
		if(step == 3){
			
			/**************
				STEP 3
			**************/
			
			// enemy wave
			handler.delay(function(){ 
				enemyWave(handler, {
					enemyNumber: 3, enemyType: 6,
					xFrom: -30, yFrom: -10,
					xTo: 200, 	yTo: 60,
					xGap: -40,	yGap: -20,
					ySpecialGap: true,
					waveSpeed: 400,
					tweenSpeed: 1000,
					activitySpeed: 1000
				});
			}, 1000);
			
			// enemy wave
			handler.delay(function(){ 
				enemyWave(handler, {
					enemyNumber: 3, enemyType: 6,
					xFrom: Game.width+10, yFrom: -10,
					xTo: 200, 	yTo: 60,
					xGap: 40,	yGap: -20,
					ySpecialGap: true,
					waveSpeed: 400,
					tweenSpeed: 1000,
					activitySpeed: 1000
				});
			}, 2500);
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 2, enemyType: 5,
					xFrom: -30, yFrom: -10,
					xTo: 200, 	yTo: 60,
					xGap: -40,	yGap: -20,
					ySpecialGap: true,
					waveSpeed: 400,
					tweenSpeed: 1500,
					activitySpeed: 1500
				});
			}, 4500);
			
			// enemy wave
			handler.delay(function(){ 
				enemyWave(handler, {
					enemyNumber: 2, enemyType: 5,
					xFrom: Game.width+10, yFrom: -10,
					xTo: 200, 	yTo: 60,
					xGap: 40,	yGap: -20,
					ySpecialGap: true,
					waveSpeed: 400,
					tweenSpeed: 1500,
					activitySpeed: 1500,
					changeStep: true
				});
			}, 5500);
	
		}
		
		if(step == 4){
			
			/**************
				STEP 4
			**************/
			
			// asteroid wave with bonus
			handler.delay(function(){ 
				Crafty.e("BonusDrop").place(60, -120).setType("speedUpBonus");
				asteroidWave(handler, "TopRight", 35, 250);
			},2000);
	
		}
		
		if(step == 5){
			
			/**************
				STEP 5
			**************/
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 1, enemyType: 7,
					xFrom: -50, yFrom: -10,
					xTo: 160, 	yTo: 80,
					xGap: 0, 	yGap: 0,
					waveSpeed: 0,
					tweenSpeed: 1500,
					activitySpeed: 1500
				});
			}, 3000);
			
			// enemy wave
			handler.delay(function(){ 
				enemyWave(handler, {
					enemyNumber: 1, enemyType: 7,
					xFrom: Game.width+10, yFrom: -10,
					xTo: 240, 	yTo: 80,
					xGap: 0, 	yGap: 0,
					waveSpeed: 0,
					tweenSpeed: 1500,
					activitySpeed: 1500
				});
			}, 5000);
			
			// enemy wave
			handler.delay(function(){ 
				enemyWave(handler, {
					enemyNumber: 3, enemyType: 6,
					xFrom: -30, yFrom: -10,
					xTo: 150, 	yTo: 60,
					xGap: -40, 	yGap: -20,
					ySpecialGap: true,
					waveSpeed: 400,
					tweenSpeed: 1000,
					activitySpeed: 1000
				});
			}, 8000);
			
			// enemy wave
			handler.delay(function(){ 
				enemyWave(handler, {
					enemyNumber: 3, enemyType: 6,
					xFrom: Game.width+10, yFrom: -10,
					xTo: 230, 	yTo: 60,
					xGap: 40, 	yGap: -20,
					ySpecialGap: true,
					waveSpeed: 400,
					tweenSpeed: 1000,
					activitySpeed: 1000,
					changeStep: true
				});
			}, 8000);
			
		}
		
		if(step == 6){
			
			/**************
				STEP 6
			**************/
			
			// enemy wave
			handler.delay(function(){ 
				enemyWave(handler, {
					enemyNumber: 1, enemyType: 8,
					xFrom: Game.width+10, yFrom: -10,
					xTo: 300, 	yTo: 80,
					xGap: 0, 	yGap: 0,
					waveSpeed: 0,
					tweenSpeed: 1500,
					activitySpeed: 1500
				});
			}, 2000);
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 1, enemyType: 8,
					xFrom: -30, yFrom: -10,
					xTo: 100, 	yTo: 80,
					xGap: 0, 	yGap: 0,
					waveSpeed: 0,
					tweenSpeed: 1500,
					activitySpeed: 1500
				});
			}, 3500);
			
			// enemy wave
			handler.delay(function(){ 
				enemyWave(handler, {
					enemyNumber: 1, enemyType: 9,
					xFrom: 160, yFrom: -100,
					xTo: 160, 	yTo: 50,
					xGap: 0, 	yGap: 0,
					setDrop: "upgradeProjectileBonus",
					waveSpeed: 0,
					tweenSpeed: 2500,
					activitySpeed: 2500
				});
			}, 6500);
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 2, enemyType: 5,
					xFrom: -30, yFrom: -10,
					xTo: 130, 	yTo: 120,
					xGap: -30, 	yGap: 0,
					waveSpeed: 500,
					tweenSpeed: 1500,
					activitySpeed: 1500
				});
			}, 7500);
			
			// enemy wave
			handler.delay(function(){ 
				enemyWave(handler, {
					enemyNumber: 2, enemyType: 5,
					xFrom: Game.width+10, yFrom: -10,
					xTo: 270, 	yTo: 120,
					xGap: 30, 	yGap: 0,
					waveSpeed: 500,
					tweenSpeed: 1500,
					activitySpeed: 1500
				});
			}, 7500);
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 2, enemyType: 6,
					xFrom: -30, yFrom: -10,
					xTo: 150, 	yTo: 80,
					xGap: -30, 	yGap: 0,
					waveSpeed: 750,
					tweenSpeed: 1000,
					activitySpeed: 1000
				});
			}, 9000);
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 2, enemyType: 6,
					xFrom: Game.width+10, yFrom: -10,
					xTo: 250, 	yTo: 80,
					xGap: 30, 	yGap: 0,
					waveSpeed: 750,
					tweenSpeed: 1000,
					activitySpeed: 1000
				});
			}, 10500);
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 2, enemyType: 7,
					xFrom: -50, yFrom: -10,
					xTo: 160, 	yTo: 120,
					xGap: -30, 	yGap: 0,
					waveSpeed: 500,
					tweenSpeed: 1500,
					activitySpeed: 1500
				});
			}, 12000);
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 1, enemyType: 7,
					xFrom: Game.width+10, yFrom: -10,
					xTo: 240, 	yTo: 120,
					xGap: 30, 	yGap: 0,
					waveSpeed: 500,
					tweenSpeed: 1500,
					activitySpeed: 1500
				});
			}, 12000);
			
			// enemy wave
			handler.delay(function(){
				enemyWave(handler, {
					enemyNumber: 1, enemyType: 6,
					xFrom: Game.width+10, yFrom: -10,
					xTo: 290, 	yTo: 80,
					xGap: 0, 	yGap: 0,
					waveSpeed: 0,
					tweenSpeed: 1000,
					activitySpeed: 1000
				});
			}, 14000);
			
			// enemy wave
			handler.delay(function(){ 
				enemyWave(handler, {
					enemyNumber: 1, enemyType: 6,
					xFrom: -30, yFrom: -10,
					xTo: 110, 	yTo: 80,
					xGap: 0, 	yGap: 0,
					waveSpeed: 0,
					tweenSpeed: 1000,
					activitySpeed: 1000
				});
			}, 15000);
			
			// asteroid wave
			handler.delay(function(){ 
				asteroidWave(handler, "TopLeft", 25, 150);
			},11000);
			
		}
		
		if(step == 7){
			
			/**************
				STEP 7
			**************/
			
			// stop main audio
			// play boss audio instead
			if(bossStep != bossFinalStep){
				handler.delay(function(){
					Game.audio.fadeOut(Game.audio.main, function(){
						Crafty.audio.stop("main");
						Game.audio.boss = Crafty.audio.play("boss", -1);
					});
				},2000);
			}

			// boss
			handler.delay(function(){
				if(bossStep != bossFinalStep){
					
					/**********************************************
					first phase : arrive and shoot projectiles
					following his first pattern
					**********************************************/
					++bossStep;
					// arrival position
					var x = 100; var y = 40;
					// boss creation
					var boss = Crafty.e("Boss");
					// boss arrives and starts activity
					boss.setBossTwo().place(100,-100).tween({x: x, y: y}, 2000).doBossActivity(2000);
					bossExplosionAnimTime = boss.explosionAnimTime;
					
					/**********************************************
					second phase : stop shooting and become invincible
					an asteroid wave arrives
					**********************************************/
					handler.delay(function(){ 
						++bossStep;
						// stop shooting
						boss.stopFire = true;
						handler.delay(function(){ 
							// blink and become invincible 
							boss.invincibleBlink(true);
							handler.delay(function(){
								// asteroid wave
								asteroidWave(handler, "Top", 30, 225);
							}, 3000);
						}, 3000);
					}, 14000);
					
					/**********************************************
					third phase : remove invincibility and shoot 
					following a new pattern
					**********************************************/
					handler.delay(function(){ 
						++bossStep;
						// blink and remove invincibility
						boss.invincibleBlink(false);
						// disabled all projectiles
						for(var i = 0; i < boss.projectiles.length; i++) boss.projectiles[i].enabled = false;
						// enable/disable some projectiles over time
						handler.delay(function(){
							boss.stopFire = false;
							boss.projectiles[4].enabled = true;
							boss.projectiles[5].enabled = true;
							boss.projectiles[6].enabled = true;
						}, 2750);
						handler.delay(function(){ 
							boss.projectiles[0].enabled = true;
							boss.projectiles[12].enabled = true;
							boss.projectiles[11].enabled = true;
							handler.delay(function(){ 
								boss.projectiles[12].enabled = false;
								boss.projectiles[11].enabled = false;
							}, 500);
							handler.delay(function(){
								boss.projectiles[10].enabled = (boss.isStandard ? false : true);
								boss.projectiles[13].enabled = (boss.isStandard ? false : true);
								handler.delay(function(){ 
									boss.projectiles[10].enabled = false;
									boss.projectiles[13].enabled = false;
								}, 500);
							}, 2500);
							handler.delay(function(){
								boss.projectiles[12].enabled = true;
								boss.projectiles[11].enabled = true;
								handler.delay(function(){ 
									boss.projectiles[12].enabled = false;
									boss.projectiles[11].enabled = false;
								}, 500);
								handler.delay(function(){
									boss.projectiles[10].enabled = (boss.isStandard ? false : true);
									boss.projectiles[13].enabled = (boss.isStandard ? false : true);
									handler.delay(function(){ 
										boss.projectiles[10].enabled = false;
										boss.projectiles[13].enabled = false;
									}, 500);
								}, 2000);
							},5000);
							handler.delay(function(){
								boss.projectiles[12].enabled = true;
								boss.projectiles[11].enabled = true;
								handler.delay(function(){ 
									boss.projectiles[12].enabled = false;
									boss.projectiles[11].enabled = false;
								}, 500);
								handler.delay(function(){
									boss.projectiles[10].enabled = (boss.isStandard ? false : true);
									boss.projectiles[13].enabled = (boss.isStandard ? false : true);
									handler.delay(function(){ 
										boss.projectiles[10].enabled = false;
										boss.projectiles[13].enabled = false;
									}, 500);
								}, 2000);
							},7500);
							handler.delay(function(){
								boss.projectiles[12].enabled = true;
								boss.projectiles[11].enabled = true;
								handler.delay(function(){ 
									boss.projectiles[12].enabled = false;
									boss.projectiles[11].enabled = false;
								}, 500);
								handler.delay(function(){
									boss.projectiles[10].enabled = (boss.isStandard ? false : true);
									boss.projectiles[13].enabled = (boss.isStandard ? false : true);
									handler.delay(function(){ 
										boss.projectiles[10].enabled = false;
										boss.projectiles[13].enabled = false;
									}, 500);
								}, 2000);
							},10000);
						}, 5000);
						handler.delay(function(){ 
							boss.projectiles[0].enabled = false;
							boss.projectiles[6].enabled = false;
							boss.projectiles[1].enabled = true;
							boss.projectiles[3].enabled = true;
							boss.projectiles[7].enabled = true;
						}, 11000);
						handler.delay(function(){ 
							boss.projectiles[1].enabled = false;
							boss.projectiles[3].enabled = false;
						}, 13000);
						handler.delay(function(){ 
							boss.projectiles[0].enabled = true;
							boss.projectiles[1].enabled = true;
						}, 18000);
					}, 34000);
					
					/**********************************************
					fourth phase : stop shooting and become invincible
					an enemy wave arrives
					**********************************************/
					handler.delay(function(){ 
						++bossStep;
						// stop shooting
						boss.stopFire = true;
						handler.delay(function(){ 
							// blink and become invincible
							boss.invincibleBlink(true);
							
							// enemy wave
							handler.delay(function(){ 
								enemyWave(handler, {
									enemyNumber: 1, enemyType: 6,
									xFrom: -30, yFrom: -10,
									xTo: 110, 	yTo: 80,
									xGap: 0, 	yGap: 0,
									setDrop: "speedUpBonus",
									waveSpeed: 400,
									tweenSpeed: 1000,
									activitySpeed: 1000
								});
							}, 3000);
							
							// enemy wave
							handler.delay(function(){ 
								enemyWave(handler, {
									enemyNumber: 1, enemyType: 6,
									xFrom: Game.width+10, yFrom: -10,
									xTo: 270, 	yTo: 80,
									xGap: 0, 	yGap: 0,
									waveSpeed: 400,
									tweenSpeed: 1000,
									activitySpeed: 1000
								});
							}, 3000);
							
							// enemy wave
							handler.delay(function(){ 
								enemyWave(handler, {
									enemyNumber: 1, enemyType: 9,
									xFrom: 160, yFrom: -100,
									xTo: 160, 	yTo: 50,
									xGap: 0, 	yGap: 0,
									waveSpeed: 0,
									tweenSpeed: 2500,
									activitySpeed: 2500
								});
							}, 3000);
								
							// enemy wave
							handler.delay(function(){ 
								enemyWave(handler, {
									enemyNumber: 1, enemyType: 5,
									xFrom: -30, yFrom: -10,
									xTo: 100, 	yTo: 120,
									xGap: 0, 	yGap: 0,
									waveSpeed: 500,
									tweenSpeed: 1500,
									activitySpeed: 1500
								});
							}, 8000);
								
							// enemy wave
							handler.delay(function(){
								enemyWave(handler, {
									enemyNumber: 1, enemyType: 5,
									xFrom: Game.width+10, yFrom: -10,
									xTo: 300, 	yTo: 120,
									xGap: 0, 	yGap: 0,
									waveSpeed: 500,
									tweenSpeed: 1500,
									activitySpeed: 1500
								});
							}, 8000, 0, function(){
								if(boss.isStandard){
									changeBossStep = true;
								}
							});
							
							// more enemies if hard difficulty
							if(!boss.isStandard){	
							
								// enemy wave
								handler.delay(function(){
									enemyWave(handler, {
										enemyNumber: 1, enemyType: 7,
										xFrom: -50, yFrom: -10,
										xTo: 130, 	yTo: 120,
										xGap: 0, 	yGap: 0,
										waveSpeed: 500,
										tweenSpeed: 1500,
										activitySpeed: 1500
									});
								}, 11000);
								
								// enemy wave
								handler.delay(function(){ 
									enemyWave(handler, {
										enemyNumber: 1, enemyType: 7,
										xFrom: Game.width+10, yFrom: -10,
										xTo: 270, 	yTo: 120,
										xGap: 0, 	yGap: 0,
										waveSpeed: 500,
										tweenSpeed: 1500,
										activitySpeed: 1500
									});
								}, 11000, 0, function(){
									changeBossStep = true;
								});
								
							}	
						}, 3000);
					}, 55000);
					
				} else {
					
					/**********************************************
					fifth phase : remove invincibility and shoot 
					following a new pattern
					**********************************************/
					handler.delay(function(){ 
						var boss = Crafty("Boss");
						// blink and remove invincibility
						boss.invincibleBlink(false);
						// disable all projectiles
						for(var i = 0; i < boss.projectiles.length; i++) boss.projectiles[i].enabled = false;
						// enable/disable some projectiles over time
						handler.delay(function(){
							boss.stopFire = false;
							boss.projectiles[0].enabled = true;
							handler.delay(function(){
								boss.projectiles[8].enabled = true;
								boss.projectiles[9].enabled = true;
							}, 500);
							handler.delay(function(){
								boss.projectiles[8].enabled = false;
								boss.projectiles[9].enabled = false;
								boss.projectiles[12].enabled = true;
								boss.projectiles[13].enabled = true;
							}, 2500);
							handler.delay(function(){
								boss.projectiles[12].enabled = false;
								boss.projectiles[13].enabled = false;
								boss.projectiles[10].enabled = true;
								boss.projectiles[11].enabled = true;
							}, 4500);
							handler.delay(function(){
								boss.projectiles[10].enabled = false;
								boss.projectiles[11].enabled = false;
								boss.projectiles[3].enabled = true;
								handler.delay(function(){
									boss.projectiles[8].enabled = true;
									boss.projectiles[9].enabled = true;
									boss.projectiles[10].enabled = (boss.isStandard ? false : true);
									boss.projectiles[11].enabled = true;
									boss.projectiles[12].enabled = true;
									boss.projectiles[13].enabled = (boss.isStandard ? false : true);
									handler.delay(function(){
										boss.projectiles[8].enabled = false;
										boss.projectiles[9].enabled = false;
										boss.projectiles[10].enabled = false;
										boss.projectiles[11].enabled = false;
										boss.projectiles[12].enabled = false;
										boss.projectiles[13].enabled = false;
									}, 200);
								}, 1500 + (boss.msFireSpeedHandicap * 2), -1);
							}, 6500);
						}, 2750);
					}, 500);
				}
			}, (bossStep == bossFinalStep ? 500 : 7000), 0, function(){
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
			terminateLevel(2, handler, bossExplosionAnimTime);
		}
		
	};
	
});