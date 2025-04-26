import { Server } from "socket.io";
import http from "http";
import express from 'express';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["https://chatapp-frontend-2fy8.onrender.com"]
    },
});
export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}
const userSocketMap = {};
// socket.js
io.on('connection', (socket) => {
    console.log('✅ User connected:', socket.id);
    const userId = socket.handshake.query.userId;
    
    if (userId) {
        userSocketMap[userId] = socket.id;
        
        // Emit that this user came online
        io.emit('userOnline', userId);
        
        // Send updated list of all online users
        io.emit('allUsers', Object.keys(userSocketMap));
    }

    socket.on('disconnect', () => {
        console.log('❌ User disconnected:', socket.id);
        
        if (userId) {
            delete userSocketMap[userId];
            
            // Emit that this user went offline
            io.emit('userOffline', userId);
            
            // Update the full list again
            io.emit('allUsers', Object.keys(userSocketMap));
        }
    });
});
export {io, app, server};
