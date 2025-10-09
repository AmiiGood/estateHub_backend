import dotenv from 'dotenv';
dotenv.config();
import { Server } from './Models/server.js';
const server = new Server();
server.startServer();

