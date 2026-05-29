/**
 * Roster Routes - Public
 * GET /api/roster        - semua pemain
 * GET /api/roster/:id    - detail pemain
 * GET /api/roster?game=  - filter by game
 */

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const prisma = new PrismaClient();

// ─── GET /api/roster ──────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { game } = req.query;

    const where = { isActive: true };
    if (game && ['MLBB', 'VALORANT', 'CS2'].includes(game.toUpperCase())) {
      where.game = game.toUpperCase();
    }

    const players = await prisma.rosterPlayer.findMany({
      where,
      orderBy: [{ game: 'asc' }, { name: 'asc' }],
    });

    res.json({
      success: true,
      data: { players, total: players.length },
    });
  } catch (error) {
    console.error('Get roster error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch roster' });
  }
});

// ─── GET /api/roster/:id ──────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const player = await prisma.rosterPlayer.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!player) {
      return res.status(404).json({ success: false, message: 'Player not found' });
    }

    res.json({ success: true, data: { player } });
  } catch (error) {
    console.error('Get player error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch player' });
  }
});

// ─── POST /api/roster (admin only) ───────────────────────────
router.post(
  '/',
  authenticate,
  requireAdmin,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('role').trim().notEmpty().withMessage('Role is required'),
    body('game').isIn(['MLBB', 'VALORANT', 'CS2']).withMessage('Invalid game'),
    body('imageUrl').isURL().withMessage('Valid image URL required'),
    body('bio').trim().notEmpty().withMessage('Bio is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const player = await prisma.rosterPlayer.create({ data: req.body });
      res.status(201).json({ success: true, data: { player } });
    } catch (error) {
      console.error('Create player error:', error);
      res.status(500).json({ success: false, message: 'Failed to create player' });
    }
  }
);

module.exports = router;
