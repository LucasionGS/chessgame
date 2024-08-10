import Chess from "../Chess";
import Piece from "./Piece";

export default class King extends Piece {
  public constructor(chess: Chess, color: Chess.PlayerIndex) {
    super(chess, color, "king");
  }

  public findPossibleMoves(): [number, number][] {
    const moves: [number, number][] = [];
    const [x, y] = this.boardPosition;

    const offsets: [number, number][] = [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1]
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