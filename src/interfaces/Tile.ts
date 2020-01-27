import Vector2D from './Vector2D';

export const enum DIRECTION {
    LEFT,
    RIGHT,
    UP,
    DOWN,
    LEFT_UP,
    LEFT_DOWN,
    RIGHT_UP,
    RIGHT_DOWN
}

export const enum TILE_TYPE {
    EMPTY,
    GROUND
}

export interface Path {
    to: Tile;
    from: Tile;
    weight: number;
}

export type Neighbor = {
    [direction in DIRECTION]?: Path;
}

export interface Tile {
    position: Vector2D;
    neighbor: Neighbor;
}