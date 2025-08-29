import CommonButton from "../../../components/ui/button/CommonButton";
import { formatToBullets } from "../../../helper/formatNewLines";

const CleanMoneyPolicy = ({ cleanMoneyPolicy }) => {
  return (
    <>
      <div className=" lg:mx-[8%] py-8 lg:py-[56px] flex flex-col gap-4">
        <div className=" ">
          <h1 className="font-h2 text-brown font-bold mb-2">
            {cleanMoneyPolicy?.title}
          </h1>
          <p className="font-h6 w-full lg:w-[50%] text-gray">
            {cleanMoneyPolicy?.description}
          </p>
        </div>
        <div className="flex lg:flex-row flex-col justify-between gap-6 lg:gap-24 lg:py-4">
          {cleanMoneyPolicy?.list?.map((i) => (
            <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-lightgray/20 last:border-r-0 pb-7 lg:pb-0 lg:pr-24">
              <h2 className="text-base  font-bold text-darkgray mb-1">
                {i?.title}
              </h2>
              <p className="font-h6 text-gray">
                {formatToBullets(i?.description)}
              </p>
            </div>
          ))}
        </div>
        <div className="flex lg:flex-row flex-col justify-center gap-6 lg:gap-24 lg:py-4">
          <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-lightgray/20 last:border-r-0 pb-7 lg:pb-0 lg:pr-24">
            <h1 className="text-base font-bold text-darkgray mb-1">
              {" "}
              {cleanMoneyPolicy?.listWithNote?.title}
            </h1>
            <p className="font-h6 text-gray">
              {formatToBullets(cleanMoneyPolicy?.listWithNote?.description)}
            </p>
            <div className="bg-[#FFEF97] w-[100%] p-2 lg:p-3 rounded-xl my-2 mx-3">
              <p className="flex font-h6 text-darkgray justify-center items-start">
                <span className="mt-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 28 27"
                    fill="none"
                  >
                    <path
                      d="M8.38 5.18792C9.74115 3.80667 11.6112 3.00488 13.6594 3.00488C15.7263 3.00488 17.6046 3.8199 18.9658 5.14552C20.319 6.46331 21.1646 8.29107 21.1646 10.3152C21.1646 12.4703 20.1915 14.387 18.4682 16.0444L17.9571 18.0031H9.43931L9.05659 16.3974C7.25285 14.5153 6.25612 12.702 6.16163 10.6403L6.16016 10.6082L6.16117 10.576C6.22897 8.41737 7.04908 6.53849 8.38 5.18792ZM9.83656 19.6698L10.2251 21.3L10.2372 21.336C10.4044 21.832 10.7248 22.2436 11.128 22.532C11.5461 22.831 12.0578 23.0013 12.5985 23.0013L12.6009 23.0013L14.9066 22.9948L14.9412 22.9918C15.4656 22.9466 15.9528 22.7411 16.3412 22.4157C16.7263 22.0931 17.0174 21.6489 17.1417 21.1272L17.5221 19.6698H9.83656Z"
                      fill="#DA9133"
                    />
                  </svg>
                </span>
                {cleanMoneyPolicy?.listWithNote?.note}
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col">
            <h1 className="text-base font-bold text-darkgray mb-2">
              {cleanMoneyPolicy?.exchangeDamagedNotes?.title}
            </h1>
            <p className="font-p text-gray">
              {formatToBullets(
                cleanMoneyPolicy?.exchangeDamagedNotes?.description
              )}
            </p>
            <div className="mt-6">
              <CommonButton
                icon={cleanMoneyPolicy?.exchangeDamagedNotes?.icon?.url}
                className="p-2 lg:p-3 font-h6 font-[500]"
              >
                {cleanMoneyPolicy?.exchangeDamagedNotes?.buttonName}
              </CommonButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CleanMoneyPolicy;
