const questions = [
    { question: "What is the capital of France?", answers: ["Berlin", "Madrid", "Paris", "Rome"], correct: "Paris" },
    { question: "What is 2 + 2?", answers: ["3", "4", "5", "6"], correct: "4" },
    { question: "Which planet is known as the Red Planet?", answers: ["Earth", "Mars", "Jupiter", "Saturn"], correct: "Mars" },
    { question: "What is the largest ocean?", answers: ["Atlantic", "Indian", "Pacific", "Arctic"], correct: "Pacific" },
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.innerHTML = "";
    nextButton.style.display = "none";
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(questionData) {
    questionElement.innerText = questionData.question;
    answerButtons.innerHTML = "";
    questionData.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("btn", "answer-btn");
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedAnswer = e.target.innerText;
    const correctAnswer = questions[currentQuestionIndex].correct;
    
    if (selectedAnswer === correctAnswer) {
        score++;
        e.target.style.backgroundColor = "#4caf50"; // Correct answer color
    } else {
        e.target.style.backgroundColor = "#f44336"; // Incorrect answer color
    }

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.innerText === correctAnswer) {
            button.style.backgroundColor = "#4caf50"; // Show correct answer
        }
    });

    nextButton.style.display = "block";
}

function showResult() {
    questionContainer.style.display = "none";
    nextButton.style.display = "none";
    resultContainer.innerHTML = `You scored ${score} out of ${questions.length}`;
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.style.display = "none";
    } else {
        showResult();
    }
});

startQuiz();
