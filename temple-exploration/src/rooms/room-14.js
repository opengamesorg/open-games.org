/***********************************************
room-14.js
***********************************************/

// room 14
Crafty.scene('room-14', function() {
	
	// init room
	// see _shared.js
	initRoom(14);
	
	// player creation at init position
	var initX = 30;
	var initY = 84;
	var player = Crafty.e('Player').place(initX, initY);
	
	// closing door
	Crafty.e('Door').place(16, 63);
	
	// killing ground
	Crafty.e('Killing, Trap').place(0, Game.height-20).size(Game.width, 16);
	
	// static platforms
	Crafty.e('Platform').place(16, 114).size(54, 20);
	Crafty.e('Platform').place(Game.width-70, 114).size(54, 20);
	Crafty.e('Platform').place(16, Game.height-36).size(54, 20);
	Crafty.e('Platform').place(Game.width-70, Game.height-36).size(54, 20);
	
	// moving platforms
	var platform1 = Crafty.e('FirstSet, Platform, Delay').place(170, -20).size(32, 20).setImage('platform').attr({speed: 5000});
	var platform2 = Crafty.e('FirstSet, Platform, Delay').place(284, -20).size(32, 20).setImage('platform').attr({speed: 3500});
	var platform3 = Crafty.e('FirstSet, Platform, Delay').place(398, -20).size(32, 20).setImage('platform').attr({speed: 4500});
	var platform4 = Crafty.e('SecondSet, Platform, Delay').place(170, -20).size(32, 20).setImage('platform').attr({speed: 5000});
	var platform5 = Crafty.e('SecondSet, Platform, Delay').place(284, -20).size(32, 20).setImage('platform').attr({speed: 3500});
	var platform6 = Crafty.e('SecondSet, Platform, Delay').place(398, -20).size(32, 20).setImage('platform').attr({speed: 4500});
	var platform4 = Crafty.e('ThirdSet, Platform, Delay').place(170, -20).size(32, 20).setImage('platform').attr({speed: 5000});
	var platform5 = Crafty.e('ThirdSet, Platform, Delay').place(284, -20).size(32, 20).setImage('platform').attr({speed: 3500});
	var platform6 = Crafty.e('ThirdSet, Platform, Delay').place(398, -20).size(32, 20).setImage('platform').attr({speed: 4500});
	
	// move the platforms continuously
	Crafty('FirstSet').each(function(){
		this.doMove({x: this.x, y: Game.height}, this.speed);
		this.delay(function(){
			if(this.y == Game.height){
				this.place(this.x, -20);
			} 
			this.doMove({x: this.x, y: Game.height}, this.speed);
		},this.speed+50,-1);
	});
	Crafty('SecondSet').each(function(){
		this.delay(function(){
			this.doMove({x: this.x, y: Game.height}, this.speed);
			this.delay(function(){
				if(this.y == Game.height){
					this.place(this.x, -20);
				} 
				this.doMove({x: this.x, y: Game.height}, this.speed);
			},this.speed+50,-1);
		},this.speed/2);
	});
	Crafty('ThirdSet').each(function(){
		this.delay(function(){
			this.doMove({x: this.x, y: Game.height}, this.speed);
			this.delay(function(){
				if(this.y == Game.height){
					this.place(this.x, -20);
				} 
				this.doMove({x: this.x, y: Game.height}, this.speed);
			},this.speed+50,-1);
		},this.speed/3);
	});
	
	// action box : when hit, performs action
	Crafty.e('ActionBox').place(Game.width-55, 85).action(function(){
		// key to door 14 appears
		Crafty.e('Key').setNumber(14).place(29, Game.height-65);
	});
	
	// door 14
	Crafty.e('Door').setNumber(14).place(Game.width-48, Game.height-86);
	
});