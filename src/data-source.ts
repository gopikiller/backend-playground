import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'test',
    password: 'test',
    database: 'test',
    synchronize: true, // To be disabled in prod
    logging: true, // To be disabled in prod
    entities: [__dirname + '/entity/**.{js,ts}'],
    migrations: [__dirname + '/migration/**.{js,ts}'],
    subscribers: [],
});
