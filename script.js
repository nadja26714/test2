const questions = [
    {
        question: 'Какое самое большое животное в мире?',
        answers: [
            {text: 'Акула', correct: false},
            {text: 'Синий кит', correct: true},
            {text: 'Слон', correct: false},
            {text: 'Жираф', correct: false},
        ]
    },
    {
        question: 'Какой континент самый маленький в мире?',
        answers: [
            {text: 'Евразия', correct: false},
            {text: 'Африка', correct: false},
            {text: 'Австралия', correct: true},
            {text: 'Антарктида', correct: false},
            {text: 'Северная Америка', correct: false},
            {text: 'Южная Америка', correct: false},
        ]
    },
    {
        question:'Самая большая страна в мире?',
        answers:[
            {text:'Россия',correct:true},
            {text:'Америка',correct:false},
            {text:'Германия',correct:false},
            {text:'Китай',correct:false},
            {text:'Япония',correct:false},
        ]
    },
    {
        question:'Самая маленькая страна в мире?',
        answers:[
            {text:'Монако',correct:false},
            {text:'Италия',correct:false},
            {text:'Ватикан',correct:true}
        ]
    },
    {
        question:'Самое маленькое море в мире?',
        answers:[
            {text:'Чёрное море',correct:false},
            {text:'Балтийское море',correct:false},
            {text:'Азовское море',correct:true},
            {text:'Красное море',correct:false}
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const startButton = document.getElementById('start-quiz');
const introSection = document.getElementById('intro-section');
const quizContainer = document.querySelector('.quiz-border');

let currentQuestionIndex;
let score = 0;

startButton.addEventListener('click', () => {
   startQuiz();
});

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    nextButton.style.display = 'none'; 
    quizContainer.style.display = 'block';
    introSection.style.display = 'none';
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = (currentQuestionIndex + 1) + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.className = 'btn';
        button.addEventListener('click', () => selectAnswer(button, answer.correct));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = 'none'; 
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(button, correct) {
    if (correct) {
        button.style.backgroundColor = 'green';
        score++;
    } else {
        button.style.backgroundColor = 'red';
    }
 
    nextButton.style.display = '';
}


nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        quizContainer.style.display='none';
        introSection.style.display='none';

        document.getElementById('result-text').innerText = `${score} из ${questions.length}`;

        addResultImage(score);

        document.getElementById('result-section').style.display='block';

        document.getElementById('restart-btn').onclick = () => {
            document.getElementById('result-section').style.display='none';
            quizContainer.style.display='block';
            introSection.style.display='none';
            startQuiz();
        };
    }
});

function addResultImage(score) {
    const container = document.getElementById('result-image');
    container.innerHTML=''; 

    const img = document.createElement('img');
    img.src = `images/score-${score}.jpg`; 
    img.style.width='200px'; 

    container.appendChild(img);
}