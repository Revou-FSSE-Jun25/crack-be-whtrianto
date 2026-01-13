import { Router } from "express";
import { register, login, me, listUsers, adminCreateUser, updateUser, deleteUser } from "../controllers/userController";
import { authMiddleware, requireRole } from "../middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, me);

// Admin user management
router.get("/", authMiddleware, requireRole("admin"), listUsers);
router.post("/", authMiddleware, requireRole("admin"), adminCreateUser);
router.patch("/:id", authMiddleware, requireRole("admin"), updateUser);
router.delete("/:id", authMiddleware, requireRole("admin"), deleteUser);

export default router;

