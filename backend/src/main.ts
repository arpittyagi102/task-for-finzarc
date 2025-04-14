/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import cors from 'cors';
import * as path from 'path';
import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Hello from Backend !!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
