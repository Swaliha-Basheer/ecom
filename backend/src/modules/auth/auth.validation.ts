import { body } from "express-validator";

export const registerValidation = [
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 })
];