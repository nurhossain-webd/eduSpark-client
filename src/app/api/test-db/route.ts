import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    await connectMongoDB();

    return NextResponse.json(
      {
        success: true,
        message: "EduSpark database connected successfully.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Database connection error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to connect to the EduSpark database.",
      },
      {
        status: 500,
      },
    );
  }
}