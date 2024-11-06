let questions = []; // Global array to store the questions
let currentQuestionIndex = 0; // Keep track of the current question

document.getElementById('start-button').addEventListener('click', startQuiz);
document.getElementById('next-button').addEventListener('click', nextQuestion);

function startQuiz() {
    // Fetch questions from the JSON file
    fetch('questions.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
            questions = data; // Store the questions in the global variable
            showQuestion(); // Show the first question
            document.getElementById('start-button').style.display = 'none'; // Hide start button
        })
        .catch(error => {
            alert('Error loading questions: ' + error.message); // Show an error message if something goes wrong
        });
}

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex]; // Get the current question
        document.getElementById('question').innerText = question.question; // Display the question

        // Display the answer options
        const answerButtons = document.getElementById('answer-buttons');
        answerButtons.innerHTML = ''; // Clear previous answers

        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.classList.add('btn');
            button.innerText = answer.text;
            button.onclick = () => checkAnswer(answer); // Check answer when clicked
            answerButtons.appendChild(button);
        });

        document.getElementById('question-container').style.display = 'block'; // Show the question container
        document.getElementById('next-button').style.display = 'none'; // Hide the Next button initially
    }
}

function checkAnswer(answer) {
    if (answer.correct) {
        alert('Correct!');
    } else {
        alert('Incorrect!');
    }

    // Show the "Next" button after answering
    document.getElementById('next-button').style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++; // Move to the next question
    if (currentQuestionIndex < questions.length) {
        showQuestion(); // Show the next question
    } else {
        alert('Quiz complete!');
        // Optionally, you can reset the quiz or show a summary
    }
}