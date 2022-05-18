/***********************************************
level-5.js
***********************************************/

Crafty.scene('level-5', function() {
	
	// setup the level with title and player creation
	levelSetup(5);
	
	// bricks creation
	Crafty.e("Brick").place(40,110);
	Crafty.e("Brick").place(40,150);
	Crafty.e("Brick").place(70,100);
	Crafty.e("Brick").place(70,160);
	Crafty.e("Brick").place(100,110);
	Crafty.e("Brick").place(100,150);
	Crafty.e("Brick").place(130,100);
	Crafty.e("Brick").place(130,160);
	Crafty.e("Brick").place(160,110);
	Crafty.e("Brick").place(160,150);
	Crafty.e("Brick").place(190,100);
	Crafty.e("Brick").place(190,160);
	Crafty.e("Brick").place(220,110);
	Crafty.e("Brick").place(220,150);
	Crafty.e("Brick").place(250,100);
	Crafty.e("Brick").place(250,160);
	Crafty.e("Brick").place(280,110);
	Crafty.e("Brick").place(280,150);
	
	Crafty.e("Brick").place(40,90);
	Crafty.e("Brick").place(40,170);
	Crafty.e("Brick").place(70,80);
	Crafty.e("Brick").place(70,180);
	Crafty.e("Brick").place(100,90);
	Crafty.e("Brick").place(100,170);
	Crafty.e("Brick").place(130,80);
	Crafty.e("Brick").place(130,180);
	Crafty.e("Brick").place(160,90);
	Crafty.e("Brick").place(160,170);
	Crafty.e("Brick").place(190,80);
	Crafty.e("Brick").place(190,180);
	Crafty.e("Brick").place(220,90);
	Crafty.e("Brick").place(220,170);
	Crafty.e("Brick").place(250,80);
	Crafty.e("Brick").place(250,180);
	Crafty.e("Brick").place(280,90);
	Crafty.e("Brick").place(280,170);
	
	Crafty.e("Brick").place(40,70);
	Crafty.e("Brick").place(40,190);
	Crafty.e("Brick").place(70,60);
	Crafty.e("Brick").place(70,200);
	Crafty.e("Brick").place(100,70);
	Crafty.e("Brick").place(100,190);
	Crafty.e("Brick").place(130,60);
	Crafty.e("Brick").place(130,200);
	Crafty.e("Brick").place(160,70);
	Crafty.e("Brick").place(160,190);
	Crafty.e("Brick").place(190,60);
	Crafty.e("Brick").place(190,200);
	Crafty.e("Brick").place(220,70);
	Crafty.e("Brick").place(220,190);
	Crafty.e("Brick").place(250,60);
	Crafty.e("Brick").place(250,200);
	Crafty.e("Brick").place(280,70);
	Crafty.e("Brick").place(280,190);
	
	Crafty.e("Brick").place(40,50);
	Crafty.e("Brick").place(40,210);
	Crafty.e("Brick").place(70,40);
	Crafty.e("Brick").place(70,220);
	Crafty.e("Brick").place(100,50);
	Crafty.e("Brick").place(100,210);
	Crafty.e("Brick").place(130,40);
	Crafty.e("Brick").place(130,220);
	Crafty.e("Brick").place(160,50);
	Crafty.e("Brick").place(160,210);
	Crafty.e("Brick").place(190,40);
	Crafty.e("Brick").place(190,220);
	Crafty.e("Brick").place(220,50);
	Crafty.e("Brick").place(220,210);
	Crafty.e("Brick").place(250,40);
	Crafty.e("Brick").place(250,220);
	Crafty.e("Brick").place(280,50);
	Crafty.e("Brick").place(280,210);
	
	// assign random drops to the bricks
	// available drops : Fire_Ball, Fast_Ball, Slow_Ball, New_Ball, Sticky_Bar, Small_Bar, Large_Bar, Reverse_Bar, Laser_Bar
	assignRandomDrops(['Fire_Ball','Large_Bar','New_Ball','New_Ball','New_Ball']);
	
	// something happens at the end of level
	Crafty('Player').bind('nextLevel', function(){
		
		// prevent regular end of level
		Crafty('Player').levelDone = false;
		Crafty('Player').unbind('nextLevel');
		
		// play music
		if(!iOS){
			Crafty.audio.stop('main');
			Crafty.audio.play('boss',-1);
		}
		
		// enemies are created
		var firstEnemy = Crafty.e('Enemy');
		var secondEnemy = Crafty.e('Enemy');
		var thirdEnemy = Crafty.e('Enemy');
		
		// they come from above
		var startActivityTime = 1500;
		firstEnemy.place(Game.width/4 - firstEnemy.w/2, -40).tween({x: firstEnemy.x, y: 40}, startActivityTime);
		secondEnemy.place(Game.width/2 - secondEnemy.w/2, -40).tween({x: secondEnemy.x, y: 40}, startActivityTime);
		thirdEnemy.place(Game.width*0.75 - thirdEnemy.w/2, -40).tween({x: thirdEnemy.x, y: 40}, startActivityTime);
		
		// they start moving and shooting continuously
		firstEnemy.doActivity(startActivityTime);
		secondEnemy.doActivity(startActivityTime);
		thirdEnemy.doActivity(startActivityTime);
		
	});
	
});