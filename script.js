// Game state
let playerScore = 0;
let computerScore = 0;

// DOM elements
const choiceButtons = document.querySelectorAll('.choice-btn');
const resultMessage = document.getElementById('result-message');
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');
const playerChoiceDisplay = document.getElementById('player-choice');
const computerChoiceDisplay = document.getElementById('computer-choice');
const resetButton = document.getElementById('reset-btn');

// Choice emojis
const choiceEmojis = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

// Add event listeners to choice buttons
choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.getAttribute('data-choice');
        playRound(playerChoice);
    });
});

// Add event listener to reset button
resetButton.addEventListener('click', resetGame);

// Get computer's random choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Determine the winner
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    }
    
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'player';
    }
    
    return 'computer';
}

// Play a round
function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    const winner = determineWinner(playerChoice, computerChoice);
    
    // Update displays
    playerChoiceDisplay.textContent = `Player: ${choiceEmojis[playerChoice]} ${capitalizeFirstLetter(playerChoice)}`;
    computerChoiceDisplay.textContent = `Computer: ${choiceEmojis[computerChoice]} ${capitalizeFirstLetter(computerChoice)}`;
    
    // Update score and message based on winner
    if (winner === 'player') {
        playerScore++;
        playerScoreDisplay.textContent = playerScore;
        resultMessage.textContent = `You Win! ${capitalizeFirstLetter(playerChoice)} beats ${capitalizeFirstLetter(computerChoice)}`;
        resultMessage.className = 'win';
    } else if (winner === 'computer') {
        computerScore++;
        computerScoreDisplay.textContent = computerScore;
        resultMessage.textContent = `You Lose! ${capitalizeFirstLetter(computerChoice)} beats ${capitalizeFirstLetter(playerChoice)}`;
        resultMessage.className = 'lose';
    } else {
        resultMessage.textContent = "It's a Draw!";
        resultMessage.className = 'draw';
    }
}

// Reset the game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = '0';
    computerScoreDisplay.textContent = '0';
    resultMessage.textContent = 'Choose your weapon!';
    resultMessage.className = '';
    playerChoiceDisplay.textContent = 'Player: -';
    computerChoiceDisplay.textContent = 'Computer: -';
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
