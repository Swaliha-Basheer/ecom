import crypto from "crypto";

export const generateSecureOTP = (): string => {
  return crypto.randomInt(100000, 999999).toString();
};
