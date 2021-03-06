import express from 'express';
import cors from 'cors';
import userRouter from './routers/userRouter';
import questionsRouter from './routers/questionRouter';
import rankingRouter from './routers/rankingRouter';
import serverMiddlewareError from './middlewares/serverMiddlewareError';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/questions', questionsRouter);
app.use('/ranking', rankingRouter);

app.get('/health', (req, res) => {
    res.sendStatus(200);
});

app.use(serverMiddlewareError);

export default app;
