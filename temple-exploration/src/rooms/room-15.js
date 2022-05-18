/***********************************************
room-15.js
***********************************************/

// room 15
Crafty.scene('room-15', function() {
	
	// init room
	// see _shared.js
	initRoom(15);
	
	// player creation at init position
	var initX = 30;
	var initY = Game.height-66;
	var player = Crafty.e('Player').place(initX, initY);
	
	// closing door
	Crafty.e('Door').place(16, Game.height-86).close();
	
	// bottom ground
	Crafty.e('Platform').place(0, Game.height-36).size(Game.width, 20);
	// middle ground
	Crafty.e('Platform').place(0, 237).size(Game.width, 20);
	// top ground
	Crafty.e('Platform').place(0, 113).size(Game.width, 20);
	
	// first platform
	Crafty.e('Platform').place(Game.width-70, 302).size(54, 20);
	// second platform
	Crafty.e('Platform').place(16, 174).size(54, 20);
	
	// first set of traps
	Crafty.e('Killing, Trap, FirstSet, Delay').place(141, 257).size(62, 19).setImage('killing-ceiling');
	Crafty.e('Killing, Trap, FirstSet, Delay').place(203, 257).size(62, 19).setImage('killing-ceiling');
	Crafty.e('Killing, Trap, FirstSet, Delay').place(265, 257).size(62, 19).setImage('killing-ceiling');
	Crafty.e('Killing, Trap, FirstSet, Delay').place(327, 257).size(62, 19).setImage('killing-ceiling');
	Crafty.e('Killing, Trap, FirstSet, Delay').place(389, 257).size(62, 19).setImage('killing-ceiling');
	
	// movement for the first set of traps
	var x = 0;
	Crafty('FirstSet').each(function(){
		this.delay(function(){
			this.delay(function(){
				this.doMove({x: this.x, y: Game.height-55}, 200);
			},200);
			this.delay(function(){
				this.doMove({x: this.x, y: 257}, 1250);
			},500);
			this.delay(function(){
				this.delay(function(){
					this.doMove({x: this.x, y: Game.height-55}, 200);
				},200);
				this.delay(function(){
					this.doMove({x: this.x, y: 257}, 1250);
				},500);
			},1600,-1);
		},x);
		x += 250;
	});
	
	// projectile shooters
	Crafty.e('Trap').place(16, 214).size(16, 16).setImage('projectile-shooter-right').startShooting('right', 1500, 250);
	Crafty.e('Trap').place(Game.width-32, 140).size(16, 16).setImage('projectile-shooter-left').startShooting('left', 1500, 250);
	
	// key to door 15
	Crafty.e('Key').setNumber(15).place(276, 173);
	
	// second set of traps
	Crafty.e('Killing, Trap, SecondSet, Delay').place(141, 16).size(62, 19).setImage('killing-ceiling');
	Crafty.e('Killing, Trap, SecondSet, Delay').place(203, 16).size(62, 19).setImage('killing-ceiling');
	Crafty.e('Killing, Trap, SecondSet, Delay').place(265, 16).size(62, 19).setImage('killing-ceiling');
	Crafty.e('Killing, Trap, SecondSet, Delay').place(327, 16).size(62, 19).setImage('killing-ceiling');
	Crafty.e('Killing, Trap, SecondSet, Delay').place(389, 16).size(62, 19).setImage('killing-ceiling');
	
	// movement for the second set of traps
	var x = 0;
	Crafty('SecondSet').each(function(){
		this.delay(function(){
			this.delay(function(){
				this.doMove({x: this.x, y: 94}, 300);
			},200);
			this.delay(function(){
				this.doMove({x: this.x, y: 16}, 1500);
			},500);
			this.delay(function(){
				this.delay(function(){
					this.doMove({x: this.x, y: 94}, 300);
				},200);
				this.delay(function(){
					this.doMove({x: this.x, y: 16}, 1500);
				},500);
			},2100,-1);
		},x);
		x += 622;
	});
	
	// door 15
	Crafty.e('Door').setNumber(15).place(Game.width-48, 63);
	
});