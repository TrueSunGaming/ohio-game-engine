import type { InitializedRenderer } from "./Renderer"

export class PassBuilder {
    private renderer: InitializedRenderer;
    
    protected backgroundColor?: GPUColor;
    protected previousTexture?: GPUTexture

    constructor(renderer: InitializedRenderer) {
        this.renderer = renderer;
    }

    setBackgroundColor(color: GPUColor): PassBuilder {
        this.backgroundColor = color;
        return this;
    }

    setPreviousTexture(texture: GPUTexture): PassBuilder {
        this.previousTexture = texture;
        return this;
    }
    
    build(): GPURenderPassEncoder {
        if (!this.renderer) throw new Error("Cannot build a pass without an initialized renderer");

        return this.renderer.encoder.beginRenderPass({
            colorAttachments: [{
                view: (this.previousTexture ?? this.renderer.ctx.getCurrentTexture()).createView(),
                loadOp: "clear",
                storeOp: "store",
                clearValue: this.backgroundColor
            }]
        });
    }
}