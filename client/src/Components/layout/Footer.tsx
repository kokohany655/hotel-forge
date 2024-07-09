import React from "react";

const Footer = () => {
  return (
    <div className=" bg-primary py-10">
      <div className=" container mx-auto flex justify-between items-center">
        <span className=" text-3xl text-white font-bold tracking-tight">
          forgetechsoftware@gmail.com
        </span>
        <span className=" text-white font-bold tracking-tight flex gap-4">
          <p>Privacy Policy</p>
          <p>Terms Of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
