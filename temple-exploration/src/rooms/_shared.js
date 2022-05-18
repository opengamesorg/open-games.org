/***********************************************
_shared.js : shared between rooms
***********************************************/

function initRoom(number){
	
	// needed to restart the room if player dies
	Game.currentRoom = 'room-'+number;
	
	// background image
	Crafty.background('url(assets/images/room/room-'+number+'.png)');
	
	// room number display 
	// with black background
	Crafty.e('2D, DOM, Text, RoomNumber').text(number)
	.attr({x: 285, y: (userBrowser.isFirefox?-3:(userBrowser.isEdge?1:0)), w: 30, z: 200})
	.textColor('white').textFont({size: '16px', family: 'arcade'}).textAlign('center');
	Crafty.e('2D, DOM, Color').color('black').attr({x: 285, y: 0, w: 30, h: 16, z: 199});
	
};