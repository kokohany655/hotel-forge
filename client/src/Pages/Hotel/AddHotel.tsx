import React from "react";
import ManageHotelForm from "../../Components/hotel/AddHotel/ManageHotelForm";
import { useMutation } from "react-query";
import { useAppContext } from "../../Context/AppContext";
import { addHotel } from "../../api/api_client";

const AddHotel = () => {
  const { showToast } = useAppContext();
  const { mutate, isLoading } = useMutation(addHotel, {
    onSuccess: (data: any) => {
      showToast({ message: data.msg, type: "SUCCESS" });
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: "ERROR" });
    },
  });

  const handleSave = (handleFormData: FormData) => {
    mutate(handleFormData);
  };
  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
