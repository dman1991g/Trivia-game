let questions = [];
let currentQuestionIndex = 0;
let score = 0;

document.addEventListener('DOMContentLoaded', () => {
  loadQuestions();
});

async function loadQuestions() {
  try {
    const response = await fetch('questions.json');
    questions = await response.json();
    showQuestion();
  } catch (error) {
    console.error("Error loading questions:", error);
  }
}

function showQuestion() {
  const questionElement = document.getElementById('question-text');
  const answerButtons = document.getElementById('answer-buttons');
  const nextButton = document.getElementById('next-button');

  // Clear previous answers
  answerButtons.innerHTML = '';
  nextButton.style.display = 'none';

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('answer-button');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}

function selectAnswer(event) {
  const selectedButton = event.target;
  const correct = selectedButton.dataset.correct === 'true';
  if (correct) {
    score++;
  }

  document.getElementById('score-display').textContent = `Score: ${score}`;

  Array.from(document.getElementsByClassName('answer-button')).forEach(button => {
    button.classList.add(button.dataset.correct === 'true' ? 'correct' : 'incorrect');
    button.disabled = true;
  });

  document.getElementById('next-button').style.display = 'block';
}

function loadNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showFinalScore();
  }
}

function showFinalScore() {
  document.getElementById('question-container').innerHTML = `<p>Final Score: ${score} / ${questions.length}</p>`;
  document.getElementById('next-button').style.display = 'none';
}
