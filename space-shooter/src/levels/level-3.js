/***********************************************
level-3.js : third level, launched after the second level
***********************************************/

// third level
Crafty.scene("level-3", function() {
	
	// level introduction scene with the electric gate
	function levelIntroduction(){
		// create an empty jewelContainer
		var jewelContainer = Crafty.e("JewelContainer");
		jewelContainer.setJewelContainer(1);
		
		// create the two boss jewels and place them in the container
		Crafty.e("Jewel").setJewel(1).place(170,210);
		Crafty.e("Jewel").setJewel(2).place(214,210);
		
		// create and move the electricFence from above
		var electricFence = Crafty.e("ElectricFence").attr({y: -150, autoMoving: false}).tween({x: 0, y: 0}, 2000);
		
		// destroy the jewelContainer and move the jewels to the fence
		handler.delay(function(){
			jewelContainer.destroy();
			var x = 119; var y = 31;
			Crafty("Jewel").each(function(){
				this.tween({x: x, y: y},1500);
				x = 265;
			});
		},3000);
		
		// open and move the fence towards player
		handler.delay(function(){
			// blink to open
			handler.delay(function(){ electricFence.open("middle"); },200);
			handler.delay(function(){ electricFence.close(); },400);
			handler.delay(function(){ electricFence.open("middle"); },600);
			handler.delay(function(){ electricFence.close(); },800);
			handler.delay(function(){ electricFence.open("middle"); },1000);
			// move the fence and the jewels
			handler.delay(function(){
				electricFence.tween({x: electricFence.x, y: Game.height},3000);
				Crafty("Jewel").each(function(){
					this.tween({x: this.x, y: Game.height+30},3000);
					x = 265;
				});
			},1750);
			// destroy the fence and the jewels
			handler.delay(function(){
				electricFence.destroy();
				Crafty("Jewel").each(function(){
					this.destroy();
				});
			},5000);
		},5000);
	}
	
	// handler : will handle all the actions
	var handler = Crafty.e("Delay");
	
	// start the introduction
	levelIntroduction();
	
	// after introduction, start the content
	handler.delay(function(){
		
		// show LEVEL 3 message
		// title creation
		var title = Crafty.e("CustomText").setTitle().text("LEVEL&nbsp;&nbsp;3");
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
		
		// launch step : where all the enemies, asteroids, bonuses... are created for the level
		// for each step, different things happen
		var launchStep = function(step){
			// stay at the desired step
			nextStep = false;
			
			if(step == 1){
				
				/**************
					STEP 1
				**************/
				
				// electric fence wave
				handler.delay(function(){ 
					electricFenceWave(handler, ['random','random','random'], 2500);
				}, 2000);
				
			}
			
			if(step == 2){
				
				/**************
					STEP 2
				**************/
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 3, enemyType: 10,
						xFrom: -30, yFrom: -10,
						xTo: 200, 	yTo: 100,
						xGap: -40,	yGap: -20,
						waveSpeed: 400,
						tweenSpeed: 1500,
						activitySpeed: 1500
					});
				}, 6500);
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 3, enemyType: 10,
						xFrom: Game.width+10, yFrom: -10,
						xTo: 200, 	yTo: 100,
						xGap: 40,	yGap: -20,
						waveSpeed: 400,
						tweenSpeed: 1500,
						activitySpeed: 1500,
						changeStep: true
					});
				}, 6500);
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 1, enemyType: 12,
						xFrom: 180, yFrom: -50,
						xTo: 180, 	yTo: 75,
						xGap: 0,	yGap: 0,
						waveSpeed: 0,
						tweenSpeed: 2500,
						activitySpeed: 2500
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
						enemyNumber: 2, enemyType: 11,
						xFrom: Game.width+10, yFrom: -10,
						xTo: 200, 	yTo: 100,
						xGap: 40,	yGap: -20,
						ySpecialGap: true,
						waveSpeed: 400,
						tweenSpeed: 1000,
						activitySpeed: 1000
					});
				}, 1500);
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 2, enemyType: 11,
						xFrom: -30, yFrom: -10,
						xTo: 200, 	yTo: 100,
						xGap: -40,	yGap: -20,
						ySpecialGap: true,
						waveSpeed: 400,
						tweenSpeed: 1000,
						activitySpeed: 1000
					});
				}, 3000);
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 3, enemyType: 10,
						xFrom: -30, yFrom: -10,
						xTo: 200, 	yTo: 100,
						xGap: -40,	yGap: -20,
						waveSpeed: 400,
						tweenSpeed: 1500,
						activitySpeed: 1500
					});
				}, 4500);
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 3, enemyType: 10,
						xFrom: Game.width+10, yFrom: -10,
						xTo: 200, 	yTo: 100,
						xGap: 40,	yGap: -20,
						waveSpeed: 400,
						tweenSpeed: 1500,
						activitySpeed: 1500,
						changeStep: true
					});
				}, 4500);
				
			}
			
			if(step == 4){
				
				/**************
					STEP 4
				**************/
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 2, enemyType: 11,
						xFrom: -30, yFrom: 300,
						xTo: 350, 	yTo: 50,
						xGap: -40,	yGap: -20,
						waveSpeed: 400,
						tweenSpeed: 2500,
						activitySpeed: 1000
					});
				}, 500);
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 2, enemyType: 11,
						xFrom: Game.width+10, yFrom: 300,
						xTo: 50, 	yTo: 50,
						xGap: 40,	yGap: -20,
						waveSpeed: 400,
						tweenSpeed: 2500,
						activitySpeed: 1000
					});
				}, 1500);
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 2, enemyType: 10,
						xFrom: -30, yFrom: -10,
						xTo: 200, 	yTo: 100,
						xGap: -40,	yGap: -20,
						waveSpeed: 400,
						tweenSpeed: 1500,
						activitySpeed: 1500
					});
				}, 1000);
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 2, enemyType: 10,
						xFrom: Game.width+10, yFrom: -10,
						xTo: 200, 	yTo: 100,
						xGap: 40,	yGap: -20,
						waveSpeed: 400,
						tweenSpeed: 1500,
						activitySpeed: 1500
					});
				}, 1000);
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 1, enemyType: 12,
						xFrom: 180, yFrom: -50,
						xTo: 180, 	yTo: 150,
						xGap: 0,	yGap: 0,
						setDrop: "speedUpBonus",
						waveSpeed: 0,
						tweenSpeed: 2500,
						activitySpeed: 2500,
						changeStep: true
					});
				}, 1000);
				
			}
			
			if(step == 5){
				
				/**************
					STEP 5
				**************/
				
				// electric fence wave
				handler.delay(function(){ 
					electricFenceWave(handler, ['right','middle','left','middle'], 1500);
				}, 2000);
				
			}
			
			if(step == 6){
				
				/**************
					STEP 6
				**************/
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 1, enemyType: 12,
						xFrom: 50, yFrom: -50,
						xTo: 50, 	yTo: 50,
						xGap: 0,	yGap: 0,
						waveSpeed: 0,
						tweenSpeed: 1000,
						activitySpeed: 1000
					});
				}, 4000);
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 1, enemyType: 12,
						xFrom: Game.width-100, yFrom: -50,
						xTo: Game.width-100, 	yTo: 50,
						xGap: 0,	yGap: 0,
						waveSpeed: 0,
						tweenSpeed: 1000,
						activitySpeed: 1000
					});
				}, 4500);
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 1, enemyType: 12,
						xFrom: 180, yFrom: -50,
						xTo: 180, 	yTo: 50,
						xGap: 0,	yGap: 0,
						setDrop: "upgradeProjectileBonus",
						waveSpeed: 0,
						tweenSpeed: 1000,
						activitySpeed: 1000,
						changeStep: true
					});
				}, 5000);
				
			}
			
			if(step == 7){
				
				/**************
					STEP 7
				**************/
			
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 3, enemyType: 10,
						xFrom: -30, yFrom: -10,
						xTo: 200, 	yTo: 100,
						xGap: -40,	yGap: -20,
						waveSpeed: 400,
						tweenSpeed: 1500,
						activitySpeed: 1500
					});
				}, 2000);
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 3, enemyType: 10,
						xFrom: Game.width+10, yFrom: -10,
						xTo: 200, 	yTo: 100,
						xGap: 40,	yGap: -20,
						waveSpeed: 400,
						tweenSpeed: 1500,
						activitySpeed: 1500
					});
				}, 2000);
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 2, enemyType: 11,
						xFrom: -30, yFrom: 300,
						xTo: 350, 	yTo: 50,
						xGap: -40,	yGap: -20,
						waveSpeed: 400,
						tweenSpeed: 2500,
						activitySpeed: 1000
					});
				}, 3500);
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 2, enemyType: 11,
						xFrom: Game.width+10, yFrom: 300,
						xTo: 50, 	yTo: 50,
						xGap: 40,	yGap: -20,
						waveSpeed: 400,
						tweenSpeed: 2500,
						activitySpeed: 1000
					});
				}, 3500);
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 3, enemyType: 11,
						xFrom: -30, yFrom: -10,
						xTo: 150, 	yTo: 100,
						xGap: -40,	yGap: -20,
						waveSpeed: 400,
						tweenSpeed: 1500,
						activitySpeed: 1000
					});
				}, 5000);
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 3, enemyType: 11,
						xFrom: Game.width+10, yFrom: -10,
						xTo: 150, 	yTo: 100,
						xGap: 40,	yGap: -20,
						waveSpeed: 400,
						tweenSpeed: 1500,
						activitySpeed: 1000,
						changeStep: true
					});
				}, 5000);
				
			}
			
			if(step == 8){
				
				/**************
					STEP 8
				**************/
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 1, enemyType: 13,
						xFrom: 165, yFrom: -100,
						xTo: 165, 	yTo: 50,
						xGap: 0,	yGap: 0,
						waveSpeed: 0,
						tweenSpeed: 2500,
						activitySpeed: 2500,
						changeStep: true
					});
				}, 2000);
				
			}
			
			if(step == 9){
				
				/**************
					STEP 9
				**************/
			
				// electric fence wave
				handler.delay(function(){ 
					electricFenceWave(handler, ['middle','middle','middle','left','left','left','middle','middle','middle'], 1000);
				}, 3500);
			
			}
			
			if(step == 10){
				
				/**************
					STEP 10
				**************/
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 5, enemyType: 10,
						xFrom: -30, yFrom: 300,
						xTo: 200, 	yTo: 75,
						xGap: 30,	yGap: -20,
						ySpecialGap: true,
						waveSpeed: 400,
						tweenSpeed: 2000,
						activitySpeed: 2000
					});
				}, 4000);
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 5, enemyType: 10,
						xFrom: Game.width+30, yFrom: 300,
						xTo: 170, 	yTo: 75,
						xGap: -30,	yGap: -20,
						ySpecialGap: true,
						waveSpeed: 400,
						tweenSpeed: 2000,
						activitySpeed: 2000
					});
				}, 4500);
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 5, enemyType: 10,
						xFrom: -30, yFrom: -30,
						xTo: 200, 	yTo: 200,
						xGap: 30,	yGap: 20,
						ySpecialGap: true,
						waveSpeed: 400,
						tweenSpeed: 2000,
						activitySpeed: 2000
					});
				}, 5000);
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 5, enemyType: 10,
						xFrom: Game.width+30, yFrom: -30,
						xTo: 170, 	yTo: 200,
						xGap: -30,	yGap: 20,
						ySpecialGap: true,
						waveSpeed: 400,
						tweenSpeed: 2000,
						activitySpeed: 2000,
						changeStep: true
					});
				}, 5500);
				
			}
			
			if(step == 11){
				
				/**************
					STEP 11
				**************/
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 1, enemyType: 13,
						xFrom: 165, yFrom: -100,
						xTo: 165, 	yTo: 100,
						xGap: 0,	yGap: 0,
						setDrop: "speedUpBonus",
						waveSpeed: 0,
						tweenSpeed: 2500,
						activitySpeed: 2500
					});
				}, 1000);
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 1, enemyType: 11,
						xFrom: Game.width+10, yFrom: -10,
						xTo: 150, 	yTo: 50,
						xGap: 30,	yGap: -20,
						ySpecialGap: true,
						waveSpeed: 400,
						tweenSpeed: 2000,
						activitySpeed: 2000
					});
				}, 3000);
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 1, enemyType: 11,
						xFrom: -30, yFrom: -10,
						xTo: 250, 	yTo: 50,
						xGap: -30,	yGap: -20,
						ySpecialGap: true,
						waveSpeed: 400,
						tweenSpeed: 2000,
						activitySpeed: 2000
					});
				}, 3000);
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 1, enemyType: 11,
						xFrom: -30, yFrom: 300,
						xTo: 350, 	yTo: 50,
						xGap: -40,	yGap: -20,
						waveSpeed: 400,
						tweenSpeed: 2500,
						activitySpeed: 1000
					});
				}, 6000);
				
				// enemy wave
				handler.delay(function(){ 
					enemyWave(handler, {
						enemyNumber: 1, enemyType: 11,
						xFrom: Game.width+10, yFrom: 300,
						xTo: 50, 	yTo: 50,
						xGap: 40,	yGap: -20,
						waveSpeed: 400,
						tweenSpeed: 2500,
						activitySpeed: 1000,
						changeStep: true
					});
				}, 6000);
				
			}
			
			if(step == 12){
				
				/**************
					STEP 12
				**************/
				
				// stop main audio
				// play boss audio instead
				handler.delay(function(){
					Game.audio.fadeOut(Game.audio.main, function(){
						Crafty.audio.stop("main");
						Game.audio.boss = Crafty.audio.play("boss", -1);
					});
				},2000);
				
				// boss
				handler.delay(function(){
						
					/**********************************************
					boss arrives and shoots projectiles
					following multiple patterns
					**********************************************/
					// arrival position
					var x = 50; var y = 20;
					// boss creation
					var boss = Crafty.e("Boss");
					// boss arrives and starts activity
					boss.setBossThree().place(50,-150).tween({x: x, y: y}, 3500).doBossActivity(3500);
					bossExplosionAnimTime = boss.explosionAnimTime;
					
					// first shooting pattern
					boss.projectiles[0].enabled = true;
					boss.projectiles[1].enabled = true;
					boss.projectiles[4].enabled = true;
					boss.projectiles[12].enabled = true;
					boss.projectiles[13].enabled = true;
					boss.projectiles[14].enabled = true;
					
					// second shooting pattern
					handler.delay(function(){
						boss.projectiles[0].enabled = false;
						boss.projectiles[1].enabled = false;
						boss.projectiles[12].enabled = false;
						boss.projectiles[13].enabled = false;
						boss.projectiles[14].enabled = false;
						handler.delay(function(){
							boss.projectiles[2].enabled = true;
							boss.projectiles[3].enabled = true;
							boss.projectiles[4].enabled = true;
							handler.delay(function(){
								boss.projectiles[28].enabled = true;
								boss.projectiles[29].enabled = true;
								boss.projectiles[30].enabled = true;
								boss.projectiles[31].enabled = true;
								boss.projectiles[32].enabled = true;
								boss.projectiles[33].enabled = true;
								boss.projectiles[34].enabled = true;
								boss.projectiles[35].enabled = true;
								boss.projectiles[36].enabled = true;
								boss.projectiles[37].enabled = true;
								boss.projectiles[38].enabled = true;
								boss.projectiles[39].enabled = true;
								boss.projectiles[40].enabled = true;
								boss.projectiles[41].enabled = true;
								boss.projectiles[42].enabled = true;
								boss.projectiles[43].enabled = true;
								boss.projectiles[44].enabled = true;
								boss.projectiles[45].enabled = true;
								boss.projectiles[46].enabled = true;
								handler.delay(function(){
									boss.projectiles[24].enabled = true;
									boss.projectiles[25].enabled = true;
									handler.delay(function(){
										boss.projectiles[24].enabled = false;
										boss.projectiles[25].enabled = false;
										boss.projectiles[26].enabled = true;
										boss.projectiles[27].enabled = true;
										boss.projectiles[36].enabled = false;			
										boss.projectiles[37].enabled = false;
										boss.projectiles[38].enabled = false;
										boss.projectiles[39].enabled = false;
										handler.delay(function(){
											boss.projectiles[36].enabled = true;
											boss.projectiles[37].enabled = true;
											boss.projectiles[38].enabled = true;
											boss.projectiles[39].enabled = true;		
											boss.projectiles[41].enabled = false;
											boss.projectiles[42].enabled = false;
											boss.projectiles[43].enabled = false;
											boss.projectiles[44].enabled = false;
											handler.delay(function(){
												boss.projectiles[41].enabled = true;
												boss.projectiles[42].enabled = true;
												boss.projectiles[43].enabled = true;
												boss.projectiles[44].enabled = true;
												boss.projectiles[30].enabled = false;
												boss.projectiles[31].enabled = false;
												boss.projectiles[32].enabled = false;
												boss.projectiles[33].enabled = false;
												handler.delay(function(){
													boss.projectiles[30].enabled = true;
													boss.projectiles[31].enabled = true;
													boss.projectiles[32].enabled = true;
													boss.projectiles[33].enabled = true;
													boss.projectiles[36].enabled = false;
													boss.projectiles[37].enabled = false;
													boss.projectiles[38].enabled = false;
													boss.projectiles[39].enabled = false;
													handler.delay(function(){
														for(var i = 0; i < boss.projectiles.length; i++){
															boss.projectiles[i].enabled = false;
														}
													},1000);
												},2000);
											},2000);
										},2000);
									},16000);
								},3000);
							},3000);
						},2000);
					},15000);
					
					// third shooting pattern
					handler.delay(function(){
						handler.delay(function(){
							boss.projectiles[15].enabled = true;
							boss.projectiles[16].enabled = true;
							boss.projectiles[17].enabled = true;
							handler.delay(function(){
								boss.projectiles[15].enabled = false;
								boss.projectiles[16].enabled = false;
								boss.projectiles[17].enabled = false;
							},12000);
						},1000);	
						handler.delay(function(){
							boss.projectiles[18].enabled = true;
							boss.projectiles[19].enabled = true;
							boss.projectiles[20].enabled = true;
							handler.delay(function(){
								boss.projectiles[18].enabled = false;
								boss.projectiles[19].enabled = false;
								boss.projectiles[20].enabled = false;
							},10000);
						},4000);
						handler.delay(function(){
							boss.projectiles[0].enabled = true;
							boss.projectiles[1].enabled = true;
							boss.projectiles[4].enabled = true;
							handler.delay(function(){
								boss.projectiles[21].enabled = true;
								boss.projectiles[22].enabled = true;
								boss.projectiles[23].enabled = true;
								handler.delay(function(){
									boss.projectiles[21].enabled = false;
									boss.projectiles[22].enabled = false;
									boss.projectiles[23].enabled = false;
								},5000);
								handler.delay(function(){
									boss.projectiles[0].enabled = false;
									boss.projectiles[1].enabled = false;
									boss.projectiles[4].enabled = false;
									boss.projectiles[26].enabled = true;
									boss.projectiles[27].enabled = true;
									boss.projectiles[28].enabled = true;
									boss.projectiles[29].enabled = true;
									boss.projectiles[30].enabled = true;
									boss.projectiles[31].enabled = true;
									boss.projectiles[32].enabled = true;
									boss.projectiles[33].enabled = true;
									boss.projectiles[34].enabled = true;
									boss.projectiles[35].enabled = true;
									boss.projectiles[40].enabled = true;
									boss.projectiles[41].enabled = true;
									boss.projectiles[42].enabled = true;
									boss.projectiles[43].enabled = true;
									boss.projectiles[44].enabled = true;
									boss.projectiles[45].enabled = true;
									boss.projectiles[46].enabled = true;
									handler.delay(function(){
										boss.projectiles[36].enabled = true;
										boss.projectiles[37].enabled = true;
										boss.projectiles[38].enabled = true;
										boss.projectiles[39].enabled = true;		
										boss.projectiles[41].enabled = false;
										boss.projectiles[42].enabled = false;
										boss.projectiles[43].enabled = false;
										boss.projectiles[44].enabled = false;
										handler.delay(function(){
											boss.projectiles[41].enabled = true;
											boss.projectiles[42].enabled = true;
											boss.projectiles[43].enabled = true;
											boss.projectiles[44].enabled = true;
											boss.projectiles[30].enabled = false;
											boss.projectiles[31].enabled = false;
											boss.projectiles[32].enabled = false;
											boss.projectiles[33].enabled = false;
											handler.delay(function(){
												boss.projectiles[30].enabled = true;
												boss.projectiles[31].enabled = true;
												boss.projectiles[32].enabled = true;
												boss.projectiles[33].enabled = true;
												boss.projectiles[36].enabled = false;
												boss.projectiles[37].enabled = false;
												boss.projectiles[38].enabled = false;
												boss.projectiles[39].enabled = false;
												handler.delay(function(){
													for(var i = 0; i < boss.projectiles.length; i++){
														boss.projectiles[i].enabled = false;
													}
												},1000);
											},2000);
										},2000);
									},2000);
								},5000);
							},12000);
						},5500);
					},50000);	
					
					// fourth shooting pattern
					handler.delay(function(){
						boss.projectiles[0].enabled = true;
						boss.projectiles[1].enabled = true;
						boss.projectiles[4].enabled = true;
						handler.delay(function(){
							boss.projectiles[24].enabled = true;
							boss.projectiles[25].enabled = true;
							handler.delay(function(){
								boss.projectiles[2].enabled = true;
								boss.projectiles[3].enabled = true;
								handler.delay(function(){
									boss.projectiles[12].enabled = true;
									boss.projectiles[13].enabled = true;
									boss.projectiles[14].enabled = true;
									handler.delay(function(){
										boss.projectiles[12].enabled = false;
										boss.projectiles[13].enabled = false;
										boss.projectiles[14].enabled = false;
										boss.projectiles[21].enabled = true;
										boss.projectiles[22].enabled = true;
										boss.projectiles[23].enabled = true;
										handler.delay(function(){
											boss.projectiles[21].enabled = false;
											boss.projectiles[22].enabled = false;
											boss.projectiles[23].enabled = false;
										},1000);
										handler.delay(function(){
											boss.projectiles[15].enabled = true;
											boss.projectiles[16].enabled = true;
											boss.projectiles[17].enabled = true;
											handler.delay(function(){
												boss.projectiles[15].enabled = false;
												boss.projectiles[16].enabled = false;
												boss.projectiles[17].enabled = false;
											},1000);
										},2000);
										handler.delay(function(){
											boss.projectiles[18].enabled = true;
											boss.projectiles[19].enabled = true;
											boss.projectiles[20].enabled = true;
											handler.delay(function(){
												boss.projectiles[18].enabled = false;
												boss.projectiles[19].enabled = false;
												boss.projectiles[20].enabled = false;
											},1000);
										},3500);
										handler.delay(function(){
											for(var i = 0; i < boss.projectiles.length; i++){
												boss.projectiles[i].enabled = false;
											}
											boss.projectiles[2].enabled = true;
											boss.projectiles[3].enabled = true;
										},4500);
									},5000);
								},5000);
							},5000);
						},3000);
					},81000);
					
					// fifth shooting pattern
					handler.delay(function(){
						boss.projectiles[0].enabled = true;
						boss.projectiles[1].enabled = true;
						boss.projectiles[4].enabled = true;
						boss.projectiles[12].enabled = true;
						boss.projectiles[13].enabled = true;
						boss.projectiles[14].enabled = true;
					},109000);
						
				}, 7000, 0, function(){
					nextStep = true;
				});
				
			}
			
			if(step == 13){
			
				/**************
					STEP 13
				**************/
				
				// stop boss audio
				// play main audio instead
				Game.audio.fadeOut(Game.audio.boss, function(){
					Crafty.audio.stop("boss");
					Game.audio.main = Crafty.audio.play("main", -1, 0.7);
				});
				
				// end level
				terminateLevel(3, handler, bossExplosionAnimTime);
			}
			
		};
		
	},9500);
	
});