import { useRef, useState, useEffect } from "react";
import defaultImage from "../../../assets/logo.png";
const baseUrl = import.meta.env.VITE_API_IMAGE_BASEURL;

const OurMandate = (data) => {
  const filteredData = data?.data?.ourMandate;

  const items = filteredData?.items || [];

  const scrollRef = useRef(null);
  const isClickScroll = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [isScrollable, setIsScrollable] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else if (window.innerWidth < 1280) setItemsPerView(3);
      else setItemsPerView(4);
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Scroll listener for updating currentIndex
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

  // Determine if scroll is needed and calculate total pages
  const calculatePagination = () => {
    const container = scrollRef.current;
    if (container) {
      const fullScrollWidth = container.scrollWidth;
      const containerWidth = container.offsetWidth;

      const scrollNeeded = fullScrollWidth > containerWidth;
      setIsScrollable(scrollNeeded);

      const pages = Math.ceil(fullScrollWidth / containerWidth);
      setTotalPages(pages);
    }
  };

  useEffect(() => {
    calculatePagination();
    window.addEventListener("resize", calculatePagination);
    return () => window.removeEventListener("resize", calculatePagination);
  }, [items]);

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
    }, 500);
  };

  return (
    <div className="bg-lightBrown ">
      <div className="mx-4 lg:ml-[10%] py-4 lg:pb-[32px] lg:pt-[48px]">
        <div className="mb-8">
          <h2 className="font-bold text-brown mb-2 font-h2">
            {filteredData?.title}
          </h2>
          <p className="font-h6 text-gray font-normal">
            {filteredData?.description}
          </p>
        </div>

        <div className="relative">
          <div
            className="flex overflow-x-auto no-scrollbar scroll-smooth gap-6  snap-x snap-mandatory"
            ref={scrollRef}
          >
            {items.map((i, idx) => (
              <div
                key={idx}
                className="bg-white shadow-[0_2px_6px_-6px_rgba(34,11,3,0.08),0_0_2px_0_rgba(34,11,3,0.08)] rounded-xl w-[250px] min-h-[280px] flex-shrink-0 p-4 snap-start"
              >
                <div className="h-[80px] flex justify-center items-center mb-4 rounded-xl">
                  <img
                    src={baseUrl + i?.image?.url || defaultImage}
                    alt={i?.title}
                    className="max-h-full object-cover w-full"
                  />
                </div>
                <div className="text-brown font-bold text-[18px] mb-2">
                  {i?.title}
                </div>
                <div className="text-gray font-h6">{i?.description}</div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          {isScrollable && totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full cursor-pointer transition-colors duration-300 ${
                    currentIndex === idx ? "bg-brown" : "bg-gray-300"
                  }`}
                  onClick={() => scrollToIndex(idx)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OurMandate;
