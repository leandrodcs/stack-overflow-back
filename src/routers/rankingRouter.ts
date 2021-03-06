import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.get('', userController.getMostActiveUsers);

export default router;
