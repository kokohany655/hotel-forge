import { check } from "express-validator";
import { validate } from "./validator";

export const signupValidator = [
  check("firstName")
    .notEmpty()
    .withMessage("first name is required")
    .isString()
    .withMessage("first name must be string")
    .isLength({ min: 3 })
    .withMessage("first name must be at least 3 char"),
  check("lastName")
    .notEmpty()
    .withMessage("last name is required")
    .isString()
    .withMessage("last name must be string")
    .isLength({ min: 3 })
    .withMessage("last name must be at least 3 char"),
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("should be valid email"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be string")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 char "),
  validate,
];

export const loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("should be valid email"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be string")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 char "),
  validate,
];
