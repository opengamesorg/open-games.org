/***********************************************
level-2.js
***********************************************/

Crafty.scene('level-2', function() {
	
	// setup the level with title and player creation
	levelSetup(2);
	
	// bricks creation
	Crafty.e("Brick").place(35,50);
	Crafty.e("Brick").place(35,80);
	Crafty.e("Brick").place(35,110);
	Crafty.e("Brick").place(35,140);
	Crafty.e("Brick").place(35,170);
	
	Crafty.e("Brick").place(85,50);
	Crafty.e("Brick").place(85,80);
	Crafty.e("Brick").place(85,110);
	Crafty.e("Brick").place(85,140);
	Crafty.e("Brick").place(85,170);
	
	Crafty.e("Brick").place(135,50);
	Crafty.e("Brick").place(135,80);
	Crafty.e("Brick").place(135,110);
	Crafty.e("Brick").place(135,140);
	Crafty.e("Brick").place(135,170);
	
	Crafty.e("Brick").place(185,50);
	Crafty.e("Brick").place(185,80);
	Crafty.e("Brick").place(185,110);
	Crafty.e("Brick").place(185,140);
	Crafty.e("Brick").place(185,170);
	
	Crafty.e("Brick").place(235,50);
	Crafty.e("Brick").place(235,80);
	Crafty.e("Brick").place(235,110);
	Crafty.e("Brick").place(235,140);
	Crafty.e("Brick").place(235,170);
	
	Crafty.e("Brick").place(285,50);
	Crafty.e("Brick").place(285,80);
	Crafty.e("Brick").place(285,110);
	Crafty.e("Brick").place(285,140);
	Crafty.e("Brick").place(285,170);
	
	// assign random drops to the bricks
	// available drops : Fire_Ball, Fast_Ball, Slow_Ball, New_Ball, Sticky_Bar, Small_Bar, Large_Bar, Reverse_Bar, Laser_Bar
	assignRandomDrops(['Fire_Ball','Slow_Ball','Small_Bar','New_Ball','New_Ball']);
	
});