import { useEffect, useState } from "react";
import Year from "../../../components/ui/pressReleaseContainer/Year";
import { insertNewLineBeforeBullets } from "../../../helper/formatNewLines";

// Assuming `List` is already created, import it here
import List from "../../../components/ui/pressReleaseContainer/List";

const SupervisoryCirculars = ({ supervisoryCirculars = {} }) => {
  const { overview, year } = supervisoryCirculars;

  // Extract unique years
  const yearList = [...new Set(year?.map((item) => item.year))];
  const [selectedYear, setSelectedYear] = useState(yearList[0] || "");

  // Filter items based on selected year
  const filteredData = selectedYear
    ? year
        ?.filter((item) => item?.year === selectedYear)
        ?.flatMap((i) => i?.items || [])
    : year?.flatMap((i) => i?.items || []) || [];

  useEffect(() => {
    if (yearList.length && !selectedYear) {
      setSelectedYear(yearList[0]);
    }
  }, [yearList, selectedYear]);

  return (
    <div className="mx-4 lg:mx-[8%] py-8 lg:pt-[72px] lg:pb-[40px] border-b border-slate">
      <div className="flex lg:flex-row flex-col gap-4 lg:gap-12">
        {/* Overview Section */}
        <div className="w-full lg:w-[40%]">
          <h1 className="font-h2 text-brown font-bold mb-4">
            {overview?.title}
          </h1>
          <p className="font-h6 text-gray whitespace-pre-line">
            {insertNewLineBeforeBullets(overview?.description)}
          </p>
        </div>

        {/* Circulars List Section */}
        <div className="w-full lg:w-[60%]">
          <Year
            years={yearList.map((year) => ({ year }))}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
          <List releases={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default SupervisoryCirculars;
