import { useLocation } from "react-router-dom";
import Translator from "../translator/Translator";
import { useRef } from "react";

const TopNav = ({ quickLinks, theme }) => {
  const navRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Text colors depend on page
  const textColor = isHomePage ? "text-darkgray" : "text-white";
  const rawColor = isHomePage ? "#333" : "#ffffff";

  return (
    <div
      ref={navRef}
      className={`flex justify-center md:justify-end items-center gap-[12px] p-1 mx-4 lg:mx-[8%] ${textColor}`}
    >
      <a
        href={`mailto:${quickLinks?.email}`}
        className="text-[10px] md:text-[12px] font-normal"
      >
        {quickLinks?.email}
      </a>

      <span className="h-4 border-l border-gray-300"></span>

      <a
        href={`tel:${quickLinks?.phoneNumber}`}
        className="text-[10px] md:text-[12px] font-normal"
      >
        {quickLinks?.phoneNumber}
      </a>

      {quickLinks?.IsLanguageSwitchNeeded && (
        <>
          <span className="h-4 border-l border-gray-300 text-[10px] md:text-[12px]"></span>
          <Translator isHomePage={isHomePage} themeColor={rawColor} />
        </>
      )}
    </div>
  );
};

export default TopNav;
