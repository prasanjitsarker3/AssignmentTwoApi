import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/module/users/userRoute';

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Mongoose Project Running!');
});

export default app;
