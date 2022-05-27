/***********************************************
level-10.js
***********************************************/

Crafty.scene('level-10', function() {
	
	// setup the level with title and player creation
	levelSetup(10);
	
	// bricks creation
	Crafty.e("Brick").place(40,110);
	Crafty.e("Brick").place(40,130);
	Crafty.e("Brick").place(40,150);
	Crafty.e("Brick").place(40,170);
	Crafty.e("Brick").place(40,190);
	Crafty.e("Brick").place(40,210);
	Crafty.e("Brick").place(40,230);
	
	Crafty.e("Brick").place(80,130);
	Crafty.e("Brick").place(80,150);
	Crafty.e("Brick").place(80,170);
	Crafty.e("Brick").place(80,190);
	Crafty.e("Brick").place(80,210);
	Crafty.e("Brick").place(80,230);
	
	Crafty.e("Brick").place(120,150);
	Crafty.e("Brick").place(120,170);
	Crafty.e("Brick").place(120,190);
	Crafty.e("Brick").place(120,210);
	Crafty.e("Brick").place(120,230);
	
	Crafty.e("Brick").place(160,170);
	Crafty.e("Brick").place(160,190);
	Crafty.e("Brick").place(160,210);
	Crafty.e("Brick").place(160,230);
	
	Crafty.e("Brick").place(200,190);
	Crafty.e("Brick").place(200,210);
	Crafty.e("Brick").place(200,230);
	
	Crafty.e("Brick").place(240,210);
	Crafty.e("Brick").place(240,230);
	
	Crafty.e("Brick").place(280,230);
	
	Crafty.e("Brick").place(40,60);
	
	Crafty.e("Brick").place(80,60);
	Crafty.e("Brick").place(80,80);
	
	Crafty.e("Brick").place(120,60);
	Crafty.e("Brick").place(120,80);
	Crafty.e("Brick").place(120,100);
	
	Crafty.e("Brick").place(160,60);
	Crafty.e("Brick").place(160,80);
	Crafty.e("Brick").place(160,100);
	Crafty.e("Brick").place(160,120);
	
	Crafty.e("Brick").place(200,60);
	Crafty.e("Brick").place(200,80);
	Crafty.e("Brick").place(200,100);
	Crafty.e("Brick").place(200,120);
	Crafty.e("Brick").place(200,140);
	
	Crafty.e("Brick").place(240,60);
	Crafty.e("Brick").place(240,80);
	Crafty.e("Brick").place(240,100);
	Crafty.e("Brick").place(240,120);
	Crafty.e("Brick").place(240,140);
	Crafty.e("Brick").place(240,160);
	
	Crafty.e("Brick").place(280,60);
	Crafty.e("Brick").place(280,80);
	Crafty.e("Brick").place(280,100);
	Crafty.e("Brick").place(280,120);
	Crafty.e("Brick").place(280,140);
	Crafty.e("Brick").place(280,160);
	Crafty.e("Brick").place(280,180);
	
	// assign random drops to the bricks
	// available drops : Fire_Ball, Fast_Ball, Slow_Ball, New_Ball, Sticky_Bar, Small_Bar, Large_Bar, Reverse_Bar, Laser_Bar
	assignRandomDrops(['Fire_Ball','Large_Bar','New_Ball','New_Ball','New_Ball']);
	
	// something happens at the end of level
	Crafty('Player').bind('nextLevel', function(){
		
		// prevent regular end of level
		Crafty('Player').levelDone = false;
		Crafty('Player').unbind('nextLevel');
		Crafty('Player').lastLevel = true;
		
		// play music
		if(!iOS){
			Crafty.audio.stop('main');
			Crafty.audio.play('boss',-1);
		}
		
		// enemies are created
		var firstEnemy = Crafty.e('Enemy').place(-100, 70);
		var secondEnemy = Crafty.e('Enemy').place(-50, 120);
		var thirdEnemy = Crafty.e('Enemy').place(Game.width+120, 70);
		var fourthEnemy = Crafty.e('Enemy').place(Game.width+70, 120);
		
		// they come from the side, moving and shooting continuously
		var startActivityTime = 1500;
		firstEnemy.tween({x: 50, y: firstEnemy.y}, startActivityTime).doActivity(startActivityTime);
		thirdEnemy.tween({x: Game.width-50 - thirdEnemy.w, y: thirdEnemy.y}, startActivityTime).doActivity(startActivityTime);
		secondEnemy.delay(function(){
			this.tween({x: 100, y: this.y}, startActivityTime).doActivity(startActivityTime);
		}, 1000);
		fourthEnemy.delay(function(){
			this.tween({x: Game.width-100 - fourthEnemy.w, y: this.y}, startActivityTime).doActivity(startActivityTime);
		}, 1000);
		
		// random drop assignment
		var enemies = Crafty('Enemy').get();
		var enemy = Crafty.math.randomElementOfArray(enemies);
		enemy.setDrop('New_Ball');
		enemies.splice(enemies.indexOf(enemy),1);
		Crafty.math.randomElementOfArray(enemies).setDrop('Laser_Bar');
		
		// an enemy boss arrives
		var fifthEnemy = Crafty.e('Enemy').setBoss();
		fifthEnemy.place(Game.width/2 - fifthEnemy.w/2, -150);
		fifthEnemy.delay(function(){
			this.tween({x: this.x, y: 40}, startActivityTime*2).doActivity(startActivityTime*2);
		}, 1500);
		
	});
	
});