// Selecting elements from the DOM
const startButton = document.getElementById('start-button');
const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');

let questions = [];
let currentQuestionIndex = 0;

// Load questions from JSON file
async function loadQuestions() {
  try {
    const response = await fetch('questions.json');
    if (!response.ok) throw new Error("Failed to load questions.json");
    questions = await response.json();
    questions = Object.values(questions); // Convert to an array
    console.log("Questions loaded:", questions);
  } catch (error) {
    console.error("Error loading questions:", error);
  }
}

// Start quiz function
async function startQuiz() {
  await loadQuestions();
  currentQuestionIndex = 0;
  startButton.style.display = 'none';  // Hide start button
  quizContainer.style.display = 'block'; // Show quiz container
  showQuestion();
}

// Show the current question
function showQuestion() {
  resetState();  // Reset state for new question

  const question = questions[currentQuestionIndex];
  questionText.innerText = question.question;

  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer;
    button.classList.add('btn');
    button.addEventListener('click', () => selectAnswer(button, question.correctAnswer));
    answerButtons.appendChild(button);
  });
}

// Reset state for a new question
function resetState() {
  nextButton.style.display = 'none';  // Hide next button initially
  answerButtons.innerHTML = '';  // Clear any old answers
}

// Handle answer selection
function selectAnswer(selectedButton, correctAnswer) {
  const isCorrect = selectedButton.innerText === correctAnswer;
  selectedButton.classList.add(isCorrect ? 'correct' : 'incorrect');

  // Disable all answer buttons after selection
  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if (button.innerText === correctAnswer) {
      button.classList.add('correct');  // Highlight the correct answer
    }
  });

  nextButton.style.display = 'block'; // Show next button after answer selection
}

// Move to the next question
function showNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showQuizEnd();
  }
}

// End the quiz
function showQuizEnd() {
  quizContainer.innerHTML = `<p>Quiz Complete! You've answered all questions.</p>`;
}

// Event listeners
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', showNextQuestion);