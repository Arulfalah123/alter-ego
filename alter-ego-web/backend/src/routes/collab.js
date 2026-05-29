/**
 * Collab Submission Routes
 * POST /api/collab       - submit form kolaborasi (public)
 * GET  /api/collab       - lihat semua submissions (admin only)
 * PATCH /api/collab/:id  - update status (admin only)
 */

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const prisma = new PrismaClient();

// ─── POST /api/collab (public) ────────────────────────────────
router.post(
  '/',
  [
    body('brandName')
      .trim()
      .notEmpty().withMessage('Brand name is required')
      .isLength({ min: 2, max: 100 }).withMessage('Brand name must be 2-100 characters'),
    body('email')
      .trim()
      .isEmail().withMessage('Valid email is required')
      .normalizeEmail(),
    body('collabType')
      .isIn(['SPONSORSHIP', 'CONTENT_CREATION', 'PRODUCT_COLLAB', 'EVENT_PARTNERSHIP', 'OTHER'])
      .withMessage('Invalid collaboration type'),
    body('message')
      .trim()
      .notEmpty().withMessage('Message is required')
      .isLength({ min: 20, max: 2000 }).withMessage('Message must be 20-2000 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { brandName, email, collabType, message } = req.body;

    try {
      const submission = await prisma.collabSubmission.create({
        data: { brandName, email, collabType, message },
      });

      res.status(201).json({
        success: true,
        message: 'Collaboration request submitted successfully! Our team will contact you soon. 🤝',
        data: {
          id: submission.id,
          brandName: submission.brandName,
          status: submission.status,
          createdAt: submission.createdAt,
        },
      });
    } catch (error) {
      console.error('Submit collab error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit collaboration request. Please try again.',
      });
    }
  }
);

// ─── GET /api/collab (admin only) ────────────────────────────
router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { status } = req.query;

    const where = {};
    if (status && ['PENDING', 'REVIEWED', 'APPROVED', 'REJECTED'].includes(status)) {
      where.status = status;
    }

    const submissions = await prisma.collabSubmission.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: { submissions, total: submissions.length },
    });
  } catch (error) {
    console.error('Get collab submissions error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch submissions' });
  }
});

// ─── PATCH /api/collab/:id (admin only) ──────────────────────
router.patch(
  '/:id',
  authenticate,
  requireAdmin,
  [
    body('status')
      .isIn(['PENDING', 'REVIEWED', 'APPROVED', 'REJECTED'])
      .withMessage('Invalid status'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const submission = await prisma.collabSubmission.update({
        where: { id: parseInt(req.params.id) },
        data: { status: req.body.status },
      });

      res.json({ success: true, data: { submission } });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ success: false, message: 'Submission not found' });
      }
      console.error('Update collab status error:', error);
      res.status(500).json({ success: false, message: 'Failed to update status' });
    }
  }
);

module.exports = router;
