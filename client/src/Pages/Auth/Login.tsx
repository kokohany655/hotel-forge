import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/api_client";
import { useAppContext } from "../../Context/AppContext";

export type LoginFormData = {
  email: string;
  password: string;
};
const Login = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const mutation = useMutation(login, {
    onSuccess: async (data) => {
      showToast({ message: data.msg, type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");

      navigate("/");
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: "ERROR" });
    },
  });
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className=" text-3xl font-bold">Login</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full font-normal py-1 px-3"
          {...register("email", { required: "email is required" })}
        />
        {errors.email && (
          <span className=" text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full font-normal py-1 px-3"
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 6,
              message: "password must be at least 6 char",
            },
          })}
        />
        {errors.password && (
          <span className=" text-red-500">{errors.password.message}</span>
        )}
      </label>
      <div className=" w-full flex justify-between items-center">
        <Link to="/register" className=" text-gray-700 font-bold opacity-80">
          Don't have an account ? register
        </Link>
        <button
          type="submit"
          className=" bg-primary text-white rounded p-2 font-bold"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
