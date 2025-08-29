import { formatToBullets } from "../../../helper/formatNewLines";

const PolicyToolkit = ({ policyToolkit }) => {
  const { heading, points } = policyToolkit;

  return (
    <div className="mx-4 lg:mx-[8%] py-4 lg:py-[56px]">
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6">
        {/* First row: 3 columns */}
        <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr] gap-2 lg:gap-12">
          <div className="lg:py-6  ">
            <h2 className="font-h2 font-bold text-brown mb-4">
              {heading?.title}
            </h2>
            <p className="text-gray whitespace-pre-line font-h6">
              {heading?.description}
            </p>
          </div>

          {points?.slice(0, 2).map((point, index) => (
            <div
              key={point.id}
              className={` pr-6 py-4 lg:py-4 lg:px-12 lg:border-b-0 border-b border-[#E0E0E0] ${
                index === 0 ? "lg:border-r" : ""
              }`}
            >
              <div className="flex justify-start mb-4">
                <div className="">
                  <div className="w-6 lg:w-[25px] lg:h-[25px] text-[13px] mt-1 rounded-sm bg-[#E5E5E5] flex items-center justify-center text-base font-semibold text-darkgray">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-darkgray font-semibold ml-3 text-[18px]">
                  {point.title}
                </h3>
              </div>
              <p className="font-p text-gray whitespace-pre-line">
                {formatToBullets(point.description)}
              </p>
            </div>
          ))}
        </div>

        {/* Remaining points - equal width (1fr each) */}
        {points?.slice(2).map((point, index) => {
          const mod = (index + 1) % 3;

          return (
            <div
              key={point.id}
              className={` pr-6 py-4 lg:border-b-0 border-b border-[#E0E0E0] ${
                mod !== 0 ? "lg:border-r" : ""
              }`}
            >
              <div className="flex justify-start mb-4">
                <div className="">
                  <div className=" w-6 mt-1 lg:w-[25px] lg:h-[25px] text-[13px] rounded-sm bg-[#E5E5E5] flex items-center justify-center text-base font-semibold text-darkgray">
                    {index + 3}
                  </div>
                </div>
                <h3 className="text-darkgray font-semibold ml-2 text-[18px]">
                  {point.title}
                </h3>
              </div>
              <p className="font-p text-gray whitespace-pre-line">
                {formatToBullets(point.description)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PolicyToolkit;
