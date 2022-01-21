import express from "express"
export const app = express()
export const router = express.Router();

//Load config
// dotenv.config({path: './config.env'})
app.use(express.json());
