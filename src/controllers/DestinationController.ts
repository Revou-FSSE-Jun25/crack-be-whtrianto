import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDestinations = async (req: Request, res: Response) => {
    try {
        const destinations = await prisma.destination.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ message: "Error fetching destinations" });
    }
};

export const createDestination = async (req: Request, res: Response) => {
    const { name, image } = req.body;
    try {
        const destination = await prisma.destination.create({
            data: { name, image },
        });
        res.status(201).json(destination);
    } catch (error) {
        console.error("Error creating destination:", error);
        res.status(400).json({ message: "Error creating destination" });
    }
};

export const updateDestination = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, image } = req.body;
    try {
        const destination = await prisma.destination.update({
            where: { id: Number(id) },
            data: { name, image },
        });
        res.json(destination);
    } catch (error) {
        console.error("Error updating destination:", error);
        res.status(400).json({ message: "Error updating destination" });
    }
};

export const deleteDestination = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.destination.delete({
            where: { id: Number(id) },
        });
        res.json({ message: "Destination deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error deleting destination" });
    }
};
