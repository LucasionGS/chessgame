import Chess from "../Chess";
import Piece from "./Piece";

export default class Rook extends Piece {
  public constructor(chess: Chess, color: Chess.PlayerIndex) {
    super(chess, color, "rook");
  }

  public findPossibleMoves(): [number, number][] {
    const moves: [number, number][] = [];
    const [x, y] = this.boardPosition;

    for (let i = x + 1; i < Chess.BOARD_SIZE; i++) {
      const piece = this.chess.getPiece(i, y);
      if (!piece) {
        moves.push([i, y]);
      } else if (piece.getColor() !== this.playerIndex) {
        moves.push([i, y]);
        break;
      } else {
        break;
      }
    }

    for (let i = x - 1; i >= 0; i--) {
      const piece = this.chess.getPiece(i, y);
      if (!piece) {
        moves.push([i, y]);
      } else if (piece.getColor() !== this.playerIndex) {
        moves.push([i, y]);
        break;
      } else {
        break;
      }
    }

    for (let i = y + 1; i < Chess.BOARD_SIZE; i++) {
      const piece = this.chess.getPiece(x, i);
      if (!piece) {
        moves.push([x, i]);
      } else if (piece.getColor() !== this.playerIndex) {
        moves.push([x, i]);
        break;
      } else {
        break;
      }
    }

    for (let i = y - 1; i >= 0; i--) {
      const piece = this.chess.getPiece(x, i);
      if (!piece) {
        moves.push([x, i]);
      } else if (piece.getColor() !== this.playerIndex) {
        moves.push([x, i]);
        break;
      } else {
        break;
      }
    }

    return moves;
  }
}