import express, { Router, Request, Response } from 'express';
import { Leaderboard } from '../models/Leaderboard';

const router = Router();

// GET leaderboard (sorted by points descending)
router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('userId', '-password')
      .sort({ points: -1 });
    res.json({
      message: 'Get leaderboard',
      leaderboard,
      count: leaderboard.length
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching leaderboard',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET user leaderboard entry
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const entry = await Leaderboard.findOne({ userId }).populate('userId', '-password');
    if (!entry) {
      return res.status(404).json({
        message: `Leaderboard entry for user ${userId} not found`
      });
    }
    res.json({
      message: `Get leaderboard entry for user ${userId}`,
      entry
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching leaderboard entry',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET top performers
router.get('/top/performers', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const topPerformers = await Leaderboard.find()
      .populate('userId', '-password')
      .sort({ points: -1 })
      .limit(limit);
    res.json({
      message: 'Get top performers',
      topPerformers,
      count: topPerformers.length
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching top performers',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST update leaderboard entry
router.post('/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    let entry = await Leaderboard.findOne({ userId });
    if (!entry) {
      entry = new Leaderboard({ userId, ...req.body });
    } else {
      Object.assign(entry, req.body);
    }
    await entry.save();
    await entry.populate('userId', '-password');
    res.status(201).json({
      message: 'Leaderboard entry updated',
      entry
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating leaderboard entry',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// PUT update leaderboard entry
router.put('/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const entry = await Leaderboard.findOneAndUpdate({ userId }, req.body, { new: true }).populate('userId', '-password');
    if (!entry) {
      return res.status(404).json({
        message: `Leaderboard entry for user ${userId} not found`
      });
    }
    res.json({
      message: `Leaderboard entry for user ${userId} updated`,
      entry
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating leaderboard entry',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
