"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teamController_1 = require("../controllers/teamController");
const router = (0, express_1.Router)();
router.post('/teams', teamController_1.createTeamHandler);
router.get('/teams', teamController_1.getTeamsHandler);
exports.default = router;
