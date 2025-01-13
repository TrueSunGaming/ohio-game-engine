import type { Vector2 } from "./Vector2";

export class Rect2 {
    position: Vector2;
    size: Vector2;

    constructor(position: Vector2, size: Vector2) {
        this.position = position;
        this.size = size;
    }

    translate(offset: Vector2) {
        this.position = this.position.add(offset);
    }
}