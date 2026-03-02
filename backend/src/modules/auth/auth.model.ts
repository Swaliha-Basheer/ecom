import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  mobile?: string;
  password: string;
  google: boolean;
  isVerified: boolean;
  isBlocked: boolean;
  token: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  mobile: {
    type: String,
    unique: true,
    sparse: true
  },

  password: { type: String, required: true },

  google: { type: Boolean, default: false },

  isVerified: { type: Boolean, default: false },

  isBlocked: { type: Boolean, default: false },

  token: { type: String, default: "" },

  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model<IUser>("User", userSchema);


/* OTP MODEL */

export interface IOtp extends Document {
  email: string;
  otp: string;
  expiryTime: Date;
}

const otpSchema = new Schema<IOtp>({
  email: String,
  otp: String,
  expiryTime: { type: Date, expires: 1440 }
});

export const Otp = mongoose.model<IOtp>("Otp", otpSchema);