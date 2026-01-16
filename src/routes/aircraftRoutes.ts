import express from "express";
import { getAircrafts, createAircraft, updateAircraft, deleteAircraft } from "../controllers/AircraftController";

const router = express.Router();

router.get("/", getAircrafts);
router.post("/", createAircraft);
router.patch("/:id", updateAircraft);
router.delete("/:id", deleteAircraft);

export default router;
