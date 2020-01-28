import { TILE_TYPE } from "../interfaces/Tile";
import { AStarFinder, Grid } from 'pathfinding';
import Vector2D from "../interfaces/Vector2D";
export default class PathFinder {
    public find(from: Vector2D, to: Vector2D, map: Array<Array<TILE_TYPE>>): Array<Vector2D> {
        const begin: number = Date.now();
        const grid: Grid = new Grid(map);
        const finder: AStarFinder = new AStarFinder({
            allowDiagonal: true
        });

        const path: Array<Array<number>> = finder.findPath(from.x, from.y, to.x, to.y, grid);
        console.log(`finding path : ${Date.now() - begin}ms / ${path.length}`);
        return path.map(vector => { return { x: vector[0], y: vector[1] }; });
    }
}