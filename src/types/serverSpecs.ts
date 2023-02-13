import { RouteType } from './routeType';

export interface ServerSpecs {
    accessControlAllowedDomains: string[];
    port: number;
    env: string;
    routes: RouteType[];
    onShutdown: () => Promise<void>;
}
