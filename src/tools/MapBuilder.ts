import {TileBuilder} from './TileBuilder';

export default class MapBuilder {
  map: {
    height: number;
    width: number;
  };
  tiles: TileBuilder[];

  constructor() {
    this.map = {
      height: 0,
      width: 0,
    };
    this.tiles = [];
  }

  public setMap(line: string) {
    if (this.map.height !== 0 || this.map.width !== 0)
      throw new Error('Map allready set');
    else {
      const [id, height, width] = line.split(' - ');
      if (id === 'C' && height && width) {
        this.map.height = parseInt(height);
        this.map.width = parseInt(width);
      }
    }
  }
}
