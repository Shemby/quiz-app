
//variables to hold what question the user is on and how many
//questions they've answered correctly
let currentQuestion =0;
let currentScore=0;

//calling initialization function

quizInit();

//initialize the quiz and display a menu
function quizInit(){
    currentQuestion=0;
    currentScore=0;
    $('.display').html(menu);
    $('.start').on('click', displayQuestions);
}

//html for the menu
function menu(){
    return `
        <h2 class='greeting'>Get ready to test your knowledge </br> of the world of ice and fire!</h2>
        <button class='start'>Begin</button>
    `;
}

//placeholder for current score and questions
function stats(){
    return `
    <label>current question: ${currentQuestion+1}</label>
    <label>current score: ${currentScore}</label>
    `;
}

//placeholder for the results page
function results(){
    return `
    <h1>your score is ${currentScore}/5</h1>
    <button class='restart'>play again?</button>
    `;
}

//functions to display questions
function renderQuestions(){
    return `
        <h1>${questions[currentQuestion].text}</h1>
    `;
}

function displayQuestions(){
    $('.display').html(renderQuestions);
    $('.choices').html(renderChoices);
    $('.stats').html(stats);
    $('.commit').on('click', submitAnswer);

    
}

//function to display answer choices
function renderChoices(){
    return `
    <form class='question-form'>
    <fieldset>
    <label class='choice'>
    <input type='radio' value='${questions[currentQuestion].choices[0]}' name='answer' required>
    <span>${questions[currentQuestion].choices[0]}</span>
    </label>
    <label class='choice'>
    <input type='radio' value='${questions[currentQuestion].choices[1]}' name='answer' required>
    <span>${questions[currentQuestion].choices[1]}</span>
    </label>
    <label class='choice'>
    <input type='radio' value='${questions[currentQuestion].choices[2]}' name='answer' required>
    <span>${questions[currentQuestion].choices[2]}</span>
    </label>
    <label class='choice'>
    <input type='radio' value='${questions[currentQuestion].choices[3]}' name='answer' required>
    <span>${questions[currentQuestion].choices[3]}</span>
    </label>
    <button type='sumbit' class='commit'>Submit</button>
    </fieldset>
    </form>
    `;
}

//function to move to the next question
function nextQuestion(){
    $('.next').hide();
    $('.results').hide();

    if(currentQuestion < questions.length-1)
    {
    currentQuestion++;
    displayQuestions();
    }
    else{ 
    $('.display').html(results);
    $('.choices').html("");
    $('.stats').html("");
    $('.results').html("");
    $('.restart').click(quizInit);
    }
}

//function to handle submitting answers.
function submitAnswer(event){
    event.preventDefault();
    $('.results').show();
    $('.commit').prop('disabled', true);
    $('.next').prop('disabled', false);
    let evaluation;
//getting a variable that contains the string of the correct answer
    let questionCurrent = questions[currentQuestion];
    let rightAnswer = questionCurrent.answer;

//checking the right answer against the selected answer
    if ($('input:checked').val() == rightAnswer){
        currentScore++;
        userCorrrectAnswer();
    }
    else{
       userWrongAnswer();
    }

}

function userCorrrectAnswer() {
  $('.display').html(`
    <div class='correctFeedback'>
        <h2>'That is correct!'</h2>
        <img class='correcto' src='http://images5.fanpop.com/image/photos/24500000/1x02-The-Kingsroad-tyrion-lannister-24546620-1280-720.jpg'/>
        <button class='next'>Next Question</button>
    </div>
  `);
  $('.choices').html("");
  $('.stats').html("");
  $('.results').html("");
  $('.next').on('click', nextQuestion);
}

function userWrongAnswer() {
    $('.display').html(`
    <div class='incorrectFeedback'>
        <h2>'You chose poorly...'</h2>
        <img class='wrongo' src='https://hips.hearstapps.com/mac.h-cdn.co/assets/17/34/1503507203-1503473449-jon-snow-dead.jpg'/>
        <button class='next'>Next Question</button>
    </div>
    `);
   $('.choices').html("");
   $('.stats').html("");
   $('.results').html("");
   $('.next').on('click', nextQuestion);
}
