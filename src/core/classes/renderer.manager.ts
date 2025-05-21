import { WebGLRenderer } from "three";
import { SceneManager } from "@/core/classes/scene.manager";
/**
 * RendererManager class
 * This class is responsible for managing the WebGL renderer and the scene.
 * It initializes the renderer, sets the size, and handles the render loop.
 * It also handles the resizing of the canvas when the window is resized.
 * It is a singleton class, meaning that there can only be one instance of this class.
 * @class RendererManager
 * @singleton
 */
export class RendererManager {

    private static renderer: WebGLRenderer;
    public static canvas: HTMLCanvasElement;

    private constructor() {
        console.log("RendererManager constructor");
        SceneManager.init();
        RendererManager.init();
        window.addEventListener("resize", RendererManager.resize);
        RendererManager.renderLoop();
    }
    /**
     * RendererManager constructor
     * @constructor
     * @description This constructor is private to prevent instantiation of the class.
     * @description It initializes the renderer, sets the size, and handles the render loop.
     */
    private static init(): void {
        RendererManager.getCanvas();
        RendererManager.createRenderer();
    }
    /**
     * Get the canvas element
     * @returns {void}
     * @memberof RendererManager
     * @description This function is responsible for getting the canvas element.
     */
    private static getCanvas(): void {
        RendererManager.canvas = document.getElementById("snake-game-canvas") as HTMLCanvasElement;
    };
    /**
     * Create the WebGL renderer
     * @returns {void}
     * @memberof RendererManager
     * @description This function is responsible for creating the WebGL renderer.
     */
    private static createRenderer(): void {
        RendererManager.renderer = new WebGLRenderer({ canvas: RendererManager.canvas, antialias: true });
        RendererManager.renderer.setSize(window.innerWidth, window.innerHeight);
        RendererManager.renderer.setPixelRatio(window.devicePixelRatio);
        RendererManager.renderer.toneMappingExposure = 2;
    };
    /**
     * Render loop
     * @returns {void}
     * @memberof RendererManager
     * @description This function is responsible for the render loop.
     */
    private static renderLoop(): void {
        requestAnimationFrame(RendererManager.renderLoop);
        RendererManager.renderer.render(SceneManager.scene, SceneManager.camera);
    }
    /**
     * Resize the canvas
     * @returns {void}
     * @memberof RendererManager
     * @description This function is responsible for resizing the canvas.
     */
    private static resize(): void {
        const width = window.innerWidth;
        const height = window.innerHeight;
        // Update the camera aspect ratio and projection matrix
        SceneManager.camera.aspect = width / height;
        SceneManager.camera.updateProjectionMatrix();
        // Update the renderer size
        RendererManager.renderer.setSize(width, height);
        RendererManager.renderer.setPixelRatio(window.devicePixelRatio);
    }
    /**
     * Function to start the game
     * @returns {void}
     * @memberof RendererManager
     * @description This function is responsible for starting the game.
     */
    public static startGame(): void {
        if (!RendererManager.renderer) {
            new RendererManager();
        }
    };
};