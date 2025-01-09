import type { Renderer } from "./Renderer"

export class PassBuilder {
    private renderer: Renderer;
    
    protected backgroundColor: GPUColor = { r: 0, g: 0, b: 0, a: 1 };

    setBackgroundColor(color: GPUColor): PassBuilder {
        this.backgroundColor = color;
        return this;
    }
    
    build(): GPURenderPassEncoder {
        if (!this.renderer) throw new Error("Cannot build a pass without a renderer");

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