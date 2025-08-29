import Category from "../../../components/ui/pressReleaseContainer/Category";
import { formatToBullets } from "../../../helper/formatNewLines";
import List from "../../../components/ui/pressReleaseContainer/List";

const BankResolutions = ({ bankResolutions = {} }) => {
  const { overview, year } = bankResolutions;

  const filteredData = Array.isArray(year)
    ? year.flatMap((entry) =>
        (entry.items || []).map((item) => ({
          ...item,
          month: `${item.month} ${entry.year}`,
        }))
      )
    : [];

  return (
    <>
      <div className="mx-4 lg:mx-[8%] py-8 lg:pt-[72px] lg:pb-[40px] ">
        <div className="flex lg:flex-row flex-col gap-4 lg:gap-12">
          <div className="w-full lg:w-[40%]">
            <h1 className="font-h2 text-brown font-bold mb-4">
              {overview?.title}
            </h1>
            <p className="font-h6 text-gray whitespace-pre-line">
              {formatToBullets(overview?.description)}
            </p>
          </div>
          <div className="w-full lg:w-[60%]">
            <List underLineNeeded={false} releases={filteredData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BankResolutions;
