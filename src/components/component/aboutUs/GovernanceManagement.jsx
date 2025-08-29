import UnderlineLink from "../../../components/ui/button/UnderlineLink";

const baseUrl = import.meta.env.VITE_API_IMAGE_BASEURL;

const GovernanceManagement = (data) => {
  const filteredData = data?.data?.governanceManagement;

  return (
    <div className="">
      <div className="">
        {/* <img className="w-1/3 object-contain" src={logo} /> */}
        <img
          className="lg:h-[440px] lg:w-full object-cover object-top"
          src={baseUrl + filteredData?.banner?.url}
        />
      </div>
      <div className="mx-4 lg:mx-[10%] py-4 lg:pb-[24px] lg:pt-[56px]">
        <div className="lg:flex justify-between gap-6 lg:gap-[121px]">
          <div className="">
            <h1 className="font-bold text-brown md:w-1/2 lg:w-[347px] font-h2">
              {filteredData?.title}
            </h1>
          </div>
          <div className=" py-4 lg:w-[484px]">
            <div className="w-full">
              <p className="text-gray font-medium font-subtitle">
                {filteredData?.description}
              </p>
            </div>
            <div className="mt-8 text-lightgray font-normal font-h6">
              {filteredData?.subDescription
                ?.replaceAll("\\n", "\n") // convert \n string to real newline
                .split("\n")
                .map((line, index) => (
                  <span className="font-h6" key={index}>
                    {line}
                    <br />
                  </span>
                ))}
            </div>

            <div className="">
              <UnderlineLink
                name={filteredData?.link?.text}
                href={filteredData?.link?.link}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernanceManagement;
