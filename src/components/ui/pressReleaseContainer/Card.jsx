const baseUrl = import.meta.env.VITE_API_IMAGE_BASEURL;

const Card = ({
  title,
  date,
  description,
  file,
  data,
  code,
  underLineNeeded,
  downloadNeeded,
  index,
  paginatedItems,
}) => {
  return (
    <div
    // className={`${
    //   index !== paginatedItems?.length - 1 && "border-b border-gray-200"
    // }  `}
    >
      <div
        className={`w-full  hover:bg-lightgray/10 p-4 m-0 cursor-pointer rounded-2xl `}
      >
        <div className="flex flex-row justify-between lg:gap-4">
          <div className="flex flex-col justify-between w-full ">
            {/* Header: Title and Date */}
            <div className="flex justify-between items-start w-full ">
              {/* <h4 className=" text-xs lg:text-sm font-bold w-[75%] lg:w-[80%] text-brown"> */}
              <h4
                className={`font-h6 font-bold w-[75%] lg:w-[80%] text-brown ${
                  underLineNeeded && "underline"
                }`}
              >
                {title}
              </h4>
              <p className="text-xs text-gray font-normal uppercase">
                {date}
                {data?.year && (
                  <span className="text-sm text-gray font-normal uppercase">
                    {" "}
                    {data?.year}
                  </span>
                )}
              </p>
              {code && (
                <p className="text-[10px] lg:text-xs text-gray font-light">
                  {code}
                </p>
              )}
            </div>

            {/* Body: Description and Download */}
            <div className="flex justify-between items-start ">
              {/* <p className="text-sm text-lightgray font-normal line-clamp-2 max-w-[85%]"> */}
              <p className="text-sm text-gray font-normal line-clamp-2 max-w-[85%]">
                {description}
              </p>
            </div>
          </div>
          {downloadNeeded && (
            <div className="flex items-center justify-center">
              {file && (
                <a
                  href={`${baseUrl}${
                    typeof file === "string" ? file : file?.url ?? ""
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg lg:rounded-[8px] border-[1px] border-[rgba(77,36,18,0.10)] bg-white p-1 lg:p-[5.5px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 lg:w-5 lg:h-5"
                    viewBox="0 0 28 28"
                    fill="none"
                  >
                    <path
                      d="M6.5 22.3335H21.5C22.1904 22.3335 22.75 22.8931 22.75 23.5835C22.75 24.2163 22.2797 24.7393 21.6696 24.8221L21.5 24.8335H6.5C5.80964 24.8335 5.25 24.2739 5.25 23.5835C5.25 22.9507 5.72026 22.4277 6.33038 22.3449L6.5 22.3335H21.5H6.5ZM13.8304 2.34491L14 2.3335C14.6328 2.3335 15.1558 2.80375 15.2386 3.41388L15.25 3.5835V16.3968L19.0087 12.6404C19.4525 12.1966 20.1469 12.1563 20.6362 12.5194L20.7764 12.6404C21.2202 13.0842 21.2606 13.7786 20.8975 14.268L20.7764 14.4082L14.8839 20.3007C14.4401 20.7445 13.7457 20.7848 13.2563 20.4217L13.1161 20.3007L7.22356 14.4082C6.7354 13.92 6.7354 13.1285 7.22356 12.6404C7.66734 12.1966 8.36178 12.1563 8.85113 12.5194L8.99133 12.6404L12.75 16.4002V3.5835C12.75 2.95067 13.2203 2.42768 13.8304 2.34491L14 2.3335L13.8304 2.34491Z"
                      fill="#555555"
                    />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
        {data?.address && (
          <div className="">
            <p className="text-gray font-h6">
              <span className="font-h6">{data?.phoneNumber}</span>
              {"  "}|{"  "}
              <span className="font-h6">{data?.mail || data?.email || ""}</span>
            </p>
            <p className="text-gray font-h6">{data?.address}</p>
          </div>
        )}
      </div>
      {index !== paginatedItems?.length - 1 && (
        <hr className="border-t border-gray-200 mx-3" />
      )}
    </div>
  );
};

export default Card;
