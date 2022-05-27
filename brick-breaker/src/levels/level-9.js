/***********************************************
level-9.js
***********************************************/

Crafty.scene('level-9', function() {
	
	// setup the level with title and player creation
	levelSetup(9);
	
	// bricks creation
	Crafty.e("Brick").place(20,40).size(70,20).setUnbreakable();
	Crafty.e("Brick").place(140,100).size(70,20).setUnbreakable();
	Crafty.e("Brick").place(260,40).size(70,20).setUnbreakable();
	
	Crafty.e("Brick").place(140,250);
	Crafty.e("Brick").place(180,250);
	Crafty.e("Brick").place(140,230);
	Crafty.e("Brick").place(180,230);
	Crafty.e("Brick").place(140,210);
	Crafty.e("Brick").place(180,210);
	Crafty.e("Brick").place(140,190);
	Crafty.e("Brick").place(180,190);
	Crafty.e("Brick").place(140,170);
	Crafty.e("Brick").place(180,170);
	Crafty.e("Brick").place(140,150);
	Crafty.e("Brick").place(180,150);
	Crafty.e("Brick").place(140,130);
	Crafty.e("Brick").place(180,130);
	
	Crafty.e("Brick").place(20,190);
	Crafty.e("Brick").place(60,190);
	Crafty.e("Brick").place(20,170);
	Crafty.e("Brick").place(60,170);
	Crafty.e("Brick").place(20,150);
	Crafty.e("Brick").place(60,150);
	Crafty.e("Brick").place(20,130);
	Crafty.e("Brick").place(60,130);
	Crafty.e("Brick").place(20,110);
	Crafty.e("Brick").place(60,110);
	Crafty.e("Brick").place(20,90);
	Crafty.e("Brick").place(60,90);
	Crafty.e("Brick").place(20,70);
	Crafty.e("Brick").place(60,70);
	
	Crafty.e("Brick").place(260,190);
	Crafty.e("Brick").place(300,190);
	Crafty.e("Brick").place(260,170);
	Crafty.e("Brick").place(300,170);
	Crafty.e("Brick").place(260,150);
	Crafty.e("Brick").place(300,150);
	Crafty.e("Brick").place(260,130);
	Crafty.e("Brick").place(300,130);
	Crafty.e("Brick").place(260,110);
	Crafty.e("Brick").place(300,110);
	Crafty.e("Brick").place(260,90);
	Crafty.e("Brick").place(300,90);
	Crafty.e("Brick").place(260,70);
	Crafty.e("Brick").place(300,70);
	
	// assign random drops to the bricks
	// available drops : Fire_Ball, Fast_Ball, Slow_Ball, New_Ball, Sticky_Bar, Small_Bar, Large_Bar, Reverse_Bar, Laser_Bar
	assignRandomDrops(['Laser_Bar','Fast_Ball','New_Ball','New_Ball','New_Ball']);
	
});