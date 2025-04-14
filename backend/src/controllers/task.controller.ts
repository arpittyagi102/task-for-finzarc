import { Request, Response } from 'express';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import path from 'path';
import { User, Task } from '../models/types';

const dbPath = path.resolve(__dirname, '../assets/database.json');

const loadDb = (): User[] => {
    if (!existsSync(dbPath)) return [];
    return JSON.parse(readFileSync(dbPath, 'utf-8'));
};

const saveDb = (data: User[]) => {
    writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
};

const getTasks = (req: Request, res: Response) => {
    const userEmail = (req as any).user.email;
    const db = loadDb();
    const user = db.find(u => u.email === userEmail);
    return res.json(user);
};

const addTask = (req: Request, res: Response) => {
    const task = req.body;
    const email = req.headers['email'] as string;

    const db = loadDb();
    const user = db.find(u => u.email === email);
    if (!user) 
        return res.status(404).json({ message: 'User not found' });

    user.tasks.push(task);
    saveDb(db);

    return res.status(201).json({ message: 'Task added' });
};

const updateTask = (req: Request, res: Response) => {
    const { id } = req.params;
    const newTask = req.body;
    const userEmail = (req as any).user.email;

    const db = loadDb();
    const user = db.find(u => u.email === userEmail);
    if (!user) 
        return res.status(404).json({ message: 'User not found' });

    const task = user?.tasks.find(t => t.id === id);
    if (!task) 
        return res.status(404).json({ message: 'Task not found' });

    task.title = newTask.title;
    task.completed = newTask.completed;
    saveDb(db);

    return res.status(200).json({ message: 'Task updated' });
};

const deleteTask = (req: Request, res: Response) => {
    const { id } = req.params;
    const userEmail = (req as any).user.email;

    const db = loadDb();
    const user = db.find(u => u.email === userEmail);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.tasks = user.tasks.filter(t => t.id !== id);
    saveDb(db);
    return res.status(200).json({ message: 'Task deleted' });
};

export { getTasks, addTask, updateTask, deleteTask };
