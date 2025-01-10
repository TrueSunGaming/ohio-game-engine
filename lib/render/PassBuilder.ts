import type { InitializedRenderer } from "./Renderer"

export class PassBuilder {
    private renderer: InitializedRenderer;
    
    protected backgroundColor: GPUColor = { r: 0, g: 0, b: 0, a: 0 };

    constructor(renderer: InitializedRenderer) {
        this.renderer = renderer;
    }

    setBackgroundColor(color: GPUColor): PassBuilder {
        this.backgroundColor = color;
        return this;
    }
    
    build(): GPURenderPassEncoder {
        if (!this.renderer) throw new Error("Cannot build a pass without an initialized renderer");

        return this.renderer.encoder.beginRenderPass({
            colorAttachments: [{
                view: this.renderer.ctx.getCurrentTexture().createView(),
                loadOp: "clear",
                storeOp: "store",
                clearValue: this.backgroundColor
            }]
        });
    }
}