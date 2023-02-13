import { RequestHandler } from 'express';

export interface RouteType {
    method: string;
    route: string;
    main: RequestHandler;
    authRole: string[];
}
