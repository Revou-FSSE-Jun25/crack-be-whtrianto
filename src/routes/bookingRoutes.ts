import { Router } from "express";
import { createBooking, listMyBookings, listAllBookings, updateBookingStatus, deleteBooking } from "../controllers/bookingController";
import { authMiddleware, requireRole } from "../middleware/auth";

const router = Router();

/**
 * @openapi
 * /api/bookings:
 *   get:
 *     summary: List all bookings (admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.post("/", authMiddleware, createBooking);
router.get("/me", authMiddleware, listMyBookings);
router.get("/", authMiddleware, requireRole("admin"), listAllBookings);
router.patch("/:id/status", authMiddleware, requireRole("admin"), updateBookingStatus);
router.delete("/:id", authMiddleware, requireRole("admin"), deleteBooking);

export default router;

