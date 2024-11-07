import express from 'express';
import { transactionIdMiddleware } from './middleware/transactionIdMiddleware';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes';
import groupRoutes from './routes/groupRoutes';
import teamRoutes from './routes/teamRoutes';
import { loggerConsole } from './middleware/loggerConsole';

const app = express();

app.use(transactionIdMiddleware);

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(express.json());

app.use(loggerConsole);

app.use('/v2/api/group', groupRoutes);
app.use('/v2/api/team', teamRoutes);
app.use('/v2/api/project', projectRoutes);

export default app;
