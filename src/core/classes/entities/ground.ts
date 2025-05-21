import { LifeCycle } from "@/core/interfaces/helpers";
import { Color, GridHelper } from "three";
import { SceneManager } from "@/core/classes/scene.manager";

/**
 * Ground class
 * This class is responsible for creating the ground grid.
 * It initializes the grid with a specified size and divisions.
 * @class Ground
 * @extends {LifeCycle}
 */
export class Ground implements LifeCycle {
    private size: number = 15;
    private divisions: number = 15;
    public grid: GridHelper;

    /**
     * Ground constructor
     * @constructor
     * @description This constructor is private to prevent instantiation of the class.
     * @description It initializes the scene, camera, and lights.
     */
    constructor() {
        const color = new Color(0.1, 0.1, 0.1);
        this.grid = new GridHelper(this.size, this.divisions, color, color);
        this.start();
    }
    /**
     * Get the grid
     * @returns {GridHelper}
     * @memberof Ground
     */
    public start(): void {
        this.grid.position.set(0, -0.5, 0);
        SceneManager.scene.add(this.grid);
    };
    /**
     * Update the grid
     * @returns {void}
     * @memberof Ground
     */
    public update(): void {
        console.log("Ground updated");
    }
    /**
     * Dispose the grid
     * @returns {void}
     * @memberof Ground
     */
    public dispose(): void {
        console.log("Ground disposed");
    }
}