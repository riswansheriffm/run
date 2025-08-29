import UnderlineLink from "../../../components/ui/button/UnderlineLink";

import { useState } from "react";
import logo from "../../../assets/profile.png";
const baseUrl = import.meta.env.VITE_API_IMAGE_BASEURL;
import styles from "./styles.module.css";

const BoardOfDirectors = (data) => {
  const filteredData = data?.data?.boardOfDirectors;
  const directors = filteredData?.items || [];
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Active index logic: use hovered index if hovering, otherwise use first item (0)
  const activeIndex = hoveredIndex !== null ? hoveredIndex : 0;

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className=" py-12 lg:pb-[24px] lg:pt-[56px] mx-4 lg:ml-[8%]">
      {/* Header Section */}
      <div className="lg:w-1/2 mb-4 lg:mb-8">
        <h2 className="font-h2 font-bold text-brown mb-2">
          {filteredData?.title || "Board of Directors"}
        </h2>
        <p className="text-gray font-normal mb-2 leading-relaxed font-h6">
          {filteredData?.description ||
            "Under Article 161(2) of the 1995 Constitution of Uganda, the authority of the Bank of Uganda is vested in its Board of Directors. The Board is a unitary governing body responsible for the overall management, strategic direction, and long-term success of the Bank."}
        </p>
        <UnderlineLink
          name={filteredData?.link?.text}
          href={filteredData?.link?.link}
        />
      </div>

      {/* Carousel */}
      <div className="relative pt-4">
        <div className="mb-4 overflow-x-auto no-scrollbar">
          <div className="flex items-end gap-4 min-w-max">
            {directors.map((director, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative cursor-pointer transition-all duration-300 ease-in-out 
    ${isActive ? "w-[250px] lg:w-[306px]" : "w-[100px] lg:w-[166px]"} 
    h-[402px] flex-shrink-0 `}
                >
                  {/* Hexagonal clipped container */}
                  <div
                    style={{
                      clipPath:
                        "polygon(20% 0%, 89% 0, 100% 5%, 100% 80%, 100% 100%, 9% 100%, 0 96%, 0 0)",
                    }}
                    className={`w-full h-full relative overflow-hidden shadow-lg rounded-2xl `}
                  >
                    {/* Base Background Image */}
                    <img
                      src={baseUrl + director?.image?.url || logo}
                      alt={director?.name || `Director ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Blurred Duplicate Overlay (bottom 20% only with gradient mask) */}
                    {isActive && (
                      <img
                        src={baseUrl + director?.image?.url || logo}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover "
                      />
                    )}

                    {/* Text Content */}
                    {isActive && (
                      <>
                        <div
                          className={` absolute bottom-0 left-0 right-0 p-6 text-white text-center from-black/60 to-transparent backdrop-blur-xs rounded-br-2xl 
            [mask-image:linear-gradient(to_top,rgba(0,0,0,1)_60%,rgba(0,0,0,0)_100%)]
                            `}
                        >
                          <div className=" w-full ">
                            <h3 className="font-bold mb-2 text-2xl">
                              {director?.name || `Director ${index + 1}`}
                            </h3>
                            <p className="text-sm opacity-90 font-normal text-slate">
                              {director?.description || "Board Member"}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot Navigation */}
        <div className="flex justify-center space-x-3">
          {directors.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                activeIndex === index
                  ? "bg-brown scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`View director ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardOfDirectors;
