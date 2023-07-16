
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { router } from './routes/routes';
import { migrate } from "postgres-migrations"

import pkg from 'pg';
const { Client } = pkg;


const client = new Client({
    host: "127.0.0.1",
    port: 5432,
    user: "fish_user",
    password: "password",
    database: "fish",
});


await client.connect();
export const db = drizzle(client);
// await migrate({ client }, './db');


const app = express();
app.use(cors())
// undefined
app.use(express.json());
dotenv.config();

// Available Routes
app.use("/", router);
// app.use("/api/notes", require("./routes/notes"));

app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Example app listening on port ${process.env.EXPRESS_PORT}`);
});

