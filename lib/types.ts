export type UserRole = "student" | "instructor";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  instructorId: string;
  instructor: User;
  category: string;
  lessons: Lesson[];
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  duration: number;
  level: "beginner" | "intermediate" | "advanced";
  createdAt: Date;
  published: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  duration: number;
  order: number;
}

export interface CartItem {
  courseId: string;
  course: Course;
  addedAt: Date;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "paid" | "failed";
  createdAt: Date;
  paidAt?: Date;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  course: Course;
  progress: number;
  enrolledAt: Date;
  lastWatchedLessonId?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
