document.getElementById('start-button').addEventListener('click', startQuiz);

let questions = []; // Empty array to store the questions
let currentQuestionIndex = 0;
let score = 0;

// Fetch questions from questions.json
function loadQuestions() {
    fetch('questions.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON
        })
        .then(data => {
            questions = data; // Store questions in the questions array
            console.log('Questions loaded:', questions); // Debugging line
            startQuiz(); // Automatically start the quiz after questions are loaded
        })
        .catch(error => {
            console.error('There was a problem with loading the questions:', error);
        });
}

// Start the quiz and show the first question
function startQuiz() {
    // Hide the welcome screen
    document.getElementById('welcome').style.display = 'none';

    // Show the quiz container
    document.getElementById('quiz-container').style.display = 'block';

    // Load questions if not already loaded
    if (questions.length === 0) {
        loadQuestions();
    } else {
        displayQuestion(); // Display the first question if already loaded
    }
}

// Display a question and its answers
function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        const questionContainer = document.getElementById('question-container');
        const answersContainer = document.getElementById('answers-container');
        
        // Set the question text
        questionContainer.textContent = question.question;

        // Clear previous answers
        answersContainer.innerHTML = '';

        // Create answer buttons dynamically
        question.answers.forEach((answer, index) => {
            const answerButton = document.createElement('button');
            answerButton.textContent = answer.text;
            answerButton.addEventListener('click', () => checkAnswer(answer, index));
            answersContainer.appendChild(answerButton);
        });
    } else {
        endQuiz(); // End the quiz if all questions have been answered
    }
}

// Check if the answer is correct
function checkAnswer(answer, index) {
    const feedbackContainer = document.getElementById('feedback-container');
    
    if (answer.correct) {
        score++;
        feedbackContainer.textContent = 'Correct!';
    } else {
        feedbackContainer.textContent = 'Wrong!';
    }

    // Move to the next question after a brief delay
    setTimeout(() => {
        currentQuestionIndex++;
        feedbackContainer.textContent = ''; // Clear feedback
        displayQuestion(); // Show the next question
    }, 1000);
}

// End the quiz and display the final score
function endQuiz() {
    document.getElementById('quiz-container').style.display = 'none';
    const finalScoreContainer = document.getElementById('final-score');
    finalScoreContainer.textContent = `Your final score is: ${score} / ${questions.length}`;
    finalScoreContainer.style.display = 'block';
}