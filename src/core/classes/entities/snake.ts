import { LifeCycle } from "@/core/interfaces/helpers";
import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";
import { SceneManager } from "@/core/classes/scene.manager";

export class Snake implements LifeCycle {

    private head: Mesh;
    private geometry: BoxGeometry;
    private material: MeshStandardMaterial;
    private x: number = 0;
    private z: number = 0;
    private tail: Array<Mesh> = [];

    constructor() {
        this.geometry = new BoxGeometry(1, 1, 1);
        this.material = new MeshStandardMaterial({ 
            color: 0x0000ff,
            emissive: 0x0000ff,
            metalness: 0.5,
            roughness: 0.55,
        });
        this.head = new Mesh(this.geometry, this.material);
        this.head.position.set(this.x, 0, this.z);
        this.start();
    }

    public start(): void {
        SceneManager.scene.add(this.head);
    }
    public update(): void {
        console.log("Diorama updated");
    }
    public dispose(): void {
        console.log("Diorama disposed");
    }
}