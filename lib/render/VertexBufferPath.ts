import { Path2 } from "../math/Path2";
import type { Vector2 } from "../math/Vector2";
import type { InitializedRenderer } from "./Renderer";
import type { Triangle2 } from "../math/Triangle2";

export class VertexBufferPath extends Path2 {
    private renderer: InitializedRenderer;

    constructor(renderer: InitializedRenderer, ...points: Vector2[]) {
        super(...points);

        this.renderer = renderer;
    }

    static fromPath(renderer: InitializedRenderer, path: Path2): VertexBufferPath {
        return new VertexBufferPath(renderer, ...path.points);
    }

    static fromTriangles(renderer: InitializedRenderer, ...triangles: Triangle2[]): VertexBufferPath {
        return new VertexBufferPath(renderer, ...triangles.flatMap((t) => t.points));
    }

    get vertices(): Float32Array {
        return new Float32Array(this.points.flatMap((p) => [
            p.x / this.renderer.canvas.clientWidth,
            p.y / this.renderer.canvas.clientHeight
        ]));
    }

    get vertexBuffer(): GPUBuffer {
        const buffer: GPUBuffer = this.renderer.device.createBuffer({
            size: this.vertices.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
        });
        this.renderer.device.queue.writeBuffer(buffer, 0, this.vertices);

        return buffer;
    }
}