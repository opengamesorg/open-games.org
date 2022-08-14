/***********************************************
dialogue.js : Dialogue component
***********************************************/

// Dialogue entities are used to handle every dialog. 
// They make a link between the Dialogues global
// object, where all the dialogue data is stored, and
// the DialogBox display. The Dialogue component 
// serves as the controller of this dialogue system.
// Every time the player presses an action key at
// an Interactive entity, a new Dialogue is created,
// showing the DialogBox. When the Dialogue reaches 
// its end, it is deleted, hiding the DialogBox.

// Dialogue component definition
Crafty.c('Dialogue', {
	
	// required components automatically included
	required: 'Delay',

	// executed once at creation
    init: function() {
		this.data = {};
		this.currentBranchId = 0;
		this.currentContentIndex = 0;
		this.canContinueMs = 500;
		this.bind('ContinueDialogue', function(){
			this.continue();
		});
		this.chosenChoiceIndex = null;
		this.bind('SelectFirstChoiceDialogue', function(){
			this.chosenChoiceIndex = 0;
		}).bind('SelectSecondChoiceDialogue', function(){
			this.chosenChoiceIndex = 1;
		});
    },
	
	// get a branch by id
    getBranch: function(id) {
		if(this.data.branches){
			for(var i = 0; i < this.data.branches.length; i++){
				if(this.data.branches[i].id == id){
					return this.data.branches[i];
				}
			}
		} else {
			return null;
		}
    },
	
	// get the owner entity of this dialogue
	// parentId is set in interactive.js
    getInteractiveParent: function() {
		return Crafty(this.parentId);
    },
	
	// start the dialogue
    start: function() {
		Crafty.trigger('StartDialogue');
		this.currentBranch = this.getBranch(this.currentBranchId);
		Game.mainDialogBox.showContent();
		this.showContent();
    },
	
	// end the dialogue
    end: function() {
		Game.mainDialogBox.hide();
		Crafty.trigger('EndDialogue');
		var parent = this.getInteractiveParent();
		if(parent.has('Npc')){
			var direction = parent.directionBeforeDialogue;
			parent.changeDirection(direction);
		}
		this.destroy();
    },
	
	// continue dialogue
    continue: function() {
		if(this.currentContent.action){
			this.currentContent.action();
		}
		if(this.chosenChoiceIndex != null){
			var chosenChoice = this.currentContent.choices[this.chosenChoiceIndex];
			if(chosenChoice.action){
				chosenChoice.action();
			}
			if(chosenChoice.next){
				var nextBranch = this.getBranch(chosenChoice.next.branchId);
				this.currentBranch = nextBranch;
				if(!chosenChoice.next.direct){
					var parent = this.getInteractiveParent();
					parent.dialogueBranchId = chosenChoice.next.branchId;
					this.end();
				}
			}
			this.currentContentIndex = 0;
		} else {
			if(this.currentContent.next){
				var nextBranch = this.getBranch(this.currentContent.next.branchId);
				this.currentBranch = nextBranch;
				if(!this.currentContent.next.direct){
					var parent = this.getInteractiveParent();
					parent.dialogueBranchId = this.currentContent.next.branchId;
					this.end();
				}
				this.currentContentIndex = 0;
			} else {
				this.currentContentIndex++;
			}
		}
		this.showContent();
		return this;
    },
	
	// show dialogue content
    showContent: function() {
		this.chosenChoiceIndex = null;
		if(this.currentBranch === null){
			this.currentContent = this.data.content[this.currentContentIndex];
		} else {
			this.currentContent = this.currentBranch.content[this.currentContentIndex];
		}
		if(!this.currentContent){
			this.end();
		} else {
			Crafty.trigger('CantContinueDialogue');
			this.delay(function(){
				Crafty.trigger('CanContinueDialogue');
			}, this.canContinueMs);
			var dialogueText = '';
			if(this.currentContent.title){
				var titleCss = Game.mainDialogBox.contentBoxTitleCss;
				var titleStyle = Object.keys(titleCss).map(function(k) { 
					return k + ":" + titleCss[k] 
				}).join(";");
				var title = '<span style="' + titleStyle + '">' + this.currentContent.title + ' :' + '</span>';
				dialogueText = title + ' ' + this.currentContent.text[Game.language];
			} else {
				dialogueText = this.currentContent.text[Game.language];
			}
			Game.mainDialogBox.contentBox.text(dialogueText);
			if(this.currentContent.choices){
				Game.mainDialogBox.showChoices();
				Game.mainDialogBox.firstChoiceBox.text(this.currentContent.choices[0].text[Game.language]);
				Game.mainDialogBox.secondChoiceBox.text(this.currentContent.choices[1].text[Game.language]);
				this.chosenChoiceIndex = 0;
			} else {
				Game.mainDialogBox.hideChoices();
			}
		}
		return this;
    },
	
});