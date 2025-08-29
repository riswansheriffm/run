import InfoCard from "../../../components/ui/card/InfoCard";
import { useState, useEffect } from "react";

const LatestNews = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setCardsPerView(4);
      else if (window.innerWidth >= 768) setCardsPerView(2);
      else setCardsPerView(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(data.length / cardsPerView);
  const translateXPercent = -(currentIndex * (100 / totalSlides));

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="my-4 mx-4 lg:mx-[8%] py-[2%]">
      <h2 className="font-h2 font-bold text-brown text-center ">Latest News</h2>

      <div
        className="bg-lightBrown  h-[388px]"
        style={{
          clipPath: "polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)",
        }}
      >
        <div className="overflow-hidden  relative">
          <div
            className="flex  items-center h-[350px] lg:h-[360px]  transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(${translateXPercent}%)`,
              width: `${(data.length * 100) / cardsPerView}%`,
            }}
          >
            {data.map((item, index) => (
              <div
                key={item.id}
                className={`flex items-center h-[257px] justify-center lg:p-4 ${
                  index !== data.length - 1
                    ? "border-r-2 border-lightgray/20"
                    : ""
                }`}
                style={{
                  flex: `0 0 ${100 / data.length}%`,
                  maxWidth: `${100 / cardsPerView}%`,
                }}
              >
                <InfoCard
                  imageSrc={item?.file}
                  title={item?.title}
                  description={item?.description}
                  link={item?.link}
                  className="w-full lg:w-[212px] min-h-[289px] gap-4 flex flex-col  p-6 lg:p-0 "
                  textSize="lg:text-base text-sm"
                  desClassName="line-clamp-2 max-h-[34px] "
                  cardContainerClassName="p-0  justify-between"
                  imgClassName="w-full lg:w-[212px] lg:h-[116px] pt-6 lg:pt-0 "
                  name="View Now"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full border-none cursor-pointer transition-colors duration-200 ${
                  index === currentIndex
                    ? "bg-brown"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestNews;
