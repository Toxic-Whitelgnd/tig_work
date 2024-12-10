import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import userController from "./controller/userController";

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mongo_uri: string = process.env.MONGOURI || 'dfd';
mongoose.connect(mongo_uri).then(
    () => console.log("Connected to MongoDB"))
    .catch(() => console.log("Connection error"));


//apis
app.use('/api/users', userController);

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

