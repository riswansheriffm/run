import NewCarousel from "../newsAndPublications/NewCarousel";

const Hero = ({ hero, eventData, isEventSliderNeeded }) => {
  return (
    <>
      <div className="h-auto flex flex-col justify-center mt-[35%] md:mt-[20%] lg:mt-[12%]">
        <div className="flex flex-col lg:flex-row  justify-end  lg:justify-between gap-14 md:gap-20 lg:gap-32 items-center  mx-4 md:mx-[4%] lg:mx-[11%]  ">
          <div className="w-full lg:w-1/2  ">
            <div className="flex flex-col gap-6 justify-center items-center">
              <div className=" flex flex-col gap-2 justify-start w-full">
                <div className="">
                  <hr className="w-[140px] border-t-8 border-gold" />
                </div>
                <p className="md:w-[85%] w-[95%] font-h1 text-darkgray font-black">
                  {hero?.title}
                </p>
              </div>
              <p className="font-normal text-[17px] text-gray md:w-[85%] w-[95%] flex justify-start mr-auto">
                {hero?.description}
              </p>
            </div>
          </div>
        </div>
        {isEventSliderNeeded && (
          <div className="mt-[5%] mx-4  ">
            <NewCarousel eventData={eventData} />
          </div>
        )}
      </div>
    </>
  );
};

export default Hero;
