import { renderFirstPageToImage } from "../../../helper/renderPdfPage";
import { useState, useEffect } from "react";

const baseUrl = import.meta.env.VITE_API_IMAGE_BASEURL;

const LatestCard = ({ data }) => {
  const tabData = data?.[0] || {};
  const tabKeys = Object.keys(tabData); // e.g., ['publication', 'pressRelease']

  const [activeTab, setActiveTab] = useState(tabKeys?.[1] || "");
  const [pdfImage, setPdfImage] = useState(null);

  useEffect(() => {
    if (tabKeys.length && !tabKeys.includes(activeTab)) {
      // pick the first available key as soon as we have one
      setActiveTab(tabKeys[1]);
    }
  }, [tabKeys, activeTab]);

  const content = tabData[activeTab];

  useEffect(() => {
    const loadImage = async () => {
      setPdfImage(null); // Clear old image immediately

      if (content?.file?.url) {
        try {
          const image = await renderFirstPageToImage(
            baseUrl + content.file.url
          );
          setPdfImage(image);
        } catch (err) {
          console.error("Error rendering PDF:", err);
          setPdfImage(null);
        }
      }
    };

    loadImage();
  }, [activeTab, content]);

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
  };

  return (
    <div className="my-4 mx-4 lg:mx-[8%] py-[4%]">
      <div className="relative min-h-[333px] max-h-[333px] overflow-hidden rounded-b-[53.333px] flex flex-col  justify-between">
        {/* Dynamic Content Area */}
        <div
          className=" md:flex bg-[linear-gradient(90deg,#4D2412,rgba(77,36,18))] lg:bg-[linear-gradient(90deg,#4D2412_56.4%,rgba(77,36,18,0)_100.95%)]
  flex-grow  rounded-t-[53.333px] overflow-hidden"
        >
          <div className="text-white md:pr-6 md:pl-8 md:pt-12 md:pb-6 w-full lg:w-1/2 px-5 py-7   ">
            <h2 className="font-h3 font-bold mb-4 text-gold ">
              {content?.title}
            </h2>
            <ul className="list-disc pl-5 font-h6 w-full lg:w-[80%] lg:line-clamp-none font-normal">
              {content?.description
                ?.split(".")
                .filter((sentence) => sentence.trim() !== "")
                .map((sentence, idx) => (
                  <li className="mt-4" key={idx}>
                    {sentence.trim()}.
                  </li>
                ))}
            </ul>
          </div>
          <div className="hidden md:flex w-1/2  items-center justify-center relative">
            {pdfImage ? (
              <div className="">
                <img
                  src={pdfImage}
                  alt="PDF Preview"
                  className="absolute top-0 left-0 lg:-top-60 lg:left-0 -z-10"
                />
              </div>
            ) : (
              <div className="text-white/60 text-sm">Loading preview...</div>
            )}
          </div>
        </div>

        {/* Dynamic Tabs at the Bottom */}
        <div
          className="absolute bottom-0 rounded-b-[53.333px] h-auto w-full z-30 bg-white/10 backdrop-blur-xs
         
        "
        >
          <div
            className="px-6 pb-3 
           "
          >
            <ul className="flex font-h6 font-normal w-max ">
              <li className="me-4 inline-block" role="presentation">
                <button
                  disabled
                  className="font-h6 tracking-wide capitalize inline-block p-3 border-t-2 cursor-not-allowed font-normal text-white/20 border-transparent"
                >
                  Calendar Events
                </button>
              </li>

              <li className="me-4 inline-block" role="presentation">
                <button
                  disabled
                  className="font-h6 tracking-wide capitalize inline-block p-3 border-t-2 cursor-not-allowed font-normal text-white/20 border-transparent"
                >
                  Financial Reports
                </button>
              </li>
              {[...tabKeys].reverse().map((key) => (
                <li key={key} className="me-4 inline-block" role="presentation">
                  <button
                    onClick={() => handleTabClick(key)}
                    className={`capitalize inline-block font-h6 p-3 border-t-2 cursor-pointer font-normal tracking-wide ${
                      activeTab === key
                        ? "text-white border-white"
                        : "text-white/30 border-transparent hover:text-white/70"
                    }`}
                  >
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestCard;
