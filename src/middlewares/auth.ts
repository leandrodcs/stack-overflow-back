import { Request, Response, NextFunction } from 'express';
import * as sessionRepository from '../repositories/sessionRepository';

export default async function checkToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const tokenIsValid = await sessionRepository.getSession(token);
    if (!tokenIsValid) return res.status(401).send('Você precisa de um token válido para responder alguma pergunta.');
    next();
}
