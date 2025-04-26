import express from 'express';
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from 'cors';

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from './lib/db.js';
import {app, server } from './lib/socket.js';

dotenv.config()

const PORT = process.env.PORT || 3000;
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
    origin: "hhttps://chatapp-frontend-2fy8.onrender.com",
    credentials: true,
}));
app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    connectDB();
});
