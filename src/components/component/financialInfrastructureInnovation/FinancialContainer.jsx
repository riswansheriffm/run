import List from "../../../components/ui/pressReleaseContainer/List";
import Category from "../../../components/ui/pressReleaseContainer/Category";
import { useMemo, useState } from "react";

const FinancialContainer = ({ financialContainer }) => {
  const mainCategories = useMemo(
    () => financialContainer?.category?.map((item) => item.category),
    [financialContainer]
  );

  const [selectedMainCategory, setSelectedMainCategory] = useState(
    mainCategories[0]
  );

  // Get the selected category object
  const selectedCategoryData = useMemo(() => {
    return financialContainer?.category?.find(
      (item) => item.category === selectedMainCategory
    );
  }, [selectedMainCategory, financialContainer]);

  // Fallback to empty array if no items
  const filteredItems = selectedCategoryData?.items || [];

  return (
    <div className="mx-4 lg:mx-[8%] py-[4%] border-t border-lightgray/10">
      <div className="">
        <h1 className="font-h2 text-darkgray font-bold mb-6">
          {financialContainer?.title}
        </h1>
      </div>

      <div>
        <Category
          categories={mainCategories}
          selectedCategory={selectedMainCategory}
          setSelectedCategory={setSelectedMainCategory}
          mainCategory={true}
          justifyContent="left"
          isAllNeeded={false}
        />

        <List releases={filteredItems} />
      </div>
    </div>
  );
};

export default FinancialContainer;
