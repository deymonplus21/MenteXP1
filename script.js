
const questions = [
    {
        question: "¿Quién pintó la Mona Lisa?",
        options: ["Miguel Ángel", "Donatello", "Leonardo da Vinci", "Rafael"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "¿Cuánto es 12 x 12?",
        options: ["124", "144", "112", "132"],
        answer: "144"
    }
    // Agrega aquí las demás preguntas
];

let currentQuestion = 0;
let score = 0;
let shuffledQuestions = [];
let startTime, endTime;

const loginDiv = document.getElementById('login');
const gameDiv = document.getElementById('game');
const questionDiv = document.getElementById('question');
const optionsDiv = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const resultDiv = document.getElementById('result');
const scoreDiv = document.getElementById('score');
const timerDiv = document.getElementById('timer');
const restartBtn = document.getElementById('restartBtn');
const startBtn = document.getElementById('startBtn');
const usernameInput = document.getElementById('username');

startBtn.onclick = () => {
    const username = usernameInput.value.trim();
    if (username === "") {
        alert("Ingresa tu nombre para jugar.");
        return;
    }
    loginDiv.style.display = 'none';
    gameDiv.style.display = 'block';
    startGame();
};

function startGame() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestion = 0;
    score = 0;
    startTime = new Date();
    showQuestion();
}

function showQuestion() {
    resetState();
    const question = shuffledQuestions[currentQuestion];
    questionDiv.innerText = question.question;
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = selectAnswer;
        optionsDiv.appendChild(button);
    });
}

function resetState() {
    nextBtn.style.display = 'none';
    optionsDiv.innerHTML = '';
    resultDiv.innerText = '';
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const answer = shuffledQuestions[currentQuestion].answer;
    Array.from(optionsDiv.children).forEach(button => {
        button.disabled = true;
        if (button.innerText === answer) {
            button.classList.add('correct');
        } else if (button !== selectedBtn) {
            button.classList.add('wrong');
        }
    });
    if (selectedBtn.innerText === answer) {
        score++;
        resultDiv.innerText = "¡Correcto!";
    } else {
        selectedBtn.classList.add('wrong');
        resultDiv.innerText = "Incorrecto.";
    }
    nextBtn.style.display = 'block';
}

nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < shuffledQuestions.length) {
        showQuestion();
    } else {
        endTime = new Date();
        const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
        questionDiv.innerText = "Juego terminado";
        optionsDiv.innerHTML = '';
        resultDiv.innerText = '';
        scoreDiv.innerText = `Puntuación: ${score}/${shuffledQuestions.length}`;
        timerDiv.innerText = `Tiempo: ${timeTaken} segundos`;
        nextBtn.style.display = 'none';
        restartBtn.style.display = 'block';
    }
};

restartBtn.onclick = () => {
    startGame();
    scoreDiv.innerText = '';
    timerDiv.innerText = '';
    restartBtn.style.display = 'none';
};
