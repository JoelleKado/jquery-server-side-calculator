console.log('JS is CONNECTED');

$(document).ready(readyNow);

function readyNow() {//ENTER readyNow
console.log('JQ is READY');
$('#plusButton').on('click', add);
$('#minusButton').on('click', subtract);
$('#multiplyButton').on('click', multiply);
$('#divideButton').on('click', divide);
$('#clearButton').on('click', clear);
$('#btn-submit').on('click', createMathObject);
getHistory();
}//EXIT readyNow

let mathObject = { keyThree : ''
};

function clear() {
  $('#inputOne').val('');
  $('#inputTwo').val('');
  console.log('You have cleared the input fields.');
}

function getHistory() {//ENTER getHistory
  //console.log('ENTER getHistory');
  $.ajax({
      method: 'GET',
      url: '/history'
  }).then(function (response) {
    let history = response
      console.log('Got history from SERVER:', history);
      renderHistory(history);
  }).catch(function (error) {
      //log th error and alert the user
      console.log('Error', error);
      alert('Something went wrong.')
  })
}//EXIT getHistory

function renderHistory(history) {//ENTER renderHistory
  console.log('rendering history'); 
  
  $('#historySection').empty();
  for (let article of history) {
  firstNumber = article.keyOne ;
  secondNumber =  article.keyTwo;
  operator = article.keyThree;
  answer = article.keyFour; 
  $('#historySection').append(`<li>${firstNumber} ${operator} ${secondNumber} = ${answer}</li>`)
  }
};//EXIT renderHistory

function divide(event) {//ENTER divide
  event.preventDefault();

  console.log('ENTER divide');
mathObject.keyThree = '/';
};//EXIT divide

function multiply(event) {//ENTER multiply
  event.preventDefault();

  console.log('ENTER multiply');
mathObject.keyThree = '*';
};//EXIT multiply

function subtract(event) {//ENTER subtract
  event.preventDefault();
  console.log('ENTER subtract');
mathObject.keyThree = '-';
};//EXIT subtract

function add(event) {//ENTER add
  event.preventDefault();

  console.log('ENTER add');
mathObject.keyThree = '+';
};//EXIT add

function createMathObject (event) {//ENTER createMathObjectFunction
  event.preventDefault();
  console.log('ENTER createMathObject');
  
  //prevent user from neglecting input fields.

  if($('#inputOne').val() === '' || $('#inputTwo').val() === '' || mathObject.keyThree === ''){
    alert('Enter values into the input fields and select an operator');
  } else {
    //move values from input fields into mathObject
    let valueOne = $('#inputOne').val();
    let valueTwo = $('#inputTwo').val();

    mathObject.keyOne = valueOne;
    mathObject.keyTwo = valueTwo;

    //empty input fields 
    $('#inputOne').val('');
    $('#inputTwo').val('');
    console.log('This is our mathObject:', mathObject);
    //append math expression to DOM
    //$('#historySection').append(`<li>${valueOne}  ${valueTwo}</li>`)
    sendMathObject();
  }
};//EXIT createMathObjectFunction

function sendMathObject() {//ENTER sendMathObject
  console.log('ENTER sendMathObject');
  $.ajax({
      method: 'POST',
      url: '/math',
      data: mathObject
  }).then(function (response) {
        //then is run if we get a good response from server
        console.log('mathObject made it to the SERVER', response);
        //empty keyThree of our sendMathObject
        mathObject.keyThree = ''
        getHistory();
        //get all cats again, so we see the update 
        //clear input
        //  $('#in-name').val('');
        retrieveAnswer()
    }).catch(function(error) {
        //catch is run if there is a bad response from server
        //log th error and alert the user
        console.log('Error', error);
        alert('Something went wrong.')
    })
}//EXIT sendMathObject

function retrieveAnswer() {//ENTER retrieveAnswer
  console.log('ENTER retrieveAnswer');
  $.ajax({
      method: 'GET',
      url: '/answer'
  }).then(function (response) {
    let mathArray = response
      console.log('Got mathArray from SERVER:', mathArray);
      renderAnswer(mathArray)
  }).catch(function (error) {
      //log th error and alert the user
      console.log('Error', error);
      alert('Something went wrong.')
  })
}//EXIT retrieveAnswer

function renderAnswer(mathArray) {//ENTER renderAnswer
    console.log('Here is the mathArray we got from the server',  mathArray);
    //append to the DOM
    $('#equationSection').empty();
    for (let equation of mathArray){
      $('#equationSection').append(`<h2>${equation.keyOne} ${equation.keyThree} ${equation.keyTwo} = ${equation.keyFour}</h2>` );
    }
}//EXIT renderAnswer