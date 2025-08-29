import List from "../../../components/ui/pressReleaseContainer/List";
import UnderlineLink from "../../../components/ui/button/UnderlineLink";
import { formatToBullets } from "../../../helper/formatNewLines";

const Supervision = ({ supervision, supervisionLatestContent }) => {
  return (
    <>
      <div className="mx-4 lg:mx-[8%] py-6   lg:pt-[56px] lg:pb-[56px] flex lg:flex-row flex-col gap-6 lg:gap-20 border-b border-lightgray/25">
        <div className="flex flex-col gap-4 w-full  lg:w-[50%]">
          <h1 className="font-h2 font-bold text-brown">
            {supervision?.overview?.title}
          </h1>
          <p className="font-p text-darkgray">
            {formatToBullets(supervision?.overview?.description)}
          </p>
          <div className="">
            <UnderlineLink
              className=""
              name="View All"
              href="/"
            ></UnderlineLink>
          </div>
        </div>

        <div className="w-full lg:w-[50%]">
          {supervision?.isSupervisionNeeded && (
            <>
              <h1 className="font-h3 text-darkgray font-bold lg:p-4">
                Latest Supervision Acts & Regulations
              </h1>
              <List
                releases={supervisionLatestContent ?? []}
                paginationNeeded={false}
                downloadNeeded={false}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Supervision;
