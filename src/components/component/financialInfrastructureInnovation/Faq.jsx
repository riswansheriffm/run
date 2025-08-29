import { formatNewLines } from "../../../helper/formatNewLines";
import CommonFaq from "../../../components/ui/faq/CommonFaq";
const baseUrl = import.meta.env.VITE_API_IMAGE_BASEURL;

const Faq = ({ faqData, overviewData }) => {
  return (
    <>
      <div className="relative flex flex-col lg:flex-row mx-2 lg:mx-[8%] gap-[40px] lg:gap-[72px] py-8">
        {/* Left Side: Sticky/Fixed like parallax */}
        <div className="lg:w-1/2 w-full p-4 lg:sticky top-28 h-fit self-start">
          <img
            className="w-[459.167px] md:w-[727.167px] lg:w-[632.167px] h-[283px] object-cover rounded-xl"
            src={baseUrl + overviewData?.image?.url}
            alt={overviewData?.title || "Overview image"}
            loading="lazy"
          />
          <div className="">
            <h1 className="text-brown font-h2 font-bold my-6">
              {overviewData?.title}
            </h1>
            <p className="">{formatNewLines(overviewData?.description)}</p>
          </div>
        </div>

        {/* Right Side: Scrolls naturally */}
        <div className="lg:w-1/2 w-full pr-4">
          <CommonFaq
            title={faqData.title}
            description={faqData.description}
            faqs={faqData.faq}
          />
        </div>
      </div>
    </>
  );
};

export default Faq;
