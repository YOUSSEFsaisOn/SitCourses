import jwt from "jsonwebtoken";
import { User, UserRole } from "./types";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function generateToken(user: User): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

interface JWTPayload {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  iat: number;
}

export function verifyToken(token: string): User | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role,
      avatar: decoded.avatar,
      createdAt: new Date(decoded.iat * 1000),
    };
  } catch (error) {
    return null;
  }
}

export function getTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  return null;
}
