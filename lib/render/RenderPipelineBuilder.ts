import type { InitializedRenderer } from "./Renderer";

export class RenderPipelineBuilder {
    private renderer: InitializedRenderer;

    protected label?: string;
    protected layout?: GPUPipelineLayout;

    protected vertexShaderModule?: GPUShaderModule;
    protected vertexShaderEntryPoint = "vertexMain";
    protected vertexBuffers: GPUVertexBufferLayout[] = [];

    protected fragmentShaderModule?: GPUShaderModule;
    protected fragmentShaderEntryPoint = "fragmentMain";
    protected fragmentShaderTargets: GPUColorTargetState[] = [];

    constructor(renderer: InitializedRenderer) {
        this.renderer = renderer;
    }

    setLabel(label: string): RenderPipelineBuilder {
        this.label = label;
        return this;
    }

    setLayout(layout: GPUPipelineLayout): RenderPipelineBuilder {
        this.layout = layout;
        return this;
    }

    setVertexShaderModule(code: string, label?: string): RenderPipelineBuilder {
        this.vertexShaderModule = this.renderer.device.createShaderModule({ code, label }); 
        return this;
    }

    setVertexShaderEntryPoint(entry: string): RenderPipelineBuilder {
        this.vertexShaderEntryPoint = entry;
        return this;
    }

    addVertexBuffer(buffer: GPUVertexBufferLayout): RenderPipelineBuilder {
        this.vertexBuffers.push(buffer);
        return this;
    }

    setFragmentShaderModule(code: string, label?: string): RenderPipelineBuilder {
        this.fragmentShaderModule = this.renderer.device.createShaderModule({ code, label });
        return this;
    }

    setFragmentShaderEntryPoint(entry: string): RenderPipelineBuilder {
        this.fragmentShaderEntryPoint = entry;
        return this;
    }

    addFragmentShaderTarget(target: GPUColorTargetState): RenderPipelineBuilder {
        this.fragmentShaderTargets.push(target);
        return this;
    }

    setSharedShaderModule(code: string, label?: string): RenderPipelineBuilder {
        const mod: GPUShaderModule = this.renderer.device.createShaderModule({ code, label });
        this.vertexShaderModule = mod;
        this.fragmentShaderModule = mod;
        return this;
    }

    build(): GPURenderPipeline {
        if (!this.vertexShaderModule) throw new Error("Cannot build a render pipeline without a vertex shader module");
        if (!this.fragmentShaderModule) throw new Error("Cannot build a render pipeline without a fragment shader module");

        return this.renderer.device.createRenderPipeline({
            label: this.label,
            layout: this.layout ?? "auto",
            vertex: {
                module: this.vertexShaderModule,
                entryPoint: this.vertexShaderEntryPoint,
                buffers: this.vertexBuffers
            },
            fragment: {
                module: this.fragmentShaderModule,
                entryPoint: this.fragmentShaderEntryPoint,
                targets: this.fragmentShaderTargets
            }
        });
    }
}