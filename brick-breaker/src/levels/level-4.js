/***********************************************
level-4.js
***********************************************/

Crafty.scene('level-4', function() {
	
	// setup the level with title and player creation
	levelSetup(4);
	
	// bricks creation
	Crafty.e("Brick").place(60,120).size(30,30).setUnbreakable();
	Crafty.e("Brick").place(Game.width-90,120).size(30,30).setUnbreakable();
	
	Crafty.e("Brick").place(30,110);
	Crafty.e("Brick").place(30,150);
	Crafty.e("Brick").place(90,110);
	Crafty.e("Brick").place(90,150);
	Crafty.e("Brick").place(60,100);
	Crafty.e("Brick").place(60,160);
	Crafty.e("Brick").place(0,120);
	Crafty.e("Brick").place(0,140);
	Crafty.e("Brick").place(120,120);
	Crafty.e("Brick").place(120,140);
	
	Crafty.e("Brick").place(Game.width-60,110);
	Crafty.e("Brick").place(Game.width-60,150);
	Crafty.e("Brick").place(Game.width-120,110);
	Crafty.e("Brick").place(Game.width-120,150);
	Crafty.e("Brick").place(Game.width-90,100);
	Crafty.e("Brick").place(Game.width-90,160);
	Crafty.e("Brick").place(Game.width-30,120);
	Crafty.e("Brick").place(Game.width-30,140);
	Crafty.e("Brick").place(Game.width-150,120);
	Crafty.e("Brick").place(Game.width-150,140);
	
	Crafty.e("Brick").place(40,40);
	Crafty.e("Brick").place(70,30);
	Crafty.e("Brick").place(70,50);
	Crafty.e("Brick").place(100,40);
	Crafty.e("Brick").place(130,30);
	Crafty.e("Brick").place(130,50);
	Crafty.e("Brick").place(160,40);
	Crafty.e("Brick").place(190,30);
	Crafty.e("Brick").place(190,50);
	Crafty.e("Brick").place(220,40);
	Crafty.e("Brick").place(250,30);
	Crafty.e("Brick").place(250,50);
	Crafty.e("Brick").place(280,40);
	
	Crafty.e("Brick").place(40,220);
	Crafty.e("Brick").place(70,210);
	Crafty.e("Brick").place(70,230);
	Crafty.e("Brick").place(100,220);
	Crafty.e("Brick").place(130,210);
	Crafty.e("Brick").place(130,230);
	Crafty.e("Brick").place(160,220);
	Crafty.e("Brick").place(190,210);
	Crafty.e("Brick").place(190,230);
	Crafty.e("Brick").place(220,220);
	Crafty.e("Brick").place(250,210);
	Crafty.e("Brick").place(250,230);
	Crafty.e("Brick").place(280,220);
	
	// assign random drops to the bricks
	// available drops : Fire_Ball, Fast_Ball, Slow_Ball, New_Ball, Sticky_Bar, Small_Bar, Large_Bar, Reverse_Bar, Laser_Bar
	assignRandomDrops(['Laser_Bar','Reverse_Bar','New_Ball','New_Ball','New_Ball']);
	
});