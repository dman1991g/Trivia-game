// Variables to hold the quiz state
let questions = []; // Will hold the loaded questions from JSON
let currentQuestionIndex = 0;

// Get HTML elements
const startButton = document.getElementById('start-button');
const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');

// Load questions from JSON file
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = Object.values(data); // Convert JSON object to array
    })
    .catch(error => console.error('Error loading questions:', error));

// Start the quiz
startButton.addEventListener('click', startQuiz);

function startQuiz() {
    startButton.style.display = 'none'; // Hide start button
    quizContainer.style.display = 'block'; // Show quiz container
    currentQuestionIndex = 0;
    showQuestion();
}

// Display the current question and answer choices
function showQuestion() {
    // Clear any previous answers
    answerButtons.innerHTML = '';
    nextButton.style.display = 'none'; // Hide next button initially

    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question; // Set question text

    // Create answer buttons
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('btn');
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(button, currentQuestion.correctAnswer));
        answerButtons.appendChild(button);
    });
}

// Handle answer selection
function selectAnswer(selectedButton, correctAnswer) {
    // Disable all answer buttons after selection
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.textContent === correctAnswer) {
            button.classList.add('correct'); // Highlight correct answer
        } else {
            button.classList.add('incorrect'); // Highlight incorrect answers
        }
    });

    if (currentQuestionIndex < questions.length - 1) {
        nextButton.style.display = 'inline-block'; // Show next button if there are more questions
    } else {
        nextButton.textContent = 'Finish'; // Change to "Finish" on the last question
    }
}

// Move to the next question
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(); // Show next question
    } else {
        quizContainer.innerHTML = '<h2>Quiz Completed!</h2>'; // Show completion message
    }
});