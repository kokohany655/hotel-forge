import { LoginFormData } from "../Pages/Auth/Login";
import { RegisterFormData } from "../Pages/Auth/Register";
import { baseUrl } from "./baseUrl";

export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  startRating: number;
  images: string[];
};
export const register = async (data: RegisterFormData) => {
  try {
    const response = await baseUrl.post("/api/v1/auth/register", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.msg || "An error occurred");
  }
};

export const validateToken = async () => {
  try {
    const response = await baseUrl.get("/api/v1/auth/validate-token", {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.msg || "An error occurred");
  }
};

export const login = async (data: LoginFormData) => {
  try {
    const response = await baseUrl.post("/api/v1/auth/login", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.msg || "An error occurred");
  }
};

export const logout = async () => {
  try {
    const response = await baseUrl.post(
      "/api/v1/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.msg || "An error occurred");
  }
};

export const addHotel = async (hotelFormData: FormData) => {
  try {
    const response = await baseUrl.post("/api/v1/hotel", hotelFormData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.msg || "An error occurred");
  }
};

export const getMyHotels = async (): Promise<HotelType[]> => {
  try {
    const response = await baseUrl.get("/api/v1/hotel", {
      withCredentials: true,
    });

    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.msg || "An error occurred");
  }
};

export const getHotelById = async (id: string): Promise<HotelType> => {
  try {
    const response = await baseUrl.get(`/api/v1/hotel/${id}`, {
      withCredentials: true,
    });

    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.msg || "An error occurred");
  }
};
