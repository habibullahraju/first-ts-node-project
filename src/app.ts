import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import {  studentRoutes } from './app/modules/students/student.route';
const app: Application = express();
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1/students', studentRoutes);
app.use('/', studentRoutes)


app.get('/', (req: Request, res: Response) => {
  const a = 100;

  res.send(a);
});

export default app;
