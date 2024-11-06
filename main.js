const startButton = document.getElementById('start-btn');
startButton.addEventListener('click', () => {
  alert("Start button clicked"); // Alert to confirm button click is detected
  startQuiz();
});

function startQuiz() {
  alert("Starting quiz..."); // Alert to confirm startQuiz function is called

  const questionBox = document.getElementById('questionBox');
  const nextButton = document.getElementById('nextBtn');
  
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
      
      questionBox.textContent = "";
      alert("Questions loaded successfully"); // Alert to confirm questions loaded
      
      displayQuestion(data[0]);

      let currentQuestionIndex = 0;
      nextButton.style.display = 'block';
      nextButton.addEventListener('click', function() {
        currentQuestionIndex++;
        if (currentQuestionIndex < data.length) {
          displayQuestion(data[currentQuestionIndex]);
        } else {
          questionBox.textContent = "You've finished the quiz!";
          nextButton.style.display = 'none';
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
  answersBox.innerHTML = '';

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