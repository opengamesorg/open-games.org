/***********************************************
character.js : Character component
***********************************************/

// Character entities are representing all the
// humans in this game. They can be either 
// Player or Npc (Non-player character).
// This component is made to centralize properties
// and functions used by both Player and Npc.

// Character component definition
Crafty.c('Character', {
	
	// required components automatically included
	required: '2D, DOM, SpriteAnimation, Tween, Delay, Collision',

	// executed once at creation
    init: function() {
		// dimension and style
		this.w = 32;
        this.h = 48;
		// default sprite
		this.addComponent('SpriteStudent1');
		// movement :
		// the character moves one block at a time
		// speed means how many ms it will take to travel one block
		// distance means how many px does a block measure
		this.isMoving = false;
		this.movementSpeed = 250;
		this.movementDistance = 32;
		// movement animation
		this.movementAnimationTime = 600;
		this.setupMovementAnimation();
		// idle animation
		this.idleAnimationTime = 2000;
		this.setupIdleAnimation();
		// default animation and direction
		this.direction = 'down';
		this.animateIdle();
		// set the collision hitbox for the entity
		// add WiredHitBox component to see the hitbox
		this.collision([0, 16, 0, 32, 32, 32, 32, 16]);
		// z-index : stack order for vertical positioning
		// any element with greater z-index will appear in front
		this.z = 100;
		// zone around the character
		// used for stack order modification
		this.createZone();
		// z-index above decor or not
		this.aboveDecor = false;
    },
	
	// set the position of the entity
	place: function(x, y){
		this.x = x;
		this.y = y;
		return this;
	},

	// set the character with properties 
	// from the Character global object
	setCharacter: function(title){
		var character = Characters.get(title);
		for(var prop in character){
			if(prop == 'sprite'){
				this.addComponent(character.sprite);
			} else {
				this[prop] = character[prop];
			}
		}
		return this;
	},

	// set the character's z-index 
	// so it becomes above decor
	setAboveDecor: function(){
		this.z = 998;
		this.aboveDecor = true;
		return this;
	},

	// create the "character zone"
	// each character has 2 rectangles following him : one over, one under
	// if any other character hits the zone, the zIndexes change
	// making possible for a character to appear behind or in front
	createZone: function(){
		this.upperZone = Crafty.e('2D, DOM, Color, Collision');
		this.lowerZone = Crafty.e('2D, DOM, Color, Collision');
		this.upperZone.attr({w: 96, h: 32});
		this.lowerZone.attr({w: 96, h: 32});
		this.attach(this.upperZone, this.lowerZone);
		this.delay(function(){
			// z-index : stack order for vertical positioning
			// any element with greater z-index will appear in front
			if(!this.aboveDecor){
				this.z = 100;
			}
			this.upperZone.x -= 32;
			this.upperZone.y -= 32;
			this.lowerZone.x -= 32;
			this.lowerZone.y += 48;
			this.upperZone.checkHits('Character').bind("HitOn", function(hitData) {
				var character = hitData[0].obj;
				this._parent.z = character.z+1;
			});
			this.lowerZone.checkHits('Character').bind("HitOn", function(hitData) {
				var character = hitData[0].obj;
				this._parent.z = character.z-1;
			});
		}, 25);
		return this;
	},
	
	// change character direction
	changeDirection: function(direction){
		this.direction = direction;
		this.animateIdle();
		return this;
	},
	
	// set character direction to an opposite
	setOppositeDirection: function(direction){
		var opposite = {
			'left': 'right',
			'right': 'left',
			'up': 'down',
			'down': 'up',
		};
		var newDirection = opposite[direction];
		this.changeDirection(newDirection);
		return this;
	},
	
	// setup idle animation
	setupIdleAnimation: function(){
		this.idleLeftAnimationFrames = [[12, 1], [13, 1], [14, 1], [15, 1], [16, 1], [17, 1]];
		this.idleRightAnimationFrames = [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1]];
		this.idleUpAnimationFrames = [[6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1]];
		this.idleDownAnimationFrames = [[18, 1], [19, 1], [20, 1], [21, 1], [22, 1], [23, 1]];
		this.reel('idleLeftAnimation', this.idleAnimationTime, this.idleLeftAnimationFrames);
		this.reel('idleRightAnimation', this.idleAnimationTime, this.idleRightAnimationFrames);
		this.reel('idleUpAnimation', this.idleAnimationTime, this.idleUpAnimationFrames);
		this.reel('idleDownAnimation', this.idleAnimationTime, this.idleDownAnimationFrames);
		return this;
	},
	
	// setup movement animation
	setupMovementAnimation: function(){
		this.moveLeftAnimationFrames = [[12, 2], [13, 2], [14, 2], [15, 2], [16, 2], [17, 2]];
		this.moveRightAnimationFrames = [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2]];
		this.moveUpAnimationFrames = [[6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2]];
		this.moveDownAnimationFrames = [[18, 2], [19, 2], [20, 2], [21, 2], [22, 2], [23, 2]];
		this.reel('moveLeftAnimation', this.movementAnimationTime, this.moveLeftAnimationFrames);
		this.reel('moveRightAnimation', this.movementAnimationTime, this.moveRightAnimationFrames);
		this.reel('moveUpAnimation', this.movementAnimationTime, this.moveUpAnimationFrames);
		this.reel('moveDownAnimation', this.movementAnimationTime, this.moveDownAnimationFrames);
		return this;
	},
	
	// do movement animation
	animateMovement: function(){
		if(this.direction == 'left' && !this.isPlaying('moveLeftAnimation')){
			this.animate('moveLeftAnimation', -1);
		} else if(this.direction == 'right' && !this.isPlaying('moveRightAnimation')){
			this.animate('moveRightAnimation', -1);
		} else if(this.direction == 'up' && !this.isPlaying('moveUpAnimation')){
			this.animate('moveUpAnimation', -1);
		} else if(this.direction == 'down' && !this.isPlaying('moveDownAnimation')){
			this.animate('moveDownAnimation', -1);
		}
		return this;
	},
	
	// do idle animation
	animateIdle: function(){
		if(this.direction == 'left' && !this.isPlaying('idleLeftAnimation')){
			this.animate('idleLeftAnimation', -1);
		} else if(this.direction == 'right' && !this.isPlaying('idleRightAnimation')){
			this.animate('idleRightAnimation', -1);
		} else if(this.direction == 'up' && !this.isPlaying('idleUpAnimation')){
			this.animate('idleUpAnimation', -1);
		} else if(this.direction == 'down' && !this.isPlaying('idleDownAnimation')){
			this.animate('idleDownAnimation', -1);
		}
		return this;
	},
	
	// force the character to move towards a 
	// direction and a specified number of blocks.
	// if a callback function is specified,
	// it will be called at the end of the movement.
	forceMove: function(direction, blocks, callback){
		this.direction = direction;
		if(this.has('Player')){
			this.blocked = false;
			if(this.willCollideWithObstacle()){
				this.blocked = true;
				this.terminateMovement();
				return this;
			}
		}
		this.isMoving = true;
		var horizontalDistance = 0;
		var verticalDistance = 0;
		switch(direction){
			case 'left':
				horizontalDistance = -this.movementDistance;
				break;
			case 'right':
				horizontalDistance = this.movementDistance;
				break;
			case 'up':
				verticalDistance = -this.movementDistance;
				break;
			case 'down':
				verticalDistance = this.movementDistance;
				break;
		}
		var newX = this.x + horizontalDistance*blocks;
		var newY = this.y + verticalDistance*blocks;
		
		this.tween({x: newX, y: newY}, this.movementSpeed*blocks);
		this.animateMovement();
		this.delay(function(){
			this.terminateMovement();
			if(callback && typeof callback == 'function'){
				callback();
			}
		}, this.movementSpeed*blocks);
		return this;
	},
	
	// terminate the movement process
	// if a movement key is still down, start movement again
	terminateMovement: function(){
		this.isMoving = false;
		if(this.has('Player')){
			Crafty('TriggerZone').each(function(){
				if(Crafty('Player').intersect(this.pos())){
					this.triggerAction();
					return;
				}
			});
			if(!this.blocked && !this.sceneMode && !this.dialogueMode){
				if(this.keyboard.isKeyDown(Player.keys.keyLeft)){
					this.doMove('left');
					return this;
				} else if(this.keyboard.isKeyDown(Player.keys.keyRight)){
					this.doMove('right');
					return this;
				} else if(this.keyboard.isKeyDown(Player.keys.keyUp)){
					this.doMove('up');
					return this;
				} else if(this.keyboard.isKeyDown(Player.keys.keyDown)){
					this.doMove('down');
					return this;
				}
			}
		}
		this.animateIdle();
		return this;
	},
	
});