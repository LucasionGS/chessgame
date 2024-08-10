import Bishop from "./pieces/Bishop";
import King from "./pieces/King";
import Knight from "./pieces/Knight";
import Pawn from "./pieces/Pawn";
import Piece, { PieceType } from "./pieces/Piece";
import Queen from "./pieces/Queen";
import Rook from "./pieces/Rook";

export interface ChessOptions {
  /**
   * If true, The acting player will be black, and the other player will be white.
   */
  isPlayerTwo: boolean;
  /**
   * The color of the black squares.
   */
  colorBlack: string;
  /**
   * The color of the white squares.
   */
  colorWhite: string;

  /**
   * Sprites for the pieces. All sprites must be provided.
   */
  sprites: {
    // Black pieces
    /** Black Pawn sprite URL */
    blackPawn: string;
    /** Black Rook sprite URL */
    blackRook: string;
    /** Black Knight sprite URL */
    blackKnight: string;
    /** Black Bishop sprite URL */
    blackBishop: string;
    /** Black Queen sprite URL */
    blackQueen: string;
    /** Black King sprite URL */
    blackKing: string;

    // White pieces
    /** White Pawn sprite URL */
    whitePawn: string;
    /** White Rook sprite URL */
    whiteRook: string;
    /** White Knight sprite URL */
    whiteKnight: string;
    /** White Bishop sprite URL */
    whiteBishop: string;
    /** White Queen sprite URL */
    whiteQueen: string;
    /** White King sprite URL */
    whiteKing: string;
  }
}

class Chess {
  private canvas?: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  constructor(private root: HTMLElement, options?: Partial<ChessOptions>) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = Chess.BOARD_SIZE * Chess.BLOCK_SIZE;
    this.canvas.height = Chess.BOARD_SIZE * Chess.BLOCK_SIZE;
    this.root.appendChild(this.canvas);

    this.options = { ...this.defaultOptions, ...options };

    this.canvas.style.maxWidth = "100%";
    this.canvas.style.maxHeight = "100%";
    this.canvas.style.objectFit = "contain";

    this.ctx = this.canvas.getContext("2d")!;

    this.initiate();
  }

  public mouseDown = {
    left: false,
    right: false,
    middle: false,
  }

  public mouseDownFrame = {
    left: false,
    right: false,
    middle: false,
  }

  public mousePosition = { x: 0, y: 0, }

  private mouseEventHandler(event: MouseEvent) { // This will be bound to the Chess instance
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const x = event.offsetX * this.canvas.width / rect.width;
    const y = event.offsetY * this.canvas.height / rect.height;
    this.mousePosition.x = x;
    this.mousePosition.y = y;

    this.mouseDown.left = (event.buttons & 1) !== 0;
    this.mouseDown.right = (event.buttons & 2) !== 0;
    this.mouseDown.middle = (event.buttons & 4) !== 0;
  }

  public static BLOCK_SIZE = 100;
  public static BOARD_SIZE = 8;

  private initiate() {
    this.render(this);
    // Check if all sprites are available and cache them
    const sprites = this.options.sprites;

    const requires = [
      "blackBishop",
      "whiteBishop",
      "blackKnight",
      "whiteKnight",
      "blackKing",
      "whiteKing",
      "blackPawn",
      "whitePawn",
      "blackQueen",
      "whiteQueen",
      "blackRook",
      "whiteRook",
    ];
    for (const i in requires) {
      const sprite = <keyof typeof sprites>requires[i];
      const url = sprites[sprite];
      if (!url) {
        throw new Error(
          `Sprite for ${sprite} is missing. All sprites must be provided. Set via { sprites: { ${sprite}: "url" } } when making a new Chess instance.`
        );
      }
      this.cacheSprite(sprite, url);
    }
    
    this.resetBoard();
    this.canvas?.addEventListener("mousemove", this.mouseEventHandler.bind(this));
    this.canvas?.addEventListener("mousedown", this.mouseEventHandler.bind(this));
    this.canvas?.addEventListener("mouseup", this.mouseEventHandler.bind(this));
  }

  public static blackRows: (PieceType | null)[][] = [
    [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook],
    [Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn],
  ];
  
  public static whiteRows: (PieceType | null)[][] = [
    [Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn],
    [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook],
  ];


  public resetBoard() {
    this.board = Array.from({ length: Chess.BOARD_SIZE }, () => Array.from({ length: Chess.BOARD_SIZE }));
    
    // Black pieces
    for (let y = 0; y < Chess.blackRows.length; y++) {
      const rows = Chess.blackRows[y];
      for (let x = 0; x < rows.length; x++) {
        const PieceClass = rows[x];
        if (!PieceClass) continue;
        // this.board[x][y] = new PieceClass(this, Chess.Color.Black);
        this.setPiece(new PieceClass(this, Chess.PlayerIndex.PlayerTwo), x, y);
      }
    }

    // White pieces
    for (let y = 0; y < Chess.whiteRows.length; y++) {
      const rows = Chess.whiteRows[Chess.whiteRows.length - 1 - y];
      for (let x = 0; x < rows.length; x++) {
        const PieceClass = rows[x];
        if (!PieceClass) continue;
        // this.board[x][Chess.length - 1 - y] = new PieceClass(this, Chess.Color.White);
        this.setPiece(new PieceClass(this, Chess.PlayerIndex.PlayerOne), x, Chess.BOARD_SIZE - 1 - y);
      }
    }
  }

  private cachedSprites: Record<string, HTMLImageElement> = {};
  public cacheSprite(name: string, url: string) {
    const img = new Image();
    img.src = url;
    this.cachedSprites[name] = img;
  }

  public getSprite(name: string) {
    return this.cachedSprites[name] || null;
  }

  public dispose() {
    if (!this.canvas) throw new Error("Canvas not found");
    this.root.removeChild(this.canvas);
    delete this.canvas;
  }

  public board: Piece[][] = [];

  public options: ChessOptions;
  private defaultOptions: ChessOptions = {
    isPlayerTwo: false,
    colorBlack: "#50301d",
    colorWhite: "#f6ddba",
    sprites: {
      blackPawn: null!,
      blackRook: null!,
      blackKnight: null!,
      blackBishop: null!,
      blackQueen: null!,
      blackKing: null!,

      whitePawn: null!,
      whiteRook: null!,
      whiteKnight: null!,
      whiteBishop: null!,
      whiteQueen: null!,
      whiteKing: null!,
    }
  }

  private render(game: Chess) {
    if (!game.canvas) return;
    const canvas = game.canvas;
    const ctx = game.ctx;
    requestAnimationFrame(() => game.render(game));
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw board
    ctx.fillStyle = game.options.colorBlack;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = game.options.colorWhite;
    for (let x = 0; x < Chess.BOARD_SIZE; x++) {
      for (let y = 0; y < Chess.BOARD_SIZE; y++) {
        if ((x + y) % 2 === 0) {
          ctx.fillRect(x * Chess.BLOCK_SIZE, y * Chess.BLOCK_SIZE, Chess.BLOCK_SIZE, Chess.BLOCK_SIZE);
        }
      }
    }

    // Highlight hovered block
    const [blockX, blockY] = game.getBlock();
    ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
    ctx.fillRect(blockX * Chess.BLOCK_SIZE, blockY * Chess.BLOCK_SIZE, Chess.BLOCK_SIZE, Chess.BLOCK_SIZE);

    // Draw possible moves
    for (const [x, y] of game.currentMoveSet) {
      ctx.fillStyle = "rgba(0, 255, 0, 0.25)";
      ctx.fillRect(x * Chess.BLOCK_SIZE, y * Chess.BLOCK_SIZE, Chess.BLOCK_SIZE, Chess.BLOCK_SIZE);
    }

    // Draw selected block
    if (game.selectedBlock) {
      const { x, y } = game.selectedBlock;
      ctx.fillStyle = "rgba(255, 255, 0, 0.25)";
      ctx.fillRect(x * Chess.BLOCK_SIZE, y * Chess.BLOCK_SIZE, Chess.BLOCK_SIZE, Chess.BLOCK_SIZE);
    }

    // Draw pieces
    for (let x = 0; x < Chess.BOARD_SIZE; x++) {
      for (let y = 0; y < Chess.BOARD_SIZE; y++) {
        const piece = game.board?.[x]?.[y];
        if (!piece) continue;
        piece.render(x, y);
      }
    }

    // Handle mouse events
    if (game.mouseDown.left && !game.mouseDownFrame.left) { game._mouseLeftDownFrameEvent(); game.mouseDownFrame.left = true; }
    if (game.mouseDown.left && game.mouseDownFrame.left) { game._mouseLeftDownEvent(); }
    if (!game.mouseDown.left && game.mouseDownFrame.left) { game._mouseLeftUpFrameEvent(); game.mouseDownFrame.left = false; }

    if (game.mouseDown.right && !game.mouseDownFrame.right) { game._mouseRightDownFrameEvent(); game.mouseDownFrame.right = true; }
    if (game.mouseDown.right && game.mouseDownFrame.right) { game._mouseRightDownEvent(); }
    if (!game.mouseDown.right && game.mouseDownFrame.right) { game._mouseRightUpFrameEvent(); game.mouseDownFrame.right = false; }

    if (game.mouseDown.middle && !game.mouseDownFrame.middle) { game._mouseMiddleDownFrameEvent(); game.mouseDownFrame.middle = true; }
    if (game.mouseDown.middle && game.mouseDownFrame.middle) { game._mouseMiddleDownEvent(); }
    if (!game.mouseDown.middle && game.mouseDownFrame.middle) { game._mouseMiddleUpFrameEvent(); game.mouseDownFrame.middle = false; }
  }

  private selectedBlock: { x: number, y: number } | null = null;
  private currentMoveSet: [number, number][] = [];

  private _mouseLeftDownEvent() { }
  private _mouseLeftDownFrameEvent() {
    if (!this.selectedBlock) {
      this.selectedBlock = this.getBlockDict();
      this.currentMoveSet = this.getPiece(this.selectedBlock.x, this.selectedBlock.y)?.findPossibleMoves() || [];
    }
    else {
      const [x, y] = this.getBlock();

      if (this.currentMoveSet.some(([mx, my]) => mx === x && my === y)) {
        this.move(this.selectedBlock.x, this.selectedBlock.y, x, y);
        this.currentMoveSet = [];
        this.selectedBlock = null;
      }
      else {
        this.selectedBlock = null;
        this._mouseLeftDownFrameEvent();
      }
    }
  }
  private _mouseLeftUpFrameEvent() {
    if (this.selectedBlock) {
      const thisBlock = this.getBlock();
      if (thisBlock[0] !== this.selectedBlock.x || thisBlock[1] !== this.selectedBlock.y) {
        this._mouseLeftDownFrameEvent();
      }
    }
  }

  private _mouseRightDownEvent() { }
  private _mouseRightDownFrameEvent() { }
  private _mouseRightUpFrameEvent() { }

  private _mouseMiddleDownEvent() { }
  private _mouseMiddleDownFrameEvent() { }
  private _mouseMiddleUpFrameEvent() { }

  public move(fromX: number, fromY: number, toX: number, toY: number) {
    const piece = this.getPiece(fromX, fromY);
    if (!piece) return;
    this.setPiece(piece, toX, toY);
    piece.moveCount++;
    piece.movedTo?.(toX, toY);
    delete this.board[fromX][fromY];
  }

  public moveAsPlayerTwo(fromX: number, fromY: number, toX: number, toY: number) {
    const [x, y] = this.flipPosition(fromX, fromY);
    const [tx, ty] = this.flipPosition(toX, toY);
    this.move(x, y, tx, ty);
  }

  public getPiece(x: number, y: number) {
    return this.board?.[x]?.[y];
  }

  public setPiece(piece: Piece, x: number, y: number) {
    this.board[x][y] = piece;
  }

  /**
   * Get block coordinates from given x and y position. If x and y are not provided, it will use the current mouse position.
   */
  public getBlock(x?: number, y?: number): [number, number] {
    if (x === undefined || y === undefined) { // Get block from mouse position
      ({ x, y } = this.mousePosition);
    }
    const blockX = Math.floor(x / Chess.BLOCK_SIZE);
    const blockY = Math.floor(y / Chess.BLOCK_SIZE);
    return [blockX, blockY];
  }

  /**
   * @see Chess.getBlock
   */
  public getBlockDict(x?: number, y?: number): { x: number, y: number } {
    const [blockX, blockY] = this.getBlock(x, y);
    return { x: blockX, y: blockY };
  }

  public flipPosition(x: number, y: number): [number, number] {
    return [Chess.BOARD_SIZE - x - 1, Chess.BOARD_SIZE - y - 1];
  }
}

namespace Chess {
  export enum PlayerIndex {
    /**
     * Player one is white
     */
    PlayerOne,
    /**
     * Player two is black
     */
    PlayerTwo
  }
}

export default Chess;