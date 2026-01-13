import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth";

const prisma = new PrismaClient();

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { serviceId, date } = req.body as { serviceId?: number | string; date?: string };
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const parsedId = Number(serviceId);
    if (!Number.isFinite(parsedId)) return res.status(400).json({ message: "Invalid serviceId" });
    if (!date || Number.isNaN(Date.parse(date))) return res.status(400).json({ message: "Invalid date" });
    const booking = await prisma.booking.create({
      data: {
        userId: req.user.id,
        serviceId: parsedId,
        date: new Date(date),
      },
    });
    return res.status(201).json(booking);
  } catch {
    return res.status(500).json({ message: "Failed to create booking" });
  }
};

export const listMyBookings = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.id },
      include: { service: true },
      orderBy: { createdAt: "desc" },
    });
    return res.json(bookings);
  } catch {
    return res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

export const listAllBookings = async (_req: AuthRequest, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany({ include: { user: true, service: true }, orderBy: { createdAt: "desc" } });
    return res.json(bookings);
  } catch {
    return res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

export const updateBookingStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { status } = req.body as { status?: string };
    if (!status || typeof status !== "string") return res.status(400).json({ message: "Invalid status" });
    const allowed = ["pending", "confirmed", "completed", "cancelled"];
    if (!allowed.includes(status)) return res.status(400).json({ message: "Unsupported status" });
    const updated = await prisma.booking.update({ where: { id: Number(id) }, data: { status } });
    return res.json(updated);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(500).json({ message: "Failed to update status" });
  }
};

export const deleteBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const bookingId = Number(id);
    
    // Check if booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });
    
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    
    await prisma.booking.delete({
      where: { id: bookingId },
    });
    
    return res.json({ message: "Booking deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(500).json({ message: "Failed to delete booking" });
  }
};

