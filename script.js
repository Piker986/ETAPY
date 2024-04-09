const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const  resultBox= document.querySelector('.result-box');

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if(questionCount < questions.length - 1){
        questionCount++;
        showQuestions(questionCount);

        questionNumb ++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');
    }else{
        console.log("dziala")
        showresultBox();
    }

}
const optionList = document.querySelector('.option-list');

function showQuestions(index){
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].questions}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML= optionTag;

    const options = document.querySelectorAll('.option');
    for (let i = 0; i < options.length; i++) {
        options[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

function optionSelected(answer){
    let userAnswer = answer.textContent;
    let allOptions = optionList.children;


    if (userAnswer === correctAnswer){
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    } else {
       
        answer.classList.add('incorrect');
    }


    for (let i = 0; i < allOptions.length; i++) {
        if (allOptions[i].textContent === correctAnswer) {
            allOptions[i].classList.add('correct');
        }
    }

    for (let i = 0; i < allOptions.length; i++) {
        allOptions[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
}

function questionCounter(index){
    const questionsTotal = document.querySelector('.question-total');
    questionsTotal.textContent = `${index} z ${questions.length} Pytań`;
}

function headerScore(){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Wynik: ${userScore}/${questions.length}`;
}

function showresultBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Wynik: ${userScore}/${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = 0;
    let progressEndValue = (userScore / questions.length) *100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent =`${progressStartValue}%`

        circularProgress.style.background = `conic-gradient(#c40094 ${ progressStartValue * 3.6}deg , rgba(255, 255, 255, .1)0deg)`;
        if (progressStartValue == progressEndValue){
            clearInterval(progress)
        }
    }, speed);
}