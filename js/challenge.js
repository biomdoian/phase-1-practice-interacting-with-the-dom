const counterElement = document.getElementById('counter');
const plusButton = document.getElementById('plus');
const minusButton = document.getElementById('minus');
const heartButton = document.getElementById('heart');
const pauseButton = document.getElementById('pause');
const likesList = document.querySelector('.likes');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const submitButton = document.getElementById('submit');
const commentsList = document.getElementById('list');

let counter = 0;
let intervalId;
let isPaused = false;

function updateCounterDisplay() {
  counterElement.textContent = counter;
}

function startCounter() {
  intervalId = setInterval(() => {
    counter++;
    updateCounterDisplay();
  }, 1000);
}

startCounter();

plusButton.addEventListener('click', () => {
  counter++;
  updateCounterDisplay();
});

minusButton.addEventListener('click', () => {
  counter--;
  updateCounterDisplay();
});

const likes = {};

heartButton.addEventListener('click', () => {
  const currentNumber = parseInt(counterElement.textContent);
  likes[currentNumber] = (likes[currentNumber] || 0) + 1;
  updateLikesDisplay();
});

function updateLikesDisplay() {
  likesList.innerHTML = ''; // Clear the previous likes
  for (const number in likes) {
    if (likes.hasOwnProperty(number)) {
      const listItem = document.createElement('li');
      listItem.textContent = `${number}: ❤️ ${likes[number]}`;
      likesList.appendChild(listItem);
    }
  }
}

pauseButton.addEventListener('click', () => {
  if (!isPaused) {
    clearInterval(intervalId);
    plusButton.disabled = true;
    minusButton.disabled = true;
    pauseButton.textContent = 'resume';
    isPaused = true;
  } else {
    startCounter();
    plusButton.disabled = false;
    minusButton.disabled = false;
    pauseButton.textContent = 'pause';
    isPaused = false;
  }
});

commentForm.addEventListener('submit', (event) => {
  event.preventDefault(); 
  const commentText = commentInput.value.trim();
  if (commentText !== '') {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.textContent = commentText;
    commentsList.appendChild(commentDiv);
    commentInput.value = ''; 
  }
});