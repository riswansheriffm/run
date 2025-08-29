const baseUrl = import.meta.env.VITE_API_IMAGE_BASEURL;

const OurMission = (data) => {
  const filteredData = data?.data?.visionMission;

  return (
    <>
      <div className="mx-4 lg:mx-[8%] py-4 lg:pb-[24px] lg:pt-[56px] flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-48">
        <div className="lg:w-1/2 w-full">
          <div className="lg:w-2/3 w-full">
            <div className="">
              <h2 className="font-bold  text-darkgray font-h3">
                {filteredData?.ourMission?.title}
              </h2>
            </div>
            <div className=" ">
              <p className="text-gray font-normal font-h6 pt-2">
                {filteredData?.ourMission?.description}
              </p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full ">
          <div className="  flex md:hidden flex-col  justify-between gap-4 pb-8">
            <div className="flex justify-start">
              <hr className="w-[20%] border-t-8 border-gold" />
            </div>
            <h1 className="font-medium  text-darkgray text-[12px]">
              {filteredData?.ourVision?.title}
            </h1>
            <p className=" font-h6 font-normal text-gray">
              {filteredData?.ourVision?.description}
            </p>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-3 grid-rows-6 gap-2 ">
              <div className="row-span-3 self-center hidden md:flex flex-col gap-4 text-right justify-end  h-full ">
                <div className=" ml-auto flex flex-col md:gap-4 lg:gap-2 2xl:gap-4 justify-between ">
                  <div className="flex justify-end">
                    <hr className="w-[26px] border-t-4 border-gold" />
                  </div>
                  <div className="flex flex-col gap-2 px-[16px] ">
                    <p className="font-medium  text-xs text-darkgray uppercase">
                      {filteredData?.ourVision?.title}
                    </p>
                    <p className="md:text-sm lg:w-[95%] ml-auto text-xs font-normal text-gray">
                      {filteredData?.ourVision?.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="row-span-3 col-start-1 row-start-4 self-end mb-1 md:mb-3 lg:mb-3">
                {/* mid 1 */}
                <img
                  className="rounded-lg"
                  src={baseUrl + filteredData?.ourVision?.images[2]?.url}
                ></img>
              </div>
              <div className="row-span-4 col-start-2 row-start-1">
                {/* start 2 */}
                <img
                  className="rounded-lg "
                  src={baseUrl + filteredData?.ourVision?.images[4]?.url}
                ></img>
              </div>
              <div className="row-span-2 col-start-3 row-start-1 ">
                {/* mid 2 */}
                <img
                  className="rounded-lg"
                  src={baseUrl + filteredData?.ourVision?.images[1]?.url}
                ></img>
              </div>
              <div className="col-span-2 row-span-2 col-start-2 row-start-5">
                {/* last 2 and 3 */}
                <img
                  className="rounded-lg"
                  src={baseUrl + filteredData?.ourVision?.images[0]?.url}
                ></img>
              </div>
              <div className="row-span-2 col-start-3 row-start-3 ">
                {/* last 2 */}
                <img
                  className="rounded-lg"
                  src={baseUrl + filteredData?.ourVision?.images[3]?.url}
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurMission;
