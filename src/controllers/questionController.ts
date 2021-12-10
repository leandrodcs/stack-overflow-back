import { Request, Response, NextFunction } from 'express';
import { validadeQuestion } from '../schemas/questionSchema';

async function postQuestion(req: Request, res: Response, next: NextFunction) {
    const {
        question,
        student,
        className,
        tags,
    } = req.body;

    try {
        if (!question || !student || !className || tags) return res.status(400).send('Dados insuficientes');

        const checkValidation = validadeQuestion(req.body);

        if (checkValidation) return res.status(400).send(checkValidation);

        res.status(201).send('ok');
    } catch (error) {
        next(error);
    }
}

export {
    // eslint-disable-next-line import/prefer-default-export
    postQuestion,
};
