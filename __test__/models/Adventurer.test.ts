import {Adventurer} from '../../src/models/Adventurer';
import {Direction} from '../../src/models/Direction.enum';
import {Move} from '../../src/models/Move.enum';

describe('Adventurer tests', () => {
  describe('construct an Adventurer', () => {
    it('should creat an Adventurer from constructor', () => {
      const adventurer = new Adventurer('Bob', 0, 0, Direction.EST, [
        Move.FORWARD,
        Move.LEFT,
      ]);

      expect(adventurer.name).toBe('Bob');
      expect(adventurer.x).toBe(0);
      expect(adventurer.y).toBe(0);
      expect(adventurer.direction).toBe(Direction.EST);
      expect(adventurer.moves).toStrictEqual([Move.FORWARD, Move.LEFT]);
    });

    it('should creat an Adventurer from line', () => {
      const adventurer = Adventurer.fromLine('A - Bob - 1 - 1 - E - AG');

      expect(adventurer.name).toBe('Bob');
      expect(adventurer.x).toBe(1);
      expect(adventurer.y).toBe(1);
      expect(adventurer.direction).toBe(Direction.EST);
      expect(adventurer.moves).toStrictEqual([Move.FORWARD, Move.LEFT]);
    });
  });

  describe('Movements', () => {
    const alice = Adventurer.fromLine('A - Alice - 1 - 1 - N - AG');
    const bob = Adventurer.fromLine('A - Bob - 1 - 1 - E - AG');
    const charles = Adventurer.fromLine('A - Charles - 1 - 1 - S - DG');
    const david = Adventurer.fromLine('A - David - 1 - 1 - W - GG');

    it('should return next position', () => {
      expect(bob.getNextPos()).toStrictEqual({x: 2, y: 1});
    });

    it('next position should be equal to current position', () => {
      const nextPos = charles.getNextPos();
      expect(nextPos.x).toBe(charles.x);
      expect(nextPos.y).toBe(charles.y);
    });

    it.each`
      adventurer | nextDirection      | move          | moveName
      ${alice}   | ${Direction.EST}   | ${Move.RIGHT} | ${'right'}
      ${bob}     | ${Direction.SOUTH} | ${Move.RIGHT} | ${'right'}
      ${charles} | ${Direction.WEST}  | ${Move.RIGHT} | ${'right'}
      ${david}   | ${Direction.NORTH} | ${Move.RIGHT} | ${'right'}
      ${alice}   | ${Direction.NORTH} | ${Move.LEFT}  | ${'left'}
      ${bob}     | ${Direction.EST}   | ${Move.LEFT}  | ${'left'}
      ${charles} | ${Direction.SOUTH} | ${Move.LEFT}  | ${'left'}
      ${david}   | ${Direction.WEST}  | ${Move.LEFT}  | ${'left'}
    `('should turn $moveName', ({adventurer, nextDirection, move}) => {
      adventurer.turn(move);
      expect(adventurer.direction).toBe(nextDirection);
    });
  });
});
