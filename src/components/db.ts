import { DataSource } from 'typeorm/data-source/DataSource';
import { logger } from './logger';

export const initialiseDb = async (dataSource: DataSource) => {
    const connection = await dataSource.initialize();
    logger.info('DB Connection established');
    await connection.runMigrations({ transaction: 'each' });
    logger.info('Migration completed');
};
