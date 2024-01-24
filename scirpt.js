// JavaScript code for the enhanced golf game

let isGameStarted = false;

// Function to show the game container and hide the menu container
function startGame() {
    document.getElementById('menu-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'flex';
    isGameStarted = true;
}

// Function to handle a player's turn
function takeTurn(event) {
    if (isGameStarted) {
        // Get the coordinates of the click relative to the game container
        const rect = event.target.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Update the position of the golf ball based on the click coordinates
        ballX = (mouseX / rect.width) * 100;
        ballY = (mouseY / rect.height) * 100;

        // Update the visual position of the golf ball
        updateBallPosition();

        // Check if the golf ball is inside the winning circle
        checkWinCondition();
    }
}

// Function to check if the golf ball is inside the winning circle
function checkWinCondition() {
    const golfBall = document.getElementById('golf-ball');
    const circle = document.getElementById('winning-circle');

    const ballRect = golfBall.getBoundingClientRect();
    const circleRect = circle.getBoundingClientRect();

    // Check if the center of the golf ball is inside the circle
    const ballCenterX = ballRect.left + ballRect.width / 2;
    const ballCenterY = ballRect.top + ballRect.height / 2;

    if (
        ballCenterX >= circleRect.left &&
        ballCenterX <= circleRect.right &&
        ballCenterY >= circleRect.top &&
        ballCenterY <= circleRect.bottom
    ) {
        alert('Congratulations! You won the round!');
        resetGame();
    }
}

// Function to reset the game
function resetGame() {
    document.getElementById('menu-container').style.display = 'flex';
    document.getElementById('game-container').style.display = 'none';
    isGameStarted = false;
}

// Event listener for the play button
document.getElementById('play-btn').addEventListener('click', function() {
    // Call the function to start the game when the play button is clicked
    startGame();

    // Here, you can implement logic for users to join the game and choose a username
    // For simplicity, let's prompt the user for a username
    const username = prompt('Choose a username (3 to 5 letters):');

    if (username && username.length >= 3 && username.length <= 5) {
        console.log(`Welcome, ${username}!`);
    } else {
        alert('Invalid username. Please choose a username with 3 to 5 letters.');
        resetGame();
    }
});

// Event listener for the game container
document.getElementById('game-container').addEventListener('click', takeTurn);
