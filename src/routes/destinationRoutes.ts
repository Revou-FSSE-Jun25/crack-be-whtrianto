import express from "express";
import { getDestinations, createDestination, updateDestination, deleteDestination } from "../controllers/DestinationController";

const router = express.Router();

router.get("/", getDestinations);
router.post("/", createDestination);
router.patch("/:id", updateDestination);
router.delete("/:id", deleteDestination);

export default router;
