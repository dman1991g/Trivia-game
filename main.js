const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');

let questions = [];
let currentQuestionIndex = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

async function startGame() {
    questions = await loadQuestions();
    currentQuestionIndex = 0;
    questionContainer.classList.remove('hidden');
    startButton.classList.add('hidden');
    setNextQuestion();
}

async function loadQuestions() {
    const response = await fetch('questions.json');
    if (!response.ok) {
        throw new Error('Failed to load questions');
    }
    return await response.json();
}

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        // Handle quiz end
        questionElement.innerText = 'Quiz Finished!';
        nextButton.classList.add('hidden');
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
    nextButton.classList.add('hidden'); // Hide next button until an answer is selected
}

function resetState() {
    nextButton.classList.add('hidden');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(answer) {
    const correct = answer.correct;
    if (correct) {
        alert('Correct!');
    } else {
        alert('Wrong!');
    }
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true; // Disable all answer buttons after selection
    });
    nextButton.classList.remove('hidden'); // Show next button
}