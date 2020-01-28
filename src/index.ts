import MapGenerator from './classes/MapGenerator';
import PathFinder from './classes/PathFinder';
import Dictionary from './interfaces/Dictionary';
import { Tile } from './interfaces/Tile';
import Vector2D from './interfaces/Vector2D';

const mapGenerator: MapGenerator = new MapGenerator();
mapGenerator.initialize({ seed: 'seed2', size: { width: 30, height: 30 }, density: 0.4 });

const map: Dictionary<Tile> = mapGenerator.generate();
mapGenerator.print();

const pathFinder: PathFinder = new PathFinder();
const path: Array<Vector2D> = pathFinder.find(map[11].position, mapGenerator.getTileAtPosition({ x: 0, y: 0 }).position, mapGenerator.map);

console.log(path);