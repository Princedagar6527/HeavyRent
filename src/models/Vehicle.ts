import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IVehicle extends Document {
  vendorId: Types.ObjectId;
  title: string;
  category: "JCB" | "CRANE" | "TIPPER" | "EXCAVATOR" | "ROLLER" | "TEMPO";
  registrationNo: string;
  hourlyRate: number;
  shiftRate: number;
  withOperator: boolean;
  withFuel: boolean;
  city: string;
  state: string;
  images: string[];
  rcDocument: string;
  isKycVerified: boolean;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const VehicleSchema = new Schema<IVehicle>(
  {
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Vendor ID is required"],
    },
    title: {
      type: String,
      required: [true, "Vehicle title/model is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: ["JCB", "CRANE", "TIPPER", "EXCAVATOR", "ROLLER", "TEMPO"],
      required: [true, "Vehicle category is required"],
    },
    registrationNo: {
      type: String,
      required: [true, "Registration number is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },
    hourlyRate: {
      type: Number,
      required: [true, "Hourly rate is required"],
      min: [0, "Rate cannot be negative"],
    },
    shiftRate: {
      type: Number,
      required: [true, "Shift rate is required"],
      min: [0, "Rate cannot be negative"],
    },
    withOperator: {
      type: Boolean,
      default: true,
    },
    withFuel: {
      type: Boolean,
      default: false,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      index: true,
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    rcDocument: {
      type: String,
      default: "",
    },
    isKycVerified: {
      type: Boolean,
      default: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Clear cached model in development to immediately load updated enums
if (process.env.NODE_ENV !== "production") {
  delete (mongoose.models as any).Vehicle;
}

export default (mongoose.models.Vehicle as Model<IVehicle>) ||
  mongoose.model<IVehicle>("Vehicle", VehicleSchema);