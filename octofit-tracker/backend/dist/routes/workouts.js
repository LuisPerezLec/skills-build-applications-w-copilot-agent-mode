"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = require("../models/Workout");
const router = (0, express_1.Router)();
// GET all workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout_1.Workout.find();
        res.json({
            message: 'Get all workouts',
            workouts,
            count: workouts.length
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching workouts',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// GET workout by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const workout = await Workout_1.Workout.findById(id);
        if (!workout) {
            return res.status(404).json({
                message: `Workout ${id} not found`
            });
        }
        res.json({
            message: `Get workout ${id}`,
            workout
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching workout',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// GET personalized suggestions by difficulty
router.get('/suggestions/personalized', async (req, res) => {
    try {
        const difficulty = req.query.difficulty || 'medium';
        const suggestions = await Workout_1.Workout.find({ difficulty }).limit(5);
        res.json({
            message: 'Get personalized workout suggestions',
            suggestions,
            count: suggestions.length
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching suggestions',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// GET workouts by difficulty
router.get('/by/difficulty/:difficulty', async (req, res) => {
    try {
        const { difficulty } = req.params;
        const workouts = await Workout_1.Workout.find({ difficulty });
        res.json({
            message: `Get ${difficulty} workouts`,
            workouts,
            count: workouts.length
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching workouts',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// POST create workout
router.post('/', async (req, res) => {
    try {
        const workout = new Workout_1.Workout(req.body);
        await workout.save();
        res.status(201).json({
            message: 'Workout created successfully',
            workout
        });
    }
    catch (error) {
        res.status(400).json({
            message: 'Error creating workout',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// PUT update workout
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const workout = await Workout_1.Workout.findByIdAndUpdate(id, req.body, { new: true });
        if (!workout) {
            return res.status(404).json({
                message: `Workout ${id} not found`
            });
        }
        res.json({
            message: `Workout ${id} updated successfully`,
            workout
        });
    }
    catch (error) {
        res.status(400).json({
            message: 'Error updating workout',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// DELETE workout
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const workout = await Workout_1.Workout.findByIdAndDelete(id);
        if (!workout) {
            return res.status(404).json({
                message: `Workout ${id} not found`
            });
        }
        res.json({
            message: `Workout ${id} deleted successfully`
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error deleting workout',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=workouts.js.map