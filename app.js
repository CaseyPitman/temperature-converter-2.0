/*********** Temperature Conversion App ***********/


/**********
*   Data  *
***********/

const dataController = (() => { 

   return {
      //Convert the given temp to all scales. 
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
      body: document.getElementById('body'),
      main: document.getElementById('main'),
      wrapper: document.getElementById('wrapper'),
      tempInput: document.getElementById('input-temp'),
      tempScale: document.getElementById('input-temp-scale'),
      convertBtn: document.getElementById('convert-btn'),
      farenheitResult: document.getElementById('farenheit-result'),
      celsiusResult: document.getElementById('celsius-result'),
      kelvinResult: document.getElementById('kelvin-result'),
      resetButton: document.getElementById('clear-btn')
   }

   return {

      //Determines date and sets the header image based on season of the year. 
      setBackgroundImg : () => {
         let month, season, color;
         month = new Date().getMonth();

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

         //Set the background image based on the season.
         elements.body.style.backgroundImage = `url('img/${season}.jpg')`;

         //Set the background color based on the season
         elements.wrapper.style.backgroundColor = color;
      },

      clearDisplay: () => {
         //Clear temp input
         elements.tempInput.value = '';
        
         //Clear scale input
         elements.tempScale.value = 'selected';
    
         //Clear results
         elements.farenheitResult.innerText = 'Farenheit';
         elements.celsiusResult.innerText = 'Celsius';
         elements.kelvinResult.innerText = 'Kelvin';

         //Hide results
         elements.farenheitResult.style.visibility = 'hidden';
         elements.celsiusResult.style.visibility = 'hidden';
         elements.kelvinResult.style.visibility = 'hidden';

         //Hide the reset button
         elements.resetButton.style.visibility = 'hidden';
      },

      getInput: () => {
         let inputs = {};
         let temp, scale;
         
         //Get temp input from DOM.
         temp = elements.tempInput.value;
         scale = elements.tempScale.value;

         if (Number.isNaN(parseFloat(temp))){   //Input is NaN
            alert('Please enter the temperature in the form of a number');
            return;
         } else if (scale === 'selected'){    //User does not select temp. scale.
            alert('Please select a temperature scale.');
            return;
         } else {      //Proper inputs given. 
            inputs.temp = parseFloat(temp, );
            inputs.scale = scale;
         }
      
         return inputs;
      },

      displayResults: (results) => {
         let farenheit, celsius, kelvin;

         //Limit decimal places of results
         farenheit = results.farenheit.toFixed(1);
         celsius = results.celsius.toFixed(1);
         kelvin = results.kelvin.toFixed(2);

         //Display converted temperatures
         elements.farenheitResult.innerText = `${farenheit} degrees Farenheit.`;
         elements.celsiusResult.innerText = `${celsius} degrees Celsius.`;
         elements.kelvinResult.innerText = `${kelvin} degrees Kelvin.`;

         //Make results visible
         elements.farenheitResult.style.visibility = 'visible';
         elements.celsiusResult.style.visibility = 'visible';
         elements.kelvinResult.style.visibility = 'visible';

         //Show reset button
         elements.resetButton.style.visibility = 'visible';

      },

      //Retrieve DOM strings for elements
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
      
      //Call for conversion
      elements.convertBtn.addEventListener('click', convert);
      document.addEventListener('keypress', function(event){
         if (event.keyCode === 13 || event.which === 13){
            convert();
         }
      });

      //Reset the display
      elements.resetButton.addEventListener('click', ui.clearDisplay);
   };
   
   //Make conversion
   convert = () => {
      //Call to retrieve input
      inputs = ui.getInput();

      if (inputs === undefined){       //User did not input correctly
         return;                       //Wait for proper input
      } else {
         //Call for caluclation
         results = data.calculateTemp(inputs.temp, inputs.scale);
      }
      //Call to display results.
      ui.displayResults(results);
   }

   //Init function
   return {
      init: () => {
         ui.setBackgroundImg();
         setUpEventListeners();
         ui.clearDisplay();
      }
   }

})(dataController, uiController);

//Initialize on load or reset
controller.init();