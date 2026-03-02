import { User, Otp } from "./auth.model";

export const AuthRepository = {

  findUserByEmail(email: string) {
    return User.findOne({ email });
  },

  findUserByMobile(mobile: string) {
    return User.findOne({ mobile });
  },

  createUser(data: any) {
    return User.create(data);
  },

  verifyUser(email: string) {
    return User.updateOne({ email }, { isVerified: true });
  },

  saveOtp(data: any) {
    return Otp.create(data);
  },

  findOtp(email: string, otp: string) {
    return Otp.findOne({ email, otp });
  },

  deleteOtp(id: string) {
    return Otp.findByIdAndDelete(id);
  },

  deleteAllOtp(email: string) {
    return Otp.deleteMany({ email });
  }
};