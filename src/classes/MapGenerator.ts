import { Tile, TILE_TYPE, DIRECTION } from "../interfaces/Tile";
import Dictionary from "../interfaces/Dictionary";
import Vector2D from "../interfaces/Vector2D";

export interface MapGeneratorOptions {
    seed?: string;
    size?: { width: number, height: number };
    density?: number;
}

export default class MapGenerator {
    private seed: string;
    private size: Dictionary<number>;
    private density: number;

    // public method
    public initialize(options?: MapGeneratorOptions) {
        const DEFAULT_OPTIONS: MapGeneratorOptions = { seed: '', size: { width: 10, height: 10 }, density: 0.5 };
        options = Object.assign(DEFAULT_OPTIONS, options ? options : {});
        this.size = options.size;
        this.seed = options.seed;
        this.density = options.density;
    }

    public generate(): Array<Tile> {
        const result: Array<Tile> = [];

        return result;
    }

    // private method
    public generateArrayMap(): Array<Array<TILE_TYPE>> {
        const start: number = Date.now();
        const result: Array<Array<TILE_TYPE>> = this.getNewArrayMap();
        this.createTile(result, { x: Math.round(this.size.width / 2), y: Math.round(this.size.height / 2) });

        while (this.getProcedureRate(result) < this.density) {
            const startPosition: Vector2D = this.getRandomPosition(result);
            this.createTile(result, startPosition);
        }

        this.printArrayMap(result);
        console.log(`${this.getProcedureRate(result) * 100}% / width: ${this.size.width * 16}px, height: ${this.size.height * 16}px`);
        console.log(`${Date.now() - start}ms`);
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

    private createTile(origin: Array<Array<TILE_TYPE>>, position: Vector2D): void {
        for (let y = position.y - 1; y <= position.y + 1; y++) {
            for (let x = position.x - 1; x <= position.x + 1; x++) {
                if (origin?.[y]?.[x] === TILE_TYPE.EMPTY) origin[y][x] = TILE_TYPE.GROUND;
            }
        }
    }

    private getRandomPosition(map: Array<Array<TILE_TYPE>>): Vector2D {
        const positions: Array<Vector2D> = [];

        for (let y in map) {
            for (let x in map[y]) {
                let canPush: boolean = (map[y][x] !== TILE_TYPE.EMPTY) && this.isValidatePosition(map, { x: Number(x), y: Number(y) });
                if (canPush) {
                    positions.push({ x: Number(x), y: Number(y) });
                }
            }
        }

        if (positions.length > 0) {
            const index: number = Math.round(Math.random() * (positions.length - 1));
            return positions[index];
        } else {
            let x: number = Math.round(Math.random() * this.size.width);
            let y: number = Math.round(Math.random() * this.size.height);
            return { x, y };
        }
    }

    private isValidatePosition(map: Array<Array<TILE_TYPE>>, position: Vector2D): boolean {
        let isValidate: boolean = false;

        for (let y = position.y - 1; y <= position.y + 1; y++) {
            for (let x = position.x - 1; x <= position.x + 1; x++) {
                isValidate = isValidate || (map?.[y]?.[x] === TILE_TYPE.EMPTY);
            }
        }

        return isValidate;
    }

    private printArrayMap(map: Array<Array<TILE_TYPE>>): void {
        for (let tiles of map) {
            let tileConsole: string = tiles.toString();
            tileConsole = tileConsole.replace(/,/g, ' ');
            tileConsole = tileConsole.replace(/0/g, '□');
            tileConsole = tileConsole.replace(/1/g, '■');
            console.log(tileConsole);
        }
    }
}