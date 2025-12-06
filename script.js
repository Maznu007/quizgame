// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");


// (10 Questions)
const quizQuestions = [
  {
    question: "What does CPU stand for?",
    answers: [
      { text: "Central Process Unit", correct: false },
      { text: "Central Processing Unit", correct: true },
      { text: "Computer Processing Utility", correct: false },
      { text: "Control Processing Unit", correct: false },
    ],
  },
  {
    question: "Which data structure uses FIFO (First In, First Out)?",
    answers: [
      { text: "Stack", correct: false },
      { text: "Queue", correct: true },
      { text: "Tree", correct: false },
      { text: "Graph", correct: false },
    ],
  },
  {
    question: "Which programming language is primarily used for Data Science?",
    answers: [
      { text: "C++", correct: false },
      { text: "Java", correct: false },
      { text: "Python", correct: true },
      { text: "PHP", correct: false },
    ],
  },
  {
    question: "Which of the following is a NoSQL database?",
    answers: [
      { text: "MySQL", correct: false },
      { text: "PostgreSQL", correct: false },
      { text: "MongoDB", correct: true },
      { text: "Oracle DB", correct: false },
    ],
  },
  {
    question: "Which protocol is used to securely transfer data over the web?",
    answers: [
      { text: "HTTP", correct: false },
      { text: "FTP", correct: false },
      { text: "SSH", correct: false },
      { text: "HTTPS", correct: true },
    ],
  },
  {
    question: "Which one is an operating system?",
    answers: [
      { text: "GitHub", correct: false },
      { text: "Windows", correct: true },
      { text: "Python", correct: false },
      { text: "HTML", correct: false },
    ],
  },
  {
    question: "Which algorithm is commonly used for sorting?",
    answers: [
      { text: "Dijkstra's Algorithm", correct: false },
      { text: "Binary Search", correct: false },
      { text: "Merge Sort", correct: true },
      { text: "Bellman-Ford", correct: false },
    ],
  },
  {
    question: "What does API stand for?",
    answers: [
      { text: "Application Program Interface", correct: false },
      { text: "Application Programming Interface", correct: true },
      { text: "Advanced Protocol Interface", correct: false },
      { text: "Application Processing Instruction", correct: false },
    ],
  },
  {
    question: "Which of the following is a frontend JavaScript framework?",
    answers: [
      { text: "Django", correct: false },
      { text: "React", correct: true },
      { text: "Laravel", correct: false },
      { text: "Flask", correct: false },
    ],
  },
  {
    question: "Which concept is used in OOP to reuse existing code?",
    answers: [
      { text: "Encapsulation", correct: false },
      { text: "Abstraction", correct: false },
      { text: "Inheritance", correct: true },
      { text: "Polymorphism", correct: false },
    ],
  },
];


// QUIZ STATE
let currentQuestionIndex = 0;
let score = 0;
let answersBlocked = false;

totalQuestionsSpan.innerText = quizQuestions.length;
maxScoreSpan.innerText = quizQuestions.length;


// EVENT LISTENERS
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);


// FUNCTIONS

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  showQuestion();
}


function showQuestion() {
  answersBlocked = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.innerText = currentQuestionIndex + 1;

  // Update progress bar
  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  // Set question
  questionText.textContent = currentQuestion.question;
  answersContainer.innerHTML = "";

  // Create answer buttons
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.classList.add("answer-btn");
    button.textContent = answer.text;
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}


function selectAnswer(event) {
  if (answersBlocked) return;
  answersBlocked = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
  });

  // Update score
  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  // Move to next question
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}


function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Outstanding! A true Tech Wizard! ⚡";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! Strong IT knowledge! 💻";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep expanding your skills! 📚";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Keep learning and improving! 🚀";
  } else {
    resultMessage.textContent = "Don't give up! Tech mastery takes time! 🔧";
  }
}


function restartQuiz() {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
}
