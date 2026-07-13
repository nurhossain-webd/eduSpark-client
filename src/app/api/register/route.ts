import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import connectMongoDB from "@/lib/mongodb";
import { registerSchema } from "@/lib/validations/auth.validation";
import User from "@/models/User";

interface RegistrationResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  errors?: Record<string, string[]>;
}

export async function POST(
  request: Request,
): Promise<NextResponse<RegistrationResponse>> {
  try {
    const requestBody: unknown = await request.json();

    const validationResult = registerSchema.safeParse(requestBody);

    if (!validationResult.success) {
      const flattenedErrors = validationResult.error.flatten().fieldErrors;

      return NextResponse.json(
        {
          success: false,
          message: "Please correct the invalid registration information.",
          errors: flattenedErrors,
        },
        {
          status: 400,
        },
      );
    }

    const { name, email, password } = validationResult.data;

    await connectMongoDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "An account with this email already exists.",
        },
        {
          status: 409,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      image: "",
      role: "user",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your EduSpark account was created successfully.",
        user: {
          id: newUser._id.toString(),
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create your account. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}
