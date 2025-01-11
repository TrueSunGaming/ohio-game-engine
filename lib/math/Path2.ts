import type { Vector2 } from "./Vector2";

export class Path2 {
    points: Vector2[];

    constructor(...points: Vector2[]) {
        this.points = points;
    }

    translate(offset: Vector2) {
        this.points = this.points.map((p) => p.add(offset));
    }
}