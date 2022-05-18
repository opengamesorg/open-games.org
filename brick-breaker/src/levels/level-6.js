/***********************************************
level-6.js
***********************************************/

Crafty.scene('level-6', function() {
	
	// setup the level with title and player creation
	levelSetup(6);
	
	// bricks creation
	Crafty.e("Brick").place(100,220).size(10,50).setUnbreakable();
	Crafty.e("Brick").place(Game.width-110,220).size(10,50).setUnbreakable();
	Crafty.e("Brick").place(100,80).size(10,50).setUnbreakable();
	Crafty.e("Brick").place(Game.width-110,80).size(10,50).setUnbreakable();
	
	Crafty.e("Brick").place(60,140);
	Crafty.e("Brick").place(60,160);
	Crafty.e("Brick").place(60,180);
	Crafty.e("Brick").place(60,200);
	Crafty.e("Brick").place(100,140);
	Crafty.e("Brick").place(100,160);
	Crafty.e("Brick").place(100,180);
	Crafty.e("Brick").place(100,200);
	Crafty.e("Brick").place(140,140);
	Crafty.e("Brick").place(140,160);
	Crafty.e("Brick").place(140,180);
	Crafty.e("Brick").place(140,200);
	Crafty.e("Brick").place(180,140);
	Crafty.e("Brick").place(180,160);
	Crafty.e("Brick").place(180,180);
	Crafty.e("Brick").place(180,200);
	Crafty.e("Brick").place(220,140);
	Crafty.e("Brick").place(220,160);
	Crafty.e("Brick").place(220,180);
	Crafty.e("Brick").place(220,200);
	Crafty.e("Brick").place(260,140);
	Crafty.e("Brick").place(260,160);
	Crafty.e("Brick").place(260,180);
	Crafty.e("Brick").place(260,200);
	
	Crafty.e("Brick").place(120,80);
	Crafty.e("Brick").place(160,80);
	Crafty.e("Brick").place(200,80);
	Crafty.e("Brick").place(120,100);
	Crafty.e("Brick").place(160,100);
	Crafty.e("Brick").place(200,100);
	Crafty.e("Brick").place(120,120);
	Crafty.e("Brick").place(160,120);
	Crafty.e("Brick").place(200,120);
	
	Crafty.e("Brick").place(120,260);
	Crafty.e("Brick").place(160,260);
	Crafty.e("Brick").place(200,260);
	Crafty.e("Brick").place(120,240);
	Crafty.e("Brick").place(160,240);
	Crafty.e("Brick").place(200,240);
	Crafty.e("Brick").place(120,220);
	Crafty.e("Brick").place(160,220);
	Crafty.e("Brick").place(200,220);
	
	// assign random drops to the bricks
	// available drops : Fire_Ball, Fast_Ball, Slow_Ball, New_Ball, Sticky_Bar, Small_Bar, Large_Bar, Reverse_Bar, Laser_Bar
	assignRandomDrops(['Slow_Ball','Small_Bar','New_Ball','New_Ball','New_Ball']);
	
});