document.addEventListener("DOMContentLoaded", generatePuzzle);

let correctAnswer = 0;

function generatePuzzle() {
    const num1 = Math.floor(Math.random() * 50) + 1;
    const num2 = Math.floor(Math.random() * 50) + 1;
    const num3 = Math.floor(Math.random() * 50) + 1;
    const operator = Math.random() < 0.5 ? '+' : '-';

    correctAnswer = eval(`${num1} ${operator} ${num2} ${operator} ${num3}`);

    const puzzleElement = document.getElementById('puzzle');
    puzzleElement.textContent = `${num1} ${operator} ${num2} ${operator} ${num3} = ?`;

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
