import InfoCard from "../../../components/ui/card/InfoCard";
import UnderlineLink from "../../../components/ui/button/UnderlineLink";
import { formatToBullets } from "../../../helper/formatNewLines";

const FinancialMarkets = ({ financialMarkets }) => {
  return (
    <>
      <div className="mx-4 lg:mx-[8%] py-6   lg:pt-[56px] lg:pb-[56px] flex lg:justify-between lg:flex-row flex-col gap-6 lg:gap-30 border-b border-lightgray/25">
        <div className="flex flex-col gap-4 w-full ">
          <h1 className="font-h2 font-bold text-brown">
            {financialMarkets?.overview?.title}
          </h1>
          <p className="font-p text-darkgray">
            {formatToBullets(financialMarkets?.overview?.description)}
          </p>
        </div>
        <div className="w-full  flex justify-end">
          <InfoCard
            imageSrc={financialMarkets?.file?.file}
            title={financialMarkets?.file?.title}
            description={financialMarkets?.file?.description}
            link={financialMarkets?.file?.link}
            className="w-full h-full lg:w-[300px] "
            textSize="lg:text-base text-sm"
            desClassName="line-clamp-3 max-h-16 w-full"
            cardContainerClassName="p-0 justify-between w-full"
            imgClassName="py-4 w-full lg:w-[284px]  "
            isDownloadNeeded={true}
            btnClassName=""
          />
        </div>
      </div>
    </>
  );
};

export default FinancialMarkets;
