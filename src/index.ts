import * as ohio from "../lib";

const canvas: HTMLCanvasElement = document.querySelector("canvas")!;
const renderer: ohio.InitializedRenderer = await new ohio.Renderer(canvas).init();

let t = 0;

setInterval(() => {
    t++;

    const pass: GPURenderPassEncoder = new ohio.PassBuilder(renderer)
        .setBackgroundColor(ohio.Color.HSV(t, 1, 1, 1))
        .build()

    renderer.renderPass(pass);
}, 50 / 3);