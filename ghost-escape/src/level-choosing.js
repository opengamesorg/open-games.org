/***********************************************
level-choosing.js : choose a level
***********************************************/

// level choosing
Crafty.scene('levelChoosing', function() {
	
	// mobile version setup
	if(Game.mobile) Game.mobileVersion();
	
	// player
	var player = Crafty.e('Player').place(193, 187);
		
	// walls
	Crafty.e('Wall').place(50, 50).size(20, 120);
	Crafty.e('Wall').place(50, 230).size(20, 120);
	Crafty.e('Wall').place(330, 50).size(20, 120);
	Crafty.e('Wall').place(330, 230).size(20, 120);
	Crafty.e('Wall').place(50, 50).size(120, 20);
	Crafty.e('Wall').place(230, 50).size(120, 20);
	Crafty.e('Wall').place(50, 330).size(120, 20);
	Crafty.e('Wall').place(230, 330).size(120, 20);
	
	// doors
	Crafty.e('Door').place(170, 50).size(60, 20).setDirection('up').setExitScene('ghostJump');
	Crafty.e('Door').place(50, 170).size(20, 60).setDirection('left').setExitScene('ghostRun');
	Crafty.e('Door').place(330, 170).size(20, 60).setDirection('right').setExitScene('flappyGhost');
	Crafty.e('Door').place(170, 330).size(60, 20).setDirection('down').setExitScene('fallingGhost');
	
	// mobile touch events for doors
	if(Game.mobile){
		Crafty.e('CustomTouchControl').place(160+Game.mobileGap, 40+Game.mobileGap).size(80, 80).bind('TouchStart', function(){
			player.forceMove('up');
			player.forceMoveLocked = true;
		});
		Crafty.e('CustomTouchControl').place(40+Game.mobileGap, 160+Game.mobileGap).size(80, 80).bind('TouchStart', function(){
			player.forceMove('left');
			player.forceMoveLocked = true;
		});
		Crafty.e('CustomTouchControl').place(280+Game.mobileGap, 160+Game.mobileGap).size(80, 80).bind('TouchStart', function(){
			player.forceMove('right');
			player.forceMoveLocked = true;
		});
		Crafty.e('CustomTouchControl').place(160+Game.mobileGap, 280+Game.mobileGap).size(80, 80).bind('TouchStart', function(){
			player.forceMove('down');
			player.forceMoveLocked = true;
		});
	}
	
	// text
	Crafty.e('CustomText').setSubtitle().text('JUMP').place(0,(Game.mobile ? 94 : (userBrowser.isFirefox ? 90 : 95)));
	Crafty.e('CustomText').setSubtitle().text('F').size(20,20).place(287,(Game.mobile ? 172 : (userBrowser.isFirefox ? 168 : 172)));
	Crafty.e('CustomText').setSubtitle().text('L').size(20,20).place(288,(Game.mobile ? 184 : (userBrowser.isFirefox ? 181 : 185)));
	Crafty.e('CustomText').setSubtitle().text('A').size(20,20).place(287,(Game.mobile ? 196 : (userBrowser.isFirefox ? 194 : 198)));
	Crafty.e('CustomText').setSubtitle().text('P').size(20,20).place(287,(Game.mobile ? 208 : (userBrowser.isFirefox ? 208 : 212)));
	Crafty.e('CustomText').setSubtitle().text('FALL').place(0,(Game.mobile ? 288 : (userBrowser.isFirefox ? 285 : 287)));
	Crafty.e('CustomText').setSubtitle().text('R').size(20,20).place((Game.mobile ? 94 : 95),(Game.mobile ? 178 : (userBrowser.isFirefox ? 174 : 178)));
	Crafty.e('CustomText').setSubtitle().text('U').size(20,20).place((Game.mobile ? 94 : 95),(Game.mobile ? 190 : (userBrowser.isFirefox ? 187 : 191)));
	Crafty.e('CustomText').setSubtitle().text('N').size(20,20).place((Game.mobile ? 94 : 95),(Game.mobile ? 201 : (userBrowser.isFirefox ? 200 : 204)));
	
});