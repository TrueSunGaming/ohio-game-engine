export class Vector2 {
    x: number;
    y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    get copy(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    add(other: Vector2) {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    get opposite(): Vector2 {
        return new Vector2(-this.x, -this.y);
    }

    sub(other: Vector2) {
        return new Vector2(this.x - other.x, this.y - other.y);
    }

    get lengthSquared(): number {
        return this.x * this.x + this.y * this.y;
    }

    get length(): number {
        return Math.sqrt(this.lengthSquared);
    }

    set length(val: number) {
        this.scale(val / this.length);
    }

    set lengthSquared(val: number) {
        this.length = Math.sqrt(val);
    }

    distanceSquared(to: Vector2): number {
        return (this.x - to.x) * (this.x - to.x) + (this.y - to.y) * (this.y - to.y);
    }

    distance(to: Vector2): number {
        return Math.sqrt(this.distanceSquared(to));
    }

    scale(factor: number, around: Vector2 = new Vector2()) {
        return new Vector2(
            factor * (this.x - around.x) + around.x,
            factor * (this.y - around.y) + around.y
        );
    }

    shrink(factor: number, around: Vector2 = new Vector2()) {
        return this.scale(1 / factor, around);   
    }

    get direction() {
        return this.shrink(this.length);
    }

    get angle(): number {
        return Math.atan2(this.y, this.x);
    }

    set angle(val: number) {
        const x: number = this.x;
        const y: number = this.y;
        this.x = Math.cos(val) * x - Math.sin(val) * y;
        this.y = Math.sin(val) * x + Math.cos(val) * y;
    }

    get angleDeg(): number {
        return this.angle * 180 / Math.PI;
    }

    set angleDeg(val: number) {
        this.angle = val * Math.PI / 180;
    }

    rotate(rad: number, around: Vector2 = new Vector2()) {
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        return new Vector2(
            cos * (this.x - around.x) - sin * (this.y - around.y) + around.x,
            sin * (this.x - around.x) + cos * (this.y - around.y) + around.y
        );
    }

    rotateDeg(deg: number, around: Vector2 = new Vector2()) {
        return this.rotate(deg * Math.PI / 180, around);
    }

    dot(other: Vector2) {
        return this.x * other.x + this.y * other.y;
    }
}