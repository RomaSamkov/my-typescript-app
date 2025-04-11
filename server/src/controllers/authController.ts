import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User"; // Модель користувача

const JWT_SECRET = "your_jwt_secret"; // Замініть на ваш секретний ключ
const COOKIE_NAME = "authToken"; // Ім'я кукі

// Register
export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res
      .status(400)
      .json({ message: "Username, email, and password are required" });
    return;
  }

  try {
    // Перевірка, чи існує користувач із таким email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email is already in use" });
      return;
    }

    // Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створення нового користувача
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    // Знаходимо користувача за email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Перевірка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Створення JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      JWT_SECRET,
      {
        expiresIn: "1h", // Термін дії токена
      }
    );

    // Встановлення токена в кукі
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
    }); // 1 година
    res.status(200).json({
      message: "Login successful",
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Logout
export const logout = (req: Request, res: Response): void => {
  res.clearCookie(COOKIE_NAME); // Видаляємо кукі
  res.status(200).json({ message: "Logout successful" });
};

// Auth Check
export const authCheck = (req: Request, res: Response): void => {
  const token = req.cookies[COOKIE_NAME];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    // Перевірка токена
    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ message: "Authorized", user: decoded });
  } catch (error) {
    console.error("Error in authCheck:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};
