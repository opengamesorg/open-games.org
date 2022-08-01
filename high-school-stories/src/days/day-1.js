/***********************************************
day-1.js : what's happening on the first day
***********************************************/

function startDay1(){

	// black veil covering everything, fading out to show the content
	var blackVeil = Crafty.e('Veil, DialogueLayer');
	Crafty.e('Delay').delay(function(){
		blackVeil.fade(0, 1000);
	},250);
	
	/**********************
	  introduction
	 **********************/
	
	// player creation
	var player = Crafty.e('Player').place(1102, 450).changeDirection('left');
	
	// player can't move by himself
	player.sceneMode = true;
	
	// player is forced to move
	player.delay(function(){
		player.forceMove('left', 2);
		player.delay(function(){
			// introduction dialogue
			player.sceneDialogue.beginDialogue();
			player.sceneMode = false;
		}, player.movementSpeed*2 + 500);
	}, 1250);

	/**********************
	  introduction is over, player can move and interact
	 **********************/

	// Principal
	Crafty.e('Npc').place(910, 450).setCharacter('principal').setInteractiveId(8).changeDirection('down');

	// Class A professor
	Crafty.e('Npc').place(622, 290).setCharacter('professor-2').setInteractiveId(9).changeDirection('left');

	// Linda
	Crafty.e('Npc').place(558, 418).setCharacter('student-6').setInteractiveId(10).changeDirection('up');

	// Jordan
	Crafty.e('Npc').place(174, 450).setCharacter('student-12').setInteractiveId(11).changeDirection('left');

	// Class B professor
	Crafty.e('Npc').place(206, 66).setCharacter('professor-1').setInteractiveId(12).changeDirection('down');

	// Anastasia
	Crafty.e('Npc').place(238, 578).setCharacter('student-14').setInteractiveId(13).changeDirection('down');

}