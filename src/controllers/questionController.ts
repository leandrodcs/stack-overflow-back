import { Request, Response, NextFunction } from 'express';
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

export {
    // eslint-disable-next-line import/prefer-default-export
    postQuestion,
};
