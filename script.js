const patterns = [
    { sequence: [1, 2, 4, 8], rule: 'doubling', answer: 16 },
    { sequence: [5, 10, 20, 40], rule: 'doubling with offset', answer: 80 },
    { sequence: [2, 3, 5, 7], rule: 'prime numbers', answer: 11 },
    { sequence: [3, 6, 9, 12], rule: 'addition by 3', answer: 15 },
    { sequence: [1, 4, 9, 16], rule: 'squares', answer: 25 },
    { sequence: [1, 1, 2, 3, 5], rule: 'fibonacci', answer: 8 },
    { sequence: [0, 2, 4, 6], rule: 'even numbers', answer: 8 },
    { sequence: [1, 3, 7, 15], rule: 'powers of 2 minus 1', answer: 31 },
    { sequence: [2, 4, 6, 8], rule: 'addition by 2', answer: 10 },
    { sequence: [1, 10, 100, 1000], rule: 'powers of 10', answer: 10000 },
    { sequence: [8, 27, 64, 125], rule: 'cubes', answer: 216 },
    { sequence: [11, 22, 33, 44], rule: 'multiples of 11', answer: 55 },
    { sequence: [2, 4, 8, 16], rule: 'doubling', answer: 32 },
    { sequence: [3, 6, 12, 24], rule: 'doubling', answer: 48 },
    { sequence: [4, 9, 14, 19], rule: 'addition by 5', answer: 24 },
    { sequence: [10, 20, 30, 40], rule: 'addition by 10', answer: 50 },
    { sequence: [5, 15, 25, 35], rule: 'addition by 10', answer: 45 },
    { sequence: [9, 18, 27, 36], rule: 'multiples of 9', answer: 45 },
    { sequence: [12, 24, 36, 48], rule: 'multiples of 12', answer: 60 },
    { sequence: [14, 28, 42, 56], rule: 'multiples of 14', answer: 70 },
    { sequence: [20, 40, 60, 80], rule: 'multiples of 20', answer: 100 },
    { sequence: [7, 14, 21, 28], rule: 'multiples of 7', answer: 35 },
    { sequence: [100, 200, 300, 400], rule: 'addition by 100', answer: 500 },
    { sequence: [250, 500, 750, 1000], rule: 'addition by 250', answer: 1250 },
    { sequence: [5, 25, 125, 625], rule: 'powers of 5', answer: 3125 },
    { sequence: [6, 36, 216, 1296], rule: 'powers of 6', answer: 7776 },
    { sequence: [1, 2, 6, 24], rule: 'factorials', answer: 120 },
    { sequence: [1, 4, 7, 10], rule: 'addition by 3', answer: 13 },
    { sequence: [13, 26, 39, 52], rule: 'multiples of 13', answer: 65 },
    { sequence: [19, 38, 57, 76], rule: 'addition by 19', answer: 95 },
    { sequence: [21, 42, 63, 84], rule: 'multiples of 21', answer: 105 },
    { sequence: [2, 6, 12, 20], rule: 'n(n+1)', answer: 30 },
    { sequence: [10, 100, 1000, 10000], rule: 'powers of 10', answer: 100000 },
    { sequence: [81, 72, 63, 54], rule: 'subtraction by 9', answer: 45 },
    { sequence: [22, 44, 88, 176], rule: 'doubling', answer: 352 },
    { sequence: [7, 49, 343, 2401], rule: 'powers of 7', answer: 16807 },
    { sequence: [12, 21, 30, 39], rule: 'addition by 9', answer: 48 },
    { sequence: [10, 25, 45, 70], rule: 'increasing addition by 5', answer: 100 },
    { sequence: [7, 10, 13, 16], rule: 'addition by 3', answer: 19 },
    { sequence: [64, 128, 256, 512], rule: 'doubling', answer: 1024 },
    { sequence: [18, 36, 72, 144], rule: 'doubling', answer: 288 },
    { sequence: [15, 30, 60, 120], rule: 'doubling', answer: 240 },
    { sequence: [11, 13, 17, 19], rule: 'prime numbers', answer: 23 },
    { sequence: [101, 103, 107, 109], rule: 'prime numbers', answer: 113 },
    { sequence: [2, 9, 28, 65], rule: 'n^3 + 1', answer: 126 },
    { sequence: [15, 25, 35, 45], rule: 'addition by 10', answer: 55 },
    { sequence: [14, 29, 44, 59], rule: 'addition by 15', answer: 74 },
    { sequence: [8, 15, 24, 35], rule: 'addition by increasing odd numbers', answer: 48 },
    { sequence: [13, 20, 29, 40], rule: 'addition by increasing odd numbers', answer: 53 }
];

let usedPatterns = [];
let score = 0;
let currentQuestion = 0;
let timerInterval;
const totalQuestions = 10; 
const timeLimit = 10; 

function resetTimer() {
    let timeLeft = timeLimit;
    document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitAnswer(false);
        }
    }, 1000);
}

function getNextPattern() {
    if (usedPatterns.length === patterns.length) {
        usedPatterns = []; // Reset if all patterns have been used
    }
    
    let pattern;
    do {
        pattern = patterns[Math.floor(Math.random() * patterns.length)];
    } while (usedPatterns.includes(pattern));

    usedPatterns.push(pattern);
    return pattern;
}

function displayQuestion() {
    if (currentQuestion >= totalQuestions) {
        endGame();
        return;
    }

    const pattern = getNextPattern();
    document.getElementById('question-box').textContent = pattern.sequence.join(', ') + ', ?';
    document.getElementById('answer').value = '';
    document.getElementById('result-box').textContent = '';
    resetTimer();
}

function submitAnswer(fromSubmit = true) {
    clearInterval(timerInterval);

    const userAnswer = parseInt(document.getElementById('answer').value);
    const correctAnswer = usedPatterns[currentQuestion].answer;
    
    if (userAnswer === correctAnswer && fromSubmit) {
        document.getElementById('result-box').textContent = 'Correct!';
        score++;
    } else {
        document.getElementById('result-box').textContent = `Wrong! The correct answer was ${correctAnswer}.`;
    }

    currentQuestion++;
    setTimeout(displayQuestion, 1000); // 1000ms before the next question
}

function endGame() {
    document.getElementById('score-box').textContent = `You scored ${score}/${totalQuestions} correct. Please refresh the page to play again.`;
    document.getElementById('question-box').textContent = '';
    document.getElementById('answer').style.display = 'none';
    document.getElementById('timer').style.display = 'none';
    document.querySelector('.submit-btn').style.display = 'none';
}
displayQuestion();
