import { spawn } from "child_process";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from "../../api/api_client";
import { useAppContext } from "../../Context/AppContext";
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async (data) => {
      showToast({ message: data.msg, type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");

      navigate("/");
    },
    onError: (err: any) => {
      showToast({ message: err.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form className=" flex flex-col gap-5 " onSubmit={onSubmit}>
      <h2 className=" text-3xl font-bold">Create an Account</h2>
      <div className=" flex flex-col md:flex-row gap-5">
        <label className=" text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            type="text"
            className="border rounded w-full font-normal py-1 px-3"
            {...register("firstName", { required: "this field is required" })}
          />
          {errors.firstName && (
            <span className=" text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className=" text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            type="text"
            className="border rounded w-full font-normal py-1 px-3"
            {...register("lastName", { required: "this field is required" })}
          />
          {errors.lastName && (
            <span className=" text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className=" text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full font-normal py-1 px-3"
          {...register("email", { required: "this field is required" })}
        />
        {errors.email && (
          <span className=" text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className=" text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full font-normal py-1 px-3"
          {...register("password", {
            required: "this field is required",
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
      <label className=" text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full font-normal py-1 px-3"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "this field is required";
              } else if (watch("password") !== val) {
                return "your passwords doesn't match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className=" text-red-500">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>
      <div className=" w-full flex justify-between items-center">
        <Link to="/login" className=" text-gray-700 font-bold opacity-80">
          Already have an account ? login
        </Link>
        <button
          type="submit"
          className=" bg-primary text-white rounded p-2 font-bold"
        >
          Create Account
        </button>
      </div>
    </form>
  );
};

export default Register;
