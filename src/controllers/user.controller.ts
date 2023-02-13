import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

export const getUser = async (req: Request, res: Response) => {
    console.log('iniy');
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.find({
        select: {
            firstName: true,
        },
    });
    res.status(200).json({ mes: 'ok', data: user });
    return;
};
