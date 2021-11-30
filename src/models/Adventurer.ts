import {Direction} from './Direction.enum';
import {Move} from './Move.enum';

export class Adventurer {
  static readonly IDENTIFIER = 'A';
  name: string;
  x: number;
  y: number;
  direction: Direction;
  moves: Move[];

  constructor(
    name: string,
    x: number,
    y: number,
    direction: Direction,
    moves: Move[]
  ) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.moves = moves;
  }
  public static fromLine(line: string): Adventurer {
    const [id, name, x, y, direction, preMoves] = line.trim().split(' - ');
    const moves = preMoves.trim().split('');
    if (
      id === 'A' &&
      name &&
      x &&
      y &&
      isValidDirection(direction) &&
      isOnlyValidMoves(moves)
    ) {
      return new Adventurer(
        name,
        parseInt(x),
        parseInt(y),
        direction as Direction,
        moves as Move[]
      );
    } else {
      throw new Error('Impossible to convert line in Adventurer');
    }
  }
}
