import { Request, Response, NextFunction } from 'express';

async function postQuestion(req: Request, res: Response, next: NextFunction) {
    const {
        question,
        student,
        className,
        tags,
    } = req.body;

    try {
        if (!question || !student || !className || tags) return res.status(400).send('Dados insuficientes');

        res.status(201).send('ok');
    } catch (error) {
        next(error);
    }
}

export {
    // eslint-disable-next-line import/prefer-default-export
    postQuestion,
};
