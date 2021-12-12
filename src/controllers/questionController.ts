import { Request, Response, NextFunction } from 'express';
import AlreadyAnsweredError from '../errors/alreadyAnsweredError';
import NotFoundError from '../errors/notFoundError';
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
        if (error instanceof NotFoundError) {
            return res.status(404).send(error.message);
        }
        if (error instanceof AlreadyAnsweredError) {
            return res.status(400).send(error.message);
        }
        next(error);
    }
}

async function listUnansweredQuestions(req: Request, res: Response, next: NextFunction) {
    try {
        const questions = await questionService.listQuestions();

        if (!questions.length) return res.sendStatus(204);

        res.status(200).send(questions);
    } catch (error) {
        next(error);
    }
}

async function getQuestion(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
        const question = await questionService.getQuestion(Number(id));

        res.status(200).send(question);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).send(error.message);
        }
        next(error);
    }
}

async function upvoteQuestion(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
        const updatesScore = await questionService.voteQuestion(Number(id), 'up');

        res.status(200).send(updatesScore);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).send(error.message);
        }
        next(error);
    }
}

async function downvoteQuestion(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
        const updatesScore = await questionService.voteQuestion(Number(id), 'down');

        res.status(200).send(updatesScore);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).send(error.message);
        }
        next(error);
    }
}

export {
    postQuestion,
    answerQuestion,
    listUnansweredQuestions,
    getQuestion,
    upvoteQuestion,
    downvoteQuestion,
};
