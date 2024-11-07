"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import { transactionIdMiddleware } from './middleware/transactionIdMiddleware';
const cors_1 = __importDefault(require("cors"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const app = (0, express_1.default)();
//app.use(transactionIdMiddleware);
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express_1.default.json());
app.use('/api', projectRoutes_1.default);
exports.default = app;
