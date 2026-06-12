"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User_1.User.find().select('-password');
        res.json({
            message: 'Get all users',
            users,
            count: users.length
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching users',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// GET user by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({
                message: `User ${id} not found`
            });
        }
        res.json({
            message: `Get user ${id}`,
            user
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching user',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// POST create user
router.post('/', async (req, res) => {
    try {
        const user = new User_1.User(req.body);
        await user.save();
        const userObj = user.toObject();
        delete userObj.password;
        res.status(201).json({
            message: 'User created successfully',
            user: userObj
        });
    }
    catch (error) {
        res.status(400).json({
            message: 'Error creating user',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// PUT update user
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.User.findByIdAndUpdate(id, req.body, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({
                message: `User ${id} not found`
            });
        }
        res.json({
            message: `User ${id} updated successfully`,
            user
        });
    }
    catch (error) {
        res.status(400).json({
            message: 'Error updating user',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({
                message: `User ${id} not found`
            });
        }
        res.json({
            message: `User ${id} deleted successfully`
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error deleting user',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map