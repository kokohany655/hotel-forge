import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getMyHotels } from "../../api/api_client";
import { useAppContext } from "../../Context/AppContext";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { showToast } = useAppContext();
  const { data: hotelData } = useQuery("getMyHotels", getMyHotels, {
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  return (
    <div className=" space-y-5">
      <span className="flex justify-between">
        <h1 className=" text-3xl font-bold mb-3">My Hotels</h1>
        <Link
          to={"/add-hotel"}
          className="py-2 px-4 text-xl bg-primary text-white rounded flex justify-center items-center font-semibold"
        >
          Add Hotel
        </Link>
      </span>
      <div className=" flex flex-col gap-8">
        {hotelData && hotelData?.length > 0 ? (
          hotelData.map((hotel) => (
            <div
              key={hotel._id}
              className=" flex flex-col justify-between items-start shadow p-8 gap-5"
            >
              <h2 className=" text-2xl font-bold">{hotel.name}</h2>
              <h2 className=" text-ellipsis overflow-hidden h-12 line-clamp-2">
                {hotel.description}
              </h2>
              <div className="grid grid-cols-5 gap-2">
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BsMap className="mr-1" />
                  {hotel.city}, {hotel.country}
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BsBuilding className="mr-1" />
                  {hotel.type}
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiMoney className="mr-1" />£{hotel.pricePerNight} per night
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiHotel className="mr-1" />
                  {hotel.adultCount} adults, {hotel.childCount} children
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiStar className="mr-1" />
                  {hotel.startRating} Star Rating
                </div>
              </div>
              <span className="flex justify-end w-full">
                <Link
                  to={`/edit-hotel/${hotel._id}`}
                  className="flex bg-primary text-white font-bold p-2"
                >
                  View Details
                </Link>
              </span>
            </div>
          ))
        ) : (
          <div> no hotel found</div>
        )}
      </div>
    </div>
  );
};

export default MyHotels;
