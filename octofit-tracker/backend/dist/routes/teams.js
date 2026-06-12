"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = require("../models/Team");
const router = (0, express_1.Router)();
// GET all teams
router.get('/', async (req, res) => {
    try {
        const teams = await Team_1.Team.find().populate('members', '-password').populate('createdBy', '-password');
        res.json({
            message: 'Get all teams',
            teams,
            count: teams.length
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching teams',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// GET team by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team_1.Team.findById(id).populate('members', '-password').populate('createdBy', '-password');
        if (!team) {
            return res.status(404).json({
                message: `Team ${id} not found`
            });
        }
        res.json({
            message: `Get team ${id}`,
            team
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching team',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// POST create team
router.post('/', async (req, res) => {
    try {
        const team = new Team_1.Team(req.body);
        await team.save();
        await team.populate('members', '-password');
        await team.populate('createdBy', '-password');
        res.status(201).json({
            message: 'Team created successfully',
            team
        });
    }
    catch (error) {
        res.status(400).json({
            message: 'Error creating team',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// PUT update team
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team_1.Team.findByIdAndUpdate(id, req.body, { new: true });
        if (!team) {
            return res.status(404).json({
                message: `Team ${id} not found`
            });
        }
        await team.populate('members', '-password');
        await team.populate('createdBy', '-password');
        res.json({
            message: `Team ${id} updated successfully`,
            team
        });
    }
    catch (error) {
        res.status(400).json({
            message: 'Error updating team',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// DELETE team
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team_1.Team.findByIdAndDelete(id);
        if (!team) {
            return res.status(404).json({
                message: `Team ${id} not found`
            });
        }
        res.json({
            message: `Team ${id} deleted successfully`
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error deleting team',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=teams.js.map