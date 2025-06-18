
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
    },
    {
        question: "¿Cuál es el valor de π al décimo decimal?",
        options: ["3.1415926535", "3.1415926536", "3.1415926534", "3.1415926533"],
        answer: "3.1415926535"
    },
    {
        question: "¿Cuál es la derivada de sin(x)?",
        options: ["cos(x)", "-cos(x)", "-sin(x)", "tan(x)"],
        answer: "cos(x)"
    },
    {
        question: "¿Cuál es la integral de 1/x dx?",
        options: ["ln|x| + C", "e^x + C", "1/x + C", "x ln(x) + C"],
        answer: "ln|x| + C"
    },
    {
        question: "¿Cuál es la raíz cúbica de 27?",
        options: ["9", "3", "6", "1"],
        answer: "3"
    },
    {
        question: "¿Cuánto es 12 factorial (12!)?",
        options: ["479001600", "39916800", "6227020800", "3628800"],
        answer: "479001600"
    },
    {
        question: "¿Cuál es el límite de (1 + 1/n)^n cuando n tiende a infinito?",
        options: ["e", "1", "0", "ln(2)"],
        answer: "e"
    },
    {
        question: "¿Qué teorema establece que a^2 + b^2 = c^2 en un triángulo rectángulo?",
        options: ["Teorema de Pitágoras", "Teorema de Thales", "Teorema de Gauss", "Teorema de Pascal"],
        answer: "Teorema de Pitágoras"
    },
    {
        question: "¿Cuál es el número primo más pequeño mayor que 100?",
        options: ["101", "103", "107", "109"],
        answer: "101"
    },
    {
        question: "¿Qué es un número irracional?",
        options: ["No puede expresarse como fracción", "Es un número entero", "Es un número par", "Tiene raíz entera"],
        answer: "No puede expresarse como fracción"
    },
    {
        "question": "¿En qué año inició la Primera Guerra Mundial?",
        "options": ["1912", "1914", "1916", "1918"],
        "answer": "1914"
    },
    {
        "question": "¿Quién fue el primer emperador romano?",
        "options": ["Julio César", "Augusto", "Nerón", "Trajano"],
        "answer": "Augusto"
    },
    {
        "question": "¿Qué significa DPCC?",
        "options": ["Desarrollo Personal, Ciudadanía y Cívica", "Derecho Penal Civil y Comercial", "Desarrollo Personal y Convivencia Ciudadana", "Derecho Público Constitucional"],
        "answer": "Desarrollo Personal, Ciudadanía y Cívica"
    },
    {
        "question": "¿Qué derecho garantiza la libertad de expresión?",
        "options": ["Derecho Civil", "Derecho Constitucional", "Derecho Penal", "Derecho Laboral"],
        "answer": "Derecho Constitucional"
    },
    {
        "question": "What is the past participle of 'go'?",
        "options": ["Goes", "Went", "Gone", "Going"],
        "answer": "Gone"
    },
    {
        "question": "Which word is a synonym for 'quick'?",
        "options": ["Slow", "Fast", "Lazy", "Calm"],
        "answer": "Fast"
    },
    {
        "question": "¿Cuántos jugadores hay en un equipo de voleibol?",
        "options": ["5", "6", "7", "9"],
        "answer": "6"
    },
    {
        "question": "¿Qué deporte es conocido como el 'rey de los deportes'?",
        "options": ["Fútbol", "Béisbol", "Baloncesto", "Atletismo"],
        "answer": "Fútbol"
    },
    {
        "question": "¿Cuántos libros tiene el Antiguo Testamento?",
        "options": ["27", "39", "46", "66"],
        "answer": "46"
    },
    {
        "question": "¿Quién fue el profeta que sobrevivió en un foso de leones?",
        "options": ["Isaías", "Daniel", "Jeremías", "Ezequiel"],
        "answer": "Daniel"
    },
    {
        "question": "¿Qué científico desarrolló la teoría de la relatividad?",
        "options": ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Niels Bohr"],
        "answer": "Albert Einstein"
    },
    {
        "question": "¿Cuál es el elemento químico con símbolo 'Fe'?",
        "options": ["Plomo", "Hierro", "Flúor", "Francio"],
         "answer": "Hierro"
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
