const baseUrl = import.meta.env.VITE_API_IMAGE_BASEURL;

const Quote = ({ data }) => {
  return (
    <>
      <div className="relative px-[3%] py-[0%] lg:p-[4%] lg:py-14 lg:pb-0 flex justify-center">
        {/* Centered Quote Box with relative for inner positioning */}
        <div className="relative w-full lg:w-[40%] text-center">
          {/* Top-left image inside the quote box */}
          <div className="absolute -top-10 lg:-top-14 -left-0 lg:-left-12 z-0">
            <img
              src={baseUrl + data?.icon?.url}
              alt="Icon"
              className="w-[80%] lg:w-full "
            />
          </div>

          {/* Quote and person details */}
          <h4 className=" italic text-darkgray font-p z-50 font-normal">
            {data?.Quote}
          </h4>
          <p className="mt-4 font-h6 font-bold text-gray">{data?.name}</p>
          <p className="font-h6 text-lightgray font-normal">{data?.role}</p>
        </div>
      </div>
    </>
  );
};

export default Quote;
