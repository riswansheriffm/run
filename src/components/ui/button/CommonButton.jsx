import React from "react";
const baseUrl = import.meta.env.VITE_API_IMAGE_BASEURL;

const CommonButton = ({
  children,
  onClick,
  type = "button",
  className = "px-4  font-medium",
  disabled = false,
  icon = null,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={` rounded-lg bg-brown text-white text-[12px] md:text-[18px]   flex items-center cursor-pointer gap-3 ${className}`}
    >
      {icon && <img src={baseUrl + icon} alt="icon" className="w-5 h-5" />}
      {children}
    </button>
  );
};

export default CommonButton;
