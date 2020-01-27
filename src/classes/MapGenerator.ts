import { Tile, TILE_TYPE, DIRECTION } from "../interfaces/Tile";
import Dictionary from "../interfaces/Dictionary";
import Vector2D from "../interfaces/Vector2D";

export interface MapGeneratorOptions {
    seed?: string;
    size?: { width: number, height: number };
}

export default class MapGenerator {
    private seed: string;
    private size: Dictionary<number>

    // public method
    public initialize(options?: MapGeneratorOptions) {
        const DEFAULT_OPTIONS: MapGeneratorOptions = { seed: '', size: { width: 10, height: 10 } };
        options = Object.assign(DEFAULT_OPTIONS, options ? options : {});
        this.size = options.size;
        this.seed = options.seed;
    }

    public generate(): Array<Tile> {
        const result: Array<Tile> = [];

        return result;
    }

    // private method
    public generateArrayMap(): Array<Array<TILE_TYPE>> {
        const result: Array<Array<TILE_TYPE>> = this.getNewArrayMap();

        while (this.getProcedureRate(result) < 0.5) {
            const startPosition: Vector2D = this.randomPosition;
            const size: number = Math.round(Math.random() * 4) * 3 + 3;

            for (let y = startPosition.y; y < startPosition.y + size; y++) {
                if (result?.[y] === undefined) break;

                for (let x = startPosition.x; x < startPosition.x + size; x++) {
                    if (result?.[y]?.[x] === undefined) break;
                    result[y][x] = TILE_TYPE.GROUND;
                }
            }
        }

        this.printArrayMap(result);
        console.log(`${this.getProcedureRate(result) * 100}%`);
        return result;
    }

    private getProcedureRate(map: Array<Array<TILE_TYPE>>): number {
        const maxProcedure: number = this.size.width * this.size.height;
        let currentProcedure: number = 0;

        for (const tiles of map) {
            for (const tile of tiles) {
                if (tile === TILE_TYPE.GROUND) currentProcedure++;
            }
        }

        return currentProcedure / maxProcedure;
    }

    private getNewArrayMap(): Array<Array<TILE_TYPE>> {
        const result: Array<Array<TILE_TYPE>> = [];

        for (let y = 0; y < this.size.height; y++) {
            result.push([]);
            for (let x = 0; x < this.size.width; x++) {
                result[y].push(TILE_TYPE.EMPTY);
            }
        }

        return result;
    }

    private get randomPosition(): Vector2D {
        const x: number = Math.round(Math.random() * this.size.width);
        const y: number = Math.round(Math.random() * this.size.height);

        return { x, y }
    }

    private printArrayMap(result: Array<Array<TILE_TYPE>>): void {
        for (let tiles of result) {
            let tileConsole: string = tiles.toString();
            tileConsole = tileConsole.replace(/,/g, ' ');
            tileConsole = tileConsole.replace(/0/g, '□');
            tileConsole = tileConsole.replace(/1/g, '■');
            console.log(tileConsole);
        }
    }
}