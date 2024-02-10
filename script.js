let currentPlayer = 'X';
let gameStatus = ['','','','','','','','',''];

function cellClicked(index) {
  if (gameStatus[index] === '' && !checkWinner()) {
    gameStatus[index] = currentPlayer;
    document.getElementById('board').children[index].innerText = currentPlayer;
    if (checkWinner()) {
      document.getElementById('status').innerText = `Player ${currentPlayer} wins!`;
      showWinnerModal(currentPlayer);
    } else if (gameStatus.every(cell => cell !== '')) {
      document.getElementById('status').innerText = "It's a draw!";
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
    }
  }
}

function resetBoard() {
  gameStatus = ['','','','','','','','',''];
  document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
  document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let condition of winConditions) {
    if (
      gameStatus[condition[0]] === currentPlayer &&
      gameStatus[condition[1]] === currentPlayer &&
      gameStatus[condition[2]] === currentPlayer
    ) {
      return true;
    }
  }

  return false;
}

function showWinnerModal(winner) {
  const modal = document.getElementById('winnerModal');
  const message = document.getElementById('winnerMessage');
  message.innerText = `Player ${winner} wins!`;
  modal.style.display = 'block';
}

function closeWinnerModal() {
  const modal = document.getElementById('winnerModal');
  modal.style.display = 'none';
  resetBoard(); // Reset the board when modal is closed
}
