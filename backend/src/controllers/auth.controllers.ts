import { Request, Response } from 'express';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { User } from '../models/types';

const dbDir = path.resolve(__dirname, '../assets');
const dbPath = path.join(dbDir, 'database.json');

// Importing JSON at compile time won't reflect runtime updates.
// So don't use: import db from '../assets/database.json';
// Instead, read it dynamically:
const loadDb = (): User[] => {
    if (!existsSync(dbPath)) return [];
    const raw = require('fs').readFileSync(dbPath, 'utf-8');
    return JSON.parse(raw);
};

const signup = (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const db = loadDb();
    const existingUser = db.find((u: User) => u.email === email);

    if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
    }

    const newUser: User = { name, email, password, tasks: [] };
    db.push(newUser);

    // Make sure the directory exists
    if (!existsSync(dbDir)) {
        console.log('Creating database directory... at', dbDir);
        mkdirSync(dbDir, { recursive: true });
    }

    writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
    return res.status(201).json({ message: 'User created successfully' });
};

const login = (req: Request, res: Response) => {
    try {
        const db = loadDb();
        const { email, password } = req.body;
        const user = db.find((u: User) => u.email === email && u.password === password);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export { signup, login };
