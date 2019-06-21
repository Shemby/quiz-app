
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
        <div class='menu'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png'
            alt-'javascript logo'>
            <h2 class='heading'>Test your knowledge of JavaScript!</h2>
            <button class='start'>Begin</button>
        </div>
    `;
}

//display for current score and current question
function stats(){
    return `
    <label class='cq'>Current Question: <span class='outcome'>${currentQuestion+1}</span></label>
    <label class='score'>Current Score: <span class='outcome'>${currentScore}</span></label>
    `;
}

//placeholder for the results page
function results(){
    return `
    <div class='resultsWrapper'>
        <h1 class='heading'>your score is <span class='outcome'>${currentScore}/6</span></h1>
        <button class='restart'>play again?</button>
    </div>
    `;
}

//function to display question with choices and stats
function displayQuestions(){
    $('.display').html(renderQuestions);
    $('.stats').html(stats);
//enables submit button after choice is made
    $('input').click(function(){
        $('.commit').removeAttr('disabled','disabled');
    });
//sets up the submit button to evaluate answer
    $('.commit').on('click', submitAnswer);

    
}

//function to convert answer choices into html
function renderQuestions(){
    return `
    <form class='question-form'>
        <legend>
            <h1 class='heading'>${questions[currentQuestion].text}</h1>
        </legend>
        <fieldset>
            <label class='choice'>
                <input type='radio' value='${questions[currentQuestion].choices[0]}' name='answer' required>
                <p class='prefix'>A</p>
                <p class='selection'>${questions[currentQuestion].choices[0]}</p>
            </label>

            <label class='choice'>
                <input type='radio' value='${questions[currentQuestion].choices[1]}' name='answer' required>
                <p class='prefix'>B</p>
                <p class='selection'>${questions[currentQuestion].choices[1]}</p>
            </label>

            <label class='choice'>
                <input type='radio' value='${questions[currentQuestion].choices[2]}' name='answer' required>
                <p class='prefix'>C</p>
                <p class='selection'>${questions[currentQuestion].choices[2]}</p>
            </label>

            <label class='choice'>
                <input type='radio' value='${questions[currentQuestion].choices[3]}' name='answer' required>
                <p class='prefix'>D</p>
                <p class='selection'>${questions[currentQuestion].choices[3]}</p>
            </label>

            <div class='buttonHolder'>
                <button type='sumbit' disabled class='commit'>Submit</button>
            </div>
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
    //sends user to results page when quiz is over.
    else{ 
    $('.display').html(results);
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
//getting a variable that contains the string of the correct answer
    let questionCurrent = questions[currentQuestion];
    let rightAnswer = questionCurrent.answer;

//checking the right answer against the selected answer and then displaying feedback
    if ($('input:checked').val() == rightAnswer){
        currentScore++;
        userCorrrectAnswer();
    }
    else{
       userWrongAnswer();
    }

}

//displays feedback on correct answer submitted
function userCorrrectAnswer() {
  $('.display').html(`
    <div class='feedback'>
        <h2 class='heading'>Correct!</h2>
        <button class='heading' id='next'>Next Question</button>
    </div>
  `);
  $('.choices').html("");
  $('.stats').html("");
  $('.results').html("");
  $('#next').on('click', nextQuestion);
}

//displays feedback on incorrect answer submitted
function userWrongAnswer() {
    let questionCurrent = questions[currentQuestion];
    let rightAnswer = questionCurrent.answer;
    $('.display').html(`
    <div class='feedback'>
        <h1 class='heading'>Sorry, the correct answer was:</br></br>'<span class='outcome'>${rightAnswer}</span>'</h1>
        <button class='heading' id='next'>next</button>
    </div>
    `);
   $('.choices').html("");
   $('.stats').html("");
   $('.results').html("");
   $('#next').on('click', nextQuestion);
}
