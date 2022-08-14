/***********************************************
level-3.js
***********************************************/

Crafty.scene('level-3', function() {
	
	// setup the level with title and player creation
	levelSetup(3);
	
	// bricks creation
	Crafty.e("Brick").place(160,270).setUnbreakable();
	
	Crafty.e("Brick").place(40,50);
	Crafty.e("Brick").place(40,80);
	Crafty.e("Brick").place(40,110);
	Crafty.e("Brick").place(40,140);
	Crafty.e("Brick").place(40,170);
	Crafty.e("Brick").place(40,200);
	
	Crafty.e("Brick").place(280,50);
	Crafty.e("Brick").place(280,80);
	Crafty.e("Brick").place(280,110);
	Crafty.e("Brick").place(280,140);
	Crafty.e("Brick").place(280,170);
	Crafty.e("Brick").place(280,200);
	
	Crafty.e("Brick").place(70,60);
	Crafty.e("Brick").place(100,50);
	Crafty.e("Brick").place(130,60);
	Crafty.e("Brick").place(160,50);
	Crafty.e("Brick").place(190,60);
	Crafty.e("Brick").place(220,50);
	Crafty.e("Brick").place(250,60);
	
	Crafty.e("Brick").place(70,120);
	Crafty.e("Brick").place(100,110);
	Crafty.e("Brick").place(130,120);
	Crafty.e("Brick").place(160,110);
	Crafty.e("Brick").place(190,120);
	Crafty.e("Brick").place(220,110);
	Crafty.e("Brick").place(250,120);
	
	Crafty.e("Brick").place(70,150);
	Crafty.e("Brick").place(100,140);
	Crafty.e("Brick").place(130,150);
	Crafty.e("Brick").place(160,140);
	Crafty.e("Brick").place(190,150);
	Crafty.e("Brick").place(220,140);
	Crafty.e("Brick").place(250,150);
	
	Crafty.e("Brick").place(70,210);
	Crafty.e("Brick").place(100,200);
	Crafty.e("Brick").place(130,210);
	Crafty.e("Brick").place(160,200);
	Crafty.e("Brick").place(190,210);
	Crafty.e("Brick").place(220,200);
	Crafty.e("Brick").place(250,210);
	
	// assign random drops to the bricks
	// available drops : Fire_Ball, Fast_Ball, Slow_Ball, New_Ball, Sticky_Bar, Small_Bar, Large_Bar, Reverse_Bar, Laser_Bar
	assignRandomDrops(['Sticky_Bar','Fast_Ball','New_Ball','New_Ball','New_Ball']);
	
});