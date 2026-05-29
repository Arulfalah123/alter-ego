/**
 * Brand Ambassador Routes - Public
 * GET /api/ba      - semua foto BA
 * GET /api/ba/:id  - detail foto BA
 */

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const prisma = new PrismaClient();

// ─── GET /api/ba ──────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const photos = await prisma.bAPhoto.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: { photos, total: photos.length },
    });
  } catch (error) {
    console.error('Get BA photos error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch BA photos' });
  }
});

// ─── GET /api/ba/:id ──────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const photo = await prisma.bAPhoto.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!photo) {
      return res.status(404).json({ success: false, message: 'Photo not found' });
    }

    res.json({ success: true, data: { photo } });
  } catch (error) {
    console.error('Get BA photo error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch photo' });
  }
});

// ─── POST /api/ba (admin only) ────────────────────────────────
router.post(
  '/',
  authenticate,
  requireAdmin,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('imageUrl').isURL().withMessage('Valid image URL required'),
    body('caption').trim().notEmpty().withMessage('Caption is required'),
    body('product').trim().notEmpty().withMessage('Product is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const photo = await prisma.bAPhoto.create({ data: req.body });
      res.status(201).json({ success: true, data: { photo } });
    } catch (error) {
      console.error('Create BA photo error:', error);
      res.status(500).json({ success: false, message: 'Failed to create photo' });
    }
  }
);

module.exports = router;
