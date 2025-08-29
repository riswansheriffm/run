import { useEffect, useRef, useState } from "react";

const Category = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  mainCategory = false,
  justifyContent = "start",
  isAllNeeded = true,
}) => {
  const scrollRef = useRef();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const container = scrollRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft + container.clientWidth < container.scrollWidth
      );
    }
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -180 : 180;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    setTimeout(checkScroll, 300);
  };

  useEffect(() => {
    checkScroll();
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScroll);
      }
    };
  }, []);

  return (
    <div
      className={`relative lg:mt-0 mt-4  w-full flex items-center justify-${justifyContent}  border-b border-gray/15 px-3  `}
    >
      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className={`absolute left-0 z-10 p-2 ${
            !mainCategory && "mb-4"
          } rounded-[13.333px] border-[0.833px] border-[rgba(77,36,18,0.2)] 
         bg-[rgba(255,255,255,0.12)] shadow-[-1.667px_0_5px_0_rgba(56,21,5,0.07)]
         backdrop-blur-[33.33333206176758px] ${
           !canScrollLeft ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
         }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 27 28"
            fill="currentColor"
            className="text-darkgray"
          >
            <path d="M17.1002 5.66751C17.6061 6.13726 17.6354 6.92818 17.1657 7.43407L11.2888 13.6668L17.1657 19.8996C17.6354 20.4055 17.6061 21.1964 17.1002 21.6662C16.5943 22.1359 15.8034 22.1066 15.3337 21.6007L8.66702 14.5174C8.22167 14.0378 8.22167 13.2959 8.66702 12.8163L15.3337 5.73294C15.8034 5.22705 16.5943 5.19776 17.1002 5.66751Z" />
          </svg>
        </button>
      )}

      {mainCategory ? (
        <>
          <div
            ref={scrollRef}
            className="flex overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth pr-4 "
          >
            <div className="flex gap-4   ">
              {(isAllNeeded
                ? ["All", ...(Array.isArray(categories) ? categories : [])]
                : Array.isArray(categories)
                ? categories
                : []
              )?.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative  p-3  whitespace-nowrap cursor-pointer font-h6  ${
                    selectedCategory === category
                      ? "text-darkgray font-normal"
                      : "text-lightgray font-normal"
                  }`}
                >
                  {category}
                  {selectedCategory === category && (
                    <span className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 w-full h-[3px] bg-gold  font-normal" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Category Scrollable Area */}
          <div className="border-b border-gray/15 pb-3 w-full  ">
            <div
              ref={scrollRef}
              className={`flex overflow-x-auto no-scrollbar gap-4 justify-${justifyContent}`}
            >
              {(isAllNeeded
                ? ["All", ...(Array.isArray(categories) ? categories : [])]
                : Array.isArray(categories)
                ? categories
                : []
              )?.map((category) => (
                <button
                  key={category}
                  className={`lg:px-4 px-3 py-2 lg:py-3 whitespace-nowrap lg:h-[36px] lg:min-w-[48px] flex items-center  rounded-full font-h6 cursor-pointer ${
                    selectedCategory === category
                      ? "bg-gold text-white font-medium"
                      : "border border-lightgray/20 font-normal text-lightgray hover:bg-lightgray/5 "
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Right Arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className={`absolute right-0 z-10 p-1 lg:p-2  ${
            !mainCategory && "mb-4"
          } rounded-[8.333px] lg:rounded-[13.333px]  border-[1px] border-[rgba(77,36,18,0.2)] 
         bg-[rgba(255,255,255,0.12)] shadow-[-1.667px_0_5px_0_rgba(56,21,5,0.07)]
         backdrop-blur-[33.33333206176758px] ${
           !canScrollRight ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
         }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 27 28"
            fill="currentColor"
            className="text-darkgray"
          >
            <path d="M9.89749 5.66751C9.3916 6.13726 9.36231 6.92818 9.83206 7.43407L15.7089 13.6668L9.83206 19.8996C9.36231 20.4055 9.3916 21.1964 9.89749 21.6662C10.4034 22.1359 11.1943 22.1066 11.664 21.6007L18.3307 14.5174C18.7761 14.0378 18.7761 13.2959 18.3307 12.8163L11.664 5.73294C11.1943 5.22705 10.4034 5.19776 9.89749 5.66751Z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Category;
