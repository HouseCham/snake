import { Color, HemisphereLight, PerspectiveCamera, Scene } from "three";
import { Diorama } from "./entities/diorama";
/**
 * SceneManager class
 * This class is responsible for managing the scene, camera, and lights.
 * It initializes the scene, camera, and lights.
 * @class SceneManager
 * @singleton
 */
export class SceneManager {
    public static scene: Scene;
    public static camera: PerspectiveCamera;
    private static lights: HemisphereLight;
    /**
     * SceneManager constructor
     * @constructor
     * @description This constructor is private to prevent instantiation of the class.
     * @description It initializes the scene, camera, and lights.
     */
    public static init(): void {
        SceneManager.createScene();
        SceneManager.createCamera();
        SceneManager.createLights();

        const diorama = new Diorama();
        diorama.start();
    }
    /**
     * Get the scene
     * @returns {Scene}
     * @memberof SceneManager
     */
    private static createScene(): void {
        SceneManager.scene = new Scene();
        SceneManager.scene.background = new Color(0x000000);
    };
    /**
     * Create a camera for the scene
     * @returns {void}
     * @memberof SceneManager
     */
    private static createCamera(): void {
        SceneManager.camera = new PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 100);
        SceneManager.camera.position.set(10, 5, 10);
        SceneManager.camera.lookAt(0, 0, 0);
        SceneManager.scene.add(SceneManager.camera);
    };
    /**
     * Create lights for the scene
     * @returns {void}
     * @memberof SceneManager
     */
    private static createLights(): void {
        SceneManager.lights = new HemisphereLight(0xffffff, 0.2);
        SceneManager.lights.position.set(100, 100, 100);
        SceneManager.scene.add(SceneManager.lights);
    };
    
};