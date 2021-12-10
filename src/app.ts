import express from 'express';
import cors from 'cors';
import userRouter from './routers/userRouter';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRouter);

app.get('/health', (req, res) => {
    res.sendStatus(200);
});

export default app;
