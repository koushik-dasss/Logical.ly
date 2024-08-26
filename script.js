document.addEventListener("DOMContentLoaded", generatePuzzle);

let correctAnswer = 0;

function generatePuzzle() {
    const puzzleTypes = [arithmeticProgression, geometricProgression, squarePattern, fibonacciSequence, alternatingPattern];
    const selectedPuzzle = puzzleTypes[Math.floor(Math.random() * puzzleTypes.length)];
    selectedPuzzle();
}

function arithmeticProgression() {
    const start = Math.floor(Math.random() * 20) + 1;
    const step = Math.floor(Math.random() * 10) + 1;
    const sequence = [start, start + step, start + 2 * step, start + 3 * step];
    correctAnswer = start + 4 * step;

    displayPuzzle(sequence, "Arithmetic Progression");
}

function geometricProgression() {
    const start = Math.floor(Math.random() * 5) + 1;
    const ratio = Math.floor(Math.random() * 5) + 2;
    const sequence = [start, start * ratio, start * ratio * ratio, start * ratio * ratio * ratio];
    correctAnswer = start * Math.pow(ratio, 4);

    displayPuzzle(sequence, "Geometric Progression");
}

function squarePattern() {
    const start = Math.floor(Math.random() * 10) + 1;
    const sequence = [start, start + 1, start + 2, start + 3].map(x => x * x);
    correctAnswer = (start + 4) * (start + 4);

    displayPuzzle(sequence, "Square Pattern");
}

function fibonacciSequence() {
    let a = 1, b = 1;
    const sequence = [a, b];
    for (let i = 2; i < 4; i++) {
        const next = a + b;
        sequence.push(next);
        a = b;
        b = next;
    }
    correctAnswer = a + b;

    displayPuzzle(sequence, "Fibonacci Sequence");
}

function alternatingPattern() {
    const start = Math.floor(Math.random() * 10) + 1;
    const sequence = [start, start + 2, start + 1, start + 3];
    correctAnswer = start + 2;

    displayPuzzle(sequence, "Alternating Pattern");
}

function displayPuzzle(sequence, type) {
    const puzzleElement = document.getElementById('puzzle');
    puzzleElement.textContent = `${sequence.join(', ')}, ? (${type})`;

    document.getElementById('answer').value = '';
    document.getElementById('result').textContent = '';
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    const resultElement = document.getElementById('result');

    if (userAnswer === correctAnswer) {
        resultElement.textContent = "Correct! Well done.";
        resultElement.style.color = "green";
    } else {
        resultElement.textContent = `Wrong! The correct answer was ${correctAnswer}.`;
        resultElement.style.color = "red";
    }

    setTimeout(generatePuzzle, 3000); // New puzzle every 3 seconds
}
