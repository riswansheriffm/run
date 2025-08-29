import { formatNewLines } from "../../../helper/formatNewLines";
import { useState } from "react";

const CommonFaq = ({
  title,
  description,
  faqs = [],
  itemsPerPage = 5,
  showPagination = false,
}) => {
  const [activeId, setActiveId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(faqs.length / itemsPerPage);

  const visibleFaqs = showPagination
    ? faqs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : faqs;

  const toggleAccordion = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  const handlePageChange = (pageNum) => {
    const newFaqs = faqs.slice(
      (pageNum - 1) * itemsPerPage,
      pageNum * itemsPerPage
    );
    setCurrentPage(pageNum);
    setActiveId(newFaqs[0]?.id || null); // open first on page change
  };

  return (
    <div className="w-full p-4 space-y-6">
      {(title || description) && (
        <div className="mb-8">
          {title && (
            <h1 className="font-h3 font-bold text-darkgray">{title}</h1>
          )}
          {description && (
            <p className="text-gray font-normal text-sm mt-1">{description}</p>
          )}
        </div>
      )}

      <div className="space-y-2">
        {visibleFaqs.map((item, index) => (
          <div
            key={item.id}
            className="border-b border-lightgray/20 rounded-md"
          >
            <button
              onClick={() => toggleAccordion(item.id)}
              className="w-full text-left py-3 flex items-start justify-between font-medium text-black/85 cursor-pointer"
            >
              <div className="flex gap-4">
                <span className="text-lightgray font-normal text-sm">
                  {String(
                    showPagination
                      ? (currentPage - 1) * itemsPerPage + index + 1
                      : index + 1
                  ).padStart(2, "0")}
                </span>
                <p className="text-darkgray font-h6">{item.question}</p>
              </div>
              <i
                className={`fa fa-chevron-${
                  activeId === item.id ? "up" : "down"
                } text-sm pt-1`}
              ></i>
            </button>
            {activeId === item.id && (
              <div className="pl-10 pb-3 text-gray font-h6">
                {formatNewLines(item.answer) || "Answer will be updated soon."}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Number Navigation (if enabled) */}
      {showPagination && totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`w-8 h-8 rounded-full font-medium text-sm ${
                currentPage === index + 1
                  ? "bg-brown text-white"
                  : "bg-lightgray text-brown"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommonFaq;
