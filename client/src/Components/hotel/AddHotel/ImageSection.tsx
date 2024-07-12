import React from "react";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImageSection = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const existImagesUrls = watch("images") as string[];
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "images",
      existImagesUrls.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="shadow rounded p-4 flex flex-col gap-4">
        {existImagesUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existImagesUrls.map((url, index) => (
              <div className="relative group" key={index}>
                <img src={url} alt="" className="min-h-full object-cover" />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          {...register("imagesFile", {
            validate: (img: FileList) => {
              const totalLength = img.length + (existImagesUrls?.length || 0);
              if (totalLength === 0) {
                return "At least one should be added";
              }
              if (totalLength > 6) {
                return "Total number of images can't be more than 6";
              }
            },
          })}
        />
      </div>
      {errors.imagesFile && (
        <span className="text-red-500">{errors.imagesFile.message}</span>
      )}
    </div>
  );
};

export default ImageSection;
