import { Request, Response, NextFunction } from 'express';
import { validadeUser } from '../schemas/userSchema';
import * as userService from '../services/userService';

async function createUser(req: Request, res: Response, next: NextFunction) {
    const {
        name,
        className,
    } = req.body;

    try {
        if (!name || !className) return res.status(400).send('Dados insuficientes');

        const checkValidation = validadeUser(req.body);

        if (checkValidation) return res.status(400).send(checkValidation);

        const newUser = await userService.createUser({ name, className });

        res.status(201).send(newUser);
    } catch (error) {
        next(error);
    }
}

export {
    // eslint-disable-next-line import/prefer-default-export
    createUser,
};
