import { Enrollment, Course } from "@/lib/types";

// In-memory storage for demo purposes
const enrollments: Enrollment[] = [];

export function isUserEnrolled(userId: string, courseId: string): boolean {
  return enrollments.some(
    (e) => e.userId === userId && e.courseId === courseId
  );
}

export function enrollUserInCourses(
  userId: string,
  cartItems: { courseId: string; course: Course }[]
): Enrollment[] {
  return cartItems.map((item) => {
    const enrollment: Enrollment = {
      id: Date.now().toString() + Math.random(),
      userId,
      courseId: item.courseId,
      course: item.course,
      progress: 0,
      enrolledAt: new Date(),
    };
    enrollments.push(enrollment);
    return enrollment;
  });
}
