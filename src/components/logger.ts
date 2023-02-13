export interface Logger {
    info(msg: any): void;
    warn(msg: any): void;
    error(msg: any): void;
    debug(msg: any): void;
}

class CommonLogger implements Logger {
    info(msg: string): void {
        console.log(`info: ${msg}`);
    }

    warn(msg: string): void {
        console.log(`warning: ${msg}`);
    }

    error(msg: string): void {
        console.error(`error: ${msg}`);
    }

    debug(msg: string): void {
        console.log(`debug: ${msg}`);
    }
}

export function getErrorMessage(error: unknown) {
    return (error as { msg?: unknown }).msg ?? (error as { message?: unknown }).message ?? error;
}

export const logger: Logger = new CommonLogger();
