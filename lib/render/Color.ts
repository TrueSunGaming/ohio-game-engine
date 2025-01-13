export class Color implements GPUColorDict {
    r = 0;
    g = 0;
    b = 0;
    a = 1;
    premultiplied = true;

    static RGBtoHSV(r: number, g: number, b: number): [number, number, number] {
        const cmax: number = Math.max(r, g, b);
        const delta: number = cmax - Math.min(r, g, b);

        const res: [number, number, number] = [0, 0, 0];

        if (delta != 0) {
            switch (cmax) {
                case r:
                    res[0] = 60 * ((g - b) / delta % 6);
                    break;
                case g:
                    res[0] = 60 * ((b - r) / delta + 2);
                    break;
                case b:
                    res[0] = 60 * ((r - g) / delta + 4);
                    break;
            }

            res[1] = delta / cmax;
        }

        res[2] = cmax;

        return res;
    }

    static HSVtoRGB(h: number, s: number, v: number): [number, number, number] {
        h %= 360;
        if (h < 0) h += 360;
        
        const c: number = v * s;
        const x: number = c * (1 - Math.abs(h / 60 % 2 - 1));
        const m: number = v - c;

        if (h < 60) return [c + m, x + m, m];
        if (h < 120) return [x + m, c + m, m];
        if (h < 180) return [m, c + m, x + m];
        if (h < 240) return [m, x + m, c + m];
        if (h < 300) return [x + m, m, c + m];
        return [c + m, m, x + m];
    }

    static premultiplyAlpha([r, g, b, a]: [number, number, number, number]): [number, number, number, number] {
        return [r * a, g * a, b * a, a];
    }

    static RGB(r = 0, g = 0, b = 0, a = 1, premultiplied = true): Color {
        const res: Color = new Color();
        res.rgb = [r, g, b, a];
        res.premultiplied = premultiplied;

        return res;
    }

    static RGB256(r = 0, g = 0, b = 0, a = 255, premultiplied = true): Color {
        return Color.RGB(r / 255, g / 255, b / 255, a / 255, premultiplied);
    }

    static HSV(h = 0, s = 0, v = 0, a = 1, premultiplied = true): Color {
        return Color.RGB(...Color.HSVtoRGB(h, s, v), a, premultiplied);
    }

    get rgb(): [number, number, number, number] {
        return [this.r, this.g, this.b, this.a];
    }

    get vec4f(): Float32Array {
        return new Float32Array(Color.premultiplyAlpha(this.rgb));
    }

    get hsv(): [number, number, number, number] {
        return [...Color.RGBtoHSV(this.r, this.g, this.b), this.a];
    }

    get h(): number {
        return this.hsv[0];
    }

    get s(): number {
        return this.hsv[1];
    }

    get v(): number {
        return this.hsv[2];
    }

    set h(val: number) {
        const hsv: [number, number, number, number] = this.hsv;
        hsv[0] = val;
        this.hsv = hsv;
    }

    set s(val: number) {
        const hsv: [number, number, number, number] = this.hsv;
        hsv[1] = val;
        this.hsv = hsv;
    }

    set v(val: number) {
        const hsv: [number, number, number, number] = this.hsv;
        hsv[2] = val;
        this.hsv = hsv;
    }

    set rgb([r = 0, g = 0, b = 0, a = 1]: [number?, number?, number?, number?]) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    set hsv([h = 0, s = 0, v = 0, a = 1]: [number?, number?, number?, number?]) {
        this.rgb = [...Color.HSVtoRGB(h, s, v), a];
    }
}