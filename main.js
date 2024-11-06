const startButton = document.getElementById('start-btn');
startButton.addEventListener('click', startQuiz);

function startQuiz() {
  const questionBox = document.getElementById('questionBox');
  const nextButton = document.getElementById('nextBtn');
  
  // Display a loading message before questions are loaded
  questionBox.textContent = "Loading question...";

  fetch('questions.json')
    .then(response => {
      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Failed to load questions: ' + response.statusText);
      }
      return response.json(); // Parse JSON from response
    })
    .then(data => {
      // Check if data is valid and contains questions
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No questions available in the JSON file.');
      }
      
      // Hide the loading message
      questionBox.textContent = "";
      
      // Display first question
      displayQuestion(data[0]);

      // Set up next button
      let currentQuestionIndex = 0;
      nextButton.style.display = 'block';
      nextButton.addEventListener('click', function() {
        currentQuestionIndex++;
        if (currentQuestionIndex < data.length) {
          displayQuestion(data[currentQuestionIndex]);
        } else {
          questionBox.textContent = "You've finished the quiz!";
          nextButton.style.display = 'none'; // Hide button when finished
        }
      });
    })
    .catch(error => {
      console.error('Error:', error);
      questionBox.textContent = 'Error loading questions: ' + error.message;
    });
}

function displayQuestion(questionData) {
  const questionBox = document.getElementById('questionBox');
  questionBox.textContent = questionData.question;

  const answersBox = document.getElementById('answersBox');
  answersBox.innerHTML = ''; // Clear previous answers

  questionData.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.onclick = function() {
      if (answer.correct) {
        alert('Correct!');
      } else {
        alert('Wrong!');
      }
    };
    answersBox.appendChild(button);
  });
}