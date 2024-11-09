const startButton = document.getElementById('start-btn');
startButton.addEventListener('click', startQuiz);

let correctAnswers = 0; // Track the correct answers

function startQuiz() {
  const questionBox = document.getElementById('questionBox');
  const nextButton = document.getElementById('next-Btn');
  const questionContainer = document.getElementById('question-container');
  
  questionContainer.style.display = 'block';
  questionBox.textContent = "Loading question...";

  fetch('questions.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load questions: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No questions available in the JSON file.');
      }

      // Shuffle and select a subset of questions
      const numberOfQuestions = 10; // Adjust to desired count
      const selectedQuestions = shuffleArray(data).slice(0, numberOfQuestions);
      
      displayQuestion(selectedQuestions[0]);

      let currentQuestionIndex = 0;
      nextButton.style.display = 'block';
      nextButton.addEventListener('click', function() {
        currentQuestionIndex++;
        if (currentQuestionIndex < selectedQuestions.length) {
          displayQuestion(selectedQuestions[currentQuestionIndex]);
        } else {
          questionBox.textContent = `You've finished the quiz! You scored ${correctAnswers} out of ${selectedQuestions.length}`;
          nextButton.style.display = 'none';
        }
      });
    })
    .catch(error => {
      console.error('Error:', error);
      questionBox.textContent = 'Error loading questions: ' + error.message;
    });
}

// Display a question and set up answer buttons
function displayQuestion(questionData) {
  const questionBox = document.getElementById('questionBox');
  questionBox.textContent = questionData.question;

  const answersBox = document.getElementById('answersBox');
  answersBox.innerHTML = ''; // Clear previous answers

  questionData.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('answer-btn');
    button.onclick = function() {
      if (answer.correct) {
        correctAnswers++;
        alert('Correct!');
      } else {
        alert('Wrong!');
      }
    };
    answersBox.appendChild(button);
  });
}

// Utility function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}