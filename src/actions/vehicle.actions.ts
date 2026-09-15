"use server";

import dbConnect from "@/lib/mongodb";
import Vehicle from "@/models/Vehicle";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

interface AddVehicleInput {
  vendorName: string;
  vendorPhone: string;
  title: string;
  category: "JCB" | "CRANE" | "TIPPER" | "EXCAVATOR" | "ROLLER";
  registrationNo: string;
  hourlyRate: number;
  shiftRate: number;
  withOperator: boolean;
  withFuel: boolean;
  city: string;
  state: string;
  imageUrl?: string;
}

export async function registerNewVehicle(data: AddVehicleInput) {
  try {
    await dbConnect();

    // 1. Check or create vendor user
    let vendor = await User.findOne({ phone: data.vendorPhone });
    if (!vendor) {
      vendor = await User.create({
        name: data.vendorName,
        phone: data.vendorPhone,
        role: "VENDOR",
        isVerified: true,
      });
    }

    // 2. Prevent duplicate vehicle registration numbers
    const existing = await Vehicle.findOne({ registrationNo: data.registrationNo.toUpperCase() });
    if (existing) {
      return { success: false, error: "A vehicle with this registration number already exists." };
    }

    // 3. Fallback image if not provided
    const image =
      data.imageUrl && data.imageUrl.trim() !== ""
        ? data.imageUrl
        : "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800";

    // 4. Save Vehicle
    await Vehicle.create({
      vendorId: vendor._id,
      title: data.title,
      category: data.category,
      registrationNo: data.registrationNo.toUpperCase(),
      hourlyRate: Number(data.hourlyRate),
      shiftRate: Number(data.shiftRate),
      withOperator: data.withOperator,
      withFuel: data.withFuel,
      city: data.city,
      state: data.state,
      images: [image],
      rcDocument: "verified",
      isKycVerified: true,
      isAvailable: true,
    });

    revalidatePath("/vehicles");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to register machine." };
  }
}