/***********************************************
level-1.js : first level, launched after the menu
***********************************************/

Crafty.scene('level-1', function() {
	
	// setup the level with title and player creation
	levelSetup(1);
	
	// bricks creation
	Crafty.e("Brick").place(50,50);
	Crafty.e("Brick").place(50,80);
	Crafty.e("Brick").place(50,110);
	Crafty.e("Brick").place(50,140);
	Crafty.e("Brick").place(50,170);
	Crafty.e("Brick").place(50,200);
	
	Crafty.e("Brick").place(100,50);
	Crafty.e("Brick").place(100,80);
	Crafty.e("Brick").place(100,110);
	Crafty.e("Brick").place(100,140);
	Crafty.e("Brick").place(100,170);
	Crafty.e("Brick").place(100,200);
	
	Crafty.e("Brick").place(Game.width-130,50);
	Crafty.e("Brick").place(Game.width-130,80);
	Crafty.e("Brick").place(Game.width-130,110);
	Crafty.e("Brick").place(Game.width-130,140);
	Crafty.e("Brick").place(Game.width-130,170);
	Crafty.e("Brick").place(Game.width-130,200);
	
	Crafty.e("Brick").place(Game.width-80,50);
	Crafty.e("Brick").place(Game.width-80,80);
	Crafty.e("Brick").place(Game.width-80,110);
	Crafty.e("Brick").place(Game.width-80,140);
	Crafty.e("Brick").place(Game.width-80,170);
	Crafty.e("Brick").place(Game.width-80,200);
	
	// assign random drops to the bricks
	// available drops : Fire_Ball, Fast_Ball, Slow_Ball, New_Ball, Sticky_Bar, Small_Bar, Large_Bar, Reverse_Bar, Laser_Bar
	assignRandomDrops(['Fire_Ball','Large_Bar','New_Ball','New_Ball']);
	
});