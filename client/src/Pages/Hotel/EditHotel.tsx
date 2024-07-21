import React from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getHotelById, updateHotel } from "../../api/api_client";
import ManageHotelForm from "../../Components/hotel/AddHotel/ManageHotelForm";
import { useAppContext } from "../../Context/AppContext";

const EditHotel = () => {
  const { showToast } = useAppContext();
  const { hotelId } = useParams();
  const { data: hotelData } = useQuery(
    "getHotelById",
    () => getHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  const { mutate, isLoading } = useMutation(updateHotel, {
    onSuccess: (data) => {
      console.log({ data });
      showToast({ message: data.msg, type: "SUCCESS" });
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: "ERROR" });
    },
  });
  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm
      hotel={hotelData}
      onSave={handleSave}
      isLoading={isLoading}
    />
  );
};

export default EditHotel;
