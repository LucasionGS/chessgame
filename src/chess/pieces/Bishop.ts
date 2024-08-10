import Chess from "../Chess";
import Piece from "./Piece";

export default class Bishop extends Piece {
  public constructor(chess: Chess, color: Chess.PlayerIndex) {
    super(chess, color, "bishop");
  }

  public findPossibleMoves(): [number, number][] {
    const moves: [number, number][] = [];
    const [x, y] = this.boardPosition;

    for (let i = 1; x + i < Chess.BOARD_SIZE && y + i < Chess.BOARD_SIZE; i++) {
      const piece = this.chess.getPiece(x + i, y + i);
      if (!piece) {
        moves.push([x + i, y + i]);
      } else if (piece.getColor() !== this.playerIndex) {
        moves.push([x + i, y + i]);
        break;
      } else {
        break;
      }
    }

    for (let i = 1; x + i < Chess.BOARD_SIZE && y - i >= 0; i++) {
      const piece = this.chess.getPiece(x + i, y - i);
      if (!piece) {
        moves.push([x + i, y - i]);
      } else if (piece.getColor() !== this.playerIndex) {
        moves.push([x + i, y - i]);
        break;
      } else {
        break;
      }
    }

    for (let i = 1; x - i >= 0 && y + i < Chess.BOARD_SIZE; i++) {
      const piece = this.chess.getPiece(x - i, y + i);
      if (!piece) {
        moves.push([x - i, y + i]);
      } else if (piece.getColor() !== this.playerIndex) {
        moves.push([x - i, y + i]);
        break;
      } else {
        break;
      }
    }

    for (let i = 1; x - i >= 0 && y - i >= 0; i++) {
      const piece = this.chess.getPiece(x - i, y - i);
      if (!piece) {
        moves.push([x - i, y - i]);
      } else if (piece.getColor() !== this.playerIndex) {
        moves.push([x - i, y - i]);
        break;
      } else {
        break;
      }
    }

    return moves;
  }
}