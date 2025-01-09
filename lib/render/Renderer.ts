export class Renderer {
    canvas: HTMLCanvasElement;
    ctx: GPUCanvasContext;
    adapter: GPUAdapter;
    device: GPUDevice;
    canvasFormat: GPUTextureFormat;
    encoder: GPUCommandEncoder;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    async init(): Promise<void> {
        Renderer.checkGPU();

        this.initContext();
        this.initFormat();
        await this.initAdapter()
        await this.initDevice();
        this.configureContext();
        this.initEncoder();
    }

    static checkGPU(): void {
        if (navigator.gpu) return;

        alert("WebGPU is not supported");
        throw new Error("WebGPU is not supported");
    }

    private initContext(): void {
        if (!this.canvas) throw new Error("Cannot initialize canvas context without a canvas");

        const ctx: GPUCanvasContext | null = this.canvas.getContext("webgpu");
        if (!ctx) throw new Error("Failed to initialize canvas context");

        this.ctx = ctx;
    }

    private async initAdapter(): Promise<void> {
        const adapter: GPUAdapter | null = await navigator.gpu.requestAdapter();
        if (!adapter) throw new Error("No GPUAdapter found");

        this.adapter = adapter;
    }

    private async initDevice(): Promise<void> {
        if (!this.adapter) throw new Error("Cannot initialize device before adapter");
        this.device = await this.adapter.requestDevice();
    }

    private initFormat(): void {
        this.canvasFormat = navigator.gpu.getPreferredCanvasFormat();
    }

    private configureContext(): void {
        if (!this.ctx) throw new Error("Cannot configure context before initializing it");
        if (!this.device) throw new Error("Cannot configure context before initializing device");
        if (!this.canvasFormat) throw new Error("Cannot configure context before initializing canvas format");

        this.ctx.configure({
            device: this.device,
            format: this.canvasFormat,
        });
    }

    private initEncoder(): void {
        if (!this.device) throw new Error("Cannot initialize encoder before device");
        this.encoder = this.device.createCommandEncoder();
    }

    renderPass(pass: GPURenderPassEncoder): void {
        pass.end();
        this.device.queue.submit([this.encoder.finish()]);
    }
}