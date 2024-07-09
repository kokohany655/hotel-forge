import React from "react";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelFacilities } from "../../../config/hotel-option-config";

const Facilities = () => {
  const {
    register,

    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className=" text-2xl font-bold mb-3">Facilities</h2>
      <div className=" grid grid-cols-5 gap-3">
        {hotelFacilities.map((fac, index) => (
          <label key={index} className=" flex justify-start items-start gap-2">
            <input
              type="checkbox"
              value={fac}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "Facilities must be at least one ";
                  }
                },
              })}
              className=" mt-[.33rem]"
            />
            <span className="">{fac}</span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className=" text-red-500">{errors.facilities.message}</span>
      )}
    </div>
  );
};

export default Facilities;
