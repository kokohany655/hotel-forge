import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { logout } from "../../api/api_client";
import { useAppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const mutation = useMutation(logout, {
    onSuccess: async (data) => {
      await queryClient.invalidateQueries("validateToken");
      showToast({
        message: data.msg,
        type: "SUCCESS",
      });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleLogout = () => {
    mutation.mutate();
  };
  return (
    <button
      className={
        "flex text-primary bg-white  items-center font-bold px-3 p-2 rounded"
      }
      onClick={handleLogout}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
