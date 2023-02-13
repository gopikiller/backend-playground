import { shutdownServer } from '../components/shutdownServer';
import { routes } from '../routes';

export const serverSpecs = {
    accessControlAllowedDomains: ['*'],
    port: 3000,
    env: process.env.NODE_ENV || 'test',
    routes,
    onShutdown: shutdownServer,
};
