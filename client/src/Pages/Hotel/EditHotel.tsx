import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getHotelById } from "../../api/api_client";
import ManageHotelForm from "../../Components/hotel/AddHotel/ManageHotelForm";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { data: hotelData } = useQuery(
    "getHotelById",
    () => getHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  console.log({ hotelData });

  return <ManageHotelForm hotel={hotelData} />;
};

export default EditHotel;
