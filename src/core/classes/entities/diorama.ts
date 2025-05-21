import { LifeCycle } from "@/core/interfaces/helpers";
import { Snake } from "./snake";
import { Food } from "./food";
import { Ground } from "./ground";

export class Diorama implements LifeCycle {

    private declare snake: Snake;
    private declare food: Food;
    private declare ground: Ground;

    public start(): void {
        this.snake = new Snake();
        this.food = new Food();
        this.ground = new Ground();
    }
    public update(): void {
        console.log("Diorama updated");
    }
    public dispose(): void {
        this.snake.dispose();
        this.food.dispose();
    }
}