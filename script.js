const board = document.getElementById('board');
const squares = document.querySelectorAll('.square');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill("");

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleSquareClick = (event) => {
    const clickedSquare = event.target;
    const clickedSquareIndex = parseInt(clickedSquare.getAttribute('data-index'));

    if (gameState[clickedSquareIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedSquareIndex] = currentPlayer;
    clickedSquare.innerText = currentPlayer;

    checkForWinner();
};

const checkForWinner = () => {
    let roundWon = false;
    
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `Player ${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.innerHTML = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = `Player ${currentPlayer}'s turn`;
};

const resetGame = () => {
    gameActive = true;
    currentPlayer = 'X';
    gameState.fill("");
    statusDisplay.innerHTML = `Player ${currentPlayer}'s turn`;

    squares.forEach(square => {
        square.innerText = "";
    });
};

squares.forEach(square => {
    square.addEventListener('click', handleSquareClick);
});

resetButton.addEventListener('click', resetGame);
statusDisplay.innerHTML = `Player ${currentPlayer}'s turn`;
