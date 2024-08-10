import Chess from "../Chess";
import Bishop from "./Bishop";
import King from "./King";
import Knight from "./Knight";
import Pawn from "./Pawn";
import Queen from "./Queen";
import Rook from "./Rook";

export abstract class Piece {
  public constructor(
    protected chess: Chess,
    protected playerIndex: Chess.PlayerIndex,
    private type:
      | "pawn"
      | "rook"
      | "knight"
      | "bishop"
      | "queen"
      | "king"
  ) { }

  public moveCount = 0;

  protected boardPosition: [number, number] = [0, 0];
  
  public getSprite() {
    const { isPlayerTwo } = this.chess.options;
    return this.chess.getSprite(
      (
        (isPlayerTwo && this.playerIndex === Chess.PlayerIndex.PlayerOne)
        || (!isPlayerTwo && this.playerIndex === Chess.PlayerIndex.PlayerTwo)
      )
        ? "black" + (this.type[0].toUpperCase() + this.type.slice(1))
        : "white" + (this.type[0].toUpperCase() + this.type.slice(1))
    );
  }

  public getColor() { return this.playerIndex; }
  public isBlack() { return this.playerIndex === Chess.PlayerIndex.PlayerTwo; }
  public isWhite() { return this.playerIndex === Chess.PlayerIndex.PlayerOne; }

  /**
   * Returns all possible moves for the piece.  
   * This will take into account the current state of the board.
   */
  public abstract findPossibleMoves(): [number, number][];

  public movedTo?(x: number, y: number): void;

  public isPawn(): this is Pawn { return this.type === "pawn"; }
  public isRook(): this is Rook { return this.type === "rook"; }
  public isKnight(): this is Knight { return this.type === "knight"; }
  public isBishop(): this is Bishop { return this.type === "bishop"; }
  public isQueen(): this is Queen { return this.type === "queen"; }
  public isKing(): this is King { return this.type === "king"; }

  private actualX: number = -1;
  private actualY: number = -1;

  protected sprite: HTMLImageElement | null = null;
  
  public render(x: number, y: number) {
    const sprite = this.sprite ??= this.getSprite();
    if (!sprite) return;

    if (this.actualX !== x || this.actualY !== y) {
      this.boardPosition[0] = x;
      this.boardPosition[1] = y;
    }

    x *= Chess.BLOCK_SIZE;
    y *= Chess.BLOCK_SIZE;

    if (this.actualX === -1 && this.actualY === -1) {
      this.actualX = x;
      this.actualY = y;
    }
    
    if (this.actualX !== x || this.actualY !== y) {
      this.actualX += ((x - this.actualX) / 16);
      this.actualY += ((y - this.actualY) / 16);

      if (Math.abs(this.actualX - x) < 2) this.actualX = x;
      if (Math.abs(this.actualY - y) < 2) this.actualY = y;

      console.log(this.actualX, x, this.actualY, y);
    }
    
    const ctx = this.chess.ctx;
    ctx.drawImage(sprite, this.actualX, this.actualY, Chess.BLOCK_SIZE, Chess.BLOCK_SIZE);
  }
}

export type PieceType = typeof Pawn | typeof Rook | typeof Knight | typeof Bishop | typeof Queen | typeof King;

export default Piece;