export interface LifeCycle {
    start: (...args: Array<unknown>) => void;
    update: (...args: Array<unknown>) => void;
    dispose: (...args: Array<unknown>) => void;
}