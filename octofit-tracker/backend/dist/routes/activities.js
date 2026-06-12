"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = require("../models/Activity");
const router = (0, express_1.Router)();
// GET all activities
router.get('/', async (req, res) => {
    try {
        const activities = await Activity_1.Activity.find().populate('userId', '-password');
        res.json({
            message: 'Get all activities',
            activities,
            count: activities.length
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching activities',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// GET activity by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity_1.Activity.findById(id).populate('userId', '-password');
        if (!activity) {
            return res.status(404).json({
                message: `Activity ${id} not found`
            });
        }
        res.json({
            message: `Get activity ${id}`,
            activity
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching activity',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// GET activities by user
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const activities = await Activity_1.Activity.find({ userId }).populate('userId', '-password');
        res.json({
            message: `Get activities for user ${userId}`,
            activities,
            count: activities.length
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching user activities',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// POST create activity
router.post('/', async (req, res) => {
    try {
        const activity = new Activity_1.Activity(req.body);
        await activity.save();
        await activity.populate('userId', '-password');
        res.status(201).json({
            message: 'Activity created successfully',
            activity
        });
    }
    catch (error) {
        res.status(400).json({
            message: 'Error creating activity',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// PUT update activity
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity_1.Activity.findByIdAndUpdate(id, req.body, { new: true }).populate('userId', '-password');
        if (!activity) {
            return res.status(404).json({
                message: `Activity ${id} not found`
            });
        }
        res.json({
            message: `Activity ${id} updated successfully`,
            activity
        });
    }
    catch (error) {
        res.status(400).json({
            message: 'Error updating activity',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// DELETE activity
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity_1.Activity.findByIdAndDelete(id);
        if (!activity) {
            return res.status(404).json({
                message: `Activity ${id} not found`
            });
        }
        res.json({
            message: `Activity ${id} deleted successfully`
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error deleting activity',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=activities.js.map