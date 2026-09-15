"use server";

import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Vehicle from "@/models/Vehicle";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

interface BookingPayload {
  vehicleId: string;
  customerName: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  siteAddress: string;
  rateType: "HOURLY" | "SHIFT";
  units: number;
}

export async function createDirectBooking(payload: BookingPayload) {
  try {
    await dbConnect();

    // 1. Fetch vehicle to get rates and vendor
    const vehicle = await Vehicle.findById(payload.vehicleId);
    if (!vehicle || !vehicle.isAvailable) {
      return { success: false, error: "This machine is currently unavailable." };
    }

    // 2. Find or create temporary customer record
    let customer = await User.findOne({ phone: payload.customerPhone });
    if (!customer) {
      customer = await User.create({
        name: payload.customerName,
        phone: payload.customerPhone,
        role: "CUSTOMER",
        isVerified: true,
      });
    }

    // 3. Price calculation
    const rate = payload.rateType === "HOURLY" ? vehicle.hourlyRate : vehicle.shiftRate;
    const estimatedTotal = rate * Number(payload.units);
    const advanceAmount = Math.round(estimatedTotal * 0.2); // 20% advance token

    // 4. Create booking
    const booking = await Booking.create({
      customerId: customer._id,
      vehicleId: vehicle._id,
      vendorId: vehicle.vendorId,
      startDate: new Date(payload.startDate),
      endDate: new Date(payload.endDate),
      siteAddress: payload.siteAddress,
      units: payload.units,
      rateType: payload.rateType,
      estimatedTotal,
      advanceAmount,
      status: "PENDING",
    });

    revalidatePath("/my-bookings");
    return { success: true, bookingId: booking._id.toString() };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to process booking." };
  }
}
export async function updateBookingStatus(bookingId: string, status: "ACCEPTED" | "CANCELLED" | "COMPLETED") {
  try {
    await dbConnect();
    await Booking.findByIdAndUpdate(bookingId, { status });
    revalidatePath("/vendor/dashboard");
    revalidatePath("/my-bookings");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}