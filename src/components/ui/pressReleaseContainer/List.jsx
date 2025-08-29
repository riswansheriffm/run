import { useEffect, useState } from "react";
import Card from "./Card";

const List = ({
  releases,
  onCardSelect,
  selectedId,
  navigationItemsPerPage = 6,
  underLineNeeded = false,
  paginationNeeded = true,
  downloadNeeded = true,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = navigationItemsPerPage;

  const totalPages = Math.ceil(releases?.length / itemsPerPage);

  const pageLimit = 6;
  // const totalBatches = Math.ceil(totalPages / pageLimit);
  const currentBatch = Math.floor((currentPage - 1) / pageLimit);
  const startPage = currentBatch * pageLimit + 1;
  const endPage = Math.min(startPage + pageLimit - 1, totalPages);

  useEffect(() => {
    setCurrentPage(1);
  }, [releases]);

  const paginatedItems = releases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCardClick = (item) => {
    if (onCardSelect) {
      onCardSelect(item); // Send selected card to parent
    }
  };

  //completed
  return (
    <div>
      {/* Render the 6 cards */}
      <div className={` ${paginationNeeded && "mb-4"} `}>
        {paginatedItems.map((item, index) => {
          const isSelected = selectedId === item.id;
          return (
            <div
              className={isSelected ? "bg-lightgray/10 rounded-md" : ""}
              key={item.id}
              onClick={() => handleCardClick(item)}
            >
              <Card
                key={item?.id}
                title={item?.title}
                index={index}
                date={item?.month}
                description={item?.description}
                file={item?.file}
                data={item}
                code={item?.code}
                underLineNeeded={underLineNeeded}
                downloadNeeded={downloadNeeded}
                paginatedItems={paginatedItems}
              />
            </div>
          );
        })}
      </div>

      {paginationNeeded && (
        <div className="flex justify-center mt-3 gap-2">
          {/* Left Arrow (Batch Scroll Left) */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 text-sm rounded cursor-pointer ${
              currentPage === 1 ? "opacity-30 cursor-not-allowed" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 27 28"
              fill="none"
              className="text-gray"
            >
              <path
                d="M16.7672 5.66775C17.2731 6.13751 17.3024 6.92842 16.8327 7.43431L10.9558 13.6671L16.8327 19.8998C17.3024 20.4057 17.2731 21.1967 16.7672 21.6664C16.2613 22.1362 15.4704 22.1069 15.0007 21.601L8.33401 14.5176C7.88866 14.038 7.88866 13.2961 8.33401 12.8165L15.0007 5.73318C15.4704 5.22729 16.2613 5.198 16.7672 5.66775Z"
                fill="currentColor"
              />
            </svg>
          </button>

          {/* Page Numbers for Current Batch */}
          {Array.from({ length: endPage - startPage + 1 }, (_, idx) => {
            const page = startPage + idx;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-3 font-h6 font-normal rounded-[8.3px] cursor-pointer ${
                  currentPage === page
                    ? "bg-[rgba(85,85,85,0.08)] text-darkgray"
                    : "text-lightgray bg-white"
                }`}
              >
                {page}
              </button>
            );
          })}

          {/* Right Arrow (Batch Scroll Right) */}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-1 text-sm rounded cursor-pointer ${
              currentPage === totalPages ? "opacity-30 cursor-not-allowed" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 27 28"
              fill="none"
              className="text-gray"
            >
              <path
                d="M9.23245 5.66775C8.72656 6.13751 8.69727 6.92842 9.16702 7.43431L15.0439 13.6671L9.16702 19.8998C8.69727 20.4057 8.72656 21.1967 9.23245 21.6664C9.73834 22.1362 10.5293 22.1069 10.999 21.601L17.6657 14.5176C18.111 14.038 18.111 13.2961 17.6657 12.8165L10.999 5.73318C10.5293 5.22729 9.73834 5.198 9.23245 5.66775Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default List;
