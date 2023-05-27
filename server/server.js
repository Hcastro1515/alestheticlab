import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoConnect from './config/db.js';
import productsRouter from './routes//productRoutes.js'
import userRouter from './routes/userRoutes.js'
import errorHandler from './middlewares/errorMiddleware.js';
dotenv.config();
mongoConnect();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/products', productsRouter);
app.use('/api/user', userRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
