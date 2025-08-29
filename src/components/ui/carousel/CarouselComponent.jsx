import { useEffect, useRef, useState, useCallback } from "react";
import CommonButton from "../button/CommonButton";
const baseUrl = import.meta.env.VITE_API_IMAGE_BASEURL;

const CarouselComponent = ({
  slides = [],
  imageBaseUrl = baseUrl,
  duration = 5000,
  showOverlay = true,
  overlayTextColor = "text-white",
  isCompactLayout = false, // NEW PROP
  isButtonNeeded = false,
  isGridNeeded = false,
  widthFull = false,
  font = "black",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const goToNextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const startAutoSlide = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goToNextSlide, duration);
  }, [goToNextSlide, duration]);

  useEffect(() => {
    if (slides.length > 1) startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, [startAutoSlide, slides.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    startAutoSlide();
  };

  if (!slides.length) return null;

  return (
    <div className="relative w-full overflow-hidden ">
      <div
        className={`relative ${
          isCompactLayout
            ? "h-[340px] lg:h-[472px] rounded-4xl overflow-hidden  mx-[4%] md:mx-[2%] mt-[29%] md:mt-[15%] lg:mx-[8%] lg:mt-[8%] "
            : "h-[506px] md:h-[611px] lg:h-[612px] "
        }`}
      >
        <img
          src={
            slides[currentIndex]?.image?.url
              ? imageBaseUrl + slides[currentIndex].image.url
              : imageBaseUrl + slides[currentIndex]?.backgroundImage?.url
          }
          // src={bg}
          alt={slides[currentIndex]?.title}
          className="w-full h-full object-cover object- transition duration-500"
        />

        {showOverlay && (
          <div
            className={`absolute inset-0 
              ${
                isCompactLayout
                  ? "  bg-[linear-gradient(90deg,_#291106_-6.21%,_rgba(77,36,18,0)_121.26%)] "
                  : "bg-[linear-gradient(90deg,_rgba(24,22,21,0.82)_-6.39%,_rgba(24,22,21,0.578699)_49.8%,_rgba(24,22,21,0)_121.27%)]"
              } flex items-center  justify-start px-4 ${
              isCompactLayout
                ? "lg:px-[32px] "
                : "lg:px-[8%] items-end-safe pb-[5%]"
            }   ${overlayTextColor}`}
          >
            <div className="flex flex-col gap-10 lg:pt-[48px] ">
              <div
                className={`${
                  isCompactLayout
                    ? "lg:min-h-80 max-w-[300px] md:max-w-[631px]"
                    : `lg:min-h-80   ${
                        widthFull
                          ? "w-full lg:px-8"
                          : "max-w-[300px] md:max-h-[352px] md:min-h-[352px] md:max-w-[468px] md:min-w-[468px]  lg:pt-12 items-start shrink-0 justify-center lg:mx-8"
                      }`
                }  flex flex-col justify-end  gap-4 `}
              >
                {slides[currentIndex]?.subTitle ? (
                  <div className="flex items-center gap-4 ">
                    <hr className={`w-3  border-t-8  border-gold`} />
                    <p className="text-gold text-[12px]/4 font-medium uppercase ">
                      {slides[currentIndex]?.subTitle}
                    </p>
                  </div>
                ) : (
                  <hr
                    className={`${
                      isGridNeeded ? "w-[140px]" : `w-[140px] `
                    } border-t-8 lg:border-t-[8px] border-gold`}
                  />
                )}
                <h1
                  className={`font-${font}   w-[100%]  ${
                    isCompactLayout ? "font-h1" : "font-h1"
                  } font-h1 md:w-[100%]`}
                >
                  {slides[currentIndex]?.title}
                </h1>
                {!isGridNeeded && (
                  <p
                    className={`text-[14px] lg:text-[17px] font-normal md:w-lg ${
                      isCompactLayout ? "text-white/70 " : " text-white/70"
                    }`}
                  >
                    {slides[currentIndex]?.description}
                  </p>
                )}
                {isGridNeeded && (
                  <div className={"lg:flex lg:gap-[20%]"}>
                    <div className="flex flex-col gap-4 lg:gap-6 ">
                      <div>
                        <p className="text-sm lg:text-[17px] text-slate">
                          {slides[0]?.descriptionOne}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm lg:text-[17px] text-slate">
                          {slides[0]?.descriptionTwo}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 lg:gap-6 lg:relative lg:-top-6">
                      <div>
                        <p className="text-sm lg:text-[17px] text-slate">
                          {slides[0]?.descriptionThree}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm lg:text-[17px] text-slate">
                          {slides[0]?.descriptionFour}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {isButtonNeeded && (
                  <div>
                    <CommonButton className="px-4 h-[38px] lg:h-[48px] font-[700] font-['Helvetica_Neue']">
                      Explore More
                    </CommonButton>
                  </div>
                )}
              </div>
              {slides?.length > 1 && (
                <div
                  className={`flex justify-start items-center space-x-2 ${
                    isCompactLayout ? "lg:px-1" : "lg:px-8"
                  } `}
                >
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`relative h-2 rounded-full overflow-hidden transition-all duration-300 cursor-pointer ${
                        currentIndex === index ? "w-8" : "w-2"
                      } bg-white/30`}
                    >
                      {currentIndex === index && (
                        <div
                          className="absolute left-0 top-0 h-full bg-white cursor-pointer"
                          style={{
                            width: "100%",
                            animation: `progressSlide ${duration}ms linear`,
                          }}
                        ></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes progressSlide {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default CarouselComponent;
