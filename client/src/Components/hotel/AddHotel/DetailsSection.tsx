import React from "react";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className=" flex flex-col gap-4">
      <h1 className=" text-3xl font-bold mb-3">Add Hotel</h1>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
          type="text"
          className="border rounded w-full font-normal py-1 px-3"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <span className=" text-red-500">{errors.name.message}</span>
        )}
      </label>
      <div className=" flex gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Country
          <input
            type="text"
            className="border rounded w-full font-normal py-1 px-3"
            {...register("country", { required: "Country is required" })}
          />
          {errors.country && (
            <span className=" text-red-500">{errors.country.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            type="text"
            className="border rounded w-full font-normal py-1 px-3"
            {...register("city", { required: "City is required" })}
          />
          {errors.city && (
            <span className=" text-red-500">{errors.city.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          rows={10}
          className="border rounded w-full font-normal py-1 px-3"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <span className=" text-red-500">{errors.description.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Price Per Night
        <input
          min={1}
          type="number"
          className="border rounded w-full font-normal py-1 px-3"
          {...register("pricePerNight", {
            required: "Price Per Night is required",
          })}
        />
        {errors.pricePerNight && (
          <span className=" text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>
      <label className="text-gray-700 flex flex-col text-sm font-bold max-w-[50%]">
        Star Rating
        <select
          {...register("startRating", { required: "star rating is required" })}
          className="border rounded w-full font-normal py-1 px-3"
        >
          <option value="" className=" text-sm font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.startRating && (
          <span className=" text-red-500">{errors.startRating.message}</span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
