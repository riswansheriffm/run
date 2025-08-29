import { useEffect, useMemo, useState } from "react";
import Category from "../../../components/ui/pressReleaseContainer/Category";
import List from "../../../components/ui/pressReleaseContainer/List";
import Year from "../../../components/ui/pressReleaseContainer/Year";
import { renderFirstPageToImage } from "../../../helper/renderPdfPage";
import bg from "../../../assets/logo.png";

const StatementsAndReports = ({ statementsAndReports }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const baseUrl = import.meta.env.VITE_API_IMAGE_BASEURL;

  const [selectedItem, setSelectedItem] = useState(null);

  // Step 1: Build map of subCategory -> years[]
  const subCategoryYearsMap = useMemo(() => {
    const map = {};
    statementsAndReports?.year?.forEach((yearItem) => {
      const year = yearItem.year.trim();
      yearItem.month.forEach((monthItem) => {
        monthItem.items.forEach((item) => {
          const category = item.subCategory;
          if (!map[category]) {
            map[category] = new Set();
          }
          map[category].add(year);
        });
      });
    });

    // Convert Set to Array
    const finalMap = {};
    for (const key in map) {
      finalMap[key] = Array.from(map[key]);
    }
    return finalMap;
  }, [statementsAndReports]);

  // Step 2: Get all subCategories
  const allCategories = useMemo(
    () => Object.keys(subCategoryYearsMap),
    [subCategoryYearsMap]
  );

  // Step 3: Filtered years for selected category
  const filteredYears = useMemo(() => {
    if (!selectedCategory) return [];
    return subCategoryYearsMap[selectedCategory] || [];
  }, [selectedCategory, subCategoryYearsMap]);

  // Step 4: Filtered items for selected year and category
  useEffect(() => {
    if (!selectedYear || !selectedCategory) {
      setFilteredItems([]);
      setSelectedItem(null);
      return;
    }

    const yearObj = statementsAndReports?.year?.find(
      (y) => y.year.trim() === selectedYear
    );
    const allItems =
      yearObj?.month?.flatMap((month) =>
        month.items
          .filter((item) => item.subCategory === selectedCategory)
          .map((item) => ({
            ...item,
            month: month.month,
            year: yearObj.year.trim(),
          }))
      ) || [];

    setFilteredItems(allItems);

    // Set first item as selected by default
    if (allItems.length > 0) {
      setSelectedItem(allItems[0]);
    } else {
      setSelectedItem(null);
    }
  }, [selectedYear, selectedCategory, statementsAndReports]);

  // Step 5: Set default selectedCategory and selectedYear on initial load
  useEffect(() => {
    if (allCategories.length > 0 && !selectedCategory) {
      const defaultCategory = allCategories[0];
      setSelectedCategory(defaultCategory);
      const availableYears = subCategoryYearsMap[defaultCategory];
      if (availableYears?.length > 0) {
        setSelectedYear(availableYears[0]);
      }
    }
  }, [allCategories, selectedCategory, subCategoryYearsMap]);

  const handleCardSelect = (selectedItem) => {
    setSelectedItem(selectedItem); // <-- Set the selected item

    const loadPdfImage = async () => {
      setLoading(true);
      if (baseUrl + selectedItem?.file?.url?.endsWith(".pdf")) {
        try {
          const pdfImage = await renderFirstPageToImage(
            baseUrl + selectedItem.file?.url
          );

          setPreviewImage(pdfImage);
        } catch (error) {
          console.error("Failed to render PDF:", error);
          setPreviewImage(null);
        }
      } else {
        setPreviewImage(baseUrl + selectedItem?.file?.url);
      }
      setLoading(false);
    };

    if (baseUrl + selectedItem?.file?.url) {
      loadPdfImage();
    }
  };

  useEffect(() => {
    if (filteredItems.length > 0) {
      handleCardSelect(filteredItems[0]);
    } else {
      setSelectedItem(null);
      setPreviewImage(null);
    }
  }, [filteredItems, selectedYear, selectedCategory]);

  return (
    <div className="mx-4 lg:mx-[8%] lg:my-[40px] flex flex-col gap-4">
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        <h1 className="font-h2 font-bold text-brown ">
          {statementsAndReports?.overview?.title}
        </h1>
        <p className="font-h6 text-gray">
          {statementsAndReports?.overview?.description}
        </p>
      </div>
      <div className="mt-4 flex flex-col lg:flex-row">
        {/* Image - visible second on small, first on large */}
        <div className="w-full lg:w-1/3 order-2 lg:order-1 flex items-start justify-center">
          {loading ? (
            <div className="w-[400px] h-[440px] bg-gray-200 animate-pulse rounded-xl"></div>
          ) : (
            <div className="relative w-[400px] h-[440px] cursor-pointer rounded-xl overflow-hidden ">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={baseUrl + selectedItem?.file?.url}
              >
                <img
                  src={previewImage || bg}
                  className="w-full h-full object-cover rounded-xl"
                  alt="Preview"
                />
              </a>

              <>
                <div className="absolute bottom-0 left-0 w-full h-1/12 backdrop-blur-xs bg-black/10 pointer-events-none rounded-b-xl" />
                {previewImage && (
                  <div className="absolute bottom-0 right-0  text-white text-sm z-10  py-2 px-4">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={baseUrl + selectedItem?.file?.url}
                      className=" font-bold "
                    >
                      <span className="flex gap-1 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="white"
                        >
                          <path d="M3.25909 11.6021C3.94254 8.32689 6.79437 6 10 6C13.2057 6 16.0574 8.32688 16.7409 11.6021C16.7974 11.8725 17.0622 12.0459 17.3325 11.9895C17.6029 11.933 17.7763 11.6682 17.7199 11.3979C16.9425 7.67312 13.6934 5 10 5C6.3066 5 3.05742 7.67311 2.28017 11.3979C2.22377 11.6682 2.39718 11.933 2.6675 11.9895C2.93782 12.0459 3.20268 11.8725 3.25909 11.6021ZM9.98953 8C11.9225 8 13.4895 9.567 13.4895 11.5C13.4895 13.433 11.9225 15 9.98953 15C8.05653 15 6.48953 13.433 6.48953 11.5C6.48953 9.567 8.05653 8 9.98953 8Z" />
                        </svg>

                        <span className="font-medium text-sm lg:text-[16px]/tight">
                          {" "}
                          Preview
                        </span>
                      </span>
                    </a>
                  </div>
                )}
              </>
            </div>
          )}
        </div>
        <div className="w-full lg:w-2/3 order-2  px-4 lg:px-2">
          {/* Category Scroll */}
          <Category
            categories={allCategories}
            selectedCategory={selectedCategory}
            setSelectedCategory={(category) => {
              setSelectedCategory(category);
              const years = subCategoryYearsMap[category] || [];
              setSelectedYear(years[0] || null);
            }}
            mainCategory={false}
            isAllNeeded={false}
          />

          {/* Year Scroll */}
          <Year
            years={filteredYears.map((year) => ({ year }))}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />

          {/* List of Cards */}
          <List
            releases={filteredItems}
            onCardSelect={handleCardSelect}
            selectedId={selectedItem?.id}
          />
        </div>
      </div>
    </div>
  );
};

export default StatementsAndReports;
