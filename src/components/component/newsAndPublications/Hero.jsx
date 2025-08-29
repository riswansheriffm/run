import NewCarousel from "./NewCarousel";

const Hero = ({ heroSection, eventData }) => {
  return (
    <>
      <div className="h-auto flex flex-col justify-center mt-[35%] md:mt-[20%] lg:mt-[8%] ">
        <div className="flex flex-col lg:flex-row  justify-end  lg:justify-between gap-14 md:gap-20 lg:gap-32 items-center  mx-4 md:mx-[4%] lg:mx-[11%]  ">
          <div className="w-full lg:w-1/2 lg:pt-[64px]  lg:pb-[56px]">
            <div className="flex flex-col gap-4 justify-center items-center">
              <div className=" flex flex-col gap-4 justify-start w-full">
                <div>
                  <hr className="w-[140px] border-t-8 border-gold" />
                </div>
                <p className="md:w-[85%] w-[95%] font-h1 text-darkgray font-black">
                  {heroSection?.left?.title}
                </p>
              </div>
              <p className="font-normal text-[17px] text-gray md:w-[85%] w-[95%] flex justify-start mr-auto">
                {heroSection?.left?.description}
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2  ">
            <div className="flex justify-end flex-row lg:flex-col w-full gap-2 md:gap-8">
              {heroSection?.right?.map((i) => (
                <div className="flex justify-end flex-col w-1/2 lg:w-[80%] lg:ml-auto gap-1 mb-auto">
                  <h4 className=" font-h4 font-bold text-darkgray">
                    {i?.note}
                  </h4>
                  <p className="font-medium font-h6 text-darkgray">{i?.name}</p>
                  <p className="text-gray font-h6 font-normal">{i?.role}</p>
                  <p className="text-gray font-h6 font-normal">
                    {i?.phoneNumber} <span className="text-slate">|</span>{" "}
                    {i?.email}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className=" mx-4  ">
          <NewCarousel eventData={eventData} />
        </div>
      </div>
    </>
  );
};

export default Hero;
