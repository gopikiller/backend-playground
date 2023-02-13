import { AppDataSource } from '../data-source';
import { logger } from './logger';

export const shutdownServer = async () => {
    logger.info('[httpserver.terminus.onShutdown]: Received Signal After server is shutdown');
    await AppDataSource.destroy();
    logger.info('[httpserver.terminus.onShutdown]: Database connection is closed');
};
