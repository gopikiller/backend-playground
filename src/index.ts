import 'reflect-metadata';
import { createHttpServer } from './components/server';
import * as v8 from 'v8';
import { initialiseDb } from './components/db';
import { AppDataSource } from './data-source';
import { serverSpecs } from './config/serverSpecs';

const init = async () => {
    await initialiseDb(AppDataSource);
    const server = await createHttpServer(serverSpecs);
    if (server) {
        const totalHeapSizeInGB = (v8.getHeapStatistics().total_available_size / 1024 / 1024 / 1024).toFixed(2);
        console.log(`*******************************************`);
        console.log(`Total Heap Size ~${totalHeapSizeInGB}GB`);
        console.log(`*******************************************`);
    }
};
init();
