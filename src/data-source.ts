import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'test.db',
    synchronize: true, // To be disabled in prod
    logging: true, // To be disabled in prod
    entities: [__dirname + '/entity/**.{js,ts}'],
    migrations: [__dirname + '/migration/**.{js,ts}'],
    subscribers: [],
});
