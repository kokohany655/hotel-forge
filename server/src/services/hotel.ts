import { NextFunction, Request, Response } from "express";
import multer, { FileFilterCallback, Multer } from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotelModel";

const storage = multer.memoryStorage();
const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: multerFilter });

export const uploadHotelImage = upload.array("imagesFile", 6);

export const uploadImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files || req.files.length === 0) return next();
    console.log({ req: req.files, reqs: req.body.images });
    const images = req.files as Express.Multer.File[];
    const imagesUrl = await Promise.all(
      images.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
      })
    );
    if (req.body.images && req.body.images.length > 0) {
      req.body.images = [...req.body.images, ...imagesUrl];
    } else {
      req.body.images = imagesUrl;
    }
    next();
  } catch (error) {
    console.log({ error });
    res.status(400).json({ msg: "Error uploading images" });
  }
};
export const createHotel = async (req: Request, res: Response) => {
  try {
    const newHotel: HotelType = req.body;
    newHotel.userId = req.userId;

    const hotel = new Hotel(newHotel);
    await hotel.save();
    res.status(201).json({ hotel, msg: "Created Hotel Successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};

export const getHotelsUser = async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.find({ userId: req.userId });
    res.status(200).json({ result: hotel.length, data: hotel });
  } catch (error) {
    res.status(500).json({ msg: "Can't create Hotel" });
  }
};

export const getHotelById = async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.findOne({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!hotel) {
      res.status(404).json({ msg: "this hotel not found with this id" });
    }
    res.status(200).json({ data: hotel });
  } catch (error) {
    res.status(500).json({ msg: "Can't fetching Hotel" });
  }
};

export const updateHotel = async (req: Request, res: Response) => {
  console.log({ req: req.body });
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId,
      },
      req.body,
      { new: true }
    );
    if (!hotel) {
      res.status(404).json({ msg: "this hotel not found with this id " });
    }

    res.status(200).json({ hotel, msg: "updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Can't fetching Hotel" });
  }
};
