"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeams = exports.createTeam = void 0;
const prismaClient_1 = __importDefault(require("../config/prismaClient"));
const createTeam = async (data) => {
    return prismaClient_1.default.team.create({
        data: {
            name: data.name,
            projectId: data.projectId,
        },
    });
};
exports.createTeam = createTeam;
const getTeams = async (projectId) => {
    return prismaClient_1.default.team.findMany({
        where: {
            projectId: Number(projectId),
        },
    });
};
exports.getTeams = getTeams;
