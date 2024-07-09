import React from "react";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImageSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className=" text-2xl font-bold mb-3">Images</h2>
      <div className=" shadow rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          {...register("images", {
            validate: (img) => {
              if (img.length === 0) {
                return "At least one should be added ";
              }
              if (img.length > 6) {
                return " total number of images can't be more than 6 ";
              }
            },
          })}
        />
      </div>
      {errors.images && (
        <span className=" text-red-500">{errors.images?.message}</span>
      )}
    </div>
  );
};

export default ImageSection;
