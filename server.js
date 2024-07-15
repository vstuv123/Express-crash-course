import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import router from './routes/posts.js'
import { fileURLToPath } from 'url'
import logger from './middlewares/logger.js'
import errorHandler from "./middlewares/error.js";
import NotFound from "./middlewares/NotFound.js";

// Get Directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//setup static folder
app.use(express.static(path.join(__dirname, "public")));

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// logger Middleware
app.use(logger);

app.use('/api/posts', router);

// Error Handler
app.use(NotFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});