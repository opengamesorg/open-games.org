/***********************************************
characters.js : Character properties
***********************************************/

var Characters = {
	get: function(title){
		return this.list.find(function(item){
			return item.title == title;
		});
	},
	getEntity: function(title){
		return Crafty('Character').get().find(function(item){
			return item.title == title;
		});
	},
	list: [
		{
			name: 'Brandon',
			title: 'student-1',
			sprite: 'SpriteStudent1',
		},
		{
			name: 'Brenda',
			title: 'student-2',
			sprite: 'SpriteStudent2',
		},
		{
			name: 'Linda',
			title: 'student-6',
			sprite: 'SpriteStudent6',
		},
		{
			name: 'Jordan',
			title: 'student-12',
			sprite: 'SpriteStudent12',
		},
		{
			name: 'Anastasia',
			title: 'student-14',
			sprite: 'SpriteStudent14',
		},
		{
			name: 'Mr. Hubert',
			title: 'professor-1',
			sprite: 'SpriteProfessor1',
		},
		{
			name: 'Ms. Casanova',
			title: 'professor-2',
			sprite: 'SpriteProfessor2',
		},
		{
			name: 'Mr. Bouvier',
			title: 'principal',
			sprite: 'SpritePrincipal',
		},
	]
};