/***********************************************
level-7.js
***********************************************/

Crafty.scene('level-7', function() {
	
	// setup the level with title and player creation
	levelSetup(7);
	
	// bricks creation
	Crafty.e("Brick").place(50,250).size(Game.width-100,20).setUnbreakable();
	
	Crafty.e("Brick").place(40,230);
	Crafty.e("Brick").place(40,210);
	Crafty.e("Brick").place(40,190);
	Crafty.e("Brick").place(40,170);
	Crafty.e("Brick").place(40,150);
	Crafty.e("Brick").place(40,130);
	Crafty.e("Brick").place(40,110);
	Crafty.e("Brick").place(40,90);
	Crafty.e("Brick").place(40,70);
	Crafty.e("Brick").place(40,50);
	
	Crafty.e("Brick").place(70,220);
	Crafty.e("Brick").place(70,200);
	Crafty.e("Brick").place(70,180);
	Crafty.e("Brick").place(70,160);
	Crafty.e("Brick").place(70,140);
	Crafty.e("Brick").place(70,120);
	Crafty.e("Brick").place(70,100);
	Crafty.e("Brick").place(70,80);
	Crafty.e("Brick").place(70,60);
	
	Crafty.e("Brick").place(100,230);
	Crafty.e("Brick").place(100,210);
	Crafty.e("Brick").place(100,190);
	Crafty.e("Brick").place(100,170);
	Crafty.e("Brick").place(100,150);
	Crafty.e("Brick").place(100,130);
	Crafty.e("Brick").place(100,110);
	Crafty.e("Brick").place(100,90);
	Crafty.e("Brick").place(100,70);
	Crafty.e("Brick").place(100,50);
	
	Crafty.e("Brick").place(130,220);
	Crafty.e("Brick").place(130,200);
	Crafty.e("Brick").place(130,180);
	Crafty.e("Brick").place(130,160);
	Crafty.e("Brick").place(130,140);
	Crafty.e("Brick").place(130,120);
	Crafty.e("Brick").place(130,100);
	Crafty.e("Brick").place(130,80);
	Crafty.e("Brick").place(130,60);
	
	Crafty.e("Brick").place(160,230);
	Crafty.e("Brick").place(160,210);
	Crafty.e("Brick").place(160,190);
	Crafty.e("Brick").place(160,170);
	Crafty.e("Brick").place(160,150);
	Crafty.e("Brick").place(160,130);
	Crafty.e("Brick").place(160,110);
	Crafty.e("Brick").place(160,90);
	Crafty.e("Brick").place(160,70);
	Crafty.e("Brick").place(160,50);
	
	Crafty.e("Brick").place(190,220);
	Crafty.e("Brick").place(190,200);
	Crafty.e("Brick").place(190,180);
	Crafty.e("Brick").place(190,160);
	Crafty.e("Brick").place(190,140);
	Crafty.e("Brick").place(190,120);
	Crafty.e("Brick").place(190,100);
	Crafty.e("Brick").place(190,80);
	Crafty.e("Brick").place(190,60);
	
	Crafty.e("Brick").place(220,230);
	Crafty.e("Brick").place(220,210);
	Crafty.e("Brick").place(220,190);
	Crafty.e("Brick").place(220,170);
	Crafty.e("Brick").place(220,150);
	Crafty.e("Brick").place(220,130);
	Crafty.e("Brick").place(220,110);
	Crafty.e("Brick").place(220,90);
	Crafty.e("Brick").place(220,70);
	Crafty.e("Brick").place(220,50);
	
	Crafty.e("Brick").place(250,220);
	Crafty.e("Brick").place(250,200);
	Crafty.e("Brick").place(250,180);
	Crafty.e("Brick").place(250,160);
	Crafty.e("Brick").place(250,140);
	Crafty.e("Brick").place(250,120);
	Crafty.e("Brick").place(250,100);
	Crafty.e("Brick").place(250,80);
	Crafty.e("Brick").place(250,60);
	
	Crafty.e("Brick").place(280,230);
	Crafty.e("Brick").place(280,210);
	Crafty.e("Brick").place(280,190);
	Crafty.e("Brick").place(280,170);
	Crafty.e("Brick").place(280,150);
	Crafty.e("Brick").place(280,130);
	Crafty.e("Brick").place(280,110);
	Crafty.e("Brick").place(280,90);
	Crafty.e("Brick").place(280,70);
	Crafty.e("Brick").place(280,50);
	
	// assign random drops to the bricks
	// available drops : Fire_Ball, Fast_Ball, Slow_Ball, New_Ball, Sticky_Bar, Small_Bar, Large_Bar, Reverse_Bar, Laser_Bar
	assignRandomDrops(['Fire_Ball','Sticky_Bar','New_Ball','New_Ball','New_Ball']);
	
});