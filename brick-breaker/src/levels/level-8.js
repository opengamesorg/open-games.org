/***********************************************
level-8.js
***********************************************/

Crafty.scene('level-8', function() {
	
	// setup the level with title and player creation
	levelSetup(8);
	
	// bricks creation
	Crafty.e("Brick").place(80,200).size(Game.width-160,10).setUnbreakable();
	Crafty.e("Brick").place(80,240).size(Game.width-160,10).setUnbreakable();
	
	Crafty.e("Brick").place(140,220);
	Crafty.e("Brick").place(180,220);
	
	Crafty.e("Brick").place(80,180);
	Crafty.e("Brick").place(80,160);
	Crafty.e("Brick").place(80,140);
	Crafty.e("Brick").place(80,120);
	Crafty.e("Brick").place(80,100);
	Crafty.e("Brick").place(80,80);
	Crafty.e("Brick").place(80,60);
	Crafty.e("Brick").place(80,40);
	
	Crafty.e("Brick").place(120,180);
	Crafty.e("Brick").place(120,160);
	Crafty.e("Brick").place(120,140);
	Crafty.e("Brick").place(120,120);
	Crafty.e("Brick").place(120,100);
	Crafty.e("Brick").place(120,80);
	Crafty.e("Brick").place(120,60);
	Crafty.e("Brick").place(120,40);
	
	Crafty.e("Brick").place(160,180);
	Crafty.e("Brick").place(160,160);
	Crafty.e("Brick").place(160,140);
	Crafty.e("Brick").place(160,120);
	Crafty.e("Brick").place(160,100);
	Crafty.e("Brick").place(160,80);
	Crafty.e("Brick").place(160,60);
	Crafty.e("Brick").place(160,40);

	Crafty.e("Brick").place(200,180);
	Crafty.e("Brick").place(200,160);
	Crafty.e("Brick").place(200,140);
	Crafty.e("Brick").place(200,120);
	Crafty.e("Brick").place(200,100);
	Crafty.e("Brick").place(200,80);
	Crafty.e("Brick").place(200,60);
	Crafty.e("Brick").place(200,40);
	
	Crafty.e("Brick").place(240,180);
	Crafty.e("Brick").place(240,160);
	Crafty.e("Brick").place(240,140);
	Crafty.e("Brick").place(240,120);
	Crafty.e("Brick").place(240,100);
	Crafty.e("Brick").place(240,80);
	Crafty.e("Brick").place(240,60);
	Crafty.e("Brick").place(240,40);
	
	// assign random drops to the bricks
	// available drops : Fire_Ball, Fast_Ball, Slow_Ball, New_Ball, Sticky_Bar, Small_Bar, Large_Bar, Reverse_Bar, Laser_Bar
	assignRandomDrops(['Reverse_Bar','Fire_Ball','New_Ball','New_Ball','New_Ball']);
	
});