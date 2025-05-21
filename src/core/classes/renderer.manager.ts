import { Vector2, WebGLRenderer } from "three";
import { SceneManager } from "@/core/classes/scene.manager";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
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
    private static composer: EffectComposer;

    private constructor() {
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
        RendererManager.handlePostProcessing();
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
        if (RendererManager.composer) {
            RendererManager.composer.render();
        }
    }

    /**
     * Handle post processing
     * @returns {void}
     * @memberof RendererManager
     * @description This function is responsible for handling post processing.
     */
    private static handlePostProcessing(): void {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // this line renders the primary three.js scene (SceneManager.scene) 
        // from the perspective of the main camera (SceneManager.camera) into an offscreen buffer
        const renderScene = new RenderPass(SceneManager.scene, SceneManager.camera);
        // specialized post-processing effect that simulates the "bloom" or "glow" 
        // seen around bright objects in real-world cameras
        const bloomPass = new UnrealBloomPass(new Vector2(width, height), 1.5, 0.4, 0.85);
        // This line explicitly sets the threshold of the bloom pass to 0. 
        // This means all pixels in the scene, regardless of their brightness, will contribute to the bloom effect. 
        // A higher threshold would make the bloom effect only apply to very bright areas.
        bloomPass.threshold = 0;
        // This controls the intensity of the glow. You can adjust this value to make the bloom more or less pronounced.
        bloomPass.strength = 1;
        // This controls how far the glow spreads. A radius of 0 might seem counterintuitive for a bloom effect, 
        // suggesting a very tight or non-existent spread.
        bloomPass.radius = 0;
        // This is a crucial property. When renderToScreen is set to true for a pass, 
        // that pass will render its output directly to the canvas 
        bloomPass.renderToScreen = true;
        RendererManager.composer = new EffectComposer(RendererManager.renderer);
        RendererManager.composer.setSize(width, height);
        // This adds the RenderPass to the composer's chain. 
        // It's typically the first pass added, as it provides the initial rendered scene
        RendererManager.composer.addPass(renderScene);
        // This adds the UnrealBloomPass to the composer's chain, after the RenderPass. 
        // This means the bloom effect will be applied to the output of the RenderPass.
        RendererManager.composer.addPass(bloomPass);
        // toneMappingExposure is a property of the WebGLRenderer that controls the exposure level 
        // when tone mapping is applied. Tone mapping is a technique used to map HDR (High Dynamic Range) 
        // values to LDR (Low Dynamic Range) values, which is necessary for displaying rendered 
        // scenes on standard monitors.
        RendererManager.renderer.toneMappingExposure = Math.pow(0.9, 4.0); //Math.pow(0.9, 4.0) calculates 0.9 raised to the power of 4.0, which is 0.6561. Setting toneMappingExposure to a value less than 1.0 will darken the overall scene, which can be useful when combined with bloom to prevent the scene from becoming overexposed due to the added glow.
    };

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