import InfoCard from "../../../components/ui/card/InfoCard";
import UnderlineLink from "../../../components/ui/button/UnderlineLink";
import { formatToBullets } from "../../../helper/formatNewLines";

const FinancialInfrastructureInnovation = ({
  financialInfrastructureInnovation,
}) => {
  return (
    <>
      <div className="mx-4 lg:mx-[8%] py-6 lg:pt-[56px] lg:pb-[56px] flex lg:flex-row-reverse flex-col-reverse gap-8">
        <div className="w-full lg:w-[50%] flex lg:flex-row flex-col justify-end gap-6">
          {financialInfrastructureInnovation?.cards?.map((i, index) => (
            <>
              <InfoCard
                title={i?.title}
                description={i?.description}
                link={i?.link}
                // className=""
                // textSize="lg:text-base text-sm"
                // desClassName="line-clamp-3 max-h-32"
                // cardContainerClassName="p-0 justify-between lg:w-[212.5px] "
                // imgClassName="py-4 lg:w-[212.5px] "
                className="w-full h-full lg:w-[300px] "
                textSize="lg:text-base text-sm"
                desClassName="line-clamp-3 max-h-16 w-full"
                cardContainerClassName="p-0 justify-between w-full"
                imgClassName="py-4 w-full lg:w-[284px]  "
                imageLink={i?.image}
              />
              {/* Add vertical line only between the two cards */}
              {index === 0 &&
                financialInfrastructureInnovation.cards.length === 2 && (
                  <div className="w-[0.5px] bg-slate hidden lg:block lg:h-[257px] mt-5" />
                )}
            </>
          ))}
          {/* <img src={baseUrl + currencyManagement?.image?.url} /> */}
        </div>
        <div className="flex flex-col gap-4 w-full lg:w-[50%] lg:pr-4">
          <h1 className="font-h2 font-bold text-brown">
            {financialInfrastructureInnovation?.overview?.title}
          </h1>
          <p className="font-p text-darkgray">
            {formatToBullets(
              financialInfrastructureInnovation?.overview?.description
            )}
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

export default FinancialInfrastructureInnovation;
