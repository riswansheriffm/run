import UnderlineLink from "../../../components/ui/button/UnderlineLink";
import { formatToBullets } from "../../../helper/formatNewLines";

const baseUrl = import.meta.env.VITE_API_IMAGE_BASEURL;

const CurrencyManagement = ({ currencyManagement }) => {
  return (
    <>
      <div className="mx-4 lg:mx-[8%] py-6   lg:pt-[56px] lg:pb-[56px] flex lg:justify-between lg:flex-row flex-col-reverse gap-6 lg:gap-30 border-b border-lightgray/25">
        <div className="w-full lg:w-[340px] lg:h-[211px] ">
          <img
            className="mx-auto"
            src={baseUrl + currencyManagement?.image?.url}
          />
        </div>
        <div className="flex flex-col gap-4 w-full lg:w-[60%]">
          <h1 className="font-h2 font-bold text-brown">
            {currencyManagement?.overview?.title}
          </h1>
          <p className="font-p text-gray">
            {formatToBullets(currencyManagement?.overview?.description)}
          </p>
          <div className="">
            <UnderlineLink
              className=""
              name="View All"
              href="/"
            ></UnderlineLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrencyManagement;
