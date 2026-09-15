// src/models/User.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  phone: string;
  email: string;
  password?: string;
  role: "CUSTOMER" | "VENDOR" | "ADMIN";
  isVerified: boolean;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["CUSTOMER", "VENDOR", "ADMIN"],
      default: "CUSTOMER",
    },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);