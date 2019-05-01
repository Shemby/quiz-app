
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
        <h1>Welcome to the quiz</h1>
        <h2>When you play the game of thrones, you win or you die.</h2>
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
    <ul>
        <li>
            <input type='radio' value='0' class='choice' name='selection' required/>
            ${questions[currentQuestion].choices[0]}
        </li>
        <li>
            <input type='radio' value='1' class='choice' name='selection' required/>
            ${questions[currentQuestion].choices[1]}
        </li>
        <li>
            <input type='radio' value='2' class='choice' name='selection' required/>
            ${questions[currentQuestion].choices[2]}
        </li>
        <li>
            <input type='radio' value='3' class='choice' name='selection' required/>
            ${questions[currentQuestion].choices[3]}
        </li>
    </ul>
    </form>
    <button class='commit' type='sumbit'>Commit</button>
    `;
}

//function to move to the next question
function nextQuestion(){
    $('.next').hide();

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
    $('.commit').prop('disabled', true);
    $('.next').prop('disabled', false);
    let evaluation;
//getting a variable that contains the string of the correct answer
    let questionCurrent = questions[currentQuestion];
    let rightAnswer = questionCurrent.answer;
    let correctAnswer = questionCurrent.choices[rightAnswer];

//checking the right answer against the selected answer
    if ($('.choice:checked').val() == rightAnswer){
        currentScore++;
        evaluation = '<p>Correct</p>';
    }else{
        evaluation = `<p>Incorrect. The correct answer is: 
        "${correctAnswer}"</p>`;
    }
//displaying whether the user got the question right or wrong.
    $('.results').html(`${evaluation}<button class='next' >Continue</button>`);
    $('.next').click(nextQuestion);
}