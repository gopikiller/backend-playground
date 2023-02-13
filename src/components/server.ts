import { createTerminus } from '@godaddy/terminus';
import * as express from 'express';
import * as http from 'http';
import { Server } from 'net';
import { ServerSpecs } from '../types/serverSpecs';
import { getErrorMessage, logger } from './logger';

export type HttpServer = (Server & http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) | undefined;

export const createHttpServer = async (specs: ServerSpecs): Promise<{ app: express.Express; server: HttpServer }> => {
    const app = express();

    app.use(express.urlencoded({ limit: 100000, extended: false }));
    app.use(express.json({ limit: 100000 }));

    // request validation middleware
    app.use((_req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', `Origin,Accept,Content-Type,X-Owner,X-Requested-With,X-XSRF-Token,X-Access-Token,Authorization,Cache-Control,Expires`);
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        res.header('Access-Control-Max-Age', '3600');
        res.header('Access-Control-Allow-Credentials', 'true');
        console.log(1);
        next();
    });

    specs.routes.forEach(r => {
        const { method, route, authRole, main } = r;
        logger.info(`Adding ${method} ${route}`);
        const handlers = [
            async (_req: express.Request, res: express.Response, next: express.NextFunction) => {
                if (authRole.length > 0) {
                    console.log(authRole);
                    next();
                    return;
                }
                next();
            },
            async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
                try {
                    const result = main(req, res);
                    if (result instanceof Promise) {
                        await result;
                    } else {
                        res.json(result);
                    }
                } catch (err) {
                    const msg = getErrorMessage(err);
                    logger.error(msg);
                    logger.error(err.stack);
                    if (err.statusCode === 400) {
                        res.status(400);
                        res.json({ code: 400, msg: err.message });
                    } else {
                        res.status(500);
                        res.json({ code: 500, msg: err.message });
                    }
                }
            },
        ];

        switch (method) {
            case 'put':
                app.put(route, handlers);
                break;
            case 'post':
                app.post(route, handlers);
                break;
            case 'delete':
                app.delete(route, handlers);
                break;
            case 'patch':
                app.patch(route, handlers);
                break;
            case 'get':
                app.get(route, handlers);
                break;
        }
    });

    const server = http.createServer(app);
    server.listen(specs.port);
    logger.info(`API is running on http://localhost:${specs.port}`);

    createTerminus(server, {
        timeout: 10000,
        signals: ['SIGTERM', 'SIGINT'],
        logger: (msg, err) => {
            if (err) {
                logger.error(err.message);
                logger.error(msg);
            } else {
                logger.info(msg);
            }
        },
        onSignal: specs.onShutdown,
        onShutdown: async () => {
            logger.info(`[httpserver.terminus.onShutdown]: All signals handled`);
        },
    });

    server.on('close', () => {
        logger.info('[httpserver.terminus.onShutdown]: Server is closed from accepting new request');
    });

    return { app, server };
};
