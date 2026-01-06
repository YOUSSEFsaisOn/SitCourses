import bcrypt from "bcryptjs";
import { User, LoginCredentials, RegisterData } from "@/lib/types";
import { generateToken } from "@/lib/jwt";

// In-memory storage for demo purposes
let users: User[] = [
  {
    id: "1",
    email: "student@example.com",
    name: "John Student",
    role: "student",
    createdAt: new Date(),
  },
  {
    id: "2",
    email: "instructor@example.com",
    name: "Jane Instructor",
    role: "instructor",
    createdAt: new Date(),
  },
];

let userPasswords: Record<string, string> = {
  "student@example.com": "$2a$10$hashedpassword1", // password: student123
  "instructor@example.com": "$2a$10$hashedpassword2", // password: instructor123
};

export async function registerUser(
  data: RegisterData
): Promise<{ user: User; token: string } | null> {
  // Check if user already exists
  const existingUser = users.find((u) => u.email === data.email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Create user
  const user: User = {
    id: Date.now().toString(),
    email: data.email,
    name: data.name,
    role: data.role,
    createdAt: new Date(),
  };

  users.push(user);
  userPasswords[user.email] = hashedPassword;

  const token = generateToken(user);

  return { user, token };
}

export async function loginUser(
  credentials: LoginCredentials
): Promise<{ user: User; token: string } | null> {
  const user = users.find((u) => u.email === credentials.email);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const hashedPassword = userPasswords[user.email];
  if (!hashedPassword) {
    throw new Error("Invalid credentials");
  }

  const isValidPassword = await bcrypt.compare(
    credentials.password,
    hashedPassword
  );
  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user);

  return { user, token };
}

export function getUserById(id: string): User | null {
  return users.find((u) => u.id === id) || null;
}

export function getAllUsers(): User[] {
  return users;
}
