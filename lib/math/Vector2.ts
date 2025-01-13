import { Rotation, type RotationValue } from "./Rotation";

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

    add(other: Vector2): Vector2 {
        return this.copy.addSelf(other);
    }

    addSelf(other: Vector2): Vector2 {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    get opposite(): Vector2 {
        return this.copy.negateSelf();
    }

    negateSelf(): Vector2 {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    sub(other: Vector2): Vector2 {
        return this.copy.subSelf(other);
    }

    subSelf(other: Vector2): Vector2 {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    get lengthSquared(): number {
        return this.x * this.x + this.y * this.y;
    }

    get length(): number {
        return Math.sqrt(this.lengthSquared);
    }

    set length(val: number) {
        this.scaleSelf(val / this.length);
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

    scale(factor: number, around: Vector2 = new Vector2()): Vector2 {
        return this.copy.scaleSelf(factor, around);
    }

    scaleSelf(factor: number, around: Vector2 = new Vector2()): Vector2 {
        this.x = factor * (this.x - around.x) + around.x;
        this.y = factor * (this.y - around.y) + around.y;
        return this;
    }

    shrink(factor: number, around: Vector2 = new Vector2()): Vector2 {
        return this.scale(1 / factor, around);   
    }

    shrinkSelf(factor: number, around: Vector2 = new Vector2()): Vector2 {
        return this.scaleSelf(1 / factor, around);
    }

    get direction(): Vector2 {
        return this.shrink(this.length);
    }

    get angle(): number {
        return Math.atan2(this.y, this.x);
    }

    set angle(val: RotationValue) {
        const rad: number = Rotation.getRadians(val);

        const x: number = this.x;
        const y: number = this.y;

        this.x = Math.cos(rad) * x - Math.sin(rad) * y;
        this.y = Math.sin(rad) * x + Math.cos(rad) * y;
    }

    get angleDeg(): number {
        return Rotation.radToDeg(this.angle);
    }

    set angleDeg(val: number) {
        this.angle = Rotation.degToRad(val);
    }

    rotate(rot: RotationValue, around: Vector2 = new Vector2()): Vector2 {
        return this.copy.rotateSelf(rot, around);
    }

    rotateSelf(rot: RotationValue, around: Vector2 = new Vector2()): Vector2 {
        const rad: number = Rotation.getRadians(rot);

        const cos: number = Math.cos(rad);
        const sin: number = Math.sin(rad);
        const x: number = this.x;
        const y: number = this.y;

        this.x = cos * (x - around.x) - sin * (y - around.y) + around.x;
        this.y = sin * (x - around.x) + cos * (y - around.y) + around.y;

        return this;
    }

    rotateDeg(deg: number, around: Vector2 = new Vector2()): Vector2 {
        return this.rotate(Rotation.degToRad(deg), around);
    }

    rotateSelfDeg(deg: number, around: Vector2 = new Vector2()): Vector2 {
        return this.rotateSelf(Rotation.degToRad(deg), around);
    }

    dot(other: Vector2) {
        return this.x * other.x + this.y * other.y;
    }

    get array(): [number, number] {
        return [this.x, this.y];
    }

    get vec2f(): Float32Array {
        return new Float32Array(this.array);
    }
}