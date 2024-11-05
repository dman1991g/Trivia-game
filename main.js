// Element references
const startButton = document.getElementById('start-button');
const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');

// Quiz data
let questions = [];
let currentQuestionIndex = 0;

// Fetch questions from questions.json
async function loadQuestions() {
  try {
    const response = await fetch('questions.json');
    questions = await response.json();
    questions = Object.values(questions); // Convert JSON object to an array
  } catch (error) {
    console.error("Error loading questions:", error);
  }
}

// Start the quiz
function startQuiz() {
  startButton.style.display = 'none';
  quizContainer.style.display = 'block';
  currentQuestionIndex = 0;
  showQuestion();
}

// Display a question
function showQuestion() {
  resetState();
  const question = questions[currentQuestionIndex];
  questionText.innerText = question.question;

  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer;
    button.classList.add('btn');
    if (answer === question.correctAnswer) {
      button.dataset.correct = true;
    }
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}

// Reset state for new question
function resetState() {
  nextButton.style.display = 'none';
  answerButtons.innerHTML = '';
}

// Handle answer selection
function selectAnswer(event) {
  const selectedButton = event.target;
  const correct = selectedButton.dataset.correct === 'true';
  setStatusClass(selectedButton, correct);

  Array.from(answerButtons.children).forEach(button => {
    setStatusClass(button, button.dataset.correct === 'true');
  });

  if (questions.length > currentQuestionIndex + 1) {
    nextButton.style.display = 'block';
  } else {
    startButton.innerText = 'Restart';
    startButton.style.display = 'block';
  }
}

// Set the button style based on correctness
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('incorrect');
  }
}

// Clear status classes
function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('incorrect');
}

// Move to the next question
function nextQuestion() {
  currentQuestionIndex++;
  showQuestion();
}

// Event listeners
startButton.addEventListener('click', async () => {
  await loadQuestions();
  startQuiz();
});

nextButton.addEventListener('click', () => {
  nextQuestion();
});