import type { InitializedRenderer } from "./Renderer";

export class BindGroupBuilder {
    private renderer: InitializedRenderer;
    private pipeline: GPURenderPipeline;

    protected label?: string;
    protected entries: GPUBindGroupEntry[] = [];

    constructor(renderer: InitializedRenderer, pipeline: GPURenderPipeline) {
        this.renderer = renderer;
        this.pipeline = pipeline;
    }

    setLabel(label: string): BindGroupBuilder {
        this.label = label;
        return this;
    }

    addBinding(binding: number, data: BufferSource | SharedArrayBuffer, label?: string): BindGroupBuilder {
        const buffer: GPUBuffer = this.renderer.device.createBuffer({
            label,
            size: data.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        });
        this.renderer.device.queue.writeBuffer(buffer, binding, data);

        this.entries.push({ binding, resource: { buffer } });

        return this;
    }

    build(): GPUBindGroup {
        return this.renderer.device.createBindGroup({
            label: this.label,
            layout: this.pipeline.getBindGroupLayout(0),
            entries: this.entries
        });
    }
}