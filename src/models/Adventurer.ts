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
}
