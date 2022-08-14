/***********************************************
shared.js : shared functions between days
***********************************************/

function startDay(dayNumber){
	switch(dayNumber){
		case 1: startDay1(); break;
		case 2: startDay2(); break;
		case 3: startDay3(); break;
		case 4: startDay4(); break;
		case 5: startDay5(); break;
		
		default: console.log('startDay() : invalid day number');
	}
}