import {Direction} from '../models/Direction.enum';

export function isValidDirection(direction: string): boolean {
  switch (direction) {
    case Direction.EST:
    case Direction.NORTH:
    case Direction.SOUTH:
    case Direction.WEST:
      return true;
    default:
      return false;
  }
}
