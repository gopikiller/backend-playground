import { Request, Response } from 'express';

export interface RouteType {
    method: string;
    route: string;
    main: (req: Request, res: Response) => Promise<void>;
    authRole: string[];
}
