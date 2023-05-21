import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoConnect from './config/db.js';
import productsRouter from "./routes/productRoutes.js";

dotenv.config();
mongoConnect();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/products', productsRouter);


app.listen(port, () => console.log(`Server is listening on port ${port}`));
