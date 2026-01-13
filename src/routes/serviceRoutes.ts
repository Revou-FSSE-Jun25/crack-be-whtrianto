import { Router } from "express";
import { listServices, createService, updateService, deleteService } from "../controllers/serviceController";
import { authMiddleware, requireRole } from "../middleware/auth";

const router = Router();

router.get("/", listServices);
router.post("/", authMiddleware, requireRole("admin"), createService);
router.patch("/:id", authMiddleware, requireRole("admin"), updateService);
router.delete("/:id", authMiddleware, requireRole("admin"), deleteService);

export default router;

