const sentences = [
    "The quick brown fox jumps over the lazy dog",
    "A journey of a thousand miles begins with a single step",
    "To be or not to be, that is the question",
    "All that glitters is not gold",
    "In the end, we will remember not the words of our enemies, but the silence of our friends",
    "I think, therefore I am",
    "The only thing we have to fear is fear itself",
    "Life is what happens when you're busy making other plans",
    "You miss 100% of the shots you don't take",
    "It does not matter how slowly you go as long as you do not stop"
];

let timerInterval;
let timeLeft = 60;
let currentSentence = '';
let wordCount = 0;

function getRandomSentence() {
    return sentences[Math.floor(Math.random() * sentences.length)];
}

function updateSentenceDisplay() {
    document.getElementById('wordDisplay').textContent = currentSentence;
}

document.getElementById('startBtn').addEventListener('click', () => {
    document.getElementById('userInput').disabled = false;
    document.getElementById('userInput').value = '';
    document.getElementById('result').textContent = '';
    wordCount = 0;
    timeLeft = 60;
    currentSentence = getRandomSentence();
    updateSentenceDisplay();
    document.getElementById('timer').textContent = `Time left: ${timeLeft} seconds`;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Time left: ${timeLeft} seconds`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            calculateWPM();
        }
    }, 1000);
});

document.getElementById('userInput').addEventListener('input', () => {
    const userText = document.getElementById('userInput').value;
    const sentenceDisplay = document.getElementById('wordDisplay');
    const letters = currentSentence.split('');
    let highlightedHTML = '';

    // Loop through each letter in the displayed sentence
    for (let i = 0; i < letters.length; i++) {
        if (i < userText.length) {
            if (userText[i] === letters[i]) {
                highlightedHTML += `<span class="correct">${userText[i]}</span>`;
            } else {
                highlightedHTML += `<span class="incorrect">${userText[i]}</span>`;
            }
        } else {
            highlightedHTML += `<span>${letters[i]}</span>`;
        }
    }

    sentenceDisplay.innerHTML = highlightedHTML;

    // Move to the next sentence once the user input matches the length of the current sentence
    if (userText.length === currentSentence.length) {
        wordCount += currentSentence.trim().split(/\s+/).length;
        currentSentence = getRandomSentence();
        document.getElementById('userInput').value = '';
        updateSentenceDisplay();
    }
});

function calculateWPM() {
    const wpm = wordCount;
    document.getElementById('result').textContent = `Your typing speed is ${wpm} WPM.`;
    document.getElementById('userInput').disabled = true;
    document.getElementById('restartBtn').style.display = 'inline-block';
}

document.getElementById('restartBtn').addEventListener('click', () => {
    document.getElementById('restartBtn').style.display = 'none';
    document.getElementById('startBtn').click();
});
