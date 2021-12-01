import {Direction} from './Direction.enum';
import {Move} from './Move.enum';
import {isValidDirection} from '../tools/isValidDirection';
import {isOnlyValidMoves} from '../tools/isValidMove';
import {Tile} from './Tile.interface';
import {TileType} from './TileType.enum';
import {TileBuilder} from '../tools/TileBuilder';

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
  treasure: number;

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
    this.treasure = 0;
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

  public forward(nextTile: Tile | null): TileBuilder | undefined {
    if (nextTile === null) return;
    const nextPos = this.getNextPos();
    switch (nextTile.identifier) {
      case TileType.MOUNTAIN:
        return;
      case TileType.NORMAL:
        this.x = nextPos.x;
        this.y = nextPos.y;
        return;
      case TileType.TREASURE:
        this.x = nextPos.x;
        this.y = nextPos.y;
        this.treasure += nextTile.treasureNumber || 0;
        return new TileBuilder(TileType.NORMAL, nextPos.x, nextPos.y);
      default:
        throw new Error(`Moving error for ${this.name}`);
    }
  }

  public hasMoves(): boolean {
    return this.moves.length !== 0;
  }

  /**
   * Function that move the adventurer on the map, and return a tile if the move changes the map (eg. taking a treasure)
   * @param nextTile the next tile the adventure will be after his move (null if he do not move)
   * @returns the tile of the next position if ther is any changes, else return nothing
   */
  public move(nextTile: Tile | null): TileBuilder | undefined {
    const move = this.moves.shift();

    switch (move) {
      case Move.LEFT:
      case Move.RIGHT:
        this.turn(move);
        return;
      case Move.FORWARD:
        return this.forward(nextTile);
      default:
        return;
    }
  }

  public toLine(): string {
    return `${Adventurer.IDENTIFIER} - ${this.name} - ${this.x} - ${this.y} - ${this.direction} - ${this.treasure}`;
  }
}
