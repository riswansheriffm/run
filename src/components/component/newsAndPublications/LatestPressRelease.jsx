import { useMemo, useState, useEffect } from "react";
import Category from "../../../components/ui/pressReleaseContainer/Category";
import UnderlineLink from "../../../components/ui/button/UnderlineLink";
import InfoCard from "../../../components/ui/card/InfoCard";

const LatestPressRelease = ({
  latestNews,
  latestPublication,
  latestPressRelease,
  latestGovernorSpeeches,
  latestLecturers,
}) => {
  const categoryList = useMemo(() => {
    return latestNews?.map((i) => i?.category) || [];
  }, [latestNews]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (categoryList.length > 0) {
      setSelectedCategory((prev) => prev || categoryList[0]);
    }
  }, [categoryList]);

  const selectedData = useMemo(() => {
    if (selectedCategory === "Press Releases") {
      return latestPressRelease;
    } else if (selectedCategory === "Governor Speeches") {
      return latestGovernorSpeeches;
    } else if (selectedCategory === "Publications") {
      return latestPublication;
    } else if (selectedCategory === "Lecturers") {
      return latestLecturers;
    }
    return [];
  }, [
    selectedCategory,
    latestPressRelease,
    latestGovernorSpeeches,
    latestPublication,
    latestLecturers,
  ]);

  const displayedCategory = useMemo(() => {
    return latestNews?.filter((item) => item?.category === selectedCategory);
  }, [selectedCategory, latestNews]);

  // Don't render until selectedCategory is set
  if (!selectedCategory) return null;

  return (
    <div className="mx-4 lg:mx-[8%] py-8 lg:py-[40px]">
      <div>
        <Category
          categories={categoryList}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          mainCategory={true}
          justifyContent="left"
          isAllNeeded={false}
        />
      </div>
      <div className="flex lg:flex-row flex-col w-full p-2 lg:p-6">
        <div className=" lg:w-[30%]">
          {displayedCategory?.length > 0 && displayedCategory[0]?.shortNote && (
            <div className=" flex flex-col gap-4">
              <h3 className="font-bold font-h3 text-darkgray">
                {displayedCategory[0].shortNote.title}
              </h3>
              <p className="font-h6 font-normal text-gray lg:w-[80%]">
                {displayedCategory[0].shortNote.description}
              </p>
              <div className="">
                <UnderlineLink
                  name={displayedCategory[0].shortNote.link?.text}
                  href={displayedCategory[0].shortNote.link?.link}
                />
              </div>
            </div>
          )}
        </div>
        <div className="w-full flex flex-wrap gap-4 py-4 ">
          {selectedData?.map((item, index) => (
            <>
              <InfoCard
                key={item?.id}
                imageSrc={item?.file}
                title={item?.title}
                description={item?.description}
                className=" w-full lg:w-[30%] lg:h-[289px] lg:w-[212.5px]"
                imgClassName=" h-50  md:h-98 lg:h-[116px] "
              />
              {index < selectedData.length - 1 && (
                <div
                  className="
      bg-brown/20
      self-stretch
      inline-block
      sm:h-[257px] sm:w-[0.5px]
      h-[0.5px] w-full sm:self-auto
    "
                ></div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestPressRelease;
