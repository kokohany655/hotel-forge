import React from "react";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelTypes } from "../../../config/hotel-option-config";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");
  const style = " cursor-pointer  text-sm  rounded-xl px-4 py-3 font-semibold ";
  return (
    <div>
      <h2 className=" text-2xl font-bold mb-3">Type</h2>
      <div className=" grid grid-cols-5 gap-3">
        {hotelTypes.map((type, index) => (
          <label
            key={index}
            className={
              typeWatch === type
                ? style + "bg-primary text-white"
                : style + " shadow-md "
            }
          >
            <input
              type="radio"
              value={type}
              {...register("type", { required: " Hotel Type is required" })}
              className=" hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className=" text-red-500">{errors.type.message}</span>
      )}
    </div>
  );
};

export default TypeSection;
