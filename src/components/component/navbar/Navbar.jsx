import { useEffect, useRef, useState } from "react";
import TopNav from "./TopNav";
const baseUrl = import.meta.env.VITE_API_IMAGE_BASEURL;

const Navbar = (homeContent) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveMenu, setMobileActiveMenu] = useState(null);
  const [activeSubItem, setActiveSubItem] = useState(null);
  const [theme, setTheme] = useState("light"); // 'light' or 'dark'

  const menuRef = useRef();

  // const menuItems = nav?.data[0]?.menus;
  const menuItems = homeContent?.homeContent?.data?.menus;
  const navMenus = homeContent?.homeContent?.data?.quickLinks;

  const [showTopNav, setShowTopNav] = useState(true);

  useEffect(() => {
    const sections = document.querySelectorAll("section[data-bg]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            const bgType = entry.target.getAttribute("data-bg");
            setTheme(bgType === "dark" ? "dark" : "light");
            break;
          }
        }
      },
      {
        threshold: 0.6, // more than 60% of section should be visible
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Scroll logic to show/hide TopNav
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowTopNav(false); // Scrolling down
      } else {
        setShowTopNav(true); // Scrolling up
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
        setShowSearch(false);
        setQuery("");
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const allItems = [
    "News and Publication",
    "About Us",
    "Press release",
    "Events and calendars",
    "Acts & Regulations",
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 0) {
      const filtered = allItems.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const toggleMobileMenu = (menuId) => {
    setMobileActiveMenu(mobileActiveMenu === menuId ? null : menuId);
  };

  return (
    <>
      <div className="sticky top-3 z-50 w-full h-0">
        {/* {showTopNav && ( */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showTopNav ? "max-h-20 translate-y-0" : "max-h-0 -translate-y-full"
          }`}
        >
          <TopNav quickLinks={navMenus} theme={theme} />
        </div>
        {/* )} */}
        <nav className="mx-4 lg:mx-[8%]  ">
          <div className="flex  items-center justify-between max-w-screen px-4 lg:px-8 lg:h-[64px] align-self-stretch rounded-[14px] py-2  bg-brown border-gray-200  shadow-sm ">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src={baseUrl + menuItems?.logo?.url || "/placeholder.svg"}
                className="w-12 lg:h-[52px] lg:w-[54px] bg-white rounded-lg"
                alt="Logo"
              />
            </a>
            <div className="flex gap-12">
              {/* Desktop Search and Mobile Menu Button */}
              <div className="flex items-center lg:order-2 space-x-2 rtl:space-x-reverse ">
                {/* Search - Desktop */}
                <div className="relative block  min-w-11 m-0">
                  {!showSearch ? (
                    <button
                      className="flex items-center space-x-2 px-3 py-2 text-white   cursor-pointer  rounded-lg transition-colors"
                      onClick={() => setShowSearch(true)}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  ) : (
                    <div
                      ref={menuRef}
                      className="relative w-0 right-60 lg:right-72  z-50"
                    >
                      <div
                        className={`flex items-center   rounded-t-[8px] border border-[#E6E6E6] bg-[rgba(255,255,255,0.92)] backdrop-blur-[20px]   ${
                          suggestions.length > 0 ? "rounded-t-lg" : "rounded-lg"
                        }  shadow-lg p-2 lg:px-3 lg:py-2 w-72 lg:w-80 `}
                      >
                        <svg
                          className="w-4 h-4 text-gray mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        <input
                          type="text"
                          value={query}
                          onChange={handleSearchChange}
                          className="flex-1 focus:outline-none text-[14px] placeholder:text-[14px] text-gray w-full placeholder:text-lightgray"
                          placeholder="Search for rates, reports, reg..."
                          autoFocus
                        />
                        <button
                          onClick={() => {
                            setShowSearch(false);
                            setQuery("");
                            setSuggestions([]);
                          }}
                          className="text-gray hover:text-darkgray ml-2 "
                        >
                          <svg
                            className="w-4 h-4 cursor-pointer text-gray"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Suggestions Dropdown */}
                      {suggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-0  w-80  rounded-lg shadow-lg z-50">
                          <ul className="py-1 w-full bg-white rounded-b-lg ">
                            {suggestions.map((item, index) => (
                              <li
                                key={index}
                                className={`w-full ${
                                  index !== suggestions.length - 1
                                    ? "border-b border-lightgray/20 "
                                    : ""
                                }`}
                              >
                                <div className=" w-full ">
                                  <button
                                    className="w-full text-left px-4 py-2 text-[14px]  hover:bg-gray-50 text-darkgray cursor-pointer "
                                    onClick={() => {
                                      setQuery(item);
                                      setSuggestions([]);
                                      setShowSearch(false);
                                    }}
                                  >
                                    {item}
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white hover:text-darkgray rounded-lg lg:hidden hover:bg-gray-100 "
                >
                  <span className="sr-only">Open main menu</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 17 14">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </button>
              </div>
              {/* Desktop Menu */}
              <div className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1 ">
                <ul className="flex flex-col mt-4 font-normal lg:flex-row lg:mt-0 lg:space-x-8 rtl:space-x-reverse ">
                  {menuItems?.items?.map((menu) => {
                    // if (!menu.items || menu.items.length === 0) return null; //
                    return (
                      <li key={menu.id} className="relative mx-0">
                        <button
                          onClick={() => {
                            if (menu.items && menu.items.length > 0) {
                              setActiveMenu((prev) =>
                                prev === menu.id ? null : menu.id
                              );
                            }
                          }}
                          className={` flex items-center justify-between w-full gap-[4px] py-3 px-3 h-[40px] font-h6 font-[400] not-italic lg:leading-[140%] tracking-wide rounded-xl cursor-pointer transition-colors
    ${
      activeMenu === menu.id
        ? "bg-gray-900/15 text-white "
        : "text-white hover:bg-gray-900/15 "
    }`}
                        >
                          {menu.label}
                          {menu.items && menu.items.length > 0 && (
                            <>
                              {activeMenu === menu.id ? (
                                // ⬆️ UP ARROW
                                <svg
                                  className="w-2.5 h-2.5 ms-2"
                                  fill="none"
                                  viewBox="0 0 10 6"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 5L5 1L9 5"
                                  />
                                </svg>
                              ) : (
                                // ⬇️ DOWN ARROW
                                <svg
                                  className="w-2.5 h-2.5 ms-2"
                                  fill="none"
                                  viewBox="0 0 10 6"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1L5 5L9 1"
                                  />
                                </svg>
                              )}
                            </>
                          )}
                        </button>

                        {/* Desktop Dropdown */}
                        {activeMenu === menu.id && (
                          // <div className="absolute z-10 top-12 left-1/2 -translate-x-1/2 mt-1 w-[800px] bg-white rounded-lg">
                          <div
                            className={`fixed z-50 left-1/2 -translate-x-1/2 w-3xl bg-white rounded-xl shadow-2xl
    transition-all duration-500 ease-in-out
    ${showTopNav ? "top-29" : "top-20"}
  `}
                          >
                            <div
                              className={`absolute z-10 grid top-full   ${
                                activeMenu === menu.id
                                  ? "grid-cols-3"
                                  : "hidden"
                              } w-3xl text-sm bg-white rounded-lg `}
                            >
                              {/* mega menu */}
                              <div
                                ref={menuRef}
                                className="p-4 pb-0 text-darkgray lg:pb-4   col-span-3  my-1 rounded-xl shadow-2xl"
                              >
                                <ul className="grid grid-cols-3 gap-8 ">
                                  {menu?.items?.map((subItem) => (
                                    <li
                                      key={subItem.id}
                                      className={`min-w-46 flex flex-col p-2 rounded-xl cursor-pointer 
      ${
        activeSubItem === subItem.id
          ? "bg-lightBrown text-white"
          : "hover:bg-lightBrown"
      }
    `}
                                      onClick={() => {
                                        setActiveMenu(null);
                                        setActiveSubItem(subItem.id); // Set active sub item
                                      }}
                                    >
                                      <a
                                        href={subItem.link}
                                        className="flex flex-col  hover:bg-lightBrown p-2 rounded-xl w-full h-full text-darkgray font-caption font-medium "
                                        onClick={() => setActiveMenu(null)}
                                      >
                                        {subItem.title}
                                        {subItem.description && (
                                          <span className="text-lightgray font-small font-normal">
                                            {subItem.description}
                                          </span>
                                        )}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 bg-white rounded-lg">
              <div className="">
                {/* Mobile Search */}
                <div className="mb-4 ">
                  <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg px-3 py-2">
                    <svg
                      className="w-4 h-4 text-gray mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      value={query}
                      onChange={handleSearchChange}
                      className="flex-1 bg-transparent focus:outline-none text-darkgray"
                      placeholder="Search for rates, reports, reg..."
                    />
                  </div>

                  {/* Mobile Suggestions */}
                  {suggestions.length > 0 && (
                    <div className="mt-2 bg-white border border-gray-200 rounded-lg">
                      <ul className="py-1">
                        {suggestions.map((item, index) => (
                          <li key={index}>
                            <button
                              className="w-full text-left px-3 py-2 hover:bg-gray-50 text-darkgray"
                              onClick={() => {
                                setQuery(item);
                                setSuggestions([]);
                              }}
                            >
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Mobile Menu Items */}
                <ul className="space-y-2 p-2">
                  {menuItems?.items?.map((menu) => (
                    <li key={menu.id}>
                      <button
                        onClick={() => toggleMobileMenu(menu.id)}
                        className="flex items-center justify-between w-full px-3 py-2 text-darkgray bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <span className="font-medium">{menu.label}</span>
                        {menu?.items?.length !== 0 && (
                          <svg
                            className={`w-4 h-4 transition-transform ${
                              mobileActiveMenu === menu.id ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 10 6"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 4 4 4-4"
                            />
                          </svg>
                        )}
                      </button>

                      {/* Mobile Submenu */}

                      {mobileActiveMenu === menu.id && (
                        <ul className="mt-2  space-y-1 border-l-8 border-brown">
                          {menu?.items?.map((subItem) => (
                            <li
                              key={subItem.id}
                              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                              className={`${
                                activeSubItem === subItem.id
                                  ? "bg-lightBrown text-white"
                                  : "hover:bg-lightBrown"
                              }`}
                            >
                              <a
                                href={subItem.link}
                                className="block px-3 py-2 text-gray hover:bg-lightBrown rounded-lg transition-colors"
                              >
                                {subItem.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
