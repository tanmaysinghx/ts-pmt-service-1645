"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const client_1 = require("@prisma/client");
const logger_1 = __importDefault(require("../utils/logger"));
const prisma = new client_1.PrismaClient();
exports.default = prisma;
const connectToDatabase = async () => {
    try {
        await prisma.$connect();
        logger_1.default.info('Database connected successfully');
    }
    catch (error) {
        logger_1.default.error('Database connection error:', error);
        process.exit(1);
    }
};
exports.connectToDatabase = connectToDatabase;
