import { Path2 } from "./Path2";
import type { Vector2 } from "./Vector2";

export class Triangle2 extends Path2 {
    declare points: [Vector2, Vector2, Vector2];

    constructor(...points: [Vector2, Vector2, Vector2]) {
        super(...points);
    }
}