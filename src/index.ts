import * as ohio from "../lib";
import rectShader from "../lib/render/shaders/rect.wgsl?raw";

const canvas: HTMLCanvasElement = document.querySelector("canvas")!;
const renderer: ohio.InitializedRenderer = await new ohio.Renderer(canvas).init();

setInterval(() => {
    const pass: GPURenderPassEncoder = renderer.getClear(ohio.Color.RGB());

    const rect: ohio.VertexBufferPath = new ohio.VertexBufferPath(
        renderer,

        new ohio.Vector2(-100, -100),
        new ohio.Vector2(100, -100),
        new ohio.Vector2(100, 100),

        new ohio.Vector2(-100, -100),
        new ohio.Vector2(100, 100),
        new ohio.Vector2(-100, 100)
    );

    const vertexBufferLayout: GPUVertexBufferLayout = {
        arrayStride: 8,
        attributes: [{
            format: "float32x2",
            offset: 0,
            shaderLocation: 0
        }],
    };

    const pipeline: GPURenderPipeline = new ohio.RenderPipelineBuilder(renderer)
        .setSharedShaderModule(rectShader)
        .addVertexBuffer(vertexBufferLayout)
        .addFragmentShaderTarget({
            format: renderer.canvasFormat
        })
        .build();
    
    pass.setPipeline(pipeline);

    pass.setVertexBuffer(0, rect.vertexBuffer);
    pass.setBindGroup(0, new ohio.BindGroupBuilder(renderer, pipeline)
        .addBinding(0, new Float32Array([1, 0, 0, 0]))
        .build());
    pass.draw(rect.vertices.length / 2);

    rect.translate(new ohio.Vector2(100, 100));

    pass.setVertexBuffer(0, rect.vertexBuffer);
    pass.setBindGroup(0, new ohio.BindGroupBuilder(renderer, pipeline)
        .addBinding(0, new Float32Array([0, 1, 0, 0]))
        .build());
    pass.draw(rect.vertices.length / 2);

    renderer.renderPass(pass);
}, 50 / 3);