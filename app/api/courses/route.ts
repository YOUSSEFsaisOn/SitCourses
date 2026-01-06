import { NextRequest, NextResponse } from "next/server";
import { getAllCourses } from "@/services/course-service";

export async function GET(request: NextRequest) {
  try {
    const courses = getAllCourses();
    return NextResponse.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
