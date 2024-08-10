import Chess from "../Chess";
import Piece from "./Piece";

export default class Knight extends Piece {
  public constructor(chess: Chess, color: Chess.PlayerIndex) {
    super(chess, color, "knight");
  }

  public findPossibleMoves(): [number, number][] {
    const moves: [number, number][] = [];
    const [x, y] = this.boardPosition;

    const offsets: [number, number][] = [
      [-1, -2],
      [1, -2],
      [-2, -1],
      [2, -1],
      [-2, 1],
      [2, 1],
      [-1, 2],
      [1, 2]
    ];

    for (const [dx, dy] of offsets) {
      const piece = this.chess.getPiece(x + dx, y + dy);
      if (!piece || piece.getColor() !== this.playerIndex) {
        moves.push([x + dx, y + dy]);
      }
    }

    return moves;
  }
}