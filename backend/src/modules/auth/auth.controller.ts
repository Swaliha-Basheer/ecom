import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const result =
      await AuthService.insertUser(req.body);

    res.cookie("email", result.email);

    res.json({
      success: true,
      message: "OTP Sent"
    });

  } catch (error) {
    next(error);
  }
};

export const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const { otp } = req.body;

    await AuthService.verifyOtp(
      req.cookies.email,
      otp
    );

    res.clearCookie("email");

    res.json({
      success: true
    });

  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const user =
      await AuthService.login(
        req.body.email,
        req.body.password
      );

    res.json({
      success: true,
      user
    });

  } catch (error) {
    next(error);
  }
};