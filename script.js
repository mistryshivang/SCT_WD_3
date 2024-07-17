document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('[data-cell]');
    const restartButton = document.getElementById('restartButton');
    const X_CLASS = 'x';
    const O_CLASS = 'o';
    const WINNING_COMBINATIONS = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    let circleTurn;
  
    startGame();
  
    restartButton.addEventListener('click', startGame);
  
    function startGame() {
      circleTurn = false;
      cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
      });
      setBoardHoverClass();
    }
  
    function handleClick(e) {
      const cell = e.target;
      const currentClass = circleTurn ? O_CLASS : X_CLASS;
      placeMark(cell, currentClass);
      if (checkWin(currentClass)) {
        setTimeout(() => endGame(false), 500); // Delay to show last move
      } else if (isDraw()) {
        setTimeout(() => endGame(true), 500); // Delay to show last move
      } else {
        swapTurns();
        setBoardHoverClass();
        if (circleTurn) {
          setTimeout(computerMove, 500); // Add a small delay for realism
        }
      }
    }
  
    function endGame(draw) {
      if (draw) {
        alert('Draw!');
      } else {
        alert(`${circleTurn ? "O's" : "X's"} Wins!`);
      }
      startGame();
    }
  
    function isDraw() {
      return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
      });
    }
  
    function placeMark(cell, currentClass) {
      cell.classList.add(currentClass);
    }
  
    function swapTurns() {
      circleTurn = !circleTurn;
    }
  
    function setBoardHoverClass() {
      board.classList.remove(X_CLASS);
      board.classList.remove(O_CLASS);
      if (circleTurn) {
        board.classList.add(O_CLASS);
      } else {
        board.classList.add(X_CLASS);
      }
    }
  
    function checkWin(currentClass) {
      return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
          return cells[index].classList.contains(currentClass);
        });
      });
    }
  
    function computerMove() {
      const availableCells = [...cells].filter(cell => 
        !cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS)
      );
      const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
      if (randomCell) {
        placeMark(randomCell, O_CLASS);
        if (checkWin(O_CLASS)) {
          setTimeout(() => endGame(false), 500); // Delay to show last move
        } else if (isDraw()) {
          setTimeout(() => endGame(true), 500); // Delay to show last move
        } else {
          swapTurns();
          setBoardHoverClass();
        }
      }
    }
  });
  