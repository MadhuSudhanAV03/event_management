/**
 * Event Routes
 * Handles all event-related endpoints for admin management
 */
import express from 'express';
import {
  createEventHandler,
  getAllEventsHandler,
  getEventByIdHandler,
  updateEventHandler,
  publishEventHandler,
  unpublishEventHandler,
  deleteEventHandler,
  getEventRegistrationsHandler,
  getAllVenuesHandler,
  getVenueByIdHandler,
} from '../controllers/eventController.js';
import { authenticateAdmin, authorizeEventManagement } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * Public Event Routes (No authentication required)
 */

// Get all events (with optional filters) - Public access for viewing published events
router.get('/', getAllEventsHandler);

// Get single event by ID - Public access for viewing event details
router.get('/:id', getEventByIdHandler);

/**
 * Public Venue Routes (No authentication required)
 */

// Get all venues
router.get('/venues/all', getAllVenuesHandler);

// Get venue by ID
router.get('/venues/:id', getVenueByIdHandler);

/**
 * Protected Event Management Routes (Admin authentication required)
 */

// Create new event (President & Vice-President only)
router.post('/', authenticateAdmin, authorizeEventManagement, createEventHandler);

// Update event (President & Vice-President only)
router.put('/:id', authenticateAdmin, authorizeEventManagement, updateEventHandler);

// Delete event (President & Vice-President only)
router.delete('/:id', authenticateAdmin, authorizeEventManagement, deleteEventHandler);

/**
 * Protected Event Publishing Routes (Admin authentication required)
 */

// Publish event (President & Vice-President only)
router.post('/:id/publish', authenticateAdmin, authorizeEventManagement, publishEventHandler);

// Unpublish event (President & Vice-President only)
router.post('/:id/unpublish', authenticateAdmin, authorizeEventManagement, unpublishEventHandler);

/**
 * Protected Event Registration Management Routes (Admin authentication required)
 */

// Get all registrations for an event (Admin only)
router.get('/:id/registrations', authenticateAdmin, getEventRegistrationsHandler);

export default router;
