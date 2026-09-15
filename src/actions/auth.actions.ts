"use server";

import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

interface RegisterInput {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "CUSTOMER" | "VENDOR";
}

export async function registerUser(data: RegisterInput) {
  try {
    await dbConnect();

    // Check if phone or email already registered
    const existing = await User.findOne({
      $or: [{ email: data.email.toLowerCase() }, { phone: data.phone }],
    });

    if (existing) {
      return { success: false, error: "User with this email or phone already exists." };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await User.create({
      name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone,
      password: hashedPassword,
      role: data.role,
      isVerified: true,
    });

    return { success: true, role: newUser.role };
  } catch (error: any) {
    return { success: false, error: error.message || "Registration failed." };
  }
}