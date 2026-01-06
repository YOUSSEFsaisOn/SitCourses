import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "@/services/auth-service";
import { LoginCredentials } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body: LoginCredentials = await request.json();

    if (!body.email || !body.password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    const result = await loginUser(body);

    if (result) {
      return NextResponse.json({
        success: true,
        data: {
          user: result.user,
          token: result.token,
        },
      });
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      },
      { status: 500 }
    );
  }
}
