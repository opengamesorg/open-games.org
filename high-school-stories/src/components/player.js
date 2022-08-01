/***********************************************
player.js : Player component
***********************************************/

// Player entity is the character controlled by
// keyboard. It can move in any direction, one 
// block at a time (like Pokémon games), and 
// trigger events with an action key.

// Player component definition
Crafty.c('Player', {
	
	// required components automatically included
	required: 'Character',

	// executed once at creation
    init: function() {
		// sprite according to chosen character
		if(Game.character == 'brandon'){
			this.addComponent('SpriteStudent1');
		} else this.addComponent('SpriteStudent2');
		// camera follows player (centered)
		Crafty.viewport.follow(this, 0, 0);
		// collision management :
		// when a movement is initiated in any direction, we check if
		// the player will collide with an obstacle : if so, the
		// effective movement is blocked before it starts.
		// to do so, we use "Crafty.raycast" function which requires
		// normalized 2D vectors.
		// see : https://craftyjs.com/api/Crafty-raycast.html 
		// and : https://craftyjs.com/api/Crafty-math-Vector2D.html
		this.leftRayDirection = new Crafty.math.Vector2D(-1, 0).normalize();
		this.rightRayDirection = new Crafty.math.Vector2D(1, 0).normalize();
		this.upRayDirection = new Crafty.math.Vector2D(0, -1).normalize();
		this.downRayDirection = new Crafty.math.Vector2D(0, 1).normalize();
		// the eventual obstacle preventing player to move
		this.nextCollidingObject = null;
		// this keyboard system is used for its "isKeyDown" function
		this.keyboard = Crafty.s('Keyboard');
		// scene mode : use during cinematics, prevent user from interacting
		this.sceneMode = false;
		// dialogue with myself
		this.sceneDialogue = Crafty.e('Interactive').setInteractiveId(0);
		// dialogue mode : user interacts with the dialog box
		this.dialogueMode = false;
		this.bind('StartDialogue', function(){
			this.dialogueMode = true;
		}).bind('EndDialogue', function(){
			this.dialogueMode = false;
		});
		this.canContinueDialogue = false;
		this.bind('CanContinueDialogue', function(){
			this.canContinueDialogue = true;
		}).bind('CantContinueDialogue', function(){
			this.canContinueDialogue = false;
		});
    },
	
	// each event has a function bound to it
	events: {
		'KeyDown': 'doSomething',
	},
	
	// do something based on pressed key
	doSomething: function(e){
		switch(e.key){
			case Player.keys.keyLeft: 	
				this.doMove('left'); 	
				break;
			case Player.keys.keyRight: 	
				this.doMove('right'); 
				break;
			case Player.keys.keyUp: 	
				this.doMove('up'); 	
				break;
			case Player.keys.keyDown: 	
				this.doMove('down'); 	
				break;
		}
		if(Player.keys.keyAction.indexOf(e.key) != -1) {
			this.doAction();
		}
		return this;
	},
	
	// what to do when pressing an action key
	doAction: function(){
		if(this.dialogueMode){
			if(this.canContinueDialogue){
				Crafty.trigger('ContinueDialogue');
			}
		} else if(!this.sceneMode){
			var intersectedInteractiveObject = null;
			Crafty('Interactive').each(function(){
				if(!this.has('Npc') && !this.has('TriggerZone')){
					if(Crafty('Player').intersect(this.pos())){
						intersectedInteractiveObject = this;
						return;
					}
				}
			});
			if(intersectedInteractiveObject !== null){
				intersectedInteractiveObject.beginDialogue();
				if(intersectedInteractiveObject.direction){
					this.changeDirection(intersectedInteractiveObject.direction);
				}
			} else if(this.nextCollidingObject !== null){
				if(this.nextCollidingObject.has('Interactive')){
					if(this.nextCollidingObject.interactiveId !== null){
						this.nextCollidingObject.beginDialogue();
						if(this.nextCollidingObject.has('Character')){
							this.nextCollidingObject.setOppositeDirection(this.direction);
						}
					}
				}
			}
		}
	},
	
	// what to do when pressing an arrow key
	doMove: function(direction){
		if(this.dialogueMode){
			if(Game.mainDialogBox.isShowingChoices()){
				if(direction == 'left'){
					Game.mainDialogBox.selectFirstChoice();
				} else if(direction == 'right'){
					Game.mainDialogBox.selectSecondChoice();
				}
			}
		} else {
			if(!this.sceneMode){
				if(!this.isMoving){
					this.forceMove(direction, 1);
				}
			}
		}
		return this;
	},
	
	// know if the entity will collide with an obstacle
	willCollideWithObstacle: function(){
		var willCollide = false;
		var originX = this.x;
		var originY = this.y;
		var rayDirection = null;
		this.nextCollidingObject = null;
		if(this.direction == 'left'){
			originY += this.h/2;
			rayDirection = this.leftRayDirection;
		} else if(this.direction == 'right'){
			originX += this.w;
			originY += this.h/2;
			rayDirection = this.rightRayDirection;
		} else if(this.direction == 'up'){
			originX += this.w/2;
			rayDirection = this.upRayDirection;
		} else if(this.direction == 'down'){
			originX += this.w/2;
			originY += this.h;
			rayDirection = this.downRayDirection;
		}
		var rayOrigin = {_x: originX, _y: originY};
		var intersections = Crafty.raycast(rayOrigin, rayDirection, -1, 'Obstacle');
		if(intersections[0]){
			var distance = Math.abs(Math.round(intersections[0].distance));
			if(distance <= 32){
				this.nextCollidingObject = intersections[0].obj;
				if(distance <= 0){
					willCollide = true;
				}
			}
		}
		return willCollide;
	},
	
});