import "./style.css";
import Chess from "./chess/Chess";
import blackBishop from "./pieces/blackBishop.png"
import whiteBishop from "./pieces/whiteBishop.png"
import blackKnight from "./pieces/blackKnight.png"
import whiteKnight from "./pieces/whiteKnight.png"
import blackKing from "./pieces/blackKing.png"
import whiteKing from "./pieces/whiteKing.png"
import blackPawn from "./pieces/blackPawn.png"
import whitePawn from "./pieces/whitePawn.png"
import blackQueen from "./pieces/blackQueen.png"
import whiteQueen from "./pieces/whiteQueen.png"
import blackRook from "./pieces/blackRook.png"
import whiteRook from "./pieces/whiteRook.png"

const root = document.querySelector<HTMLDivElement>("#app")!;

new Chess(root, {
  isPlayerTwo: false,
  sprites: {
    blackBishop,
    whiteBishop,
    blackKnight,
    whiteKnight,
    blackKing,
    whiteKing,
    blackPawn,
    whitePawn,
    blackQueen,
    whiteQueen,
    blackRook,
    whiteRook,
  }
});