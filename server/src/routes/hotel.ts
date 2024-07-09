import express from "express";
import { verifyToken } from "../middleware/auth";
import { createHotelValidator } from "../validator/hotelValidator";
import {
  createHotel,
  getHotelById,
  getHotelsUser,
  uploadHotelImage,
  uploadImages,
} from "../services/hotel";

const router = express.Router();

router
  .route("/")
  .post(
    verifyToken,
    uploadHotelImage,
    createHotelValidator,
    uploadImages,
    createHotel
  )
  .get(verifyToken, getHotelsUser);

router.route("/:id").get(verifyToken, getHotelById);

export default router;
