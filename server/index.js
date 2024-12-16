import express from 'express';
import { veihcleRouter } from './routes/veihcle.js';
import cors from 'cors';
import { connectToDB } from './database/mongodb.js';

const app = express();

app.use(cors());
app.use(express.json());

connectToDB();

app.use('/vehicles', veihcleRouter);

app.listen(5000);
