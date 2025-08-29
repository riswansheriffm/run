import { useEffect, useState } from "react";
import Category from "../../../components/ui/pressReleaseContainer/Category";
import { insertNewLineBeforeBullets } from "../../../helper/formatNewLines";
import List from "../../../components/ui/pressReleaseContainer/List";

const SupervisedInstitutions = ({ supervisedInstitutions = {} }) => {
  const { overview, category } = supervisedInstitutions;
  const categoryList = [...new Set(category?.map((item) => item.category))];

  // Set default category to the first one
  const [selectedCategory, setSelectedCategory] = useState(
    categoryList[0] || ""
  );

  // Update state if supervisedInstitutions changes (e.g., async load)
  useEffect(() => {
    if (categoryList.length > 0) {
      setSelectedCategory(categoryList[0]);
    }
  }, [supervisedInstitutions]);

  // Get unique categories from data

  const filteredData = selectedCategory
    ? category
        ?.filter((item) => item?.category === selectedCategory)
        ?.flatMap((i) => i?.items || [])
    : category?.flatMap((i) => i?.items || []) || [];

  return (
    <>
      <div className="mx-4 lg:mx-[8%] py-8 lg:pt-[72px] lg:pb-[40px] border-b border-slate">
        <div className="flex lg:flex-row flex-col gap-4 lg:gap-12">
          <div className="w-full lg:w-[40%]">
            <h1 className="font-h2 text-brown font-bold mb-4">
              {overview?.title}
            </h1>
            <p className="font-h6 text-gray whitespace-pre-line">
              {insertNewLineBeforeBullets(overview?.description)}
            </p>
          </div>
          <div className="w-full lg:w-[60%]">
            <Category
              categories={categoryList}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              isAllNeeded={false} // if you don’t want "All"
              mainCategory={true}
              justifyContent="start"
            />
            <List underLineNeeded={true} releases={filteredData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SupervisedInstitutions;
