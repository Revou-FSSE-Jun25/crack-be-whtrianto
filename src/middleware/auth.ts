import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { id: number; role: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const secretEnv = process.env.JWT_SECRET ?? "";
    if (!secretEnv) {
      return res.status(500).json({ message: "Server misconfigured (missing JWT secret)" });
    }
    const secret: Secret = secretEnv as Secret;
    const decoded = jwt.verify(token as string, secret) as string | JwtPayload;
    const payload = typeof decoded === "string" ? ({} as JwtPayload) : decoded;
    const id = typeof payload.id === "number" ? payload.id : Number(payload.id);
    const role = typeof payload.role === "string" ? payload.role : String(payload.role ?? "user");
    if (!id || Number.isNaN(id)) {
      return res.status(401).json({ message: "Invalid token payload" });
    }
    req.user = { id, role };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const requireRole = (role: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (req.user.role !== role) return res.status(403).json({ message: "Forbidden" });
    next();
  };
};

