import { useMemo, useState, useEffect } from "react";
import Year from "../../../components/ui/pressReleaseContainer/Year";
import List from "../../../components/ui/pressReleaseContainer/List";
import Category from "../../../components/ui/pressReleaseContainer/Category";
import SearchBar from "../../../components/ui/search/SearchBar"; // Adjust path if needed

import bg from "../../../assets/logo.png";
import { renderFirstPageToImage } from "../../../helper/renderPdfPage";
import { useDebounce } from "use-debounce";
const baseUrl = import.meta.env.VITE_API_IMAGE_BASEURL;

const monthMap = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

const PublicationContainer = ({ releaseContent }) => {
  const getInitialYear = () => {
    const foundCategory = releaseContent.find(
      (item) => item.category === selectedMainCategory
    );
    return foundCategory?.items?.[0]?.year || ""; // fallback empty string
  };
  // Step 1: Main category selection
  const mainCategories = useMemo(
    () => releaseContent.map((item) => item.category),
    [releaseContent]
  );
  const [selectedItem, setSelectedItem] = useState(null);

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch] = useDebounce(searchQuery, 300); // debounce for smoother filtering

  const [selectedMainCategory, setSelectedMainCategory] = useState(
    mainCategories[0]
  );
  const [selectedYear, setSelectedYear] = useState(getInitialYear());
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");

  const yearList = useMemo(() => {
    if (selectedMainCategory === "All") {
      const yearSet = new Set();
      releaseContent.forEach((category) => {
        category.items?.forEach((yearObj) => {
          if (yearObj?.year) {
            yearSet.add(yearObj.year);
          }
        });
      });

      // Return array of objects to match expected structure: { year: "2025" }
      return Array.from(yearSet)
        .sort((a, b) => b - a)
        .map((year) => ({ year }));
    }

    const found = releaseContent.find(
      (item) => item.category === selectedMainCategory
    );

    return found?.items?.map((y) => ({ year: y.year })) || [];
  }, [releaseContent, selectedMainCategory]);

  // Step 3: Get available subCategories
  const availableSubCategories = useMemo(() => {
    const subCategorySet = new Set();

    if (selectedMainCategory === "All") {
      releaseContent.forEach((cat) => {
        const yearObj = cat.items?.find((y) => y.year === selectedYear);
        yearObj?.items?.forEach((month) => {
          month.items?.forEach((item) => {
            if (item.subCategory) subCategorySet.add(item.subCategory);
          });
        });
      });
    } else {
      const mainCat = releaseContent.find(
        (c) => c.category === selectedMainCategory
      );
      const yearObj = mainCat?.items?.find((y) => y.year === selectedYear);
      yearObj?.items?.forEach((month) => {
        month.items?.forEach((item) => {
          if (item.subCategory) subCategorySet.add(item.subCategory);
        });
      });
    }

    return [...Array.from(subCategorySet)];
  }, [releaseContent, selectedMainCategory, selectedYear]);

  // Step 4: Filter final items
  const filteredItems = useMemo(() => {
    const result = [];

    const processYearObj = (yearObj) => {
      yearObj?.items?.forEach((monthBlock) => {
        const shortMonth = monthMap[monthBlock.month] || monthBlock.month;

        monthBlock.items?.forEach((item) => {
          if (
            selectedSubCategory === "All" ||
            item.subCategory === selectedSubCategory
          ) {
            result.push({
              id: item.id,
              title: item.title,
              description: item.description || "No description available.",
              month: shortMonth,
              file: item.file?.url || null,
            });
          }
        });
      });
    };

    if (selectedMainCategory === "All") {
      releaseContent.forEach((cat) => {
        const yearObj = cat.items?.find((y) => y.year === selectedYear);
        processYearObj(yearObj);
      });
    } else {
      const mainCat = releaseContent.find(
        (c) => c.category === selectedMainCategory
      );
      const yearObj = mainCat?.items?.find((y) => y.year === selectedYear);
      processYearObj(yearObj);
    }

    return result;
  }, [releaseContent, selectedMainCategory, selectedYear, selectedSubCategory]);

  const handleCardSelect = (selectedItem) => {
    setSelectedItem(selectedItem); // <-- Set the selected item

    const loadPdfImage = async () => {
      setLoading(true);
      if (baseUrl + selectedItem?.file?.endsWith(".pdf")) {
        try {
          const pdfImage = await renderFirstPageToImage(
            baseUrl + selectedItem.file
          );
          setPreviewImage(pdfImage);
        } catch (error) {
          console.error("Failed to render PDF:", error);
          setPreviewImage(null);
        }
      } else {
        setPreviewImage(baseUrl + selectedItem.file);
      }
      setLoading(false);
    };

    if (baseUrl + selectedItem?.file) {
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
  }, [filteredItems, selectedYear, selectedMainCategory, selectedSubCategory]);

  useEffect(() => {
    const newYear = getInitialYear();
    setSelectedYear(newYear);
    setSelectedSubCategory("All"); // reset sub-category
    setSearchQuery("");
  }, [selectedMainCategory]);

  const searchedItems = useMemo(() => {
    if (!debouncedSearch) return filteredItems;

    const lowerSearch = debouncedSearch.toLowerCase();

    return filteredItems.filter((item) => {
      return (
        item.title?.toLowerCase().includes(lowerSearch) ||
        item.description?.toLowerCase().includes(lowerSearch)
      );
    });
  }, [debouncedSearch, filteredItems]);

  return (
    <div className="mx-4 lg:mx-[8%] lg:my-[64px] my-[32px]">
      {/* <div className="w-full lg:w-[35%] mt-4">
        <SearchBar
          placeholder="Search by title, description, category..."
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div> */}
      {/* Top Main Category Tabs (Monetary Policy, Economy Reports...) */}
      <Category
        categories={mainCategories}
        selectedCategory={selectedMainCategory}
        setSelectedCategory={(cat) => {
          setSelectedMainCategory(cat);
          setSelectedSubCategory("All"); // Reset subcategory
          setSelectedItem(null);
          setPreviewImage(null);
        }}
        mainCategory={true}
        justifyContent="left"
        isAllNeeded={false}
      />

      {/* Image + Right Side Content */}
      <div className="mt-8 flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="w-full lg:w-1/3 order-2 lg:order-1 flex items-start justify-center">
          {loading ? (
            <div className="w-full lg:w-[400px] h-[440px] bg-gray-200 animate-pulse rounded-xl"></div>
          ) : (
            <div className="relative w-full lg:w-[400px] h-[440px] cursor-pointer rounded-xl overflow-hidden">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={baseUrl + selectedItem?.file}
              >
                <img
                  src={previewImage || bg}
                  className="w-full h-full object-cover"
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
                      href={baseUrl + selectedItem?.file}
                      className=" font-bold "
                    >
                      {" "}
                      <span className="flex gap-1 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="white"
                          className="mb-1"
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

        {/* Content Section */}
        <div className="w-full lg:w-2/3 order-2  lg:px-2">
          {/* SubCategory Filters */}
          <Category
            categories={availableSubCategories}
            selectedCategory={selectedSubCategory}
            setSelectedCategory={setSelectedSubCategory}
          />

          {/* Year Scroll Selector */}
          <div>
            <Year
              years={yearList}
              selectedYear={selectedYear}
              setSelectedYear={(y) => {
                setSelectedYear(y);
                setSelectedSubCategory("All"); // Reset subcategory
              }}
              className="text-sm"
            />
          </div>

          {/* Cards List */}
          <List
            releases={searchedItems}
            onCardSelect={handleCardSelect}
            selectedId={selectedItem?.id}
          />
        </div>
      </div>
    </div>
  );
};

export default PublicationContainer;
