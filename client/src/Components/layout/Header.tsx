import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import SignOutButton from "../auth/SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const style =
    "flex text-primary bg-white  items-center font-bold px-3 p-2 rounded";
  return (
    <div className=" bg-primary  py-6">
      <div className=" container mx-auto  flex justify-between items-center">
        <span className="text-white text-3xl font-bold tracking-tight">
          <Link to="/">forgetechsoftware@gmail.com</Link>
        </span>
        <span className=" flex space-x-2 ">
          {isLoggedIn ? (
            <>
              <Link to={"/my-booking"} className={style}>
                My Booking
              </Link>
              <Link to={"/my-hotels"} className={style}>
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link to={"/login"} className={style}>
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
