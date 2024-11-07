"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./utils/logger"));
const db_1 = require("./config/db");
dotenv_1.default.config();
const PORT = process.env.PORT || 1645;
app_1.default.listen(PORT, async () => {
    logger_1.default.info(`Server is running on port: ${PORT}`);
    try {
        await (0, db_1.connectToDatabase)();
        logger_1.default.info('Database connection successful');
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.default.error(`Database connection failed: ${error.message}`);
        }
        else {
            logger_1.default.error(`Database connection failed: ${JSON.stringify(error)}`);
        }
    }
});
