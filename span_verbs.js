//global variables
var currentScore = 0;
var highScore = localStorage.getItem('highScore') || 0;
var wordIdx = 0;
var engToSpan = true; //true = user must translate from english to spanish
var language = 'english';

$(document).ready( () => { 
    //setup game
    $('#current-score').text(`Current Streak: ${currentScore}`);
    $('#high-score').text(`Highest Streak: ${highScore}`);
    nextQuestion();

    //call change language and set current language to return value
    $('#language').click(() => changeLanguage());

    //answer submission
    $('#submit-answer').click( () => submitAnswer());
    $('#answer').keypress((e) => {if (e.which == 13){submitAnswer()}});
    
    //skip question
    $('#skip-question').click( () => skipQuestion());
})

// <--- utility functions --->

// <--- choose translation at random --->
function getNextWordIdx(){
    return Math.floor(Math.random() * 25); 
}

// <--- retrieve next question --->
function nextQuestion(){
    engToSpan = !engToSpan;
    wordIdx = getNextWordIdx();
    $('#answer').val('');
    $('#answer').focus();
    $('#question-card').removeClass('text-white bg-success bg-warning');

    //access verb object, access either eng or span array, set text to random word from array (capitalised)
    const wordsArray = verbs[wordIdx][engToSpan ? 1 : 0];
    const words = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    $('#word-title').text(capitalise(words));

    //set instructions based on language setting
    language == 'spanish' ? $('#answer-title').text(`Traducir a ${engToSpan ? 'Español:' : 'Ingles:'}`)
    : $('#answer-title').text(`Translate to ${engToSpan ? 'Spanish:' : 'English:'}`);
}
function capitalise(words){
    return words.replace(/\w+\S/g, (word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase());
}

// <--- submit answer --->
function submitAnswer(){
    //check if answer is correct
    if (verbs[wordIdx][engToSpan ? 0 : 1].includes($('#answer').val().trim().toLowerCase())) { 
        currentScore++;
        $('#question-card').addClass('text-white bg-success');
        setTimeout(() => nextQuestion(), 1500);
        //update highscore if necessary
        if (currentScore > highScore){
            highScore = currentScore; 
            localStorage.setItem('highScore', highScore)
        }
    }
    else {
        currentScore = 0;
        $('#wrong-answer').fadeIn();
        setTimeout(() => $('#wrong-answer').fadeOut(), 2000);
    }
    updateScores();
}

// <--- skip question --->
function skipQuestion(){
    currentScore = 0;
    $('#question-card').addClass('bg-warning');
    $('#word-title').text(capitalise(verbs[wordIdx][engToSpan ? 0 : 1][0]));
    setTimeout(() => nextQuestion(), 3000);
}

// <--- toggle application language --->
function changeLanguage(){
    if (language == 'spanish') {
        language = 'english';
        $('#language').text('Español');
        $('#submit-answer').text('Submit');
        $('#answer').attr('placeholder','Translate...');
        $('#answer-title').text(`Translate to ${engToSpan ? 'Spanish:' : 'English:'}`);
    }
    else {
        language = 'spanish';
        $('#language').text('English');
        $('#submit-answer').text('Enviar');
        $('#answer').attr('placeholder','Traducir...');
        $('#answer-title').text(`Traducir a ${engToSpan ? 'Español:' : 'Ingles:'}`);
    }
    updateScores();
    $('#answer').focus();
}

// <--- update score (language setting checked) --->
function updateScores(){
    if (language == 'spanish') {
        $('#current-score').text(`Victorias Consecutivas: ${currentScore}`);
        $('#high-score').text(`Mejor Racha: ${highScore}`);
    }
    else {
        $('#current-score').text(`Current Streak: ${currentScore}`);
        $('#high-score').text(`Highest Streak: ${highScore}`);
    }
}