import { useEffect, useRef, useState } from "react";
import UnderlineLink from "../../../components/ui/button/UnderlineLink";

const HistoryAndLegacy = (data) => {
  const filteredData = data?.data?.historyLegacy;
  const items = filteredData?.items || [];

  const scrollRef = useRef(null);
  const isClickScroll = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  // Responsive item count
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Scroll index updater
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isClickScroll.current) return;

      const scrollLeft = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      const index = Math.round(scrollLeft / containerWidth);
      setCurrentIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate total pages using real scroll width
  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      const pages = Math.ceil(container.scrollWidth / container.offsetWidth);
      setTotalPages(pages);
    }
  }, [items, itemsPerView]);

  const scrollToIndex = (index) => {
    const container = scrollRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    isClickScroll.current = true;

    container.scrollTo({
      left: index * containerWidth,
      behavior: "smooth",
    });

    setCurrentIndex(index);

    setTimeout(() => {
      isClickScroll.current = false;
    }, 400);
  };

  return (
    <div className="mx-4 lg:ml-[8%] py-4 lg:py-[40px] ">
      {/* Header Section */}
      <div className="lg:w-[40%] mb-2 lg:mb-12">
        <h2 className="font-h2 font-bold text-brown mb-4">
          {filteredData?.title}
        </h2>
        <p className="text-gray font-normal mb-4 leading-relaxed font-h6">
          {filteredData?.description}
        </p>
        <UnderlineLink
          name={filteredData?.link?.text}
          href={filteredData?.link?.link}
        />
      </div>

      {/* Carousel Section */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar scroll-smooth gap-2 lg:gap-10   snap-x snap-mandatory"
        >
          {items.map((i, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`cursor-pointer w-[339px] text-center rounded-4xl flex-shrink-0 transition-opacity duration-300 snap-start ${
                hoveredIndex === idx || (hoveredIndex === null && idx === 0)
                  ? "opacity-100"
                  : "opacity-50"
              }`}
            >
              {/* Timeline Header */}
              <div className="relative flex flex-col items-center ">
                <div className="flex items-center w-full lg:mb-4">
                  <span className="text-darkgray text-xl font-semibold w-full ">
                    {i?.year}
                  </span>
                  {idx !== items.length - 1 && (
                    <div className="border-1 border-dashed absolute w-[90%] -right-40 lg:-right-41"></div>
                  )}
                </div>
                <div className="w-6 h-6 bg-brown rounded-full mt-1 border-4 border-white z-10" />
              </div>

              {/* Card Body */}
              <div className="mt-[-10px] p-[16px] w-[309px] lg:w-full lg:h-16 rounded-t-[29px] bg-brown text-white text-center font-medium lg:text-lg">
                {i?.title}
              </div>
              <div className="min-h-[232px] w-[309px] lg:min-w-[339px] rounded-b-4xl bg-brown">
                <div className="h-[228px] bg-white mx-1 rounded-t-[29px] rounded-b-[29px]">
                  <div className="text-gray text-sm p-2 lg:px-4 lg:py-[8px] flex flex-col justify-between h-full rounded-[29px]">
                    {[i?.items?.item1, i?.items?.item2, i?.items?.item3].map(
                      (item, iidx) =>
                        item && (
                          <p
                            key={iidx}
                            className="lg:font-h6 font-normal text-gray border-b border-lightgray/40 pb-[16px] pt-[16px] last:border-none border-dashed overflow-hidden
                            "
                          >
                            {item}
                          </p>
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 cursor-pointer rounded-full transition-colors duration-300 ${
                  currentIndex === idx ? "bg-brown" : "bg-gray-300"
                }`}
                onClick={() => scrollToIndex(idx)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryAndLegacy;
