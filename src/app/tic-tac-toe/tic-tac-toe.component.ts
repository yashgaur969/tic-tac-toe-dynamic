import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.css',
})
export class TicTacToeComponent {
  @Input() boardSize: number = 3;
  board: any;
  isXNext: boolean = true;

  // WINNING_PATTERNS = [
  //   [0, 1, 2],
  //   [3, 4, 5],
  //   [6, 7, 8],
  //   [0, 3, 6],
  //   [1, 4, 7],
  //   [2, 5, 8],
  //   [0, 4, 8],
  //   [2, 4, 6],
  // ];

  WINNING_PATTERNS: any;

  ngOnInit(): void {
    this.initialBoard(this.boardSize);
    this.generatingWinningPatterns();
  }

  generatingWinningPatterns(): any {
    const patterns = [];
    for (let i = 0; i < this.boardSize; i++) {
      const horizontalPattern = [];
      const verticalPattern = [];
      for (let j = 0; j < this.boardSize; j++) {
        horizontalPattern.push(i * this.boardSize + j);
        verticalPattern.push(j * this.boardSize + i);
      }
      patterns.push(horizontalPattern, verticalPattern);
    }

    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < this.boardSize; i++) {
      diagonal1.push(i * (this.boardSize + 1));
      diagonal2.push((i + 1) * (this.boardSize - 1));
    }
    patterns.push(diagonal1, diagonal2);

    this.WINNING_PATTERNS = patterns;
  }

  initialBoard(size: number): void {
    this.board = Array(size * size).fill(null);
  }

  getStatusMessage(): any {
    const winner = this.calculateWinner(this.board);
    if (winner) return `Player ${winner} wins`;
    if (!this.board.includes(null)) return `It is a draw`;
    return `Player ${this.isXNext ? 'X' : 'O'} turn`;
  }

  calculateWinner(currentBoard: any): any {
    // for (let i = 0; i < this.WINNING_PATTERNS.length; i++) {
    //   const [a, b, c] = this.WINNING_PATTERNS[i];
    //   if (
    //     currentBoard[a] &&
    //     currentBoard[a] == currentBoard[b] &&
    //     currentBoard[a] == currentBoard[c]
    //   )
    //     return currentBoard[a];
    // }
    // return null;
    for (let i = 0; i < this.WINNING_PATTERNS.length; i++) {
      const pattern = this.WINNING_PATTERNS[i];
      let countX = 0;
      let countO = 0;
      for (let j = 0; j < pattern.length; j++) {
        let cell = currentBoard[pattern[j]];
        if (cell === 'X') countX++;
        else if (cell === 'O') countO++;
      }
      if (countX == this.boardSize) return 'X';
      if (countO == this.boardSize) return 'O';
    }
    return null;
  }

  handleClick(index: number): void {
    const newBoard = [...this.board];
    newBoard[index] = this.isXNext ? 'X' : 'O';
    this.board = [...newBoard];
    this.isXNext = !this.isXNext;
    const winner = this.calculateWinner(this.board);
    if (winner || this.board[index]) return;
  }

  resetGame(): any {
    this.initialBoard(this.boardSize);
    this.isXNext = true;
  }
}
