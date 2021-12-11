import { Request, Response, NextFunction } from 'express';
import { validadeAnswer } from '../schemas/answerSchema';
import { validadeQuestion } from '../schemas/questionSchema';
import * as questionService from '../services/questionService';

async function postQuestion(req: Request, res: Response, next: NextFunction) {
    try {
        const checkValidation = validadeQuestion(req.body);

        if (checkValidation) return res.status(400).send(checkValidation);

        const newQuestion = await questionService.postQuestion(req.body);

        res.status(201).send(newQuestion);
    } catch (error) {
        next(error);
    }
}

async function answerQuestion(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { answer } = req.body;
    const { id } = req.params;
    try {
        const checkValidation = validadeAnswer(req.body);

        if (checkValidation) return res.status(400).send(checkValidation);

        await questionService.answerQuestion({ answer, token, id: Number(id) });

        res.status(200).send(`A pergunta de id ${id} foi respondida com sucesso :)`);
    } catch (error) {
        next(error);
    }
}

export {
    postQuestion,
    answerQuestion,
};
