import CommonButton from "../../ui/button/CommonButton";
const baseUrl = import.meta.env.VITE_API_IMAGE_BASEURL;

const MidFooter = (content) => {
  const data = content?.content;

  return (
    <>
      <footer className="bg-white  lg:pt-8">
        <div className=" w-full">
          <div className="lg:flex md:justify-between mb-6  lg:px-[8%] lg:py-[0px] py-[40px] px-[30px]">
            <div className="mb-6 lg:mb-0 lg:w-1/2 ">
              <div
                href="/"
                className="flex  lg:items-start  align-self-stretch gap-6"
              >
                <div className="w-full lg:w-fit">
                  <a href="/" className="flex items-start gap-5">
                    <img
                      src={baseUrl + data?.branding?.logo?.url}
                      className="w-[72px] h-[72px]  "
                      alt="FlowBite Logo"
                    />
                  </a>
                </div>
                <div className="lg:w-[55%] w-[70%] ">
                  <span className="text-[13px] font-normal  text-gray">
                    {data?.branding?.description}
                  </span>
                  <div className="flex mt-3  gap-[18px] w-60">
                    {data?.branding?.socialMedia?.map((i, idx) => (
                      <a
                        href={i?.link}
                        key={idx}
                        className="text-gray  hover:text-darkgray flex justify-center items-center rounded-[5px] py-2"
                      >
                        <img
                          alt={i?.name}
                          src={baseUrl + i?.icon?.url}
                          className="w-[24px]"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4 lg:w-1/2 ">
              {data?.links?.map((i, idx) => (
                <div key={idx} className="">
                  <h2 className="mb-2 text-sm font-bold text-darkgray uppercase ">
                    {i?.title}
                  </h2>
                  <ul className="text-gray  font-normal">
                    {i?.items?.map((i, idx) => (
                      <li className="mb-2 text-[13px]">
                        <a href={i?.link} key={idx} className="hover:underline">
                          {i?.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="col-span-2">
                <h2 className="mb-2 text-sm font-bold text-darkgray uppercase ">
                  {data?.subscribe?.title}
                </h2>
                <div className="">
                  <div className="">
                    <p className="text-[13px] mb-2 text-gray">
                      {data?.subscribe?.description}
                    </p>
                  </div>
                  {data?.subscribe?.isSubsribeInputNeeded && (
                    <div className="">
                      {/* <div className="relative h-[40px]">
                        <input
                          type="search"
                          id="search-dropdown"
                          className="block px-2 py-3 w-full z-20 text-sm text-darkgray h-[40px] bg-gray-50 rounded-lg border-lightgray/10  border-2   placeholder:text-lightgray"
                          placeholder="Enter your email"
                          required
                        />
                        <button
                          type="submit"
                          className="cursor-pointer absolute top-0 end-0 p-2 text-sm font-normal h-full text-white bg-brown rounded-e-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 "
                        >
                          Subscribe
                        </button>
                      </div> */}
                      {/* <div className="relative h-[40px]">
                        <input
                          type="search"
                          id="search-dropdown"
                          className="block px-2 py-3 w-full z-20 text-sm text-darkgray h-[40px] bg-gray-50 rounded-lg border-lightgray/10 border-2 placeholder:text-lightgray"
                          placeholder="Enter your email"
                          required
                        />
                        <button
                          type="submit"
                          className="cursor-pointer line absolute top-0 right-0 p-2 flex items-center justify-center h-full text-sm/tight font-normal text-white bg-brown rounded-e-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                          Subscribe
                        </button>
                      </div> */}
                      <div className="relative h-[40px]">
                        <input
                          type="search"
                          id="search-dropdown"
                          className="block px-2 py-3 pr-24 w-full z-10 text-sm text-darkgray h-[40px] bg-gray-50 rounded-lg border-lightgray/10 border-2 placeholder:text-lightgray"
                          placeholder="Enter your email"
                          required
                        />
                        <button
                          type="submit"
                          className="absolute cursor-pointer  top-0 right-0 px-4 h-full text-sm font-normal text-white text-sm/tight font-normal bg-brown rounded-e-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                          Subscribe
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="sm:flex sm:items-center sm:justify-between bg-[#ffef97]/[0.36] px-4 lg:px-[8%] py-4">
            <div className="text-center lg:text-left">
              <span className="text-xs text-darkgray sm:text-center  font-normal">
                {data?.copyRight?.title}
              </span>
            </div>
            <div className="flex justify-center">
              <div className="flex mt-4 sm:justify-center sm:mt-0 gap-3 ">
                {data?.copyRight?.items?.map((i, index) => (
                  <a
                    key={index}
                    href={i?.link}
                    className="text-xs text-darkgray sm:text-center  cursor-pointer border-l border-brown/20 pl-3 first:border-none first:pl-0 font-normal"
                  >
                    {i?.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default MidFooter;
