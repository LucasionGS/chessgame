import Chess from "../Chess";
import Piece from "./Piece";
import Queen from "./Queen";

export default class Pawn extends Piece {
  public constructor(chess: Chess, color: Chess.PlayerIndex) {
    super(chess, color, "pawn");
  }

  public findPossibleMoves(): [number, number][] {
    const moves: [number, number][] = [];
    const [x, y] = this.boardPosition;

    const forward = this.isWhite() ? -1 : 1;
    const forward2 = this.isWhite() ? -2 : 2;

    // Move forward
    if (!this.chess.getPiece(x, y + forward)) {
      moves.push([x, y + forward]);
      // if (y === (this.isWhite() ? Chess.length - 2 : 1) && !this.chess.getPiece(x, y + forward2)) {
      if (this.moveCount === 0 && !this.chess.getPiece(x, y + forward2)) {
        moves.push([x, y + forward2]);
      }
    }

    // Capture
    let piece: Piece | undefined;
    if ((piece = this.chess.getPiece(x + 1, y + forward)) && piece.getColor() !== this.playerIndex) {
      moves.push([x + 1, y + forward]);
    }
    if ((piece = this.chess.getPiece(x - 1, y + forward)) && piece.getColor() !== this.playerIndex) {
      moves.push([x - 1, y + forward]);
    }

    return moves;
  }

  public movedTo(x: number, y: number): void {
    if (y === (this.isWhite() ? 0 : Chess.BOARD_SIZE - 1)) {
      this.chess.setPiece(new Queen(this.chess, this.playerIndex), x, y);
    }
  }
}