const quizData = [
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        answer: "JavaScript"
    },
    {
        question: "What does CSS stand for?",
        options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which JavaScript method is used to select an element by its ID?",
        options: ["querySelector()", "getElementById()", "getElementsByClassName()", "getElement()"],
        answer: "getElementById()"
    }
];

let currentQuestion = 0;
let score = 0;

const instructions = document.getElementById("instructions");
const quizPage = document.getElementById("quiz-page");
const quiz = document.getElementById("quiz");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const result = document.getElementById("result");
const progress = document.getElementById("progress");
const startBtn = document.getElementById("start-btn");

// Load quiz question
function loadQuiz() {
    const questionData = quizData[currentQuestion];
    progress.innerHTML = `Question ${currentQuestion + 1} of ${quizData.length}`;

    quiz.innerHTML = `
    <div class="question">${questionData.question}</div>
    <ul class="options">
      ${questionData.options.map((option) => `
        <li>
          <label>
            <input type="radio" name="answer" value="${option}">
            ${option}
          </label>
        </li>
      `).join('')}
    </ul>
  `;
}

// Start Quiz
startBtn.addEventListener("click", () => {
    instructions.style.display = "none";
    quizPage.style.display = "block";
    currentQuestion = 0;
    score = 0;
    loadQuiz();
});

// Next Button
nextBtn.addEventListener("click", () => {
    const answer = document.querySelector("input[name='answer']:checked");

    if (!answer) {
        alert("Please select an answer before proceeding!");
        return;
    }

    if (answer.value === quizData[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuiz();
    } else {
        quiz.style.display = "none";
        nextBtn.style.display = "none";
        restartBtn.style.display = "block";
        progress.style.display = "none";
        result.innerHTML = `You scored ${score} out of ${quizData.length}`;
    }
});

// Restart Button → Go back to instructions page
restartBtn.addEventListener("click", () => {
    quizPage.style.display = "none";
    instructions.style.display = "block";
    quiz.style.display = "block";
    nextBtn.style.display = "block";
    restartBtn.style.display = "none";
    result.innerHTML = "";
    progress.style.display = "block";
});