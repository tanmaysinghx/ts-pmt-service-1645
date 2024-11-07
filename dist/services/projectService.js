"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjects = exports.createProject = void 0;
const prismaClient_1 = __importDefault(require("../config/prismaClient"));
const createProject = async (data) => {
    return prismaClient_1.default.project.create({
        data: {
            name: data.projectName,
            description: data.description,
            adminId: data.adminId,
        },
    });
};
exports.createProject = createProject;
const getProjects = async (adminId) => {
    return prismaClient_1.default.project.findMany({
        where: {
            adminId,
        },
        include: {
            teams: true,
        },
    });
};
exports.getProjects = getProjects;
