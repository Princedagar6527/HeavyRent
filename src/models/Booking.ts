import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IBooking extends Document {
  customerId: Types.ObjectId;
  vehicleId: Types.ObjectId;
  vendorId: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  siteAddress: string;
  units: number;
  rateType: "HOURLY" | "SHIFT";
  estimatedTotal: number;
  advanceAmount: number;
  status: "PENDING" | "ACCEPTED" | "ON_SITE" | "COMPLETED" | "CANCELLED";
  paymentId?: string;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    customerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    vehicleId: { type: Schema.Types.ObjectId, ref: "Vehicle", required: true },
    vendorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    siteAddress: { type: String, required: true },
    units: { type: Number, required: true },
    rateType: { type: String, enum: ["HOURLY", "SHIFT"], required: true },
    estimatedTotal: { type: Number, required: true },
    advanceAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "ON_SITE", "COMPLETED", "CANCELLED"],
      default: "PENDING",
    },
    paymentId: { type: String },
  },
  { timestamps: true }
);

export default (mongoose.models.Booking as Model<IBooking>) ||
  mongoose.model<IBooking>("Booking", BookingSchema);