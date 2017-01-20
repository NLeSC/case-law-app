/* import all svg files as strings */
declare module '*.svg' {
    const __path__: string;
    export default __path__;
}

declare var require: {
    (path: string): any;
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};
