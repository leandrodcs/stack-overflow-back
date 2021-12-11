import express from 'express';
import * as questionController from '../controllers/questionController';
import checkToken from '../middlewares/auth';

const router = express.Router();

router.post('', questionController.postQuestion);
router.post('/:id', checkToken, questionController.answerQuestion);
router.get('', questionController.listUnansweredQuestions);

export default router;
