import { check } from "express-validator";
import { validate } from "./validator";

export const createHotelValidator = [
  check("name").notEmpty().withMessage("Name is required"),
  check("city").notEmpty().withMessage("City is required"),
  check("country").notEmpty().withMessage("Country is required"),
  check("description").notEmpty().withMessage("Description is required"),
  check("pricePerNight")
    .notEmpty()
    .isNumeric()
    .withMessage(" Price per night type is required and must be a number"),
  check("facilities")
    .notEmpty()
    .isArray()
    .withMessage(" Facilities type is required"),
  check("type").notEmpty().withMessage(" Hotel type is required"),
  check("type").notEmpty().withMessage(" Hotel type is required"),
  check("type").notEmpty().withMessage(" Hotel type is required"),
  validate,
];
