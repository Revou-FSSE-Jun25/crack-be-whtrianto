import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listServices = async (_req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany();
    return res.json(services);
  } catch {
    return res.status(500).json({ message: "Failed to fetch services" });
  }
};

const parseOptionalDate = (value?: string | null) => {
  if (value === undefined) return undefined;
  if (value === null || value === "") return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error("INVALID_DATE");
  }
  return parsed;
};

export const createService = async (req: Request, res: Response) => {
  try {
    const { name, description, price, flightDate } = req.body as {
      name?: string;
      description?: string;
      price?: number | string;
      flightDate?: string | null;
    };
    if (!name || typeof name !== "string") return res.status(400).json({ message: "Invalid name" });
    const parsedPrice = Number(price);
    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) return res.status(400).json({ message: "Invalid price" });

    let parsedFlightDate: Date | null | undefined;
    try {
      parsedFlightDate = parseOptionalDate(flightDate);
    } catch (error: any) {
      if (error.message === "INVALID_DATE") {
        return res.status(400).json({ message: "Invalid flight date" });
      }
      throw error;
    }

    const service = await prisma.service.create({
      data: {
        name,
        description: description ?? null,
        price: parsedPrice,
        flightDate: parsedFlightDate ?? null,
      },
    });
    return res.status(201).json(service);
  } catch {
    return res.status(500).json({ message: "Failed to create service" });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, flightDate } = req.body as {
      name?: string;
      description?: string;
      price?: number | string;
      flightDate?: string | null;
    };

    const data: { name?: string; description?: string | null; price?: number; flightDate?: Date | null } = {};

    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({ message: "Invalid name" });
      }
      data.name = name.trim();
    }
    
    if (description !== undefined) {
      data.description = description && typeof description === "string" ? description.trim() || null : null;
    }
    
    if (price !== undefined) {
      const parsedPrice = Number(price);
      if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
        return res.status(400).json({ message: "Invalid price" });
      }
      data.price = parsedPrice;
    }

    if (flightDate !== undefined) {
      try {
        data.flightDate = parseOptionalDate(flightDate) ?? null;
      } catch (error: any) {
        if (error.message === "INVALID_DATE") {
          return res.status(400).json({ message: "Invalid flight date" });
        }
        throw error;
      }
    }
    
    if (Object.keys(data).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }
    
    const service = await prisma.service.update({
      where: { id: Number(id) },
      data,
    });
    
    return res.json(service);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Service not found" });
    }
    return res.status(500).json({ message: "Failed to update service" });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const serviceId = Number(id);
    
    // Check if service exists
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      include: { bookings: true },
    });
    
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    
    // Use transaction to delete all associated bookings first, then the service
    await prisma.$transaction(async (tx) => {
      // Delete all bookings associated with this service
      if (service.bookings && service.bookings.length > 0) {
        await tx.booking.deleteMany({
          where: { serviceId: serviceId },
        });
      }
      
      // Delete the service
      await tx.service.delete({
        where: { id: serviceId },
      });
    });
    
    return res.json({ message: "Service deleted successfully" });
  } catch (error: any) {
    console.error("Delete service error:", error);
    
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Service not found" });
    }
    
    return res.status(500).json({ message: "Failed to delete service" });
  }
};

