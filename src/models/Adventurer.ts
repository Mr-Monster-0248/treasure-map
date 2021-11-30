import {Direction} from './Direction.enum';
import {Move} from './Move.enum';
import {isValidDirection} from '../tools/isValidDirection';
import {isOnlyValidMoves} from '../tools/isValidMove';
import {Tile} from './Tile.interface';

export class Adventurer {
  static readonly IDENTIFIER = 'A';
  static readonly DIRECTIONS = [
    Direction.NORTH,
    Direction.EST,
    Direction.SOUTH,
    Direction.WEST,
  ];

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

  public getNextPos(): {x: number; y: number} {
    let nextPos = {x: this.x, y: this.y};
    if (this.moves[0] === Move.FORWARD) {
      switch (this.direction) {
        case Direction.EST:
          nextPos = {x: this.x + 1, y: this.y};
          break;
        case Direction.WEST:
          nextPos = {x: this.x - 1, y: this.y};
          break;
        case Direction.NORTH:
          nextPos = {x: this.x, y: this.y - 1};
          break;
        case Direction.SOUTH:
          nextPos = {x: this.x, y: this.y + 1};
          break;
        default:
          break;
      }
    }

    return nextPos;
  }

  public turn(move: Move.LEFT | Move.RIGHT) {
    const currentDirectionIndex = Adventurer.DIRECTIONS.indexOf(this.direction);

    const nextDirectionIndex =
      (currentDirectionIndex + (move === Move.RIGHT ? 1 : -1) + 4) % 4;

    this.direction = Adventurer.DIRECTIONS[nextDirectionIndex];
  }

  public move(nextTile: Tile) {
    //TODO: move adventurer
  }
}
