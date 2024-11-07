"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeamsHandler = exports.createTeamHandler = void 0;
const teamService_1 = require("../services/teamService");
const createTeamHandler = async (req, res) => {
    try {
        const team = await (0, teamService_1.createTeam)(req.body);
        return res.status(201).json({ success: true, team });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
exports.createTeamHandler = createTeamHandler;
const getTeamsHandler = async (req, res) => {
    try {
        const teams = await (0, teamService_1.getTeams)(req.query.projectId);
        return res.status(200).json({ success: true, teams });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
exports.getTeamsHandler = getTeamsHandler;
