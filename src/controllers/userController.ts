import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middleware/auth";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as { name?: string; email?: string; password?: string };
    if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });
    if (password.length < 6) return res.status(400).json({ message: "Password too short" });
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email already registered" });
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { name, email, password: hashed } });
    return res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (e) {
    return res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
    return res.json({ token });
  } catch (e) {
    return res.status(500).json({ message: "Login failed" });
  }
};

export const me = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const user = await prisma.user.findUnique({ where: { id: req.user.id }, select: { id: true, name: true, email: true, role: true } });
    return res.json(user);
  } catch (e) {
    return res.status(500).json({ message: "Failed to fetch profile" });
  }
};

// Admin: list all users
export const listUsers = async (_req: AuthRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true, createdAt: true }, orderBy: { createdAt: "desc" } });
    return res.json(users);
  } catch (e) {
    return res.status(500).json({ message: "Failed to fetch users" });
  }
};

// Admin: create user
export const adminCreateUser = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, password, role } = req.body as { name?: string; email?: string; password?: string; role?: string };
    if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });
    if (password.length < 6) return res.status(400).json({ message: "Password too short" });
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email already registered" });
    const hashed = await bcrypt.hash(password, 10);
    const normalizedRole = role === "admin" ? "admin" : "user";
    const user = await prisma.user.create({ data: { name, email, password: hashed, role: normalizedRole } });
    return res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (e) {
    return res.status(500).json({ message: "Failed to create user" });
  }
};

// Admin: update user (name, email, role, optional password)
export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { name, email, role, password } = req.body as { name?: string; email?: string; role?: string; password?: string };
    const data: any = {};
    if (typeof name === "string" && name.trim()) data.name = name;
    if (typeof email === "string" && email.trim()) {
      // Check if email already exists for another user
      const existing = await prisma.user.findUnique({ where: { email: email.trim() } });
      if (existing && existing.id !== Number(id)) {
        return res.status(400).json({ message: "Email already registered" });
      }
      data.email = email.trim();
    }
    if (role === "admin" || role === "user") data.role = role;
    if (typeof password === "string" && password.length >= 6) data.password = await bcrypt.hash(password, 10);
    if (Object.keys(data).length === 0) return res.status(400).json({ message: "No valid fields to update" });
    const updated = await prisma.user.update({ where: { id: Number(id) }, data, select: { id: true, name: true, email: true, role: true } });
    return res.json(updated);
  } catch (e: any) {
    if (e.code === "P2002") {
      return res.status(400).json({ message: "Email already registered" });
    }
    return res.status(500).json({ message: "Failed to update user" });
  }
};

// Admin: delete user
export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const userId = Number(id);
    
    // Check if user exists and get their role
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true },
    });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Prevent deletion of admin users
    if (user.role === "admin") {
      return res.status(400).json({ message: "Cannot delete user with admin role" });
    }
    
    await prisma.user.delete({ where: { id: userId } });
    return res.status(204).send();
  } catch (e: any) {
    if (e.code === "P2025") {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(500).json({ message: "Failed to delete user" });
  }
};

