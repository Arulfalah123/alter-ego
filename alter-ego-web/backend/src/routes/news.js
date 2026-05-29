/**
 * News Routes - Protected (JWT required)
 * GET /api/news      - semua berita (butuh login)
 * GET /api/news/:id  - detail berita (butuh login)
 */

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const prisma = new PrismaClient();

// ─── GET /api/news (protected) ────────────────────────────────
router.get('/', authenticate, async (req, res) => {
  try {
    const news = await prisma.news.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        content: true,
        imageUrl: true,
        createdAt: true,
      },
    });

    res.json({
      success: true,
      data: { news, total: news.length },
    });
  } catch (error) {
    console.error('Get news error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch news' });
  }
});

// ─── GET /api/news/:id (protected) ───────────────────────────
router.get('/:id', authenticate, async (req, res) => {
  try {
    const news = await prisma.news.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!news || !news.isPublished) {
      return res.status(404).json({ success: false, message: 'News not found' });
    }

    res.json({ success: true, data: { news } });
  } catch (error) {
    console.error('Get news detail error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch news' });
  }
});

// ─── POST /api/news (admin only) ─────────────────────────────
router.post(
  '/',
  authenticate,
  requireAdmin,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    body('imageUrl').isURL().withMessage('Valid image URL required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const news = await prisma.news.create({ data: req.body });
      res.status(201).json({ success: true, data: { news } });
    } catch (error) {
      console.error('Create news error:', error);
      res.status(500).json({ success: false, message: 'Failed to create news' });
    }
  }
);

module.exports = router;
