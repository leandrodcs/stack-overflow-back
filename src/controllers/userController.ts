import { Request, Response, NextFunction } from 'express';
import NotFoundError from '../errors/notFoundError';
import { validadeUser } from '../schemas/userSchema';
import * as userService from '../services/userService';

async function createUser(req: Request, res: Response, next: NextFunction) {
    const {
        name,
        class: className,
    } = req.body;

    try {
        const checkValidation = validadeUser(req.body);

        if (checkValidation) return res.status(400).send(checkValidation);

        const newUser = await userService.createUser({ name, className });

        res.status(201).send(newUser);
    } catch (error) {
        next(error);
    }
}

async function getMostActiveUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const mostActiveUsers = await userService.getMostActiveUsers();

        res.status(200).send(mostActiveUsers);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).send(error.message);
        }
        next(error);
    }
}

export {
    createUser,
    getMostActiveUsers,
};
