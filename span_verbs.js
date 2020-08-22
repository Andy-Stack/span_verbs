let verbs = {
    0:['Ser','To be'], 1:['Haber','To have'], 2:['Estar','To be'], 3:['Tener','To have'], 4:['Hacer','To do'], 5:['Poder','To be able'], 6:['Decir','To say'], 7:['Ir','To go'], 8:['Ver','To see'], 9:['Dar','To give'], 10:['Saber','To know'], 11:['Querer','To want'], 12:['Llegar','To arrive'], 13:['Pasar','To pass'], 14:['Deber','To owe'], 15:['Poner','To put'], 16:['Parecer','To seem'], 17:['Quedar','To stay'], 18:['Creer','To believe'], 19:['Hablar','To speak'], 20:['Llevar','To carry'], 21:['Dejar','To leave'], 22:['Seguir','To follow'], 23:['Encontrar','To find'], 24:['Llamar','To call']
}
let e_hints = {
    0:'Quiero ser alto', 1:'1', 2:'¿Quieres estar feliz?', 3:'Es bueno tener paciencia', 4:'Tengo que hacer todo', 5:'Quiero poder hablar Español', 6:'Qué quieres decir', 7:'¿Quieres ir ahora?', 8:'Voy a ver a mi amiga', 9:'Necesito darle mis llaves', 10:'¿Quieres saber la respuesta?', 11:'Siempre pareces querer una pista', 12:'Nosotros vamos a llegar mañana', 13:'Tenemos que pasar por aquí', 14:'No quiero deber dinero', 15:'Lo voy a poner sobre la mesa', 16:'Quiere parecer inteligente', 17:'Tengo que quedarme aqui', 18:'Quiero creer que entenderás esto', 19:'El profesor necesita hablar con el estudiante', 20:'¿Quieres llevar un diccionario para siempre?', 21:'¿Qué quieres dejar atrás?', 22:'No es bueno seguir a la gente', 23:'¿Estás tratando de encontrar una pista?', 24:'Necesito llamar a mi jefa'
}
let s_hints = {
    0:'I want to be tall', 1:'1', 2:'Do you want to be happy?', 3:'It is good to have patience', 4:'I have to do everything', 5:'I want to be able to speak Spanish', 6:'What do you want to say?', 7:'Do you want to go now?', 8:'I am going to see my friend', 9:'I need to give you my keys', 10:'Do you want to know the answer?', 11:'You always seem to want a hint', 12:'We are going to arrive tomorrow', 13:'We have to pass through here', 14:'I do not want to owe money', 15:'I am going to put it on the table', 16:'He wants to seem intelligent', 17:'I have to stay here', 18:'I want to believe that you will understand this', 19:'The teacher needs to speak with the student', 20:'Do you want to carry a dictionary forever?', 21:'What do you want to leave behind?', 22:'It is not good to follow people', 23:'Are you trying to find a hint?', 24:'I need to call my boss'
}

$(document).ready( () => { 
    $(function () {
        $('[data-toggle="popover"]').popover()
    })
    let language = 0;
    let wordIdx = getNextWordIdx();
    let engToSpan = false;
    let currentScore = 0;
    let highScore = localStorage.getItem('highScore');

    $('#current-score').text(`Current Streak: ${currentScore}`);
    $('#high-score').text(`Highest Streak: ${highScore || 0}`);

    nextQuestion(wordIdx,engToSpan,language);
    $('#answer').focus();
    $('#answer').keypress((e) => {if (e.which == 13){$('#submit-answer').click()}});

    $('#language').click(() => language = changeLanguage(language,engToSpan,currentScore,highScore));

    $('#submit-answer').click( () => {
        if ($('#answer').val().trim().toLowerCase() == verbs[wordIdx][engToSpan ? 0 : 1].toLowerCase()) { 
            currentScore++;
            engToSpan = !engToSpan;
            wordIdx = getNextWordIdx();
            $('#question-card').popover('hide');
            $('#question-card').fadeToggle(0);
            $('#question-card').addClass('text-white bg-success');
            $('#question-card').fadeToggle(500);
            setTimeout(() => nextQuestion(wordIdx,engToSpan,language), 1500);
            if (currentScore > highScore){highScore = currentScore; localStorage.setItem('highScore', highScore)}
        }
        else {
            currentScore = 0;
            $('#wrong-answer').fadeIn();
            setTimeout(() => $('#wrong-answer').fadeOut(), 2000);
        }
        updateScores(currentScore,highScore,language);
    })
})

function nextQuestion(wordIdx,engToSpan,language){
    $('#answer').val('');
    $('#answer').focus();
    $('#question-card').removeClass('text-white bg-success mb-3');
    $('#word-title').text(verbs[wordIdx][engToSpan ? 1 : 0]);
    $('#question-card').attr('data-content',engToSpan ? s_hints[wordIdx] : e_hints[wordIdx]);
    language ? $('#answer-title').text(`Traducir a ${engToSpan ? 'Español:' : 'Ingles:'}`)
    : $('#answer-title').text(`Translate to ${engToSpan ? 'Spanish:' : 'English:'}`);
}
function getNextWordIdx(){
    return Math.floor(Math.random() * 25); 
}
function changeLanguage(language,engToSpan,currentScore,highScore){
    if (language) {
        $('#language').text('Español');
        $('#submit-answer').text('Submit');
        $('#tip').text('Click here for an example!');
        $('#answer').attr('placeholder','Translate...');
        $('#answer-title').text(`Translate to ${engToSpan ? 'Spanish:' : 'English:'}`);
    }
    else {
        $('#language').text('English');
        $('#submit-answer').text('Enviar');
        $('#tip').text('Haga clic aquí para ver un ejemplo!');
        $('#answer').attr('placeholder','Traducir...');
        $('#answer-title').text(`Traducir a ${engToSpan ? 'Español:' : 'Ingles:'}`);
    }
    updateScores(currentScore,highScore,!language);
    $('#answer').focus();
    return !language;
}
function updateScores(currentScore,highScore,language){
    if (language) {
        $('#current-score').text(`Victorias Consecutivas: ${currentScore}`);
        $('#high-score').text(`Mejor Racha: ${highScore || 0}`);
    }
    else {
        $('#current-score').text(`Current Streak: ${currentScore}`);
        $('#high-score').text(`Highest Streak: ${highScore || 0}`);
    }
}