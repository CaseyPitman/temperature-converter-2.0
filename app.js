/*********** Temperature Conversion App ***********/


let state = { };



/***************
* UI Controller*
****************/


//DOMstrings
const elements = {
   header: document.getElementById('header'),
   tempInput: document.getElementById('input-temp'),
   results: document.getElementById('result-div'),
   farenheitResult: document.getElementById('farenheit-result'),
   celsiusResult: document.getElementById('celsius-result'),
   kelivinResult: document.getElementById('kelvin-result')
}


//Determines date and sets the header image based on season of the year. 
const setBackgroundImg = () => {

   let month, season, imgSrc;
   month = new Date().getMonth();

   //Determine which season it is.
   if (month > 1 && month< 5){  //Spring - MAR, APR, MAY
      season = `spring`;
   } else if (month > 4 && month< 8) {  //Summer - JUNE, JULY, AUG
      season = `summer`;
   } else if (month > 7 && month < 11) {   //Fall - SEPT, OCT, NOV
      season = `fall`;
   } else {                               //Winter - DEC, JAN, FEB
      season = `winter`;
   }

   //Set the background based on the season.
   elements.header.insertAdjacentHTML('beforeend', `<img src="img/${season}.jpg" alt="${season} image" class="header-img">`)
   
   
}

//Gets input temperature from UI

//Gets input type from UI

//Displays results on UI




/**********
*   Data  *
***********/

//Calculates converted temperatures

//Calculates Farenheit

//Calculates Celsius

//Calculates Kelvin




/*************
* Controller *
**************/


const init = () => {
   setBackgroundImg();
}

init();

//init function 
   //clears inputs
   //resets temp selector
   //clears results

