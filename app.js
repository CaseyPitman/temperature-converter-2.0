/*********** Temperature Conversion App ***********/

/**********
*   Data  *
***********/


const dataController = (() => { 
   let tempResults = {};

   return {
      //tempResults: { },    possibly put this here.

      calculateTemp: (temp, scale) => {

         if (scale === 'farenheit'){
            tempResults.farenheit = temp;
            tempResults.celsius = ((temp - 32) * (5 / 9));
            tempResults.kelvin = (((temp - 32) * (5 / 9)) + 273.15);
         } else if ( scale === 'celsius'){
            tempResults.farenheit = ((temp * 1.8) + 32);
            tempResults.celsius = temp;
            tempResults.kelvin = temp + 273.15;
         } else if ( scale === 'kelvin'){
            tempResults.farenheit = (((temp - 273.15) * 1.8) + 32);
            tempResults.celsius = temp - 273.15;
            tempResults.kelvin = temp;
         }
      },

      getResults: () => {
         return tempResults;
      }

   }
})();


/***************
* UI Controller*
****************/

const uiController = (() => {

   //DOMstrings
   const elements = {
     // header: document.getElementById('header'),
      body: document.getElementById('body'),
      main: document.getElementById('main'),
      wrapper: document.getElementById('wrapper'),
      tempInput: document.getElementById('input-temp'),
      results: document.getElementById('result-div'),
      farenheitResult: document.getElementById('farenheit-result'),
      celsiusResult: document.getElementById('celsius-result'),
      kelivinResult: document.getElementById('kelvin-result')
   }
   
   const colors = {
      summer: '(255, 255, 153, 0.75)',
      fall: '(205, 133, 63, 0.75)',
      winter: '(175, 238, 238, 0.75)',
      spring: '(245, 255, 250, 0.75)'
   }


   return {
   //Determines date and sets the header image based on season of the year. 
      setBackgroundImg : () => {

         let month, season, color;
        // month = new Date().getMonth();

        month = 6;
   

         //Determine which season it is.
         if (month > 1 && month< 5){  //Spring - MAR, APR, MAY
            season = `spring`;
            color =  'rgb(245, 255, 250, 0.75)';
         } else if (month > 4 && month< 8) {  //Summer - JUNE, JULY, AUG
            season = `summer`;
            color = 'rgb(135, 206, 250, 0.75)';
         } else if (month > 7 && month < 11) {   //Fall - SEPT, OCT, NOV
            season = `fall`;
            color = 'rgb(205, 133, 63, 0.75)';
         } else {                               //Winter - DEC, JAN, FEB
            season = `winter`;
            color = 'rgb(245, 255, 250, 0.75)';
         }

         //Set the background based on the season.

         body.style.backgroundImage = `url('img/${season}.jpg')`;
         console.log(color);
         wrapper.style.backgroundColor = color;

         //  background-color:rgb(245, 255, 250, 0.75);
      },

      clearInput: () => {
         //Resets input on init
         //Resets selector

      },


      getInput: () => {
         //Get input from DOM.   - ensure proper formatting


         //Get input type from DOM;  - ensure proper formatting

         //return inputs as object


      },

      displayResults: (tempResults) => {


      },

      getElements: function(){
         return elements;
      }

   }
})();



/*************
* Controller *
**************/

const controller = ((data, ui) => {
   //Get DOMstrings elements
   let elements = ui.getElements();

   //Set up event listeners

   //Calls for getting input and type

   //Calls for making the calculations

   //Calls for displaying the calculations
      //pass the temp results object


   //Return init
   return {
      init: () => {
         ui.setBackgroundImg();
         //Clear inputs
         //Reset scale selector
         //Clear results

      }
   }

})(dataController, uiController);


controller.init();





//init function 
   //clears inputs
   //resets temp selector
   //clears results

