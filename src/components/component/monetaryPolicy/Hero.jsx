import { insertNewLineBeforeBullets } from "../../../helper/formatNewLines";

const baseUrl = import.meta.env.VITE_API_IMAGE_BASEURL;

const Hero = ({ heroCard }) => {
  return (
    <>
      <div className="relative  items-center flex flex-col  mx-[4%] md:mx-[2%] mt-[29%] md:mt-[15%] lg:mx-[7%] lg:mt-[200px] lg:mb-[40px] gap-4">
        <img
          src={baseUrl + heroCard?.backgroundImage?.url}
          alt="Background Logo"
          className="absolute -top-[4%] md:-top-[12%] -left-[8%] lg:-top-[460px] lg:-left-[372px] w-[70vw] aspect-[154/153] lg:w-[1004.5px] lg:h-[998.005px] opacity-5 z-0 object-contain pointer-events-none"
        />
        <div className="flex lg:flex-row flex-col gap-4 lg:gap-[88px]">
          <div className="w-full lg:w-[30%] flex justify-start h-full">
            <img
              className="w-[100%] md:w-[50%] lg:w-[258px] lg:h-[258px] "
              src={baseUrl + heroCard?.image?.url}
            />
          </div>
          <div className="w-full lg:w-[60%]">
            <h1 className="font-h2 font-bold text-brown mb-4">
              {heroCard?.title}
            </h1>
            <p className="font-h6 whitespace-pre-line text-gray">
              {insertNewLineBeforeBullets(heroCard?.description)}
            </p>
          </div>
        </div>
        <div className="lg:mx-[1%] my-4 lg:w-fit w-full ">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4  lg:gap-3 divide-y lg:divide-y-0 lg:divide-x divide-lightgray/15 ">
            {heroCard?.items?.map((i, index) => (
              <div key={index} className="">
                <h1 className="font-bold text-darkgray font-h6 mb-2">
                  {i?.title}
                </h1>
                <p className="text-xs text-gray mb-4 lg:mb-0">
                  {i?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
