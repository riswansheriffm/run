import { useEffect, useState } from "react";

const ExchangeRate = ({ data }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className=" mx-4 lg:mx-[10%] py-4  lg:py-2 px-1  ">
        <div className="w-full lg:w-1/2 my-[2%] p-4 lg:p-0">
          <h1 className="text-darkgray font-bold font-h3">{data?.title}</h1>
          <p className="font-h6 text-gray font-normal">{data?.description}</p>
        </div>
        <div className="w-full ">
          <div className="grid grid-cols-2 grid-rows-3 md:grid-cols-3 md:grid-rows-3 lg:grid-cols-6 lg:grid-rows-1   md:gap-[8px]">
            {data?.exchangeRates?.map((i, index) => (
              <div
                key={i?.name}
                className={`w-full flex flex-col gap-2 px-4 py-2 lg:p-0`}
              >
                <div>
                  <h4 className="font-bold text-[16px] lg:text-[20px] uppercase text-darkgray">
                    {i?.name}
                  </h4>
                </div>
                <div className="flex items-center gap-[34px] md:gap-[60px] lg:gap-[50px]">
                  <div className="">
                    {/* Buy Section */}
                    <div className="flex items-center justify-evenly gap-[8px]">
                      <span className="text-lightgray w-10 font-h4 font-normal">
                        Buy
                      </span>

                      <span className="text-darkgray text-[17px] font-normal text-right min-w-14 relative">
                        {i?.buy}

                        {/* SVG positioned at top right */}
                        <span
                          className={`absolute  text-xs ${
                            i?.buyArrow === "up"
                              ? "text-green-500 -top-1 -right-4"
                              : "text-red-500  bottom-0 -right-4"
                          }`}
                        >
                          {i?.buyArrow === "up" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 21 21"
                              fill="none"
                            >
                              <path
                                d="M7.26962 5.65832C5.78477 5.65832 5.04117 7.45356 6.09111 8.5035L12.8293 15.2417C13.8792 16.2916 15.6744 15.548 15.6744 14.0631V8.15832C15.6744 6.77761 14.5552 5.65832 13.1744 5.65832H7.26962Z"
                                fill="#54BB44"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 21 20"
                              fill="none"
                            >
                              <path
                                d="M15.6744 6.60311C15.6744 5.11827 13.8792 4.37466 12.8293 5.4246L6.09111 12.1628C5.04117 13.2127 5.78477 15.0079 7.26962 15.0079H13.1744C14.5552 15.0079 15.6744 13.8886 15.6744 12.5079V6.60311Z"
                                fill="#C64141"
                              />
                            </svg>
                          )}
                        </span>
                      </span>
                    </div>

                    {/* Sell Section */}
                    <div className="flex items-center justify-evenly gap-[8px] relative">
                      <span className=" text-lightgray w-10 font-h4 font-normal">
                        Sell
                      </span>
                      <span className="text-darkgray text-[17px] font-normal text-right min-w-14 ">
                        {i?.sell}
                      </span>
                      <span
                        className={`text-xs absolute ${
                          i?.sellArrow === "up"
                            ? "text-green-500 -top-1 -right-4"
                            : "text-red-500  bottom-0 -right-4"
                        }`}
                      >
                        {i?.sellArrow === "up" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 21 21"
                            fill="none"
                          >
                            <path
                              d="M7.26962 5.65832C5.78477 5.65832 5.04117 7.45356 6.09111 8.5035L12.8293 15.2417C13.8792 16.2916 15.6744 15.548 15.6744 14.0631V8.15832C15.6744 6.77761 14.5552 5.65832 13.1744 5.65832H7.26962Z"
                              fill="#54BB44"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 21 20"
                            fill="none"
                          >
                            <path
                              d="M15.6744 6.60311C15.6744 5.11827 13.8792 4.37466 12.8293 5.4246L6.09111 12.1628C5.04117 13.2127 5.78477 15.0079 7.26962 15.0079H13.1744C14.5552 15.0079 15.6744 13.8886 15.6744 12.5079V6.60311Z"
                              fill="#C64141"
                            />
                          </svg>
                        )}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`
    w-px bg-gray-300
    ${
      windowWidth >= 1156
        ? index === data?.exchangeRates.length - 1
          ? null
          : "h-[40px]"
        : windowWidth >= 768 && windowWidth < 1156
        ? (index + 1) % 3 === 0
          ? "md:h-0"
          : "h-[40px]"
        : (index + 1) % 2 === 0
        ? "sm:h-0"
        : "h-[40px]"
    }
  `}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-px bg-white lg:bg-lightgray/30 mt-[16px]"></div>
      </div>
    </>
  );
};

export default ExchangeRate;
