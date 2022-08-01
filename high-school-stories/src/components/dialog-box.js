/***********************************************
dialog-box.js : DialogBox component
***********************************************/

// DialogBox entity is used to handle the UI for 
// every dialog. It is a container for graphical 
// elements (text boxes, arrows...) and serves as
// the view of this dialogue system.
// There is only one DialogBox for the entire game,
// created in highschool.js during stage setup, as
// well as the DialogueLayer which makes it appear
// above everything (except CustomText). It is 
// stored in the global variable Game.mainDialogBox.

// DialogBox component definition
Crafty.c('DialogBox', {
	
	// required components automatically included
	required: '2D, DOM, Delay, DialogueLayer',

	// executed once at creation
    init: function() {
		// size and placement
		this.padding = 5;
		this.marginTop = 40;
		this.choiceBoxHeight = 85;
		this.x = 0;
		this.y = Game.height/2 + this.marginTop;
		this.w = Game.width;
		this.h = Game.height/2 - this.marginTop;
		this.contentBoxTopY = this.y + this.padding;
		this.contentBoxBottomY = this.y + this.padding*2 + this.choiceBoxHeight;
		this.boxComponents = '2D, DOM, Image, Text, DialogueLayer';
		this.arrowComponents = '2D, DOM, Image, Motion, DialogueLayer';
		this.boxCss = {
			'padding': '10px 15px',
			'box-sizing': 'border-box',
			'word-break': 'break-word',
			'word-spacing': '6px',
		};
		this.boxTextColor = 'black';
		this.boxTextFont = { family: 'OldSchoolAdventures', size: '14px' };
		this.contentBoxLineHeight = '1.52';
		this.choiceBoxLineHeight = '1.45';
		this.contentBoxTitleCss = {
			'background-color': '#ddd',
			'padding': '1px 2px 2px 5px',
			'border-radius': '4px',
		};
		this.contentBoxImage = 'assets/images/dialogue/content-box.png';
		this.choiceBoxImage = 'assets/images/dialogue/choice-box.png';
		this.choiceArrowImage = 'assets/images/dialogue/choice-arrow.png';
		this.nextArrowImage = 'assets/images/dialogue/next-arrow.png';
		// dialog box creation
		this.createContentBox();
		this.createNextArrow();
		this.createFirstChoiceBox();
		this.createSecondChoiceBox();
		this.createChoiceArrow();
    },
	
	// content box for main text
    createContentBox: function() {
		this.contentBox = Crafty.e(this.boxComponents);
		this.contentBox.attr({
			x: this.x + this.padding, 
			y: this.contentBoxBottomY, 
			w: this.w - this.padding*2,
			h: this.h - this.choiceBoxHeight - this.padding*3,
			alpha: 0,
		});
		this.contentBox.css(this.boxCss);
		this.contentBox.image(this.contentBoxImage);
		this.contentBox.textColor(this.boxTextColor);
		this.boxTextFont.lineHeight = this.contentBoxLineHeight;
		this.contentBox.textFont(this.boxTextFont);
		return this;
    },
	
	// arrow to continue dialogue
    createNextArrow: function() {
		this.nextArrow = Crafty.e(this.arrowComponents);
		this.nextArrow.image(this.nextArrowImage);
		this.nextArrow.w = 15;
		this.nextArrow.h = 18;
		this.delay(function(){
			this.nextArrow.attr({
				x: this.contentBox.x + this.contentBox.w - this.nextArrow.w-10, 
				y: this.contentBox.y + this.contentBox.h - this.nextArrow.h-10, 
				alpha: 0,
			});
			this.nextArrow.velocity = this.nextArrow.velocity();
			this.nextArrow.velocity.x = 7;
			this.delay(function(){
				this.nextArrow.velocity.x = -this.nextArrow.velocity.x;
			}, 500, -1);
			this.contentBox.attach(this.nextArrow);
		}, 100);
		return this;
    },
	
	// first choice box
    createFirstChoiceBox: function() {
		this.firstChoiceBox = Crafty.e(this.boxComponents);
		this.firstChoiceBox.attr({
			x: this.contentBox.x, 
			y: this.contentBox.y + this.contentBox.h - this.choiceBoxHeight, 
			w: this.contentBox.w/2 - this.padding/2,
			h: this.choiceBoxHeight,
			alpha: 0,
		});
		this.firstChoiceBox.css(this.boxCss);
		this.firstChoiceBox.image(this.choiceBoxImage);
		this.firstChoiceBox.textColor(this.boxTextColor);
		this.boxTextFont.lineHeight = this.choiceBoxLineHeight;
		this.firstChoiceBox.textFont(this.boxTextFont);
		return this;
    },
	
	// second choice box
    createSecondChoiceBox: function() {
		this.secondChoiceBox = Crafty.e(this.boxComponents);
		this.secondChoiceBox.attr({
			x: this.contentBox.x + this.contentBox.w/2 + this.padding/2, 
			y: this.contentBox.y + this.contentBox.h - this.choiceBoxHeight, 
			w: this.contentBox.w/2 - this.padding/2,
			h: this.choiceBoxHeight,
			alpha: 0,
		});
		this.secondChoiceBox.css(this.boxCss);
		this.secondChoiceBox.image(this.choiceBoxImage);
		this.secondChoiceBox.textColor(this.boxTextColor);
		this.secondChoiceBox.textFont(this.boxTextFont);
		return this;
    },
	
	// arrow for selecting a choice
    createChoiceArrow: function() {
		this.choiceArrow = Crafty.e(this.arrowComponents);
		this.choiceArrow.image(this.choiceArrowImage);
		this.choiceArrow.w = 28;
		this.choiceArrow.h = 20;
		this.delay(function(){
			this.choiceArrow.xForFirstChoiceBox = this.firstChoiceBox.x + this.firstChoiceBox.w/2 - this.choiceArrow.w/2;
			this.choiceArrow.xForSecondChoiceBox = this.secondChoiceBox.x + this.secondChoiceBox.w/2 - this.choiceArrow.w/2;
			this.choiceArrow.attr({
				x: this.choiceArrow.xForFirstChoiceBox, 
				y: this.firstChoiceBox.y - this.choiceArrow.h/1.5, 
				alpha: 0,
			});
			this.choiceArrow.velocity = this.choiceArrow.velocity();
			this.choiceArrow.velocity.y = 7;
			this.delay(function(){
				this.choiceArrow.velocity.y = -this.choiceArrow.velocity.y;
			}, 500, -1);
		}, 100);
		return this;
    },
	
	// show the content box
    showContent: function() {
		this.contentBox.alpha = 1;
		this.nextArrow.alpha = 1;
		return this;
    },
	
	// hide the content box
    hideContent: function() {
		this.contentBox.alpha = 0;
		this.nextArrow.alpha = 0;
		return this;
    },
	
	// show the choice boxes
    showChoices: function() {
		this.contentBox.y = this.contentBoxTopY;
		this.nextArrow.alpha = 0;
		this.firstChoiceBox.alpha = 1;
		this.secondChoiceBox.alpha=  1;
		this.choiceArrow.alpha=  1;
		this.choiceArrow.x = this.choiceArrow.xForFirstChoiceBox;
		return this;
    },
	
	// hide the choice boxes
    hideChoices: function() {
		this.contentBox.y = this.contentBoxBottomY;
		this.nextArrow.alpha = this.contentBox.alpha;
		this.firstChoiceBox.alpha = 0;
		this.secondChoiceBox.alpha = 0;
		this.choiceArrow.alpha = 0;
		return this;
    },
	
	// show everything
    show: function() {
		this.showContent();
		this.showChoices();
		return this;
    },
	
	// hide everything
    hide: function() {
		this.hideContent();
		this.hideChoices();
		return this;
    },
	
	// know if choices are currently showing
    isShowingChoices: function() {
		return this.choiceArrow.alpha == 1;
    },
	
	// select first choice
    selectFirstChoice: function() {
		this.choiceArrow.x = this.choiceArrow.xForFirstChoiceBox;
		Crafty.trigger('SelectFirstChoiceDialogue');
		return this;
    },
	
	// select second choice
    selectSecondChoice: function() {
		this.choiceArrow.x = this.choiceArrow.xForSecondChoiceBox;
		Crafty.trigger('SelectSecondChoiceDialogue');
		return this;
    },
	
});