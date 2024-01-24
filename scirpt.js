// JavaScript code for the basic golf game

// Variables to store the current position of the golf ball
let ballX = 50; // Initial X position (percentage)
let ballY = 50; // Initial Y position (percentage)

// Function to update the position of the golf ball
function updateBallPosition() {
    document.getElementById('golf-ball').style.left = `${ballX}%`;
    document.getElementById('golf-ball').style.top = `${ballY}%`;
}

// Event listener for the game container
document.getElementById('game-container').addEventListener('click', function(event) {
    // Get the coordinates of the click relative to the game container
    const rect = event.target.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Update the position of the golf ball based on the click coordinates
    ballX = (mouseX / rect.width) * 100;
    ballY = (mouseY / rect.height) * 100;

    // Update the visual position of the golf ball
    updateBallPosition();
});

// Initial update of the ball position
updateBallPosition();
