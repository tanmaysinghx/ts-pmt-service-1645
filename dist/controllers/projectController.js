"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectsHandler = exports.createProjectHandler = void 0;
const projectService_1 = require("../services/projectService");
const createProjectHandler = async (req, res, next) => {
    try {
        const project = await (0, projectService_1.createProject)(req.body);
        return res.status(201).json({ success: true, project });
    }
    catch (error) {
        return res.status(400).json(error);
    }
};
exports.createProjectHandler = createProjectHandler;
const getProjectsHandler = async (req, res, next) => {
    try {
        const adminId = req.query.adminId; // Ensure adminId is handled safely
        const projects = await (0, projectService_1.getProjects)(adminId);
        return res.status(200).json({ success: true, projects });
    }
    catch (error) {
        next(error); // Pass errors to the next middleware
    }
};
exports.getProjectsHandler = getProjectsHandler;
