/*********** Temperature Conversion App ***********/

/**********
*   Data  *
***********/


const dataController = (() => { 

   return {
   
      calculateTemp: (temp, scale) => {
         let tempResults = {};
         if (scale === 'farenheit'){
            tempResults.farenheit = temp;
            tempResults.celsius = ((temp - 32) / 1.8);
            tempResults.kelvin = (((temp - 32) / (1.8)) + 273.15);
         } else if ( scale === 'celsius'){
            tempResults.farenheit = ((temp * 1.8) + 32);
            tempResults.celsius = temp;
            tempResults.kelvin = temp + 273.15;
         } else if ( scale === 'kelvin'){
            tempResults.farenheit = (((temp - 273.15) * 1.8) + 32);
            tempResults.celsius = temp - 273.15;
            tempResults.kelvin = temp;
         }
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
      tempScale: document.getElementById('input-temp-scale'),
      convertBtn: document.getElementById('convert-btn'),
      results: document.getElementById('result-div'),
      farenheitResult: document.getElementById('farenheit-result'),
      celsiusResult: document.getElementById('celsius-result'),
      kelvinResult: document.getElementById('kelvin-result'),
      resetButton: document.getElementById('clear-btn')
   }
   
   const colors = {
      summer: '(255, 255, 153, 0.8)',
      fall: '(205, 133, 63, 0.8)',
      winter: '(175, 238, 238, 0.8)',
      spring: '(245, 255, 250, 0.8)'
   }

   return {
   //Determines date and sets the header image based on season of the year. 
      setBackgroundImg : () => {

         let month, season, color;
        // month = new Date().getMonth();

        month = 9;

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

         elements.body.style.backgroundImage = `url('img/${season}.jpg')`;
        // console.log(color);
         elements.wrapper.style.backgroundColor = color;

         //  background-color:rgb(245, 255, 250, 0.75);
      },

      clearInput: () => {
         //Clear temp input

         //Clear scale input

         //Clear results

      },

      getInput: () => {
         let inputs = {};
         let temp, scale;
         // console.log('parsed temp', temp)
         //Get temp input from DOM.
         temp = elements.tempInput.value;
         scale = elements.tempScale.value;
         // console.log(`${temp} degrees ${scale}`)

         if (Number.isNaN(parseFloat(temp))){   //Input is NaN
            alert('Please enter the temperature in the form of a number');
            return;
         } else if (scale === 'selected'){    //User does not select temp. scale.
            alert('Please select a temperature scale.');
            return;
         } else {
            inputs.temp = parseFloat(temp, );
            inputs.scale = scale;
         }
      
         return inputs;
      },

      displayResults: (results) => {
         let farenheit, celsius, kelvin;

         farenheit = results.farenheit.toFixed(1);
         celsius = results.celsius.toFixed(1);
         kelvin = results.kelvin.toFixed(2);

/*       console.log (`${farenheit} degrees Farenheit.`);
         console.log (`${celsius} degrees Celsius.`);
         console.log (`${kelvin} degrees Kelvin.`); */

         //Display converted temperatures
         elements.farenheitResult.innerText = `${farenheit} degrees Farenheit.`;
         elements.celsiusResult.innerText = `${celsius} degrees Celsius.`;
         elements.kelvinResult.innerText = `${kelvin} degrees Kelvin.`;

         //Show reset button


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
   let results, inputs, elements;


   //Set up event listeners
   setUpEventListeners = function(){   
      //Get DOMstrings elements
      elements = ui.getElements();
      
      elements.convertBtn.addEventListener('click', convert);
      
      document.addEventListener('keypress', function(event){
         if (event.keyCode === 13 || event.which === 13){
            convert();
         }
      });
   };
   
   //Calls for making the calculations
   convert = () => {
      
      inputs = ui.getInput();

      // console.log('controller', inputs);
      if (inputs === undefined){       //User did not input correctly
         return;                       //Wait for proper input
      } else {
         //Call for caluclation
         results = dataController.calculateTemp(inputs.temp, inputs.scale);
      }
      uiController.displayResults(results);

   }

   //Return init
   return {
      init: () => {
         ui.setBackgroundImg();
         setUpEventListeners();

         //Reset scale selector
         //Clear results
         //hide reset button

      }
   }

})(dataController, uiController);


controller.init();




