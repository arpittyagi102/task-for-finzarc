// task.routes.ts
import { Router } from 'express';
import { addTask, getTasks, updateTask, deleteTask } from '../controllers/task.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();
router.use(verifyToken);

router.get('/', getTasks);
router.post('/', addTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
