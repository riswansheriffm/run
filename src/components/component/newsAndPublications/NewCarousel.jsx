import { ProgressiveBlur } from "../../../helper/progressiveBlur";
import React, { useState } from "react";
const baseUrl = import.meta.env.VITE_API_IMAGE_BASEURL;

const NewCarousel = ({ eventData = [] }) => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className="w-full overflow-x-auto flex items-center h-[164px] gap-8 px-10 my-6 lg:my-0 justify-start lg:justify-center">
      {eventData?.map((event, index) => {
        const dateObj = new Date(event.date);
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString("default", { month: "short" });
        const year = dateObj.getFullYear();
        const isActive = index === activeIndex;
        const imgSrc = event?.image?.url
          ? baseUrl + event.image.url
          : "/fallback.png";

        return (
          <div
            key={event.id ?? `${event.name}-${index}`}
            onClick={() => setActiveIndex(index)}
            className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
              isActive ? "scale-105" : "opacity-100"
            }`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setActiveIndex(index);
            }}
          >
            {!isActive ? (
              <>
                <div className="flex gap-8 items-center justify-center w-[50px] lg:w-[128px]">
                  <div className="flex items-center justify-center w-full ">
                    <div className="text-center flex flex-col justify-center items-center max-h-[93px] min-h-[93px]">
                      <div className="font-h2 font-bold text-darkgray">
                        {day}
                      </div>
                      <div className="lg:h-[32px]">
                        <div className="text-xs font-medium text-lightgray">
                          {month}
                        </div>
                        <div className="text-xs font-medium text-lightgray">
                          {year}
                        </div>
                      </div>
                    </div>
                  </div>
                  {activeIndex !== index + 1 && (
                    <div className="flex items-center justify-center h-[100px] ">
                      <div className="w-px h-full bg-lightgray/20" />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="relative bg-white shadow-lg rounded-xl overflow-hidden w-[250px] min-w-[250px] md:w-[300px] md:min-w-[300px] h-[126.19px] max-h-[126.19px] md:h-[156.19px] md:max-h-[156.19px] lg:w-[334px] lg:min-w-[334px]">
                {/* Base image */}
                <img
                  src={imgSrc}
                  alt={event.name || "Event image"}
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />

                {/* Progressive blur overlay (backdrop-filter layers) */}
                <ProgressiveBlur bg="rgba(5,5,5,0.7)" />

                {/* Bottom info bar (kept from your layout) */}
                <div className="absolute top-[40%] lg:top-[56%] inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0)_0%,rgba(5,5,5,0.7)_100%)]  text-white h-[60%] lg:h-[44%] flex justify-between items-end w-full px-[8px] lg:px-[12px] pt-[10px] pb-[6px]">
                  <div className="text-sm text-white lg:w-[64px] w-[54px] h-[50px] lg:h-[60px] flex flex-col justify-start mb-2 items-center ">
                    <p className="font-h2 font-bold text-white">{day}</p>
                    <p className="text-xs font-[500] text-white">{month}</p>
                    <p className="text-xs font-[500] text-white">{year}</p>
                  </div>
                  <div className="w-px h-[100%] bg-white opacity-10" />
                  <div className="flex flex-col gap-1 ">
                    <h3 className="font-normal font-h6 leading-snug truncate max-w-[20ch] lg:max-w-[54ch]">
                      {event.name}
                    </h3>
                    <p className="text-sm font-light flex gap-1 items-center">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M11.4217 19.3486L11.1082 20.3782C7.0706 20.0221 4.70898 17.2666 4.70898 14.5836V13.8544C4.70898 12.6463 5.68836 11.6669 6.89648 11.6669H13.5164C11.9131 12.7959 10.8657 14.6612 10.8657 16.7711C10.8657 17.6885 11.0644 18.5619 11.4217 19.3486ZM12.0007 2.18774C14.2155 2.18774 16.0111 3.98327 16.0111 6.19816C16.0111 8.41305 14.2155 10.2086 12.0007 10.2086C9.78576 10.2086 7.99023 8.41305 7.99023 6.19816C7.99023 3.98327 9.78576 2.18774 12.0007 2.18774ZM22.209 16.7711C22.209 19.59 19.9238 21.8752 17.1048 21.8752C16.2069 21.8752 15.3632 21.6434 14.6302 21.2363L12.6005 21.8539C12.2453 21.962 11.9134 21.63 12.0215 21.2749L12.6395 19.2455C12.2324 18.5125 12.0007 17.6689 12.0007 16.7711C12.0007 13.9521 14.2859 11.6669 17.1048 11.6669C19.9238 11.6669 22.209 13.9521 22.209 16.7711ZM15.6465 14.5836C15.2438 14.5836 14.9173 14.91 14.9173 15.3127C14.9173 15.7155 15.2438 16.0419 15.6465 16.0419H18.5632C18.9659 16.0419 19.2923 15.7155 19.2923 15.3127C19.2923 14.91 18.9659 14.5836 18.5632 14.5836H15.6465ZM14.9173 18.2294C14.9173 18.6321 15.2438 18.9586 15.6465 18.9586H17.1048C17.5075 18.9586 17.834 18.6321 17.834 18.2294C17.834 17.8267 17.5075 17.5002 17.1048 17.5002H15.6465C15.2438 17.5002 14.9173 17.8267 14.9173 18.2294Z"
                            fill="#C9C9C9"
                          />
                        </svg>
                      </span>
                      <span className="text-xs text-white/70 font-normal">
                        {event.host}
                      </span>
                    </p>
                    <p className="text-sm font-light flex gap-1 items-center">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 20 21"
                          fill="none"
                        >
                          <path
                            d="M10 1.50024C14.1421 1.50024 17.5 4.85811 17.5 9.00024C17.5 12.1046 15.1337 15.3583 10.5 18.8336C10.2037 19.0558 9.7963 19.0558 9.5 18.8336C4.86634 15.3583 2.5 12.1046 2.5 9.00024C2.5 4.85811 5.85786 1.50024 10 1.50024ZM10 6.50024C8.61929 6.50024 7.5 7.61953 7.5 9.00024C7.5 10.381 8.61929 11.5002 10 11.5002C11.3807 11.5002 12.5 10.381 12.5 9.00024C12.5 7.61953 11.3807 6.50024 10 6.50024Z"
                            fill="#C9C9C9"
                          />
                        </svg>
                      </span>
                      <span className="text-xs text-white/70">
                        {event.location}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NewCarousel;
