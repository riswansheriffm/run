import { formatToBullets } from "../../../helper/formatNewLines";

const baseUrl = import.meta.env.VITE_API_IMAGE_BASEURL;

const LegalAndRegulatory = ({ legalAndRegulatoryFrameworkData }) => {
  return (
    <>
      <div className="mx-4 lg:mx-[8%] py-8 lg:py-[80px] flex flex-col gap-10 border-t border-lightgray/10">
        {/* TOP COMPONENT */}
        <div className="flex lg:flex-row flex-col items-center self-stretch   gap-[48px] ">
          <div className="w-full lg:w-[60%]">
            <h1 className="font-h2 text-brown mb-4 font-bold">
              {legalAndRegulatoryFrameworkData?.title}
            </h1>
            <p className="font-h6 text-gray">
              {legalAndRegulatoryFrameworkData?.description}
            </p>
          </div>
          <div className="w-full lg:w-[40%]  flex justify-end">
            <img
              className="w-full lg:w-[343px] lg:h-[170px] object-cover rounded-xl"
              src={baseUrl + legalAndRegulatoryFrameworkData?.image?.url}
            />
          </div>
        </div>
        {/* BOTTOM COMPONENT */}
        <div className="flex lg:flex-row flex-col   gap-[98px] relative mt-[24px]">
          {/* LEFT Section */}
          <div className="w-full lg:w-1/2 pr-4">
            <h1 className="font-p text-darkgray font-bold mb-2">
              {legalAndRegulatoryFrameworkData?.leftSection?.title}
            </h1>
            <div className="font-p text-gray">
              {formatToBullets(
                legalAndRegulatoryFrameworkData?.leftSection?.description
              )}
            </div>
          </div>

          {/* Divider */}
          {/* Vertical on large screens */}
          <div className="hidden lg:block w-[1px] h-[370px] bg-[rgba(77,36,18,0.1)] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

          {/* Horizontal on small screens */}
          <div className="block lg:hidden h-[1px] w-full bg-[rgba(77,36,18,0.2)] my-4"></div>
          {/* RIGHT Section */}
          <div className="w-full lg:w-1/2 ">
            <h1 className="font-p text-darkgray font-bold mb-2">
              {legalAndRegulatoryFrameworkData?.rightSection?.title}
            </h1>
            <div className="font-p text-gray">
              {formatToBullets(
                legalAndRegulatoryFrameworkData?.rightSection?.description
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LegalAndRegulatory;
