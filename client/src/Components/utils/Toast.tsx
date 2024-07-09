import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  let style =
    "flex justify-center items-center shadow-md bg-white fixed top-4 right-4 p-2 rounded ";
  style += type === "SUCCESS" ? "text-green-400 " : "text-red-400";
  return (
    <div className={style}>
      <div className=" font-semibold">{message}</div>
    </div>
  );
};

export default Toast;
