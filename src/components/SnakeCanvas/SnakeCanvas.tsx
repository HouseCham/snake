"use client";
import { Component, ReactNode } from "react";
import styles from "./SnakeCanvas.module.css";
import { RendererManager } from "@/core/classes/renderer.manager";
/**
 * SnakeCanvas component
 * This component is responsible for rendering the snake game canvas.
 * @class SnakeCanvas
 * @extends Component
 */
export default class SnakeCanvas extends Component {
    public componentDidMount(): void {
        RendererManager.startGame();
    }

    public render(): ReactNode {
        return (
            <div>
                <canvas id="snake-game-canvas" className={styles.fullscreen} />
            </div>
        );
    }
}