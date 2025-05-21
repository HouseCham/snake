import { LifeCycle } from "@/core/interfaces/helpers";
import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";
import { SceneManager } from "@/core/classes/scene.manager";

export class Food implements LifeCycle {

    private mesh: Mesh;
    private geometry: BoxGeometry;
    private material: MeshStandardMaterial;
    private x: number = 4;
    private z: number = 4;

    constructor() {
        this.geometry = new BoxGeometry(1, 1, 1);
        this.material = new MeshStandardMaterial({ 
            color: 0x00ff00,
            emissive: 0x00ff00,
            metalness: 0.5,
            roughness: 0.55,
        });
        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.position.set(this.x, 0, this.z);
        this.start();
        this.start();
    }

    public start(): void {
        SceneManager.scene.add(this.mesh);
    }
    public update(): void {
        console.log("Diorama updated");
    }
    public dispose(): void {
        console.log("Diorama disposed");
    }
}