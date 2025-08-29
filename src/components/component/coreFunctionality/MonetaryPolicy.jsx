import List from "../../../components/ui/pressReleaseContainer/List";
import UnderlineLink from "../../../components/ui/button/UnderlineLink";
import { formatToBullets } from "../../../helper/formatNewLines";

const MonetaryPolicy = ({ monetaryPolicy, monetaryLatestContent }) => {
  return (
    <>
      <div className="mx-4 lg:mx-[8%] py-6 lg:pt-[40px] lg:pb-[56px] flex lg:flex-row flex-col justify-center gap-4 lg:gap-24 border-b border-lightgray/25">
        <div className="flex flex-col gap-4 w-full  lg:w-[50%] ">
          <h1 className="font-h2 font-bold text-brown">
            {monetaryPolicy?.overview?.title}
          </h1>
          <p className="font-h6 text-darkgray">
            {formatToBullets(monetaryPolicy?.overview?.description)}
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
          {monetaryPolicy?.isLatestMonetatyPolicyNeeded && (
            <>
              <h1 className="font-h3 text-darkgray font-bold lg:p-4">
                Latest Monetary Policy Statements
              </h1>

              <List
                releases={monetaryLatestContent?.data}
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

export default MonetaryPolicy;
