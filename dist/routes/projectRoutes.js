"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectController_1 = require("../controllers/projectController");
const router = (0, express_1.Router)();
router.post('/projects', projectController_1.createProjectHandler);
router.get('/projects', projectController_1.getProjectsHandler);
exports.default = router;
