import bcrypt from "bcrypt";
import crypto from "crypto";
import { User, Otp } from "./auth.model";
import { securePassword } from "../../utils/securePassword";
import { generateSecureOTP } from "../../utils/generateOtpHelper";
import { sendResetPasswordEmail } from "../../services/forgotEmail.service";

export const AuthService = {

  async insertUser(data: any) {

    const { name, email, mobile, password } = data;

    const existMobile = await User.findOne({ mobile });
    if (existMobile && existMobile.isVerified)
      throw new Error("Phone already exists");

    const existEmail = await User.findOne({ email });
    if (existEmail && existEmail.isVerified)
      throw new Error("Email already exists");

    const hashedPassword = await securePassword(password);

    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword
    });

    const otp = generateSecureOTP();

    await Otp.create({
      email,
      otp,
      expiryTime: new Date(Date.now() + 2 * 60 * 1000)
    });

    return { email, otp };
  },

  async verifyOtp(email: string, otp: string) {

    const otpRecord = await Otp.findOne({ email, otp });

    if (!otpRecord) throw new Error("Invalid OTP");

    if (otpRecord.expiryTime < new Date())
      throw new Error("OTP expired");

    await User.updateOne(
      { email },
      { isVerified: true }
    );

    await Otp.findByIdAndDelete(otpRecord._id);
  },

  async login(email: string, password: string) {

    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match)
      throw new Error("Wrong password");

    if (!user.isVerified)
      throw new Error("Account not verified");

    return user;
  },

  async forgotPassword(email: string) {

    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found");

    const token =
      crypto.randomBytes(20).toString("hex");

    user.token = token;
    await user.save();

    await sendResetPasswordEmail(
      user.name,
      user.email,
      token
    );
  }
};