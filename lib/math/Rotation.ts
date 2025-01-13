export type RotationValue = Rotation | number;

export class Rotation {
    rad: number;

    constructor(val: RotationValue) {
        this.rad = typeof val == "number" ? val : val.rad;
    }

    static from(val: RotationValue): Rotation {
        return typeof val == "number" ? new Rotation(val) : val;
    }

    static getRadians(val: RotationValue): number {
        return typeof val == "number" ? val : val.rad;
    }

    static getDegrees(val: RotationValue): number {
        return Rotation.radToDeg(Rotation.getRadians(val));
    }

    get copy(): Rotation {
        return new Rotation(this);
    }

    static radToDeg(rad: number): number {
        return rad * 180 / Math.PI;
    }

    static degToRad(deg: number): number {
        return deg * Math.PI / 180;
    }

    static radians(radians: number): Rotation {
        return new Rotation(radians);
    }

    static degrees(degrees: number): Rotation {
        return new Rotation(Rotation.degToRad(degrees));
    }

    get deg(): number {
        return Rotation.degToRad(this.rad);
    }

    set deg(val: number) {
        this.rad = Rotation.degToRad(val);
    }
}