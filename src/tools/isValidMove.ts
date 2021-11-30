import {Move} from '../models/Move.enum';

export function isValidMove(move: string): boolean {
  switch (move) {
    case Move.LEFT:
    case Move.RIGHT:
    case Move.FORWARD:
      return true;
    default:
      return false;
  }
}

export function isOnlyValidMoves(moves: string[]): boolean {
  for (const move of moves) {
    if (!isValidMove(move)) return false;
  }

  return true;
}
