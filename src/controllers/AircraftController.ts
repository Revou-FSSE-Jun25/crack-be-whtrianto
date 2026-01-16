import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAircrafts = async (req: Request, res: Response) => {
    try {
        const aircrafts = await prisma.aircraft.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(aircrafts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching aircrafts" });
    }
};

export const createAircraft = async (req: Request, res: Response) => {
    const { name, type } = req.body;
    try {
        const aircraft = await prisma.aircraft.create({
            data: { name, type },
        });
        res.status(201).json(aircraft);
    } catch (error) {
        res.status(400).json({ message: "Error creating aircraft" });
    }
};

export const updateAircraft = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, type } = req.body;
    try {
        const aircraft = await prisma.aircraft.update({
            where: { id: Number(id) },
            data: { name, type },
        });
        res.json(aircraft);
    } catch (error) {
        res.status(400).json({ message: "Error updating aircraft" });
    }
};

export const deleteAircraft = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.aircraft.delete({
            where: { id: Number(id) },
        });
        res.json({ message: "Aircraft deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error deleting aircraft" });
    }
};
